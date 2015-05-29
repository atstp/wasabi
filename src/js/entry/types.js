/**
 * this adds
 *
 *   `entry._type`      a string identifying the type of entry
 *   `entry._filetypes` for files, a list of css-friendly names
 *                      based on the file's extenstions
 *
**/
Wasabi.Entry.addPlugin('init:types', function(entry){

  var types = [
        {
          type: 'executable',
          matcher: /\*$/
        },{
          type: 'directory',
          matcher: /\/$/
        },{
          type: 'symlink',
          matcher: /@$/
        },{
          type: 'file',
          matcher: /./
        }
      ];

  var filetypes = entry._name             // the entry's extensions
                    .replace(/^\./, '')
                    .match(/\.([a-zA-Z]+)(?=(\.|$))/g) || [];

  types.every(function(item){
    if(entry._pathString.match(item.matcher)){
      entry._type = item.type;
      return false;
    }
    return true;
  });

  /**
   *
   * attach the extenstion for files
   *
  **/

  if( entry._type === 'file' ||
      entry._type === 'executable' ){

    for(var i=0; i < filetypes.length; i++){ // make them css friendly
      filetypes[i] = filetypes[i].replace(/[^-a-z_A-Z]/g, '');
    }

    entry._filetypes = filetypes;            // set it

  }

});

