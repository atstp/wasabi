var demo = document.getElementById("demo-area");
var output = document.getElementById("output-area");
var tryIndented = document.getElementById("try-indented");
var tryDetailed = document.getElementById("try-detailed");
var indentedSource = document.getElementById("indented").textContent.trim();
var detailedSource = document.getElementById("detailed").textContent.trim();
var replArea = document.getElementById("wasabi-editor");

tryIndented.addEventListener('click',function(){
  demo.value = indentedSource;
  rep();
  demo.focus();
});
tryDetailed.addEventListener('click',function(){
  demo.value = detailedSource;
  rep();
  demo.focus();
});

demo.addEventListener('input', rep ,false);

demo.value = indentedSource;
rep();
demo.focus();
demo.selectionEnd = demo.value.indexOf("\n");
demo.selectionStart = demo.value.indexOf("# ") + 2;

function rep(e) {
  var entriesOnly = demo.value.trim().replace(/(\n?(\w*#.*)?$)+/m, '').trim();
  if( entriesOnly.match(/\n\w/m) ) {
    replArea.setAttribute('class', 'demo-section input detailed')
  } else {
    replArea.setAttribute('class', 'demo-section input indented')
  }
  if( demo.value ){
    window.wasabiProject = new Wasabi.Project(demo.value.trim() + "\n\n");
    var container = window.wasabiProject.dom.getContainer()
    while(output.childNodes.length){
      output.removeChild(output.childNodes[0]);
    }
    output.appendChild(container);
  }
}

// turn tabs into spaces
demo.addEventListener('keydown',function(e) {
  if(e.keyCode === 9) { // tab was pressed
    // get caret position/selection
    var start = this.selectionStart;
    var end = this.selectionEnd;

    var target = e.target;
    var value = target.value;

    // set textarea value to: text before caret + tab + text after caret
    target.value = value.substring(0, start) + "  " + value.substring(end);

    // put caret at right position again (add one for the tab)
    this.selectionStart = this.selectionEnd = start + 2;

    // prevent the focus lose
    e.preventDefault();
  }
},false);
