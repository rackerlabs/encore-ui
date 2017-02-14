angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxSpinner
 * @restrict A
 * @scope
 * @description
 * Renders a spinner animation on the provided element given the 'toggle' attribute is truthy
 *
 * @param {String} size Controls the size of the spinner.  The options are default (no size specified),
 * mini, small, large and extra-large
 * @param {Boolean} toggle When true, the spinner will display
 * @param {Boolean} rxSpinner When present, adds an extra class to the spinner depicting the color
 */
.directive('rxSpinner', function () {
    return {
        restrict: 'A',
        scope: {
            toggle: '=',
            rxSpinner: '@',
            size: '@'
        },
        link: function (scope, element) {
            scope.$watch('toggle', function (value) {
                var size = scope.size ? scope.size : '';
                var type = scope.rxSpinner ? scope.rxSpinner : '';
                if (value) {
                    element.prepend('<div class="rx-spinner ' + type + ' ' + size + '"></div> ');
                } else {
                    element.find('div').remove();
                }
            });
        }
    };
});
