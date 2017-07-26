angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxTooltipClasses
 * @description
 * Element for tooltip classes.
 */
.directive('rxTooltipClasses', function ($rxPosition) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            // need to set the primary position so the
            // arrow has space during position measure.
            // rxTooltip.positionTooltip()
            if (scope.placement) {
                // There are no top-left etc... classes
                // in TWBS, so we need the primary position.
                var position = $rxPosition.parsePlacement(scope.placement);
                element.addClass(position[0]);
            }

            if (scope.popupClass) {
                element.addClass(scope.popupClass);
            }

            if (scope.animation) {
                element.addClass(attrs.tooltipAnimationClass);
            }
        }
    };
});
