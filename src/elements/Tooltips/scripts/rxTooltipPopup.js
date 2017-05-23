angular.module('encore.ui.elements')

.directive('rxTooltipPopup', function () {
    return {
        restrict: 'A',
        scope: { content: '@' },
        templateUrl: 'templates/rxTooltip-popup.html'
    };
});
