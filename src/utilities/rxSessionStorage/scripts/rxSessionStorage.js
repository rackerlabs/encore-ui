angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:rxSessionStorage
 * @description
 *
 * A simple wrapper for injecting the global variable sessionStorage
 * for storing values in session storage. This service is similar to angular's
 * $window and $document services.  The API works the same as the W3C's
 * specification provided at: http://dev.w3.org/html5/webstorage/#storage-0.
 * Also includes to helper functions for getting and setting objects.
 *
 * @example
 * <pre>
 * rxSessionStorage.setItem('Batman', 'Robin'); // no return value
 * rxSessionStorage.key(0); // returns 'Batman'
 * rxSessionStorage.getItem('Batman'); // returns 'Robin'
 * rxSessionStorage.removeItem('Batman'); // no return value
 * rxSessionStorage.setObject('hero', {name:'Batman'}); // no return value
 * rxSessionStorage.getObject('hero'); // returns { name: 'Batman'}
 * rxSessionStorage.clear(); // no return value
 * </pre>
 */
.service('rxSessionStorage', function ($window) {
    var sessionStorage = $window.sessionStorage;
    if ($window.self !== $window.top) {
        try {
            sessionStorage = $window.top.sessionStorage;
        } catch (e) {
            sessionStorage = $window.sessionStorage;
        }
    }

    this.setItem = function (key, value) {
        sessionStorage.setItem(key, value);
    };

    this.getItem = function (key) {
        return sessionStorage.getItem(key);
    };

    this.key = function (key) {
        return sessionStorage.key(key);
    };

    this.removeItem = function (key) {
        sessionStorage.removeItem(key);
    };

    this.clear = function () {
        sessionStorage.clear();
    };

    this.__defineGetter__('length', function () {
        return sessionStorage.length;
    });

    this.setObject = function (key, val) {
        var value = _.isObject(val) || _.isArray(val) ? JSON.stringify(val) : val;
        this.setItem(key, value);
    };

    this.getObject = function (key) {
        var item = sessionStorage.getItem(key);
        try {
            item = JSON.parse(item);
        } catch (error) {
            return item;
        }

        return item;
    };
})

/**
 * @deprecated
 * Please use rxSessionStorage instead. This item will be removed on the 4.0.0 release.
 * @ngdoc service
 * @name utilities.service:SessionStorage
 * @requires utilities.service:rxSessionStorage
 */
.service('SessionStorage', function (rxSessionStorage) {
    console.warn (
        'DEPRECATED: SessionStorage - Please use rxSessionStorage. ' +
        'SessionStorage will be removed in EncoreUI 4.0.0'
    );
    return rxSessionStorage;
});
