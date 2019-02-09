![wasabi in action](http://atstp.github.io/wasabi/img/banner.png)

#### turns readable text :page_facing_up:

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

#### into an intuitive interface

![wasabi in action](http://atstp.github.io/wasabi/img/demo.gif?clearcache=1)


## about

Directory structures are first thing _everyone_ sees :eyes: in _any_ project.

There are a handful of one-off approaches from
  [wikipedia](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard),
  [apple](https://developer.apple.com/library/mac/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html),
  [rubyonrails.org](http://guides.rubyonrails.org/getting_started.html),
  [laravel](https://laravel.com/docs/master/structure),
  [the linux documentation project](http://tldp.org/LDP/intro-linux/html/sect_03_01.html),
  [apache maven](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html),
 and
  [many](http://www.tutorialspoint.com/ruby-on-rails/rails-directory-structure.htm),
  [many](http://www.howtogeek.com/howto/15677/zen-and-the-art-of-file-and-folder-organization/),
  [more](http://www.thegeekstuff.com/2010/09/linux-file-system-structure/).

Turns out ascii-art popular enough to be the _de facto_ standard
(
  [scotch.io](https://scotch.io/tutorials/angularjs-best-practices-directory-structure),
  [readthedocs](http://tutos.readthedocs.org/en/latest/source/git_workflow.html),
  [github's jekyll](http://jekyllrb.com/docs/structure/),
  and
  [tutorials point](http://www.tutorialspoint.com/ruby-on-rails/rails-directory-structure.htm)
)
&mdash; did you think you'd ever read that sentence?

here's a breakdown of some of the approaches:

|the solution | developer/author experience                  | user experience
|-------------|----------------------------------------------|-------
|picture      | your dev environment is ms paint :finnadie:  | either huge and detailed or too small to be useful
|ascii-art    | easy                                         | ugly in a browser
|html table   | okay                                         | no impression of hierarchy
|html list    | hard to patch                                | awkward to navigate
|random mix   | probably easy(ish)                           | chaos
|**wasabi**   | readable, maintainable source :eyeglasses:   | a pleasant, intuitive browser interface :bulb:

### [try it](http://atstp.github.io/wasabi/)

--------------------------------------------------------------------------------

## Using it

1. pick a **[format](#formats)**
2. **[generate](#generators)** it for your project
3. load it **[in a browser](#in-a-browser)**

## formats

either **a tree**: indent children and use `#` for comments

    my-project/
      bowser.json # mario's least favorite package manager

      src/
        helper.js # be familiar with it's brother main.js
                  # first, this file houses a good bit of
                  # sugar for the core features

        main.js   # the core of the app, supports x, y, and z

or **a list**: the full path for each entry and indent comments

    my-project/
    my-project/bowser.json
        mario's least favorite package manager

    my-project/src/
    my-project/src/helper.js
        be familiar with it's brother main.js first,
        this file houses a good bit of sugar for the core features
    my-project/src/main.js
        the core of the app, supports x, y, and z

the latter is good for heavily commented larger projects with the added bouns of
being _text searchable_ by path (`grep -A10 'src/main' overview.wasabi` anyone?)

## generators

here are two one-liners 

print a list:
```
printf "YOUR_PROJECT_NAME/%s\n" `git ls-tree -r master --name-only` | \
   sed 'p;s#[^/]*$##;' | \
   sort -u
```

or a tree!
```
printf "YOUR_PROJECT_NAME/%s\n" `git ls-tree -r master --name-only` | \
   sed -n 'p;s#/[^/]*$#%%#p;' | \
   sort -u | \
   sed 's#[^/]\+/#    #g;s#%%#/#'
```

feeling fancy? launch a demo page for your project!

```
# this modifies your filesystem (albeit safely) just an fyi
curl http://atstp.github.io/wasabi/demo-page.sh > demo-this-project.sh && \
  bash demo-this-project.sh
```

### in a browser

paste this where you want you demo loaded
(and eventually update the url for your project)

    <script id="wasabi-location">
      (function(){

        // replace the url to use your own wasabi file
        var my_file = 'https://s3.amazonaws.com/wasabi.js/simple-detailed.wasabi';

        var this_id = 'wasabi-location';
        var W=window.Wasabi=window.Wasabi||{};W.from=my_file;W.here=this_id;
        var s=document.createElement('script');s.src='https://s3.amazonaws.'+
        'com/wasabi.js/get-wasabi.js';document.write(s.outerHTML);
      })();
    </script>


--------------------------------------------------------------------------------

## colophon

**If your project is sushi, this is wasabi**:
It won't make a bad project good, but it will make it more appealing.

### goal

Jumping :running: into a new project should be easy
  &mdash; as a contributor or user, for work or for fun &mdash;
it helps _tremendously_ to know what's where.

  * when **contributors** start out with a full picture of your project,
    they'll hunt down bugs :bug: faster and more readily
  * when **users** understand your framework's structure _before_ it's on their machine,
    they'll be more likely to choose it :relaxed:
  * when new **employees** :neckbeard: don't need to "have a look around" the system
    to get familiar they'll be able to start what
    they were hired :dollar: for (and want to do) sooner

### contributing

Projects, maintainers, and users are diverse; wasabi should be convenient for anyone:

  * using a docs site? the rendered interface is awesome
  * writing docs? the source is simple, and rendering it is a breeze
  * github pages fan? easy to integrate: [here's a demo!](http://atstp.github.io/wasabi_and_jekyll/)
  * brosing github? the source looks good monospaced
  * viewing source? the source looks good monospaced
  * old scool user? the source looks good monospaced

issues and pull requests are welcome.
