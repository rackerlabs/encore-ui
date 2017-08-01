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
 * @param {Expression=} dismissHook An expression to execute on dismiss of the
 * notification.  If defined, a dismiss button will be rendered for the
 * notification. Otherwise, no dismiss button will be rendered.  (Best if used
 * in conjunction with the rxNotifications directive and the rxNotify service.)
 *
 * @example
 * <pre>
 * <rx-notification type="warning">This is a message!</rx-notification>
 * </pre>
 */
.directive('rxNotification', function (rxNotify) {
    return {
        scope: {
            type: '@',
            loading: '=',
            dismissHook: '&'
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
            },
            post: function (scope, el, attrs) {
                scope.isDismissable = !scope.loading && !angular.isUndefined(attrs.dismissHook);
            }
        }
    };
});
