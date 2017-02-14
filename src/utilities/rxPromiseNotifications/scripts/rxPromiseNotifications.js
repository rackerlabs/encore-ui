angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:rxPromiseNotifications
 * @description Manages displaying messages for a promise.
 *
 * It is a common pattern with API requests that you show a loading message when an action is requested, followed
 * by either a _success_ or _failure_ message depending on the result of the call.  `rxPromiseNotifications` is the
 * service created for this pattern.
 *
 * @example
 * <pre>
 * rxPromiseNotifications.add($scope.deferred.promise, {
 *     loading: 'Loading Message',
 *     success: 'Success Message',
 *     error: 'Error Message'
 * });
 * </pre>
 */
.factory('rxPromiseNotifications', function (rxNotify, $rootScope, $q, $interpolate) {
    var scope = $rootScope.$new();

    /**
     * Removes 'loading' message from stack
     * @private
     * @this Scope used for storing messages data
     */
    var dismissLoading = function () {
        if (this.loadingMsg) {
            rxNotify.dismiss(this.loadingMsg);
        }
    };

    /**
     * Shows either a success or error message
     * @private
     * @this Scope used for storing messages data
     * @param {String} msgType Message type to be displayed
     * @param {Object} response Data that's returned from the promise
     */
    var showMessage = function (msgType, response) {
        if (msgType in this.msgs && !this.isCancelled) {
            // convert any bound properties into a string based on obj from result
            var exp = $interpolate(this.msgs[msgType]);
            var msg = exp(response);

            var msgOpts = {
                type: msgType
            };

            // if a custom stack is passed in, specify that for the message options
            if (this.stack) {
                msgOpts.stack = this.stack;
            }

            rxNotify.add(msg, msgOpts);
        }
    };

    /**
     * Cancels all messages from displaying
     * @private
     * @this Scope used for storing messages data
     */
    var cancelMessages = function () {
        this.isCancelled = true;
        this.deferred.reject();
    };

    /**
     * @name add
     * @ngdoc method
     * @methodOf utilities.service:rxPromiseNotifications
     * @description
     * @param {Object} promise
     * The promise to attach to for showing success/error messages
     * @param {Object} msgs
     * The messages to display. Can take in HTML/expressions
     * @param {String} msgs.loading
     * Loading message to show while promise is unresolved
     * @param {String=} msgs.success
     * Success message to show on successful promise resolve
     * @param {String=} msgs.error
     * Error message to show on promise rejection
     * @param {String=} [stack='page']
     * What stack to add to
     */
    var add = function (promise, msgs, stack) {
        var deferred = $q.defer();

        var uid = _.uniqueId('promise_');

        scope[uid] = {
            isCancelled: false,
            msgs: msgs,
            stack: stack
        };

        // add loading message to page
        var loadingOpts = {
            loading: true
        };

        if (stack) {
            loadingOpts.stack = stack;
        }

        if (msgs.loading) {
            scope[uid].loadingMsg = rxNotify.add(msgs.loading, loadingOpts);
        }

        // bind promise to show message actions
        deferred.promise
            .then(showMessage.bind(scope[uid], 'success'), showMessage.bind(scope[uid], 'error'))
            .finally(dismissLoading.bind(scope[uid]));

        // react based on promise passed in
        promise.then(function (response) {
            deferred.resolve(response);
        }, function (reason) {
            deferred.reject(reason);
        });

        // if page change, cancel everything
        $rootScope.$on('$routeChangeStart', cancelMessages.bind(scope[uid]));

        // attach deferred to scope for later access
        scope[uid].deferred = deferred;

        return scope[uid];
    };

    return {
        add: add
    };
});
