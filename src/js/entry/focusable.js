/**
 *
 * handles activating items
 *
**/
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
