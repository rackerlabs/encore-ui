angular.module('demoApp')
.directive('rxStability', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/rx-stability.html',
        scope: {
            stability: '='
        },
        transclude: true,
        link: function (scope) {
            scope.tooltips = {
                'prototype': [
                    '<b>Unstable API</b>',
                    'Consistent functionality is not guaranteed.'
                ],
                'deprecated': [
                    '<b>Stop Using!</b>',
                    'This item will be removed in a future release.'
                ],
                'stable': [
                    '<b>Feature Complete</b>',
                    'This item is ready to use.'
                ]
            };
        }
    };
});
