/**
 *
 * just disable and enable classes
 *
**/
Wasabi.Entry.addPlugin('api:disableable', function(entry){

  entry.disable = function(){
    this.state('disabled');
    this.dom.getContainer().setAttribute('aria-disabled','true');
    return this;
  };
  entry.enable = function(){
    this.state('enabled');
    this.dom.getContainer().setAttribute('aria-disabled','false');
    return this;
  };

  entry.enable();
});
