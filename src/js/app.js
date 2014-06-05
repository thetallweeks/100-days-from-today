(function() {
  'use strict';

  // Declare app level module which depends on filters, and services
  var app = angular.module('app', [
    'ngRoute'
  ]);

  app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.when(
        '/', {
          templateUrl: 'partials/main.html',
          controller: 'app.mainController'
        }
      );

      $routeProvider.otherwise({
        redirectTo: '/'
      });
    }
  ]);
})();