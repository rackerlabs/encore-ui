angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxTooltipHtml
 * @description
 * Element for tooltips html
 */
.directive('rxTooltipHtml', function ($rxTooltip) {
    return $rxTooltip('rxTooltipHtml', 'rxTooltip', 'mouseenter', {
        useContentExp: true
    });
});
