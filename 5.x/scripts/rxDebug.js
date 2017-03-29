angular.module('demoApp')
.directive('rxDebug', function ($routeParams) {
    return {
        restrict: 'E',
        transclude: true,
        template: '<div ng-if="isDebugging" ng-transclude></div>',
        link: function (scope) {
            scope.isDebugging = $routeParams.debug === 'true';
        }
    };
});
