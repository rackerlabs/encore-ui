angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxTooltipTemplate
 * @description
 * Element for tooltips template
 */
.directive('rxTooltipTemplate', function ($rxTooltip) {
    return $rxTooltip('rxTooltipTemplate', 'rxTooltip', 'mouseenter', {
        useContentExp: true
    });
});
