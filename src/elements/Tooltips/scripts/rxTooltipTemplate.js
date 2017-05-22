angular.module('encore.ui.elements')

.directive('rxTooltipTemplate', function($rxTooltip) {
  return $rxTooltip('rxTooltipTemplate', 'rx-tooltip', 'mouseenter', {
    useContentExp: true
  });
});
