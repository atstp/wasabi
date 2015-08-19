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
        project-name  # run this to generate a new instance
                      # of my-project on your machine

## about

Directory structures are first thing _everyone_ :eyes: sees in _any_ project.
Good documentation :books: makes a great first impression :star: and gives users a strong
base to build on.

There are a
[handful](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard)
[of](http://www.thegeekstuff.com/2010/09/linux-file-system-structure/)
[approaches](https://developer.apple.com/library/mac/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html)
to this, but ascii-art is
[the](https://scotch.io/tutorials/angularjs-best-practices-directory-structure)
[_de facto_](http://jekyllrb.com/docs/structure/)
[standard](http://www.tutorialspoint.com/ruby-on-rails/rails-directory-structure.htm)
&mdash; did you think you'd ever read that sentence?

Documenting with ascii-art is a quick-fix :wrench: for the developer and _not awesome&trade;_ for the user.
Using pictures is just slighly better, with the side-effect of temporarily turning your dev environment
into MS Paint :finnadie:.

wasabi gets you best of both:

  * :eyeglasses: readable and maintainable source text
    &mdash; to live in your repo for reference and maintenance
  * :bulb: a pleasant, intuitive interface
    &mdash; when you want to render it in the browser

and fits an important spot in project :seedling: growth: introducing :wave: people
to the project, so they know what to expect once they get it in their hands.

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

## use

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

## generators

Naturally, `cd` into your project (for windows, use [cygwin](https://www.cygwin.com/))

    cd ~/path/to/my/project

_then_ make a boilerplate

    curl http://atstp.github.io/wasabi/boilerplate.sh | sh

    # optionally, redirect that to a file
    curl http://atstp.github.io/wasabi/boilerplate.sh | sh >> awesome-project.wasabi.txt

_or_ launch a demo page (a local server with a demo of the current directory)

    curl http://atstp.github.io/wasabi/demo-page.sh > demo-this-project.sh
    bash demo-this-project.sh

## big project?

Indented children and `#` comments are great for smaller projects. For larger
projects, verbose names and concise comments make maintenance and reference easier.

So you can also do this:

    my-project/
    my-project/bowser.json
      mario's least favorite package manager

    my-project/src/
    my-project/src/helper.js
      be familiar with it's brother main.js first,
      this file houses a good bit of sugar for the core features

    my-project/src/main.js
      the core of the app, supports x, y, and z

    my-project/dist/
    my-project/dist/build.js      # link to me for testing
    my-project/dist/build.min.js  # tiny and obfuscated, for production
    my-project/bin/

    my-project/bin/project-name
      run this to generate a new instance of my-project on your machine

### [more](http://atstp.github.io/wasabi/)
