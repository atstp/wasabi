/**
 *
 * this adds:
 *
 * entry._comments     a string with the comments for entry entry
 * entry._path         an array version of the entry's path
 * entry._pathString   the string representation of the entry's path
 *
**/
Wasabi.Entry.addPlugin('init:initialize', function(entry){
  var comment = entry.options.commentChar;
  var commentMatcher = new RegExp(entry.options.commentChar + '(.|[\n\r])*', 'm');
  var commentRemover = new RegExp(entry.options.commentChar + ' ?');
  var pathMatcher = new RegExp('^[^' + comment + ']+'); // antything until (not including) a comment
  var typeIndicator = new RegExp('[*@' + entry.options.dirChar + ']$'); // removing [@*/]

  // comments
  var comments = entry._source.match(commentMatcher);
  entry._comments = comments ? comments[0].replace(commentRemover, '') : '';

  // path
  var path = entry._source.match(pathMatcher);
  if( !path ){ throw new Error('couldn\'t pull path from = ' + entry._source); }
  entry._pathString = path = path[0].trim();         // set `entry._pathString`
  entry._path = entry._pathString                    // set `entry._path`
                  .replace(typeIndicator, '')
                  .split( entry.options.dirChar );
  // name
  entry._name = entry._path[entry._path.length - 1]; // set `entry._name`
});
