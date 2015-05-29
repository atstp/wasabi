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

