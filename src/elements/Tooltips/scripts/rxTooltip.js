angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxTooltip
 * @requires utilities.service:rxTooltip
 * @description
 * Element for Tooltips
 */
.directive('rxTooltip', function ($rxTooltip) {
    return $rxTooltip('rxTooltip', 'rxTooltip', 'mouseenter');
});
