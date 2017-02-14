angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxNotifications
 * @restrict E
 * @scope
 * @description
 * Displays all messages in a stack.
 *
 * @param {String=} [stack='page'] The message stack to associate with
 *
 * @example
 * <pre>
 * <rx-notifications stack="myCustomStack"></rx-notifications>
 * </pre>
 */
.directive('rxNotifications', function (rxNotify) {
    return {
        scope: {
            stack: '@?'
        },
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/rxNotifications.html',
        controller: function ($scope) {
            /**
             * Calls rxNotify service to remove a message from a stack
             * @param {Object} message The message object to remove.
             */
            $scope.dismiss = function (message) {
                rxNotify.dismiss(message);
            };
        },
        link: function (scope) {
            var stack = scope.stack || 'page';

            // watch the stack for updates
            scope.$watch(function () {
                return rxNotify.stacks[stack];
            }, function (data) {
                scope.messages = data;
            });

            scope.loading = true;
        }
    };
});
