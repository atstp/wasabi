Wasabi.Utils = {

  addClass: function( el, newClasses ){
    var classList = el.getAttribute('class') || '',
        arrayOfClasses = newClasses.split(/ +/),
        tRex = new RegExp('\\b' + arrayOfClasses[0] + '\\b');

    for(var nc = 0; nc < arrayOfClasses.length; nc++){
      tRex = new RegExp('\\b' + arrayOfClasses[nc] + '\\b');
      if( !classList.match(tRex) ){
        classList += (' ' + arrayOfClasses[nc]);
      }
    }

    el.setAttribute('class', classList.replace(/ +/g, ' '));
  },

  removeClass: function( el, rmClasses ){
    var classList = el.getAttribute('class') || '',
        arrayOfClasses = rmClasses.split(/ +/),
        tRex = new RegExp('\b' + arrayOfClasses[0] + '\b');

    for(var nc = 0; nc < arrayOfClasses.length; nc++){
      tRex = new RegExp('\\b' + arrayOfClasses[nc] + '\\b');
      classList = classList.replace(tRex, '');
    }

    el.setAttribute('class', classList);
  },

  states: [
    ['open','closed'],
    ['visible','hidden'],
    ['enabled','disabled'],
    ['focused','unfocused'],
    ['unloaded','loading','loaded']
  ],

  classState: function( el, newState ){
    var states = Wasabi.Utils.states;
    for(var set=0;set < states.length; set++){
      if( states[set].indexOf(newState) > -1 ){
        Wasabi.Utils.removeClass(el, states[set].join(' '));
        Wasabi.Utils.addClass(el, newState);
      }
    }
  },

  getter: function(val){
    return function(){ return val; };
  },

  extend: function(base, extension){
    for(var item in extension) {
      if(item !== 'prototype'){
        base[item] = extension[item];
      }
    }
  },

  createEl: function(selector){
    var s = selector;

    var elName = s.match(/^[a-zA-Z0-9]+/);
    var classes = s.match(/\.[-_a-zA-Z0-9]+/g);
    var id = s.match(/#[-_a-zA-Z0-9]+/);
    var el = document.createElement(elName ? elName[0] : 'div');

    if(id) {
      el.id = id;
    }
    if(classes) {
      classes = classes.join(' ').replace(/\./g,'');
      Wasabi.Utils.addClass(el, classes);
    }

    return el;
  }
};

Wasabi.createEl = Wasabi.Utils.createEl;
Wasabi.getter = Wasabi.Utils.getter;
Wasabi.extend = Wasabi.Utils.extend;
