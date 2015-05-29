/**
 *
 *  build out the base for the dom
 *  <div class="wasabi-project">
 *    <div class="project-content">
 *      <div class="project-toolbar">  <!-- for plugins -->
 *      </div>
 *      <div class="project-comments"> <!-- for entry comments -->
 *      </div>
 *      <ul class="project-entries">   <!-- entries are nested in here -->
 *      </ul>
 *    </div>
 *  </div>
 *
**/
Wasabi.Project.addPlugin('core:dom', function(project) {
  var container = Wasabi.createEl('.wasabi-project');
    var mainArea = Wasabi.createEl('.project-content.two-column');
      var comments = Wasabi.createEl('.project-comments');
      var toolbar = Wasabi.createEl('.project-toolbar.hidden');
      var entries = Wasabi.createEl('ul.project-entries');

  // build the frame
  container.appendChild(mainArea);
  mainArea.appendChild(toolbar);
  mainArea.appendChild(comments);
  mainArea.appendChild(entries);

  project.dom = {
    getContainer: Wasabi.getter(container),
    getEntries: Wasabi.getter(entries),
    getToolbar: Wasabi.getter(toolbar),
    getComments: Wasabi.getter(comments)
  };
});
