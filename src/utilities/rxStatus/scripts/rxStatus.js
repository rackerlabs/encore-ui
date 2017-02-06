angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:rxStatus
 * @description
 *
 * Manages notifications for rxNotify with an abstracted set of functions for
 * ease of use.
 *
 * This service is provided as a compliment to {@link elements}.  It abstracts out
 * some of the raw functionality provided by `rxNotify` to make the addition and
 * removal of single messages easier.
 *
 * ## Preparation
 *
 * In order to use the `rxStatus` service, one has to instantiate it with a proper
 * `$scope` object to keep track of a running state. `rxNotify` indirectly makes
 * use of the `$scope` variable when a message can be auto-dismissed.  In order
 * to keep the interface for the wrapper functions coherent, the `$scope` variable
 * must be provided before use.  This can be accomplished as follows:
 *
 * <pre>
 * rxStatus.setScope($scope);
 * </pre>
 *
 * ## Success cases
 *
 * The `rxStatus` service is provided as a wrapper to `rxNotify`.  As such, the
 * rxStatus types supported by `rxNotify` are still used and have been wrapped into
 * utility functions.  For example, on page load it is usually necessary to inform
 * the user of pending data retrieval.  This can be accomplished by:
 *
 * <pre>
 * rxStatus.setLoading('Retrieving users');
 * </pre>
 *
 * This will call `rxNotify` in the following manner:
 *
 * <pre>
 * rxNotify.add('Retrieving users', {
 *     stack: 'page',
 *     dismiss: [scope, 'loaded'],
 *     loading: true
 * });
 * </pre>
 *
 * Similarly, the following call using the `rxStatus` service:
 *
 * <pre>
 * rxStatus.setSuccess('Successfully deleted questionable ' +
 *     'browsing history');
 * </pre>
 *
 * results in a call to `rxNotify` as such:
 *
 * <pre>
 * rxNotify.add('Successfully deleted questionable ' +
 *     'browsing history',
 *     {
 *         stack: 'page',
 *         show: 'next'
 *      }
 * );
 * </pre>
 *
 * Note: For `success` and `error` messages, the `repeat` attribute is set to
 * false. Messages of `success` will also automatically timeout after 5 seconds.
 * Both of these defaults were design decisions made at this level for usability
 * and consistency across all Encore products.
 *
 * Each of the wrapper functions to the different `rxNotify` message types support
 * receiving an `options:{}` parameter that can override defaults for the respective
 * wrapper. For example, instead of showing a success message on next route change,
 * it can be shown immediately:
 *
 * <pre>
 * rxStatus.setSuccess('Please show immediately', {
 *     show: 'immediate'
 * });
 * </pre>
 *
 * Please note that the `options` are of the same type as one would provide to
 * `rxNotify`.  This should allow for maximum flexibility when necessary.
 * However, as a bonus, some common behaviours expected to be overriden have
 * been provided as their own wrapper functions.  For example:
 *
 * <pre>
 * rxStatus.setSuccessImmediate('Please show immediately')
 * </pre>
 *
 * is the equivalent of calling `rxStatus.setSuccess()` with the
 * `{ show: 'immediate' }` parameter.  Please note, there isn't much fault
 * checking in place, so the following behaviour although permitted, is not
 * advised:
 *
 * <pre>
 * rxStatus.setSuccessImmediate('Please show immediately', {
 *     show: 'next'
 * });
 * </pre>
 *
 * ## Error cases
 *
 * The `{ type: 'error' }` wrapper is a unique one.  It allows for a string to be
 * passed as an error message, just like the wrappers before.  For example:
 *
 * <pre>
 * rxStatus.setError('This is an error!');
 * </pre>
 *
 * It also allows for a specialized template to be specified as the error string
 * with an `object:{}` as the second parameter containing the replacements for
 * the template in the error string.  If in a proper format, the object can be
 * automatically parsed using an `rxErrorFormatter` and displayed to the user.
 * For example:
 *
 * <pre>
 * rxStatus.setError(
 *     'Failed loading browsing history: ${message}',
 *     {
 *         message: 'User has previously cleared their history!'
 *     }
 * );
 * </pre>
 *
 * Please note that the replacement variable `${message}` in the error string
 * maps one-to-one to the keys provided in the the error object.  One can specify
 * any number of template variables to replace.  Not providing a balanced list
 * of variables and their replacements will result in a
 * `ReferenceError: <replacement> is not defined`.
 *
 * The following wrapper functions are available today.  Their names should be
 * self explanatory:
 *
 * * setLoading
 * * setSuccess
 * * setSuccessNext
 * * setSuccessImmediate
 * * setWarning
 * * setInfo
 * * setError
 * * complete &rarr; setSuccessImmediate
 *
 * The following are used to programmatically remove notifications from the
 * screen:
 *
 * * dismiss
 * * clear
 *
 * # Utilities
 *
 * The `rxStatus` service requires that one provide a `$scope` object to keep
 * tracking of state before any of the wrapper functions can be utilized. Since
 * it is expected that almost all pages will make use of notifications, one can
 * place the repeated setup of the `rxStatus` service in a page load event handler.
 * This will allow all pages to gain an already setup `rxStatus` service for
 * immediate use.  For example:
 *
 * <pre>
 * .run(function ($rootScope, rxStatus {
 *     $rootScope.$on('$routeChangeSuccess', function () {
 *         rxStatus.setScope($rootScope);
 *     });
 * });
 * </pre>
 *
 * Although hidden away in the app's bootstrap code, the above makes for a less
 * repetitive call to `rxStatus.setScope()` at the beginning of each use.
 *
 */
.service('rxStatus', function ($rootScope, rxNotify, rxErrorFormatter) {
    var stack = 'page';
    var scope;
    var status = {
        LOADING: function () {
            return {
                loaded: false,
                loading: true,
                prop: 'loaded'
            };
        },
        SUCCESS: function () {
            return {
                loaded: true,
                loading: false,
                success: true,
                type: 'success',
                prop: 'loaded',
                repeat: false,
                timeout: 5
            };
        },
        ERROR: function () {
            return {
                loaded: true,
                loading: false,
                success: false,
                type: 'error',
                prop: 'loaded',
                repeat: false
            };
        },
        WARNING: function () {
            return {
                loaded: true,
                loading: false,
                success: true,
                type: 'warning',
                prop: 'loaded'
            };
        },
        INFO: function () {
            return {
                loaded: true,
                loading: false,
                success: true,
                type: 'info',
                prop: 'loaded'
            };
        },
        CLEAR: function () {
            return {
                loading: false,
                prop: 'loaded'
            };
        },
    };

    // States that specify a type cannot be dismissed (have to be approved by user)
    var isDismissable = function (state) {
        return _.has(state, 'loading') && !_.has(state, 'type');
    };

    // Given an options object, check if scope[options.prop] exists,
    // and set it to `val` if so. `val` defaults to true if not
    // supplied
    var setDoneLoadingProp = function (options, val) {
        val = _.isUndefined(val) ? true : val;
        if (_.has(options, 'prop') && _.has(scope, options.prop)) {
            scope[options.prop] = val;
        }
    };

    // If the stack is overridden in a given controller, it needs to be refreshed
    // for any subsequent controllers since a Service is loaded by Angular only once
    $rootScope.$on('$routeChangeStart', function () {
        status.setStack('page');
    });

    status.setStack = function (s) {
        stack = s;
    };

    status.setScope = function ($scope) {
        scope = $scope;
        scope.loaded = false;
    };

    status.setStatus = function (msg, state) {
        state.stack = stack;

        if (!_.has(state, 'dismiss') && isDismissable(state)) {
            // state.prop defaults to 'loaded', per status.LOADING
            // However, if a promise is passed in, we use the $resolved
            // property instead of the default loaded or passed in value
            if (_.has(scope[state.prop], '$resolved')) {
                state.prop = state.prop + '.$resolved';
            }
            state.dismiss = [scope, state.prop];
        }

        if (state.type === 'success') {
            state.show = state.show || 'next';
        }

        setDoneLoadingProp(state, _.has(state, 'loading') ? !state.loading : true);
        scope.status = state;
        return rxNotify.add(msg, state);
    };

    status.setLoading = function (msg, options) {
        options = _.defaults(options ? options : {}, status.LOADING());

        // prop is the variable on scope that stores whether this loading is complete
        // By default is uses $scope.loaded, but individual messages should be able to
        // use their own property
        var prop = options.prop;
        if (!_.has(scope, prop)) {
            scope[prop] = false;
        }
        return status.setStatus(msg || '', options);
    };

    status.setSuccess = function (msg, options) {
        options = _.defaults(options ? options : {}, status.SUCCESS());
        return status.setStatus(msg || '', options);
    };

    status.setSuccessNext = function (msg, options) {
        var next = { 'show': 'next' };
        options = _.defaults(options ? options : {}, next);
        return status.setSuccess(msg, options);
    };

    status.setSuccessImmediate = function (msg, options) {
        var immediate = { 'show': 'immediate' };
        options = _.defaults(options ? options : {}, immediate);
        return status.setSuccess(msg, options);
    };

    status.setWarning = function (msg, options) {
        options = _.defaults(options ? options : {}, status.WARNING());
        return status.setStatus(msg, options);
    };

    status.setInfo = function (msg, options) {
        options = _.merge(options ? options : {}, status.INFO());
        return status.setStatus(msg, options);
    };

    /*
     * `msg` - can be a plain string, or it can be a string template with ${message} in it
     * `error` - An optional error object. Should have a `message` or `statusText` property
     * `options` - A usual options object
     */
    status.setError = function (msg, error, options) {
        options = _.defaults(options ? options : {}, status.ERROR());
        msg = rxErrorFormatter.buildErrorMsg(msg || '', error);
        return status.setStatus(msg, options);
    };

    status.complete = function (options) {
        return status.setSuccessImmediate('', _.defaults(options ? options : {}, status.SUCCESS()));
    };

    status.dismiss = function (obj) {
        scope.status = status.CLEAR();
        return rxNotify.dismiss(obj);
    };

    status.clear = function (st) {
        scope.status = status.CLEAR();
        return rxNotify.clear(st || stack);
    };

    return status;
})

/**
 * @deprecated
 * Please use rxStatus instead. This item will be removed on the 4.0.0 release.
 * @ngdoc service
 * @name utilities.service:Status
 * @requires utilities.service:rxStatus
 */
.service('Status', function (rxStatus) {
    console.warn (
        'DEPRECATED: Status - Please use rxStatus. ' +
        'Status will be removed in EncoreUI 4.0.0'
    );
    return rxStatus;
});
