/* eslint-disable */
angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name elements.service:rxDebounce
 * @description
 * Element for debounce animation
 */
.factory('$$rxDebounce', function($timeout) {
    return function(callback, debounceTime) {
        var timeoutPromise;

        return function() {
            var self = this;
            var args = Array.prototype.slice.call(arguments);
            if (timeoutPromise) {
                $timeout.cancel(timeoutPromise);
            }

            timeoutPromise = $timeout(function() {
                callback.apply(self, args);
            }, debounceTime);
        };
    };
});
