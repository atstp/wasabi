# [wasabi.js](http://atstp.github.io/wasabi/)

> if your project is sushi, this is wasabi

Wasabi won't make a so-so project excellent, but it will make your great
project tastier. Clearly presenting your project structure works wonders:

  * **for frameworks**, this means quicker, more painless user adoption --
    people use what they understand.

  * **for libraries**, it helps get contributors on board quickly -- bugs get fixed
    quicker if people know where to look for them.

Places it would be nice:
[jekyll](http://jekyllrb.com/docs/structure/),
[apache maven](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html),
[mac developer library](https://developer.apple.com/library/mac/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html),
[tecmint on linux](http://www.tecmint.com/linux-directory-structure-and-important-files-paths-explained/),
[tldp/linux](http://www.tldp.org/LDP/intro-linux/html/sect_03_01.html#sect_03_01_03),
[vim](http://learnvimscriptthehardway.stevelosh.com/chapters/42.html),
[wordpress](http://www.wpexplorer.com/wordpress-internal-function/),
[ruby gems](http://guides.rubygems.org/patterns/),
[express js](http://stackoverflow.com/questions/5778245/expressjs-how-to-structure-an-application),
[aws mturk](http://docs.aws.amazon.com/AWSMechTurk/latest/AWSMturkCLT/CLTFilesArticle.html),
[tutorialspoint on rails](http://www.tutorialspoint.com/ruby-on-rails/rails-directory-structure.htm),
[freebsd](https://www.freebsd.org/doc/handbook/dirstructure.html),
[angular](https://scotch.io/tutorials/angularjs-best-practices-directory-structure),
and [more](https://www.google.com/search?q=directory+structure).

## use

#### automatic insertion (tldr;)

>
> paste this into your site
>
>     <script id="wasabi-location">
>       (function(){
>
>         // replace the url to use your own wasabi file
>         var my_file = 'https://s3.amazonaws.com/wasabi.js/simple-detailed.wasabi';
>
>         var this_id = 'wasabi-location';
>         var W=window.Wasabi=window.Wasabi||{};W.from=my_file;W.here=this_id;
>         var s=document.createElement('script');s.src='https://s3.amazonaws.'+
>         'com/wasabi.js/get-wasabi.js';document.write(s.outerHTML);
>       })();
>     </script>
>

#### inline

>
>     <link rel="stylesheet" src="wasabi.css"/>
>     <div id="project-structure">
>     my-project/
>       bowser.json # mario's least favorite package manager
>       src/
>         helper.js # be familiar with it's brother main.js
>                   # first, this file houses a good bit of
>                   # sugar for the core features
>
>         main.js   # the core of the app, supports x, y, and z
>       dist/
>         build.js      # link to me for testing
>         build.min.js  # tiny and obfuscated, for production
>       bin/
>         project-name  # run this to generate a new version of
>                       # my project
>     </div>
>
>     <script src="wasabi.js"></script>
>     <script>
>       Wasabi.project('#project-structure');
>     </script>
>

## try it out

Naturally `cd` into your project (for windows, use [cygwin](https://www.cygwin.com/))

    cd ~/path/to/my/project

_then_ make a boilerplate

    curl http://atstp.github.io/wasabi/boilerplate.sh | sh

    # optionally, redirect that to a file
    curl http://atstp.github.io/wasabi/boilerplate.sh | sh >> awesome-project.wasabi.txt

_or_ launch a demo page (a local server with a demo of the current directory)

    curl http://atstp.github.io/wasabi/demo-page.sh > demo-this-project.sh
    sh demo-this-project.sh
