angular.module('encore.ui.elements')

.directive('rxTooltipTemplate', function ($rxTooltip) {
    return $rxTooltip('rxTooltipTemplate', 'rxTooltip', 'mouseenter', {
        useContentExp: true
    });
});
