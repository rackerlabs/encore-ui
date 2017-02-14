angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxInfoPanel
 * @restrict E
 * @scope
 * @description
 * This renders a generic, pre-styled, info panel, with an optional title.
 *
 * @param {String} title Text to be displayed in the title area of the info panel
 * @example
 * <pre>
 *  <rx-info-panel panel-title="My title!">
 *        You can put whatever you like in here.
 *  </rx-info-panel>
 * </pre>
 */
.directive('rxInfoPanel', function () {
    return {
        templateUrl: 'templates/rxInfoPanel.html',
        restrict: 'E',
        transclude: true,
        scope: {
            panelTitle: '@',
        }
    };
});
