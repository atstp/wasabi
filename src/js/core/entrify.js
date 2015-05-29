Wasabi.entrify = function(sourceString, commentChar){

  sourceString = sourceString.trim();

  var lines = sourceString.split(/\r?\n/); // make it an array
                                           //   1) to clean any front-matter
                                           //   2) rejoin with '\n' later
  var entryStrings = [];                   // holds the future entries
  var comment = new RegExp('^\\s*(' + commentChar + ' ?|$)');
  var tmpLine = '';
  var parsed = {
    comments: [], // for leading comments in the project
    entries: []   // instances of Wasabi.Entry
  };


  /**
   * the indentedList function breakes entries that look like:
   *
   * ```
   * some/
   *   path
   *   file.txt # comments aobut file.txt
   * some/
   *    dir/
   *      # comments about `some/dir/`
   *      # it's a directory for organizing files
   * ```
   * into an array of strings for consumption by Wasabi.Entry
  **/
  function indentedList(source, comment){

    var isCommentLine = new RegExp('^(\\s+' + comment + ' ?|$)'); // matches comment lines
    var trailingComment = new RegExp('\\s*' + comment + '.*$');   // captures the comment to $
    var emptyLine = /^\s*$/;
    var lines = source.split(/\n/);  // an array of lines is easier to work with
    var indentUnit = null;           // holds the unit of indentation; set soon
    var indentMatcher = null;        // set later to determine the depth
    var currentEntry = '';           // keeping track of the entry under construction
    var cursorPath = [];             // tracks parent dirs
    var indentDepth = 0;             // tracks depth
    var line = lines[0];             // for the current line
    var entries = [];                // for collecting entries
    var i = 0;

    /**
     *  figure out and set the indent value.
     *  assumes the first line isn't indented; it shouldn't be.
    **/
    for(i=1;i<lines.length;i++){                // starting at the second line, move forward
      if(!lines[i].match(isCommentLine) &&      // find the first line that's not a comment
         !lines[i].match(emptyLine)) {          // and not empty
        indentUnit = lines[i].match(/^\s+/)[0]; // use that as the indentation unit
        break;                                  // stop looking
      }
    }

    indentMatcher = new RegExp('^' + indentUnit + '');


    /**
     *
     * start building entries
     *
    **/
    for(i=0;i<lines.length;i++){
      line = lines[i];

      if(line.match(emptyLine)) { continue; } // if it's blank

      if(!line.match(isCommentLine)){ // if it's an entry

        if(currentEntry.length > 0){  // check if a current entry is under construction
          entries.push(currentEntry); // if so, save it (only useful for the first)
        }
        currentEntry = '';            // and start from scratch

        // now `line` starts to get cut up
        indentDepth = 0;
        while(line.match(indentMatcher)) {        // every time indentation is found
          line = line.replace(indentMatcher, ''); // remove it
          indentDepth++;                          // and increase the depth
        }

        // just for a second, set the entry to the comment
        currentEntry = (line.match(trailingComment) || [comment])[0];

        cursorPath.length = indentDepth;
        cursorPath.push(line.replace(trailingComment, '').trim());

        currentEntry = cursorPath.join('') + ' ' + currentEntry;


      } else {
        currentEntry += '\n' + line.replace(isCommentLine, '');
      }
    }
    entries.push(currentEntry); // and the last one

    return entries;
  }


  /**
   * detailedList breakes entries that look like:
   *
   * ```
   * some/path
   * some/file.txt # comments aobut file.txt
   * some/dir/
   *   comments about `some/dir/`
   *   it's a directory for organizing files
   * ```
   *
   * into an array of strings for consumption by Wasabi.Entry
  **/
  function detailedList(source, comment){

    var entries = [];               // for collecting entries
    var lines = source.split('\n'); // an array is easier to work with
    var line = lines[0];            // for the current line
    var currentEntry = '';          // the entry under construction

    var entryLine = /^\S/;                       // for /r(e)(a)d\2b(l\1n\1s{2}|ility)/
    var alreadyCommented = new RegExp(comment);  // same


    for(var i=0;i<lines.length;i++){
      line = lines[i];


      if(line.match(entryLine)){
        if(currentEntry.length){
          entries.push(currentEntry);
        }

        currentEntry = line;

        if(!currentEntry.match(alreadyCommented)) {
          currentEntry += ' ' + comment + ' ';
        }

      } else {
        currentEntry += '\n' + line;
      }
    }
    entries.push(currentEntry); // get the last one

    return entries;
  }

  while(lines[0].match(comment)){
    tmpLine = lines.shift();
    tmpLine = tmpLine.replace(comment, '').trim();
    parsed.comments.push(tmpLine);
  }

  parsed.comments = parsed.comments.join('\n');
  lines = lines.join('\n');

  /**
   *  a quick heuristic to differentiate the two formats:
   *
   *  it's a detailed list if:
   *  ```
   *  some/path       # a line ends with a newline
   *  some/other-path # and the next starts with a non-whitespace
   *  ```
   *
   *  with indented lists, that won't happen:
   *  ```
   *  some/
   *    path        # a line ends with a newline
   *    other-path  # this and *every* other line will start with a whitespace
   *  ```
  **/
  if(lines.match(/\n\S/m)) {
    entryStrings = detailedList(lines, commentChar);
  } else {
    entryStrings = indentedList(lines, commentChar);
  }

  for( var entry in entryStrings) {
    parsed.entries.push(new Wasabi.Entry(entryStrings[entry]));
  }

  return parsed;
};
