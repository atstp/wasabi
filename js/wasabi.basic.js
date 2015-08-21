// adds the header of your file to the project
Wasabi.Entry.addPlugin('basic:control', function(entry){
  if(!entry._comments){ return; }
  var commentWrapper = entry.dom.getComments();
  var commentHeader = Wasabi.createEl('h5.comment-header');
  commentHeader.innerHTML = entry._pathString.replace(/^[^\/]+/, '~');
  commentWrapper.insertBefore(commentHeader, commentWrapper.childNodes[0]);
});

// builds a control bar
Wasabi.Project.addPlugin('basic:control', function(project){
  var nu = Wasabi.createEl;

  var openBtn   = nu('button.open-button.control-button');
  var searchBar = nu('input.wasabi-search-bar');
  var container = project.dom.getContainer();
  var toolbar   = project.dom.getToolbar();

  searchBar.setAttribute('type','text')

  openBtn.innerHTML = 'open all';

  toolbar.appendChild(searchBar);
  toolbar.appendChild(openBtn);

  openBtn.addEventListener('click', function(){
    project.eachEntry(function(entry){
      entry.open();
    });
  });
  searchBar.addEventListener('input', function(){
    var matches = [];
    var term = searchBar.value.trim();
    var termMatcher = new RegExp(term, 'i');
    project.eachEntry(function(entry){
      if(!term){
        return entry.enable().open();
      } else {
        entry.close().disable();
        if(entry._name.match(termMatcher)){
          matches.push(entry);
        }
      }
    });
    for(var i in matches){
      matches[i].openPath().enable();
    }
  });

});
