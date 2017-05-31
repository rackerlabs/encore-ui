angular.module('encore.ui.utilities')
/**
 * @ngdoc directive
 * @name elements.directive:rxModalTransclude
 * @description
 * Element for modal transclude
 */
.directive('rxModalTransclude', function () {
    return {
        link: function ($scope, $element, $attrs, controller, $transclude) {
            $transclude($scope.$parent, function (clone) {
                $element.empty();
                $element.append(clone);
            });
        }
    };
});
