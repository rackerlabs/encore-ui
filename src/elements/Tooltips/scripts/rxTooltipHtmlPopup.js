angular.module('encore.ui.elements')

.directive('rxTooltipHtmlPopup', function () {
    return {
        restrict: 'A',
        scope: { contentExp: '&' },
        templateUrl: 'templates/rxTooltip-html-popup.html'
    };
});
