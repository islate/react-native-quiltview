'use strict';

var SlateURI = {
  handler: null,

  openURI: function(uri: String) {
    if (!this.handler) {
      console.log('handler is null');
      return false;
    }

    var i = uri.indexOf("://");
    if (i == -1) {
      return false;
    }

    var j = uri.indexOf("/", i+3);
    if (j == -1) {
      return false;
    }

    var k = uri.indexOf("/", j+1);
    if (k == -1 || k == uri.length) {
      return false;
    }

    var scheme = uri.slice(0, i);
    var command = uri.slice(i+3, j);
    var params = uri.slice(j, uri.length);

    var js = "this.handler." + command + "Command('" + params + "')";
    try {
      eval(js);  
    }
    catch(e) {
      console.log("eval uri command exception: "+e);
    }
  }
};

module.exports = SlateURI;
