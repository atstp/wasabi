/**
 *
 * builds out all the dom elements for an entry
 *
 * kinda like this:
 *
 * <li class=" wasabi-entry open">
 *   <button class="entry-name type-executable">
 *     the.file.sh
 *   </button>
 * </li>
 *
 * <div class="wasabi-entry-comment">
 *   comments about `the.file.sh`
 *   it's a file that's named "the"
 *   with the extensions "file" and "sh"
 * </div>
 *
**/
Wasabi.Entry.addPlugin('dom:basics', function(entry){

  var container = Wasabi.createEl('li.wasabi-entry.open');
  var nameWrapper = Wasabi.createEl('button.entry-name.type-' + entry._type);
  var commentWrapper = Wasabi.createEl('div.wasabi-entry-comment.unfocused');

  /*
   * introduce an object for dom stuff to live
   */
  entry.dom = {
    getContainer: Wasabi.getter(container),
    getName: Wasabi.getter(nameWrapper),
  };

  /*
   * adding and removing classes from the container
   */
  entry.state = Wasabi.Utils.classState.bind(null, container);
  entry.addClass = Wasabi.Utils.addClass.bind(null, container);
  entry.removeClass = Wasabi.Utils.removeClass.bind(null, container);

  /*
   * arrange and style
   */
  nameWrapper.innerHTML = entry._name;
  container.appendChild(nameWrapper);

  /*
   * comments (if they're there)
   */
  if(entry._comments){
    commentWrapper.innerHTML = entry._comments;
    entry.dom.getComments = Wasabi.getter(commentWrapper);
  }
});
