angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxTabHeadingTransclude
 * @requires elements.directive:rxTab
 * @restrict A
 * @description
 * Element for transcluding tab heading.
 */
.directive('rxTabHeadingTransclude', function () {
    return {
        restrict: 'A',
        require: '^rxTab',
        link: function (scope, elm) {
            scope.$watch('headingElement', function (heading) {
                if (heading) {
                    elm.html('');
                    elm.append(heading);
                }
            });
        }
    };
});
