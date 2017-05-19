angular.module('encore.ui.elements')

.directive('rxTooltipTemplate', function($rxTooltip) {
  return $rxTooltip('rxTooltipTemplate', 'tooltip', 'mouseenter', {
    useContentExp: true
  });
});
