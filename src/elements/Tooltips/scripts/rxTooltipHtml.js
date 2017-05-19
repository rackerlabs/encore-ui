angular.module('encore.ui.elements')

.directive('rxTooltipHtml', function($rxTooltip) {
  return $rxTooltip('rxTooltipHtml', 'tooltip', 'mouseenter', {
    useContentExp: true
  });
});
