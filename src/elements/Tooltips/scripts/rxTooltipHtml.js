angular.module('encore.ui.elements')

.directive('rxTooltipHtml', function($rxTooltip) {
  return $rxTooltip('rxTooltipHtml', 'rx-tooltip', 'mouseenter', {
    useContentExp: true
  });
});
