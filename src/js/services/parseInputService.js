(function() {
  'use strict';

  var service = function() {
    var serviceMembers = {
      parse: parse
    };

    function parse() {

    };

    return serviceMembers;
  }

  app.module('app').service('app.parseInputService', service);

})();