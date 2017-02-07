angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:rxAuth
 * @description
 * Service which provides an entire solution for authenticating user session management
 * and permissions in the UI.
 */
.factory('rxAuth', function ($resource, rxLocalStorage) {
    /**
     * @ngdoc function
     * @name rxAuth.loginWithJSON
     * @methodOf utilities.service:rxAuth
     * @description Login via identity api
     * @param {Object} body JSON payload 
     * @param {Function} success success callback
     * @param {Function} error error callback
     * @returns {Promise} login promise
     */

    var svc = $resource('/api/identity/:action', {}, { 
        loginWithJSON: { 
            method: 'POST', 
            isArray: false, 
            params: { 
                action: 'tokens' 
            }
        },
        validate: { 
            method: 'GET', 
            url: '/api/identity/login/session/:id', 
            isArray: false 
        }
    });

    /**
     * @ngdoc function
     * @name rxAuth.login
     * @methodOf utilities.service:rxAuth
     * @description Login using a credential object
     * @param {Object} credentials credential object 
     * @param {Function} success success callback
     * @param {Function} error error callback
     * @returns {Promise} login promise
     */
    svc.login = function (credentials, success, error) {
        var body = {
            auth: {
                passwordCredentials: {
                    username: credentials.username,
                    password: credentials.password
                }
            }
        };

        return svc.loginWithJSON(body, success, error);
    };

    var TOKEN_ID = 'encoreSessionToken';

    /**
     * @ngdoc function
     * @name rxAuth.getByKey
     * @methodOf utilities.service:rxAuth
     * @description Dot walks the token without throwing an error. 
     * If key exists, returns value otherwise returns undefined.
     * @param {Function} key callback
     * @returns {String} Key value
     */
    svc.getByKey = function (key) {
        var tokenValue,
            token = svc.getToken(),
            keys = key ? key.split('.') : undefined;

        if (_.isEmpty(token) || !keys) {
            return;
        }

        tokenValue = _.reduce(keys, function (val, key) {
            return val ? val[key] : undefined;
        }, token);

        return tokenValue;
    };

    /**
     * @ngdoc function
     * @name rxAuth.getToken
     * @methodOf utilities.service:rxAuth
     * @description If cached token exists, return value. Otherwise return undefined.
     * @returns {String|Undefined} Token value
     */
    svc.getToken = function () {
        return rxLocalStorage.getObject(TOKEN_ID);
    };

    /**
     * @ngdoc function
     * @name rxAuth.getTokenId
     * @methodOf utilities.service:rxAuth
     * @description If token ID exists, returns value otherwise returns undefined.
     * @returns {String} Token ID
     */
    svc.getTokenId = function () {
        return svc.getByKey('access.token.id');
    };

    /**
     * @ngdoc function
     * @name rxAuth.getUserId
     * @methodOf utilities.service:rxAuth
     * @description Gets user id
     * @returns {String} User ID
     */
    svc.getUserId = function () {
        return svc.getByKey('access.user.id');
    };

    /**
     * @ngdoc function
     * @name rxAuth.getUserName
     * @methodOf utilities.service:rxAuth
     * @description Gets user name
     * @returns {String} User Name
     */
    svc.getUserName = function () {
        return svc.getByKey('access.user.name');
    };

    /**
     * @ngdoc function
     * @name rxAuth.storeToken
     * @methodOf utilities.service:rxAuth
     * @description Stores token
     * @param {Function} token callback
     */
    svc.storeToken = function (token) {
        rxLocalStorage.setObject(TOKEN_ID, token);
    };

    /**
     * @ngdoc function
     * @name rxAuth.logout
     * @methodOf utilities.service:rxAuth
     * @description Logs user off
     */
    svc.logout = function () {
        rxLocalStorage.removeItem(TOKEN_ID);
    };

    /**
     * @ngdoc function
     * @name rxAuth.isCurrent
     * @methodOf utilities.service:rxAuth
     * @description Checks if token is current/expired
     * @returns {Boolean} True if expiration date is valid and older than current date
     */
    svc.isCurrent = function () {
        var expireDate = svc.getByKey('access.token.expires');

        if (expireDate) {
            return new Date(expireDate) > _.now();
        }

        return false;
    };

    /**
     * @ngdoc function
     * @name rxAuth.isAuthenticated 
     * @methodOf utilities.service:rxAuth
     * @description Authenticates whether token is defined or undefined
     * @returns {Boolean} True if authenticated. Otherwise False.
     */
    svc.isAuthenticated = function () {
        var token = svc.getToken();
        return _.isEmpty(token) ? false : svc.isCurrent();
    };

    var cleanRoles = function (roles) {
        return roles.split(',').map(function (r) {
            return r.trim();
        });
    };

    var userRoles = function () {
        return _.map(svc.getRoles(), 'name');
    };

    /**
     * @description Takes a function and a list of roles, and returns the
     * result of calling that function with `roles`, and comparing to userRoles().
     *
     * @param {Function} fn Comparison function to use. _.some, _.every, etc.
     * @param {String[]} roles List of desired roles
     */
    var checkRoles = function (roles, fn) {
        // Some code expects to pass a comma-delimited string
        // here, so turn that into an array
        if (_.isString(roles)) {
            roles = cleanRoles(roles);
        }

        var allUserRoles = userRoles();
        return fn(roles, function (role) {
            return _.includes(allUserRoles, role);
        });
    };

    /**
     * @ngdoc function
     * @name rxAuth.getRoles
     * @methodOf utilities.service:rxAuth
     * @description Fetch all the roles tied to the user (in the exact format available in their rxAuth token).
     * @returns {Array} List of all roles associated to the user.
     */
    svc.getRoles = function () {
        var token = svc.getToken();
        return (token && token.access && token.access.user && token.access.user.roles) ?
            token.access.user.roles : [];
    };

    /**
     * @ngdoc function
     * @name rxAuth.hasRole
     * @methodOf utilities.service:rxAuth
     * @description Check if user has at least _one_ of the given roles.
     * @param {String[]} roles List of roles to check against
     * @returns {Boolean} True if user has at least _one_ of the given roles; otherwise, false.
     */
    svc.hasRole = function (roles) {
        return checkRoles(roles, _.some);
    };

    /**
     * @ngdoc function
     * @name rxAuth.hasAllRoles
     * @methodOf utilities.service:rxAuth
     * @description Checks if user has _every_ role in given list.
     * @param {String[]} roles List of roles to check against
     * @returns {Boolean} True if user has _every_ role in given list; otherwise, false.
     */
    svc.hasAllRoles = function (roles) {
        return checkRoles(roles, _.every);
    };

    return svc;
})

/**
 * @deprecated
 * Please use rxAuth instead. This item will be removed on the 4.0.0 release.
 * @ngdoc service
 * @name utilities.service:Auth
 * @requires utilities.service:rxAuth
 */
.service('Auth', function (rxAuth) {
    console.warn (
        'DEPRECATED: Auth - Please use rxAuth. ' +
        'Auth will be removed in EncoreUI 4.0.0'
    );
    return rxAuth;
});
