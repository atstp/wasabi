## wasabi makes this :tada:

![wasabi in action](http://atstp.github.io/wasabi/img/demo.gif?clearcache=1)

## from plain text :page_facing_up:

    my-project/
      bowser.json # mario's least favorite package manager

      src/
        helper.js # be familiar with it's brother main.js
                  # first, this file houses a good bit of
                  # sugar for the core features

        main.js   # the core of the app, supports x, y, and z

      dist/
        build.js      # link to me for testing
        build.min.js  # tiny and obfuscated, for production

      bin/
        project-name  # run this to generate a new version of
                      # to do whatever this project does!

## about wasabi

Directory structures the first thing _anyone_ sees in _every_ project,
and knowing what's where simplifies everything tremendously.

Ascii-art is
[the](https://scotch.io/tutorials/angularjs-best-practices-directory-structure)
[de-facto](http://jekyllrb.com/docs/structure/)
[standard](http://www.tutorialspoint.com/ruby-on-rails/rails-directory-structure.htm)
for this &mdash; never thought i'd write that sentence &mdash;
sometimes you'll run across
[other](http://www.thegeekstuff.com/2010/09/linux-file-system-structure/)
[approaches](https://developer.apple.com/library/mac/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html).
Ascii-art is easy on the developer and hard on the reader, images are the opposite.

<!--
  Images and tables are a pain to make, and ascii-art rarely has more than a few words to describe the
  file or directory's purpose, further description gets thrown in a bulleted list below the "art".
  (besides, google says ascii-art is past its
  [peak](https://books.google.com/ngrams/graph?content=ascii+art&case_insensitive=on&year_start=1970&year_end=2008&corpus=15&smoothing=3)).
-->

wasabi makes this easier for the developer _and_ reader:

  * it stays editable and readable as raw text
  * it whips up into a convenient interface in a browser

[demo](http://atstp.github.io/wasabi/)

--------------------------------------------------------------------------------

## Use

### async

>
> paste this where you want you demo loaded
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

### inline

>
> include the styles, scripts, and plain-text inline
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

## Generators

Naturally, `cd` into your project (for windows, use [cygwin](https://www.cygwin.com/))

    cd ~/path/to/my/project

_then_ make a boilerplate

    curl http://atstp.github.io/wasabi/boilerplate.sh | sh

    # optionally, redirect that to a file
    curl http://atstp.github.io/wasabi/boilerplate.sh | sh >> awesome-project.wasabi.txt

_or_ launch a demo page (a local server with a demo of the current directory)

    curl http://atstp.github.io/wasabi/demo-page.sh > demo-this-project.sh
    bash demo-this-project.sh
