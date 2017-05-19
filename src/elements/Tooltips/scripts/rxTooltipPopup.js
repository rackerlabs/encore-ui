angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxTooltipPopup
 * @description
 * Element for tooltips popup
 */
.directive('rxTooltipPopup', function () {
    return {
        restrict: 'A',
        scope: {
            content: '@'
        },
        templateUrl: 'templates/rxTooltip-popup.html'
    };
});
