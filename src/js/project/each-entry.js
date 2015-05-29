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
