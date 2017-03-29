/**
 * @deprecated
 * @description
 * This directive is obsolete and will be phased out in favor of <rx-example>
 */
angular.module('demoApp')
// Used for drawing the Demo and Markup tabs in the styleguide
.directive('rxStyleguide', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/rx-styleguide.html',
        scope: {
            codeUrl: '@'
        }
    };
});
