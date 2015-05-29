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
