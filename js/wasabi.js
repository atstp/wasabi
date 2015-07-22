/* wasabi - v0.0.0 - 2015-07-31
* atstp.github.io/wasabi.js/
* Copyright (c) 2015 Dan <dan.ll.montague@gmail.com>; Licensed MIT */
Wasabi = window.Wasabi || {};
Wasabi.version = '0.0.0';

Wasabi.Utils = {

  addClass: function( el, newClasses ){
    var classList = el.getAttribute('class') || '',
        arrayOfClasses = newClasses.split(/ +/),
        tRex = new RegExp('\\b' + arrayOfClasses[0] + '\\b');

    for(var nc = 0; nc < arrayOfClasses.length; nc++){
      tRex = new RegExp('\\b' + arrayOfClasses[nc] + '\\b');
      if( !classList.match(tRex) ){
        classList += (' ' + arrayOfClasses[nc]);
      }
    }

    el.setAttribute('class', classList.replace(/ +/g, ' '));
  },

  removeClass: function( el, rmClasses ){
    var classList = el.getAttribute('class') || '',
        arrayOfClasses = rmClasses.split(/ +/),
        tRex = new RegExp('\b' + arrayOfClasses[0] + '\b');

    for(var nc = 0; nc < arrayOfClasses.length; nc++){
      tRex = new RegExp('\\b' + arrayOfClasses[nc] + '\\b');
      classList = classList.replace(tRex, '');
    }

    el.setAttribute('class', classList);
  },

  states: [
    ['open','closed'],
    ['visible','hidden'],
    ['enabled','disabled'],
    ['focused','unfocused'],
    ['unloaded','loading','loaded']
  ],

  classState: function( el, newState ){
    var states = Wasabi.Utils.states;
    for(var set=0;set < states.length; set++){
      if( states[set].indexOf(newState) > -1 ){
        Wasabi.Utils.removeClass(el, states[set].join(' '));
        Wasabi.Utils.addClass(el, newState);
      }
    }
  },

  getter: function(val){
    return function(){ return val; };
  },

  extend: function(base, extension){
    for(var item in extension) {
      if(item !== 'prototype'){
        base[item] = extension[item];
      }
    }
  },

  createEl: function(selector){
    var s = selector;

    var elName = s.match(/^[a-zA-Z0-9]+/);
    var classes = s.match(/\.[-_a-zA-Z0-9]+/g);
    var id = s.match(/#[-_a-zA-Z0-9]+/);
    var el = document.createElement(elName ? elName[0] : 'div');

    if(id) {
      el.id = id;
    }
    if(classes) {
      classes = classes.join(' ').replace(/\./g,'');
      Wasabi.Utils.addClass(el, classes);
    }

    return el;
  }
};

Wasabi.createEl = Wasabi.Utils.createEl;
Wasabi.getter = Wasabi.Utils.getter;
Wasabi.extend = Wasabi.Utils.extend;

Wasabi.entrify = function(sourceString, commentChar){

  sourceString = sourceString.trim();

  var lines = sourceString.split(/\r?\n/); // make it an array
                                           //   1) to clean any front-matter
                                           //   2) rejoin with '\n' later
  var entryStrings = [];                   // holds the future entries
  var comment = new RegExp('^\\s*(' + commentChar + ' ?|$)');
  var tmpLine = '';
  var parsed = {
    comments: [], // for leading comments in the project
    entries: []   // instances of Wasabi.Entry
  };


  /**
   * the indentedList function breakes entries that look like:
   *
   * ```
   * some/
   *   path
   *   file.txt # comments aobut file.txt
   * some/
   *    dir/
   *      # comments about `some/dir/`
   *      # it's a directory for organizing files
   * ```
   * into an array of strings for consumption by Wasabi.Entry
  **/
  function indentedList(source, comment){

    var isCommentLine = new RegExp('^(\\s+' + comment + ' ?|$)'); // matches comment lines
    var trailingComment = new RegExp('\\s*' + comment + '.*$');   // captures the comment to $
    var emptyLine = /^\s*$/;
    var lines = source.split(/\n/);  // an array of lines is easier to work with
    var indentUnit = null;           // holds the unit of indentation; set soon
    var indentMatcher = null;        // set later to determine the depth
    var currentEntry = '';           // keeping track of the entry under construction
    var cursorPath = [];             // tracks parent dirs
    var indentDepth = 0;             // tracks depth
    var line = lines[0];             // for the current line
    var entries = [];                // for collecting entries
    var i = 0;

    /**
     *  figure out and set the indent value.
     *  assumes the first line isn't indented; it shouldn't be.
    **/
    for(i=1;i<lines.length;i++){                // starting at the second line, move forward
      if(!lines[i].match(isCommentLine) &&      // find the first line that's not a comment
         !lines[i].match(emptyLine)) {          // and not empty
        indentUnit = lines[i].match(/^\s+/)[0]; // use that as the indentation unit
        break;                                  // stop looking
      }
    }

    indentMatcher = new RegExp('^' + indentUnit + '');


    /**
     *
     * start building entries
     *
    **/
    for(i=0;i<lines.length;i++){
      line = lines[i];

      if(line.match(emptyLine)) { continue; } // if it's blank

      if(!line.match(isCommentLine)){ // if it's an entry

        if(currentEntry.length > 0){  // check if a current entry is under construction
          entries.push(currentEntry); // if so, save it (only useful for the first)
        }
        currentEntry = '';            // and start from scratch

        // now `line` starts to get cut up
        indentDepth = 0;
        while(line.match(indentMatcher)) {        // every time indentation is found
          line = line.replace(indentMatcher, ''); // remove it
          indentDepth++;                          // and increase the depth
        }

        // just for a second, set the entry to the comment
        currentEntry = (line.match(trailingComment) || [comment])[0];

        cursorPath.length = indentDepth;
        cursorPath.push(line.replace(trailingComment, '').trim());

        currentEntry = cursorPath.join('') + ' ' + currentEntry;


      } else {
        currentEntry += '\n' + line.replace(isCommentLine, '');
      }
    }
    entries.push(currentEntry); // and the last one

    return entries;
  }


  /**
   * detailedList breakes entries that look like:
   *
   * ```
   * some/path
   * some/file.txt # comments aobut file.txt
   * some/dir/
   *   comments about `some/dir/`
   *   it's a directory for organizing files
   * ```
   *
   * into an array of strings for consumption by Wasabi.Entry
  **/
  function detailedList(source, comment){

    var entries = [];               // for collecting entries
    var lines = source.split('\n'); // an array is easier to work with
    var line = lines[0];            // for the current line
    var currentEntry = '';          // the entry under construction

    var entryLine = /^\S/;                       // for /r(e)(a)d\2b(l\1n\1s{2}|ility)/
    var alreadyCommented = new RegExp(comment);  // same


    for(var i=0;i<lines.length;i++){
      line = lines[i];


      if(line.match(entryLine)){
        if(currentEntry.length){
          entries.push(currentEntry);
        }

        currentEntry = line;

        if(!currentEntry.match(alreadyCommented)) {
          currentEntry += ' ' + comment + ' ';
        }

      } else {
        currentEntry += '\n' + line;
      }
    }
    entries.push(currentEntry); // get the last one

    return entries;
  }

  while(lines[0].match(comment)){
    tmpLine = lines.shift();
    tmpLine = tmpLine.replace(comment, '').trim();
    parsed.comments.push(tmpLine);
  }

  parsed.comments = parsed.comments.join('\n');
  lines = lines.join('\n');

  /**
   *  a quick heuristic to differentiate the two formats:
   *
   *  it's a detailed list if:
   *  ```
   *  some/path       # a line ends with a newline
   *  some/other-path # and the next starts with a non-whitespace
   *  ```
   *
   *  with indented lists, that won't happen:
   *  ```
   *  some/
   *    path        # a line ends with a newline
   *    other-path  # this and *every* other line will start with a whitespace
   *  ```
  **/
  if(lines.match(/\n\S/m)) {
    entryStrings = detailedList(lines, commentChar);
  } else {
    entryStrings = indentedList(lines, commentChar);
  }

  for( var entry in entryStrings) {
    parsed.entries.push(new Wasabi.Entry(entryStrings[entry]));
  }

  return parsed;
};

Wasabi.pluginable = function(structure){
  if(!structure){structure = {};}
  var plugins = {};
  var core = structure.mandatory ? [].concat(structure.mandatory) : [];
  var extra = structure.optional ? [].concat(structure.optional) : [];
  var calledNames = [];

  return {
    addPlugin: function(name, fn){ plugins[name] = fn; },
    reset: function(){ calledNames.length = 0; },
    extras: extra,
    call: function(){
      var args = Array.prototype.slice.call(arguments, 0);
      var currentPlugin = core[0];
      var pluginName = null;
      var i = 0;
      for(i=0;i<core.length;i++){
        currentPlugin = core[i];
        for(pluginName in plugins){
          if(pluginName.match(currentPlugin) &&
             calledNames.indexOf(pluginName) === -1) {
            plugins[pluginName].apply(null, args);
            calledNames.push(pluginName);
          }
        }
      }
      for(i=0;i<this.extras.length;i++){
        currentPlugin = this.extras[i];
        for(pluginName in plugins){
          if(pluginName.match(currentPlugin) &&
             calledNames.indexOf(pluginName) === -1) {
            plugins[pluginName].apply(null, args);
            calledNames.push(pluginName);
          }
        }
      }
      calledNames.length = 0;
    }
  };
};

Wasabi.Entry = function(entryLine) {
  this._source = entryLine.trim();
  if( typeof arguments[arguments.length] === 'object' ){
    Wasabi.extend(this.options, arguments[arguments.length]);
  }
  this._plugins.call(this);
};

Wasabi.Entry.prototype = {
  options: {
    rootChar: '.',       // the root dir's name (project-root) or symbol (~|.|'')
    dirChar: '/',        // for windows
    commentChar: '#',    // duh
  },
  _plugins: Wasabi.pluginable({
    mandatory: [ /^init:initialize$/,
                 /^init:types$/,
                 /^data:/,
                 /^dom:basics$/,
                 /^dom:/,
                 /^api:/
               ],

    optional: [/^interface:/,
               /^basic:/]
  })
};

Wasabi.Entry.addPlugin = Wasabi.Entry.prototype._plugins.addPlugin;

Wasabi.Project = function(initValue, options) {

  if(typeof options === 'object'){ Wasabi.extend(this.options, options); }

  this._source = ''; // the source string for the project
  this._sourceNode = null; // if it came from the dom, this is where

  if(initValue.textContent){                  // is this a dom element?
    this._source = initValue.textContent;
    this._sourceNode = initValue;
  } else if (typeof initValue === 'string') {
    if (initValue.match(/\n/m)) {             // are there newlines?
      this._source = initValue;               // then assume it's a wasabi string
    } else {                                  // otherwise, it's probably a selector
      this._sourceNode = document.getElementById(initValue.replace(/[ #]/g,''));
      if(!this._sourceNode){ throw new Error('couldn\'t init project with \n' + initValue); }
      this._source = this._sourceNode.textContent;
    }
  }

  var source = Wasabi.entrify(this._source, this.options.commentChar);
  this._comments = source.comments;

  if(this.options.plugins){
    this._initPlugins.extra = this.options.plugins;
  }

  this._initPlugins.call(this);


  for(var entry in source.entries) {
    this.addEntry(source.entries[entry]);
  }
};

Wasabi.Project.prototype = {
  options: {
    commentChar: '#',
    autoReplace: true
  },
  _initPlugins: Wasabi.pluginable({
    mandatory: [/^core:/],
    optional: [/^basic:/]
  })
};

Wasabi.Project.addPlugin = Wasabi.Project.prototype._initPlugins.addPlugin;


Wasabi.Entry.addPlugin('api:addChild', function(entry){
  if(entry._type !== 'directory'){ return; }                // only for directories

  var childContainer = Wasabi.createEl('ul.entry-children');
  entry.dom.getChildContainer = Wasabi.getter(childContainer); // set the getter

  entry._children = {};                                     // for refs to the children

  entry.dom.getContainer().appendChild(childContainer);     // nest it

  entry.addChild = function(newChild){                      // attach the method to nest
    if(!newChild instanceof Wasabi.Entry){return this;}     // only add entries

    this._children[newChild._name] = newChild;              // add the references
    newChild._parent = this;

    this.dom.getChildContainer()
      .appendChild(newChild.dom.getContainer());            // insert it's container as contents

    return this;
  };

});


Wasabi.Entry.addPlugin('api:closable-directories', function(entry){
  if(entry._type === 'directory'){
    entry.addClass('closable');
  }
  entry.close = function(){
    this.state('closed');
    return this;
  };
  entry.open = function(){
    this.state('open');
    return this;
  };
  entry.openPath = function(){
    this.open();
    if(this._parent) { this._parent.openPath(); }
    return this;
  };

  entry.open();
});

Wasabi.Entry.addPlugin('api:disableable', function(entry){

  entry.disable = function(){
    this.state('disabled');
    this.dom.getContainer().setAttribute('aria-disabled','true');
    return this;
  };
  entry.enable = function(){
    this.state('enabled');
    this.dom.getContainer().setAttribute('aria-disabled','false');
    return this;
  };

  entry.enable();
});

Wasabi.Entry.addPlugin('dom:basics', function(entry){

  var container = Wasabi.createEl('li.wasabi-entry.open');
  var nameWrapper = Wasabi.createEl('button.entry-name.type-' + entry._type);
  var commentWrapper = Wasabi.createEl('div.wasabi-entry-comment.unfocused');

  /*
   * introduce an object for dom stuff to live
   */
  entry.dom = {
    getContainer: Wasabi.getter(container),
    getName: Wasabi.getter(nameWrapper),
  };

  /*
   * adding and removing classes from the container
   */
  entry.state = Wasabi.Utils.classState.bind(null, container);
  entry.addClass = Wasabi.Utils.addClass.bind(null, container);
  entry.removeClass = Wasabi.Utils.removeClass.bind(null, container);

  /*
   * arrange and style
   */
  nameWrapper.innerHTML = entry._name;
  container.appendChild(nameWrapper);

  /*
   * comments (if they're there)
   */
  if(entry._comments){
    commentWrapper.innerHTML = entry._comments;
    entry.dom.getComments = Wasabi.getter(commentWrapper);
  }
});

Wasabi.Entry.addPlugin('api:focusable', function(entry){

  if(entry.dom.getComments){
    entry.addClass('has-comments');
  }

  entry.unfocus = function(){
    this.state('unfocused');
    if(this.dom.getComments){
      Wasabi.Utils.classState(this.dom.getComments(), 'hidden');
    }
  };

  entry.focus = function(){
    if(this.getProject){
      this.getProject().eachEntry(function(loopingEntry){
        loopingEntry.unfocus();
      });
    }

    if(this.dom.getComments){
      Wasabi.Utils.classState(this.dom.getComments(),'visible');
      this.state('focused');
    }
  };

  entry.unfocus();

});

Wasabi.Entry.addPlugin('init:initialize', function(entry){
  var comment = entry.options.commentChar;
  var commentMatcher = new RegExp(entry.options.commentChar + '(.|[\n\r])*', 'm');
  var commentRemover = new RegExp(entry.options.commentChar + ' ?');
  var pathMatcher = new RegExp('^[^' + comment + ']+'); // antything until (not including) a comment
  var typeIndicator = new RegExp('[*@' + entry.options.dirChar + ']$'); // removing [@*/]

  // comments
  var comments = entry._source.match(commentMatcher);
  entry._comments = comments ? comments[0].replace(commentRemover, '') : '';

  // path
  var path = entry._source.match(pathMatcher);
  if( !path ){ throw new Error('couldn\'t pull path from = ' + entry._source); }
  entry._pathString = path = path[0].trim();         // set `entry._pathString`
  entry._path = entry._pathString                    // set `entry._path`
                  .replace(typeIndicator, '')
                  .split( entry.options.dirChar );
  // name
  entry._name = entry._path[entry._path.length - 1]; // set `entry._name`
});

Wasabi.Entry.addPlugin('interface:hover-focus', function(entry){

  var name = entry.dom.getName();
  var container = entry.dom.getContainer();

  name.addEventListener('mouseenter', function(){
    entry.focus();
  });

  name.addEventListener('dblclick', function(e){
    e.stopPropagation();
    e.preventDefault();
    if(container.getAttribute('class').match(/\bopen\b/)){
      entry.close();
    } else {
      entry.open();
    }
  });

});

Wasabi.Entry.addPlugin('init:types', function(entry){

  var types = [
        {
          type: 'executable',
          matcher: /\*$/
        },{
          type: 'directory',
          matcher: /\/$/
        },{
          type: 'symlink',
          matcher: /@$/
        },{
          type: 'file',
          matcher: /./
        }
      ];

  var filetypes = entry._name             // the entry's extensions
                    .replace(/^\./, '')
                    .match(/\.([a-zA-Z]+)(?=(\.|$))/g) || [];

  types.every(function(item){
    if(entry._pathString.match(item.matcher)){
      entry._type = item.type;
      return false;
    }
    return true;
  });

  /**
   *
   * attach the extenstion for files
   *
  **/

  if( entry._type === 'file' ||
      entry._type === 'executable' ){

    for(var i=0; i < filetypes.length; i++){ // make them css friendly
      filetypes[i] = filetypes[i].replace(/[^-a-z_A-Z]/g, '');
    }

    entry._filetypes = filetypes;            // set it

  }

});


Wasabi.Project.addPlugin('core:dom', function(project) {
  var container = Wasabi.createEl('.wasabi-project');
    var mainArea = Wasabi.createEl('.project-content.two-column');
      var comments = Wasabi.createEl('.project-comments');
      var toolbar = Wasabi.createEl('.project-toolbar.hidden');
      var entries = Wasabi.createEl('ul.project-entries');

  // build the frame
  container.appendChild(mainArea);
  mainArea.appendChild(toolbar);
  mainArea.appendChild(comments);
  mainArea.appendChild(entries);

  project.dom = {
    getContainer: Wasabi.getter(container),
    getEntries: Wasabi.getter(entries),
    getToolbar: Wasabi.getter(toolbar),
    getComments: Wasabi.getter(comments)
  };
});

Wasabi.Project.addPlugin('core:each-entry', function(project){
  project.eachEntry = function(callback){
    var cursor = this.getRoot();

    recurseIntoTree(cursor, callback);

    function recurseIntoTree(entry, cb){
      cb(entry);
      if(entry._children){
        for( var child in entry._children){
          recurseIntoTree(entry._children[child], cb);
        }
      }
    }
  };
});

Wasabi.Project.addPlugin('core:insert', function(project) {

  project.replace = function(el){
    if(el) {
      if(typeof el === 'string') {
        el = document.getElementById(el.replace(/[ #]/g,''));
      }
    } else if(project._sourceNode) {
      el = project._sourceNode;
    }
    el.parentNode.insertBefore(project.dom.getContainer(), el);
    el.parentNode.removeChild(el);
  };

});

Wasabi.Project.addPlugin('core:nest-children', function(project){
  project.getEntry = function(query){

    var cursor = this.getRoot();

    if(typeof query === 'string') {
      query = query.split(this.options.dirChar);   // search with an array
    }

    query = query.splice( 1, query.length -1);     // the cursor's already on the first element

    while(query.length){                           // follow the path
      if(cursor._children &&
         cursor._children.hasOwnProperty(query[0])){
        cursor = cursor._children[query[0]];
        query.shift();
      } else { return false; }
    }
    return cursor;
  };

  project.addEntry = function(entry){
    var parent = false;
    entry.getProject = Wasabi.getter(this);


    if(entry.dom.getComments){
      project.dom.getComments().appendChild(entry.dom.getComments());
    }

    if( !this.getRoot ){     // if this is the first entry
      this.getRoot = Wasabi.getter(entry);
      this.dom.getEntries().appendChild(entry.dom.getContainer());
    } else {
      parent = this.getEntry(entry._path.slice(0, entry._path.length - 1));
      if( parent.addChild ){
        parent.addChild(entry);
      } else {
        console.log('parent directory doesn\'t exist for ' + entry._name);
      }
    }


    return this;
  };
});

// adds the header of your file to the project
Wasabi.Entry.addPlugin('basic:control', function(entry){
  if(!entry._comments){ return; }
  var commentWrapper = entry.dom.getComments();
  var commentHeader = Wasabi.createEl('h5.comment-header');
  commentHeader.innerHTML = entry._pathString.replace(/^[^\/]+/, '~');
  commentWrapper.insertBefore(commentHeader, commentWrapper.childNodes[0]);
});

// builds a control bar
Wasabi.Project.addPlugin('basic:control', function(project){
  var nu = Wasabi.createEl;

  var image     = nu('img.control-image');
  var button    = nu('button.menu-button');
  var openBtn   = nu('button.open-button.control-button');
  var searchBar = nu('input.wasabi-search-bar');
  var container = project.dom.getContainer();
  var toolbar   = project.dom.getToolbar();

  searchBar.setAttribute('type','text')

  image.src = "https://s3.amazonaws.com/wasabi.js/icon.svg";
  openBtn.innerHTML = 'open all';

  toolbar.appendChild(button);
    button.appendChild(image);
  toolbar.appendChild(searchBar);
  toolbar.appendChild(openBtn);

  openBtn.addEventListener('click', function(){
    project.eachEntry(function(entry){
      entry.open();
    });
  });
  searchBar.addEventListener('input', function(){
    var matches = [];
    var term = searchBar.value.trim();
    var termMatcher = new RegExp(term, 'i');
    project.eachEntry(function(entry){
      if(!term){
        return entry.enable().open();
      } else {
        entry.close().disable();
        if(entry._name.match(termMatcher)){
          matches.push(entry);
        }
      }
    });
    for(var i in matches){
      matches[i].openPath().enable();
    }
  });

});
