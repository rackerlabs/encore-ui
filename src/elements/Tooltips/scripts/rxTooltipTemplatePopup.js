angular.module('encore.ui.elements')

.directive('rxTooltipTemplatePopup', function() {
  return {
    restrict: 'A',
    scope: { contentExp: '&', originScope: '&' },
    templateUrl: 'templates/rxTooltip-template-popup.html'
  };
});
