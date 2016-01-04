'use strict';

var { Actions } = require('react-native-router-flux');

var SlateURIHandler = {
  newsCommand: function(params: String) {
    if (params.length <= 1) {
      return false;
    }

    var i = params.indexOf("/", 1);
    if (i == -1 || i == params.length) {
      return false;
    }

    var title = params.slice(1, i);
    var url = params.slice(i+1, params.length);

    Actions.news({"url": url, "title": title});
  }
};

module.exports = SlateURIHandler;
