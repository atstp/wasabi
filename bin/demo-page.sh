#!/bin/sh

css_location=https://s3.amazonaws.com/wasabi.js/wasabi.css
js_location=https://s3.amazonaws.com/wasabi.js/wasabi.js

hl_bold=$(tput bold)
hl_ul=$(tput smul)
hl_green=$(tput setaf 2)
hl_blue=$(tput setaf 4)
hl_cyan=$(tput setaf 6)
un_hl=$(tput sgr0)

demo_dir=wasabi-demo
project_name="$(basename "$PWD")"
outfile=${demo_dir}/index.html
wasabifile=${demo_dir}/${project_name}.wasabi.txt

if [ -d "$demo_dir" ]; then
  printf 'STOPPING: demo-directory already exists: %s\n' "$demo_dir" >&2
  exit 1
else
  mkdir $demo_dir
fi

echo
echo "The ${hl_bold}${hl_green}Wasabi${un_hl} generator will create"
echo
echo "    ${hl_blue}${demo_dir}/"
echo "    ${outfile}"
echo "    ${wasabifile}${un_hl}   # for async only"
echo
printf "do you want an ${hl_bold}${hl_ul}a${un_hl}sync or "
printf "${hl_bold}${hl_ul}i${un_hl}nline example? (a/i) "
read preference
if [ "$preference" == "i" ]; then
  async=false
  type_msg=" an inline demo"
else
  async=true
  wasabilink="<a href=\"/${wasabifile##*/}\">wasabi source</a>"
  type_msg=" an async demo"
fi

cat > $outfile < /dev/null
cat > $wasabifile < /dev/null

############################################
#
# print out the project structure
#
############################################
(
printf "${project_name}/\n"
printf "  this is a comment on the directory \"${project_name}/\"\n"
printf "  when listing the full path for each item,\n"
printf "  comments are indented 2 spaces after their entry.\n\n"
printf "  <br/>empty lines are OK!\n\n"
find . -name '.git' -prune -o \
       -name 'node_modules' -prune -o \
       -name '.sass-cache' -prune -o \
       -printf '%h/%f %y\n' | sed -e '1d' -e 's/ d$/\//' -e 's/ f$//' -e "s/^\./${project_name}/"
) >> $wasabifile


############################################
#
# write the upper half of the document
#
############################################
(
cat <<END_OF_HTML_HEADER
<!DOCTYPE html>
<html>
  <head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>wasabi.js demo</title>
  <meta name="description" content="wasabi.js demo">
</head>
  <body>
    <style>
      html,body,.wrapper{ width: 100%; height: 100%; margin: 0; padding: 0;}
      .view-source{ position: fixed; top: 0; right: 0; margin: 10px; }
    </style>
<span class="view-source">
 demo for ${project_name} | ${wasabilink}
</span>
<div class="wrapper">




END_OF_HTML_HEADER
) >> $outfile

if [ "$async" = true ]; then
(
cat <<END_OF_ASYNC_WASABI
<script id="wasabi-page-location">
  (function(){

    // the location of your wasabi file
    var my_file = '/${wasabifile##*/}';

    var this_id = 'wasabi-page-location';
    var W=window.Wasabi=window.Wasabi||{};W.from=my_file;W.here=this_id;
    var s=document.createElement('script');s.src='https://s3.amazonaws.'+
    'com/wasabi.js/get-wasabi.js';document.write(s.outerHTML);
  })();
</script>
END_OF_ASYNC_WASABI
) >> $outfile
else
(
cat <<END_OF_HTML_HEADER
<!-- start of wasabi stuff
                 |
                 |
                 |
                \\|/
                 v
-->
<link href="${css_location}" rel="stylesheet">          <!-- INCLUDE wasabi.css -->
<div class="wasabi-original" id="simple-project">
END_OF_HTML_HEADER
) >> $outfile
cat $wasabifile >> $outfile
rm $wasabifile
(
cat <<END_BOTTOM_HALF_OF_HTML

</div>
<script src="${js_location}"></script>                   <!-- INCLUDE wasabi.js -->

<script>
  var myProject = new Wasabi.Project('#simple-project'); // INIT YOUR PROJECT WITH ITS ID
  myProject.replace();
</script>
<!--
      that's the end of wasabi stuff

               \\   /
                \\ /
                 X
                / \\
               /   \\
-->
END_BOTTOM_HALF_OF_HTML
) >> $outfile
fi



############################################
#
# and print out the bottom half of the html
#
############################################
(
cat <<END_BOTTOM_HALF_OF_HTML



    </div>
  </body>
</html>
END_BOTTOM_HALF_OF_HTML
) >> $outfile

echo
echo
echo "built and serving${type_msg}!"
echo
echo "    open ${hl_cyan}localhost:8000${un_hl} in your browser"
echo
echo "    ${hl_cyan}<ctrl-c>${un_hl} to shutdown the server"
echo

(cd ${demo_dir}; python -m http.server 8000)
