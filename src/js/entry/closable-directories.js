/**
 *
 * handles closing and opening items
 *
**/
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
