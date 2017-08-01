angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxTabset
 * @restrict EA
 * @requires utilities.controller:rxTabsetController
 * @description
 * Element for creating tabs.
 */
.directive('rxTabset', function () {
    return {
        restrict: 'EA',
        transclude: true,
        replace: true,
        scope: true,
        controller: 'rxTabsetController',
        templateUrl: 'templates/rxTabset.html'
    };
});
