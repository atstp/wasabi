![wasabi in action](http://atstp.github.io/wasabi/img/banner.png)

>
> ## from readable text :page_facing_up:
>
>     my-project/
>       bowser.json # mario's least favorite package manager
>
>       src/
>         helper.js # be familiar with it's brother main.js
>                   # first, this file houses a good bit of
>                   # sugar for the core features
>
>         main.js   # the core of the app, supports x, y, and z
>
>       dist/
>         build.js      # link to me for testing
>         build.min.js  # tiny and obfuscated, for production
>
>       bin/
>         project-name  # run this to generate a new instance
>                       # of my-project on your machine
>
> ## wasabi makes this :tada:
>
> ![wasabi in action](http://atstp.github.io/wasabi/img/demo.gif?clearcache=1)
>

## about

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
Using pictures is marginally better, with the side-effect of temporarily turning your dev environment into
:finnadie: MS Paint.

wasabi gets you best of both:

  * :eyeglasses: readable and maintainable source text
  * :bulb: a pleasant, intuitive browser interface

please, take it for a [test drive](http://atstp.github.io/wasabi/)!

--------------------------------------------------------------------------------

## "syntax"

calling it "syntax" is a bit pretentious; it's pretty simple.

Basically you have two options, what you saw above, where 1) comments come after a "#" and
2) children are indented beneath their parent. Like so:

    my-project/
      bowser.json # mario's least favorite package manager

      src/
        helper.js # be familiar with it's brother main.js
                  # first, this file houses a good bit of
                  # sugar for the core features

        main.js   # the core of the app, supports x, y, and z

That is great for smaller projects. For larger projects, verbose names and concise comments
make maintenance and reference easier.

    my-project/
    my-project/bowser.json
      mario's least favorite package manager

    my-project/src/
    my-project/src/helper.js
      be familiar with it's brother main.js first,
      this file houses a good bit of sugar for the core features
    my-project/src/main.js
      the core of the app, supports x, y, and z

## generators

typing out every entry for your project would be nuts, so wasabi provides a few tiny scripts
to make this a breeze.

    cd ~/path/to/my/project

    # if you like the indented lists (above)
    curl http://atstp.github.io/wasabi/indented.sh | sh

    # or if your big project needs a detailed list
    curl http://atstp.github.io/wasabi/boilerplate.sh | sh

    # once you find what you like, redirect that to a file wher you can start editing
    curl http://atstp.github.io/wasabi/boilerplate.sh | sh >> awesome-project.wasabi.txt
                                       # ^
                                       # | if you prefer the indented list
                                       #   use `indented.sh' instead

feeling fancy?

    # optionally, you can launch a demo page for your project!
    # there's an interactive prompt, so you can <ctrl-c> out at any time
    # and it launches a simple python server at the end!
    curl http://atstp.github.io/wasabi/demo-page.sh > demo-this-project.sh
    bash demo-this-project.sh


## in the broswer

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
>       var myProj = new Wasabi.Project('#project-structure');
>       myProj.replace();
>     </script>
>

--------------------------------------------------------------------------------

#### colophon

If your project is sushi, this is wasabi; it won't make a bad project good, but
it should make any project more palatable.

I made this library because, when jumping :running: into a new project, regardless of circumstance &mdash;
as a contributor or user, for work or for fun &mdash; it helps _tremendously_ to know what's where.

  * when **contributors** start out with a full picture of your project, they'll hunt down bugs :bug: faster
    and more readily
  * when **users** understand your framework's structure _before_ it's on their machine, they'll be more
    likely to choose it :relaxed:
  * when new **employees** :neckbeard: don't need to "have a look around" the system to get familiar they'll be
    able to start what they were hired :dollar: for (and want to do) sooner

Projects and maintainers are diverse, so wasabi is built to be convenient for anyone.

  * old-school user? no need to fuss with the js, the source looks good monospaced
  * github pages fan? [here's a demo!](http://atstp.github.io/wasabi_and_jekyll/)
  * js wizard? when you create a wasabi project, it exposes an api &mdash; hack away!

If I botched it with any of this or if you have an idea for improvement, let me know with an
[issue](https://github.com/atstp/wasabi/issues). if you've got a sweet new feature or a bug-fix,
pull requests are welcome!
