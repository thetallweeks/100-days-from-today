(function () {
  'use strict';

    var controller = function($scope, parseInputService, $filter) {

        var dateFilter = $filter('date');

        $scope.submit = function() {
            var input = parseInputService.parse($scope.input);
            var startDate = createStartDate(input[4]);
            var count = getCount(input);
            var modifier = input[2];
            var newDate = modifyDate(count, startDate, modifier);
            $scope.value = dateFilter(newDate, 'longDate');
        };
    };

    function getCount(input) {
        return parseInt(input[1]);
    }

    function createStartDate(start) {
        var startDate = new Date();
        if(start === 'tomorrow') {
            startDate.setDate(startDate.getDate() + 1);
        } else if (start === 'yesterday') {
            startDate.setDate(startDate.getDate() - 1);
        }
        return startDate;
    }

    function modifyDate(count, startDate, modifier) {
        var newDate = new Date();
        modifier = modifier.split('s')[0];
        if(modifier === 'year') {
            newDate.setYear(startDate.getFullYear() + count);
        } else if (modifier === 'month') {
            newDate.setMonth(startDate.getMonth() + count);
        } else if (modifier === 'week') {
            newDate.setDate(startDate.getDate() + count * 7);
        } else {
            newDate.setDate(startDate.getDate() + count);
        }
        return newDate;
    }

    controller.$inject = [
        '$scope',
        'parseInputService',
        '$filter'
    ];
    angular.module('app').controller('inputController', controller);

})();