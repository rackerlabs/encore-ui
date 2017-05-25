angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxTooltipHtmlPopoup
 * @description
 * Element for tooltips html popup
 */
.directive('rxTooltipHtmlPopup', function () {
    return {
        restrict: 'A',
        scope: { contentExp: '&' },
        templateUrl: 'templates/rxTooltip-html-popup.html'
    };
});
