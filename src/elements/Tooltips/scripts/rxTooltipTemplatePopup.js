angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxTooltipTemplatePopup
 * @description
 * Element for tooltips template popup
 */
.directive('rxTooltipTemplatePopup', function () {
    return {
        restrict: 'A',
        scope: {
            contentExp: '&',
            originScope: '&'
        },
        templateUrl: 'templates/rxTooltip-template-popup.html'
    };
});
