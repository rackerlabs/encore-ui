angular.module('encore.ui.elements')

.directive('rxTooltip', function ($rxTooltip) {
    return $rxTooltip('rxTooltip', 'rxTooltip', 'mouseenter');
});
