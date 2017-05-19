angular.module('encore.ui.elements')

.directive('rxTooltips', function($rxTooltips) {
  return $rxTooltips('rxTooltips', 'tooltip', 'mouseenter');
});
