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
