angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxTooltipHtmlPopup
 * @description
 * Element for tooltips html popup
 */
.directive('rxTooltipHtmlPopup', function () {
    return {
        restrict: 'A',
        scope: {
            contentExp: '&'
        },
        templateUrl: 'templates/rxTooltip-html-popup.html'
    };
});
