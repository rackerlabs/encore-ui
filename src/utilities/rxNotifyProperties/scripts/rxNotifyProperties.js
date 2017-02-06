angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:rxNotifyProperties
 * @description
 *
 * This factory provides functionality for abstracting "properties", and allowing
 * other directives/controllers/etc. to register for notifications when the properties
 * change. It would normally be used for a parent directive's controller, and child element
 * directives that "require" that controller.
 *
 * For example, say you have a value you want to track, which we'll call `numSelected`.
 * This will be a plain integer value that you have complete control over. What you want
 * is for other directives/controllers/etc to be able to register for notifications whenever
 * `numSelected` changes.
 *
 * The `registrationFn` method here sets all of this up. In your directive/controller where
 * you want your property to live, do something like:
 *
 * @example
 * <pre>
 * stats = { _numSelected: 0 };
 * scope.registerForNumSelected = rxNotifyProperties.registrationFn(stats, 'numSelected', '_numSelected');
 * </pre>
 *
 * This is saying "We have a property `_numSelected` in `stats`, and we want it exposed as `numSelected`
 * in `stats`. Whenever `stats.numSelected` is modified, other directives/controllers should be notified."
 *
 * In this example, a user registers for notifications by calling:
 * <pre>
 * registerForNumSelected(notificationFunction);
 * </pre>
 * Then, whenever `numSelected` changes, it will call:
 * <pre>
 * notificationFunction(newValue, oldValue);
 * </pre>
 *
 * This means that if you set:
 * <pre>
 * stats.numSelected = 20;
 * </pre>
 * Everyone that registered for notifications will get their notification function called.
 */
.factory('rxNotifyProperties', function ($timeout) {
    var rxNotifyProperties = {};

    rxNotifyProperties.registrationFn = function (dst, name, sourceName) {
        var listeners = [];
        var notify = function (newVal, oldVal) {
            _.each(listeners, function (fn) {
                $timeout(function () { fn(newVal, oldVal); });
                fn(newVal, oldVal);
            });
        };

        Object.defineProperty(dst, name, {
            get: function () { return dst[sourceName]; },
            set: function (newVal) {
                var oldVal = dst[sourceName];
                dst[sourceName] = newVal;
                notify(newVal, oldVal);
            },
        });
        return function register (fn) {
            listeners.push(fn);
        };

    };

    return rxNotifyProperties;
})

/**
 * @deprecated
 * Please use rxNotifyProperties instead. This item will be removed on the 4.0.0 release.
 * @ngdoc service
 * @name utilities.service:NotifyProperties
 * @requires utilities.service:rxNotifyProperties
 */
.service('NotifyProperties', function (rxNotifyProperties) {
    console.warn(
        'DEPRECATED: NotifyProperties - Please use rxNotifyProperties. ' +
        'NotifyProperties will be removed in EncoreUI 4.0.0'
    );
    return rxNotifyProperties;
});
