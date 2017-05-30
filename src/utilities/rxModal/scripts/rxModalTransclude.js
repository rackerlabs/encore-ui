angular.module('encore.ui.utilities')

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
