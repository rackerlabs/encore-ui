angular.module('encore.ui.elements')

.directive('rxTooltipHtml', function ($rxTooltip) {
    return $rxTooltip('rxTooltipHtml', 'rxTooltip', 'mouseenter', {
        useContentExp: true
    });
});
