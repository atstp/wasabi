/**
 * this adds nestability (only to directories)
 *
 *   `entry.addChild`   a function for adding a child entry
 *   `entry._children`  references to all of a directory's children
 *
**/
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

