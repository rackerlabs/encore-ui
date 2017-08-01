angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:rxNotify
 * @description
 * Manages page messages for an application.
 *
 * ## rxNotify
 * The rxNotify component provides status message notifications on a page.
 *
 * There may be situations where you will need to use the styling/markup of
 * rxNotify's messaging queue in status messages of your own - for example,
 * a modal window which asks if you want to delete an object, with the
 * appropriate warning or error flags. If this is the case, we recommend using
 * the {@link elements.directive:rxNotification rxNotification} directive in your views.  Please note, this
 * differs from {@link elements.directive:rxNotifications rxNotifications} (plural).
 *
 * The type attribute can be any type supported by `options.type` for the `rxNotify.add()` function in
 * the {@link utilities.service:rxNotify rxNotify} service.
 *
 * ## Directives
 * * {@link elements.directive:rxNotification rxNotification}
 * * {@link elements.directive:rxNotifications rxNotifications}
 *
 * # Use Cases
 *
 * ## Add Notification in Loading State
 * <pre>
 * rxNotify.add('Loading', {
 *     loading: true,
 *     dismiss: [$scope, 'loaded']
 * });
 * var apiCallback = function (data) {
 *     $scope.loaded = true;
 *     // do something with the data
 * };
 * </pre>
 *
 * ## Show Notification on Variable Change
 * <pre>
 * $scope.loaded = false;
 * rxNotify.add('Content Loaded', {
 *     show: [$scope, 'loaded']
 * });
 * $timeout(function () {
 *     $scope.loaded = true;
 * }, 1500);
 * </pre>
 *
 * ## Dismiss Notification on Variable Change
 * <pre>
 * $scope.loaded = false;
 * rxNotify.add('Content Loaded', {
 *     dismiss: [$scope, 'loaded']
 * });
 * $timeout(function () {
 *     $scope.loaded = true;
 * }, 1500);
 * </pre>
 *
 *
 * ## Using a Custom Stack
 * Say you want to create a stack for a login form.
 * Let's call the stack 'loginForm' to reference in our code.
 *
 * **Controller**
 * <pre>
 * rxNotify.add('Username required', {
 *     type: 'error',
 *     stack: 'loginForm'
 * });
 * </pre>
 *
 * **View**
 * <pre>
 * <rx-notifications stack="loginForm"></rx-notifications>
 * </pre>
 *
 * # Stacks
 *
 * Stacks are just separate notification areas. Normally, all messages created will go to the `page` stack, which
 * should be displayed at the top of the page. The `page` stack is used for page-level messages.
 *
 * ## Using the Page Stack
 *
 * The default notification stack is added by default to the `rxPage` template (see {@link rxApp}), so it should be
 * ready to use without any work (unless your app uses a custom template).  The
 * {@link elements.directive:rxNotifications rxNotifications} directive will gather all notifications for a particular
 * stack into a single point on the page.  By default, this directive will collect all notifications in the `page`
 * stack.
 *
 * <pre>
 * <rx-notifications></rx-notifications>
 * </pre>
 *
 * See {@link elements.directive:rxNotification rxNotification} for more details.
 *
 * ## Using a Custom Stack
 *
 * You can also create custom stacks for specific notification areas. Say you have a form on your page that you want to
 * add error messages to. You can create a custom stack for this form and send form-specific messages to it.
 *
 * Please see the *Custom Stack* usage example in the Notifications [demo](../#/elements/Notifications).
 *
 * ## Adding an `rxNotification` to the Default Stack
 *
 * If you need to add a notification via your Angular template, just set the `stack` parameter on the opening
 * `<rx-notification>` tag.  This will allow the notification to be added via the `rxNotify.add()` function.
 *
 * <pre>
 * <rx-notification type="error" stack="page">
 *   This is an error message being added to the "page" stack with <strong>Custom</strong> html.
 * </rx-notification>
 * </pre>
 *
 * ## Adding a New Message Queue via `rxNotify`
 *
 * To add a new message to a stack, inject `rxNotify` into your Angular function and run:
 *
 * <pre>
 * rxNotify.add('My Message Text');
 * </pre>
 *
 * This will add a new message to the default stack (`page`) with all default options set.  To customize options, pass
 * in an `object` as the second argument with your specific options set:
 *
 * <pre>
 * rxNotify.add('My Message Text', {
 *   stack: 'custom',
 *   type: 'warning'
 * });
 * </pre>
 *
 * ## Dismissing a message programatically
 *
 * Most messages are dismissed either by the user, a route change or using the custom `dismiss` property.  If you need
 * to dismiss a message programmaticaly, you can run `rxNotify.dismiss(message)`, where *message* is the `object`
 * returned from `rxNotify.add()`.
 *
 * ## Clearing all messages in a stack
 *
 * You can clear all messages in a specific stack programmatically via the `rxNotify.clear()` function. Simply pass in
 * the name of the stack to clear:
 *
 * <pre>
 * rxNotify.clear('page');
 * </pre>
 *
 */
.service('rxNotify', function ($interval, $rootScope) {
    var defaultStack = 'page';
    var stacks = {};

    // initialize a default stack
    stacks[defaultStack] = [];

    // array that contains messages to show on 'next' (when route changes)
    var nextQueue = [];

    var messageDefaults = {
        type: 'info',
        timeout: -1,
        loading: false,
        show: 'immediate',
        dismiss: 'next',
        ondismiss: _.noop,
        stack: 'page',
        repeat: true
    };

    /**
     * @function
     * @private
     * @description Adds a message to a stack
     *
     * @param {Object} message The message object to add.
     */
    var addToStack = function (message) {
        // if repeat is false, check to see if the message is already in the stack
        if (!message.repeat) {
            if (_.find(stacks[message.stack], { text: message.text, type: message.type })) {
                return;
            }
        }

        // if timeout is set, we should remove message after time expires
        if (message.timeout > -1) {
            dismissAfterTimeout(message);
        }

        // make sure there's actual text to add
        if (message.text.length > 0) {
            stacks[message.stack].push(message);
        }
    };//addToStack

    /**
     * @function
     * @private
     * @description
     * Sets a timeout to wait a specific time then dismiss message
     *
     * @param {Object} message The message object to remove.
     */
    function dismissAfterTimeout (message) {
        // convert seconds to milliseconds
        var timeoutMs = message.timeout * 1000;

        $interval(function () {
            dismiss(message);
        }, timeoutMs, 1);
    }

    /**
     * @function
     * @private
     * @description
     * Shows/dismisses message after scope.prop change to true
     *
     * @param {Object} message The message object to show/dismiss
     * @param {String} changeType Whether to 'show' or 'dismiss' the message
     */
    var changeOnWatch = function (message, changeType) {
        var scope = message[changeType][0];
        var prop = message[changeType][1];

        // function to run to change message visibility
        var cb;

        // switch which function to call based on type
        if (changeType === 'show') {
            cb = addToStack;
        } else if (changeType === 'dismiss') {
            cb = dismiss;

            // add a listener to dismiss message if scope is destroyed
            scope.$on('$destroy', function () {
                dismiss(message);
            });
        }

        scope.$watch(prop, function (newVal) {
            if (newVal === true) {
                cb(message);
            }
        });
    };//changeOnWatch

    /**
     * @function
     * @private
     * @description removes all messages that are shown
     */
    var clearAllShown = function () {
        _.forOwn(stacks, function (index, key) {
            stacks[key] = _.reject(stacks[key], {
                'dismiss': messageDefaults.dismiss
            });
        });
    };

    /**
     * @function
     * @private
     * @description adds messages marked as 'next' to relevant queues
     */
    var addAllNext = function () {
        _.each(nextQueue, function (message) {
            // add to appropriate stack
            addToStack(message);
        });

        // empty nextQueue of messages
        nextQueue.length = 0;
    };

    /**
     * @name clear
     * @ngdoc method
     * @methodOf utilities.service:rxNotify
     * @description deletes all messages in a stack
     *
     * @param {String} stack The name of the stack to clear
     */
    var clear = function (stack) {
        if (stacks.hasOwnProperty(stack)) {
            // @see http://davidwalsh.name/empty-array
            stacks[stack].length = 0;
        }
    };

    /**
     * @name dismiss
     * @ngdoc method
     * @methodOf utilities.service:rxNotify
     * @description removes a specific message from a stack
     *
     * @param {Object} msg Message object to remove
     */
    function dismiss (msg) {
        // remove message by id
        stacks[msg.stack] = _.reject(stacks[msg.stack], { 'id': msg.id });

        if (_.isFunction(msg.ondismiss)) {
            $interval(function () {
                msg.ondismiss(msg);
            }, 0, 1);
        }
    }//dismiss()

    /**
     * @name add
     * @ngdoc method
     * @methodOf utilities.service:rxNotify
     * @description adds a message to a stack
     *
     * @param {String} text Message text
     * @param {Object=} options Message options
     * @param {String=} [options.type='info'] Message Type
     *
     * Values:
     * * 'info'
     * * 'warning'
     * * 'error'
     * * 'success'
     * @param {Integer=} [options.timeout=-1]
     * Time (in seconds) for message to appear. A value of -1 will display
     * the message until it is dismissed or the user navigates away from the
     * page.
     *
     * Values:
     * * -1
     * * Any positive integer
     * @param {Boolean=} [options.repeat=true]
     * Whether the message should be allowed to appear more than once in the stack.
     * @param {Boolean=} [options.loading=false]
     * Replaces type icon with spinner. Removes option for use to dismiss message.
     *
     * You usually want to associate this with a 'dismiss' property.
     * @param {String|Array=} [options.show='immediate']
     * When to have the message appear.
     *
     * Values:
     * * 'immediate'
     * * 'next'
     * * [scope, 'property']
     *   * Pass in a property on a scope to watch for a change.
     *     When the property equals true, the message is shown.
     * @param {String|Array=} [options.dismiss='next']
     * When to have the message disappear.
     *
     * Values:
     * * 'next'
     * * [scope, 'property']
     *     * Pass in a property on a scope to watch for a change.
     *       When the property equals true, the message is dismissed.
     * @param {Function=} [options.ondismiss=_.noop]
     * Function that should be run when message is dismissed.
     * @param {String=} [options.stack='page']
     * Which message stack the message gets added to.
     *
     * Values:
     * * 'page'
     * * Any String *(results in a custom stack)*
     *
     * @returns {Object} message object
     */
    var add = function (text, options) {
        var message = {
            text: text
        };

        options = options || {};

        // add unique id to message for easier identification
        options.id = _.uniqueId();

        // if stack is specified, add to different stack
        var stack = options.stack || defaultStack;

        // if new stack doesn't exist, create it
        if (!_.isArray(stacks[stack])) {
            stacks[stack] = [];
        }

        // add defaults to options
        _.defaults(options, messageDefaults);

        // add options to message
        _.defaults(message, options);

        // if dismiss is set to array, watch variable
        if (_.isArray(message.dismiss)) {
            changeOnWatch(message, 'dismiss');
        }

        // add message to stack immediately if has default show value
        if (message.show === messageDefaults.show) {
            addToStack(message);
        } else if (message.show === 'next') {
            nextQueue.push(message);
        } else if (_.isArray(message.show)) {
            changeOnWatch(message, 'show');
        }

        // return message object
        return message;
    };//add()

    // add a listener to root scope which listens for the event that gets fired when the route successfully changes
    $rootScope.$on('$routeChangeSuccess', function processRouteChange () {
        clearAllShown();
        addAllNext();
    });

    // expose public API
    return {
        add: add,
        clear: clear,
        dismiss: dismiss,
        stacks: stacks
    };
});
