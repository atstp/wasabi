## make this :tada:

![wasabi in action](http://atstp.github.io/wasabi/img/demo.gif?clearcache=1)

## from readable text :page_facing_up:

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

## real talk.

Directory structures are first thing _everyone_ sees :eyes: in _any_ project.

There are a
[handful](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard)
[of](http://www.thegeekstuff.com/2010/09/linux-file-system-structure/)
[approaches](https://developer.apple.com/library/mac/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html)
to help users and contributors, but ascii-art is
[the](https://scotch.io/tutorials/angularjs-best-practices-directory-structure)
[_de facto_](http://jekyllrb.com/docs/structure/)
[standard](http://www.tutorialspoint.com/ruby-on-rails/rails-directory-structure.htm)
&mdash; did you think you'd ever read that sentence?

Documenting with ascii-art is a quick-fix :wrench: for the developer and _not awesome&trade;_ for the user.
Using pictures is a marginally better for the user, with the side-effect of temporarily turning your dev
environment into :finnadie: MS Paint.

wasabi gets you best of both:

  * :eyeglasses: readable and maintainable source text
  * :bulb: a pleasant, intuitive browser interface

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

## large projects

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

--------------------------------------------------------------------------------

#### colophon

If your project is sushi, this is wasabi; it won't make a bad project good, but
it will make any project more palatable.

I made this library because, when jumping into a new project, regardless of circumstance &mdash;
contributing, using, for work, or for fun &mdash; it helps _tremendously_ to know what's where.

  * when contributors start out with a full picture of your project, they'll hunt down bugs faster
    and more readily
  * when users understand your framework's structure _before_ it's on their machine, they'll be more
    likely to choose it
  * when new employees don't have to "have a look around" the system to get familiar they'll be
    able to start what they're excited for sooner

Projects are diverse, so wasabi is built to be convenient for anyone.

  * old-school user? no need to fuss with the js, the source looks good monospaced
  * github pages fan? [here's a demo!](http://atstp.github.io/wasabi_and_jekyll/)
  * js wizard? when you create a wasabi project, it exposes an api &mdash; hack away!

If I botched it with any of this or if you have an idea for improvement, let me know with an
[issue](https://github.com/atstp/wasabi/issues). if you've got a sweet new feature or a bug-fix,
pull requests are welcome!


...[more](http://atstp.github.io/wasabi/)
