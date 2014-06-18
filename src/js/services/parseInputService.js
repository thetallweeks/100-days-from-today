(function() {
  'use strict';

  var service = function() {
    var serviceMembers = {
      parse: parse
    };

    function parse(text) {
        return text.match(/(\d+|a)(?:\s+)(day|days|week|weeks|month|months|year|years)(?:\s+)(from|before|after)(?:\s+)(today|yesterday|tomorrow)/);
    }

    return serviceMembers;
  };

  angular.module('app').service('parseInputService', service);

})();