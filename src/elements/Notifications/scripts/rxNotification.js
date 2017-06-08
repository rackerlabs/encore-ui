angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxNotification
 * @restrict E
 * @scope
 * @description
 * Display a static message with styling taken from `rx-notifications`.
 *
 * @param {String=} [type='info'] The type of notification (e.g. 'warning', 'error')
 *
 * @example
 * <pre>
 * <rx-notification type="warning">This is a message!</rx-notification>
 * </pre>
 */
.directive('rxNotification', function (rxNotify) {
    return {
        scope: {
            type: '@'
        },
        transclude: true,
        restrict: 'E',
        templateUrl: 'templates/rxNotification.html',
        link: {
            // Transclude returns a jqLite object of the content in the directive pre transclusion into the template.
            pre: function (scope, el, attrs, ctrl, transclude) {
                if (!_.isEmpty(attrs.stack)) {
                    transclude(function (clone) {
                        rxNotify.add(clone.text(), {
                            type: attrs.type,
                            stack: attrs.stack
                        });
                    });
                    el.remove();
                }
            }
        }
    };
});
