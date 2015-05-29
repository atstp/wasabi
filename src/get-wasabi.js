(function() {
  if(!Wasabi.from || !Wasabi.here){return;}

  var script = document.createElement('script');
  var link = document.createElement('link');
  var location = document.getElementById(Wasabi.here);

  var getIt = function(){
    var req = new XMLHttpRequest();
    req.open('GET', Wasabi.from, true);
    req.onload = function() {
      if(req.status >= 200 && req.status < 400) {
        var a = new Wasabi.Project(req.responseText);
        var b = document.getElementById(Wasabi.here);
        b.parentNode.insertBefore(a.dom.getContainer(),b);
      }
    };
    req.send();
  };

  link.rel = 'stylesheet';
  link.href = 'https://s3.amazonaws.com/wasabi.js/wasabi.css';
  location.parentNode.insertBefore(link,location);

  if(Wasabi.Project) { // slapdash check
    getIt();
  } else {
    script.async = true;
    location.parentNode.insertBefore(script,location);
    script.onload = getIt;
    script.src = 'https://s3.amazonaws.com/wasabi.js/wasabi.min.js';
  }
})();
