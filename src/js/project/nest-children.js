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
