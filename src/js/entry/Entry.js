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
