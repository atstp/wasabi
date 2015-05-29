/**
 *
 * handles activating items
 *
**/
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
