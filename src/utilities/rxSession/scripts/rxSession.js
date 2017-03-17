(function () {
    angular
        .module('encore.ui.utilities')
        .factory('rxSession', rxSessionFactory);

    /**
     * @ngdoc service
     * @name utilities.service:rxSession
     * @requires utilities.service:rxLocalStorage
     * @description Session management and utility functions.
     */
    function rxSessionFactory (rxLocalStorage) {
        var TOKEN_ID = 'encoreSessionToken';
        var svc = {};

        /**
         * @ngdoc function
         * @name rxSession.getByKey
         * @methodOf utilities.service:rxSession
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
         * @name rxSession.getToken
         * @methodOf utilities.service:rxSession
         * @description If cached token exists, return value. Otherwise return undefined.
         * @returns {String|Undefined} Token value
         */
        svc.getToken = function () {
            return rxLocalStorage.getObject(TOKEN_ID);
        };

        /**
         * @ngdoc function
         * @name rxSession.getTokenId
         * @methodOf utilities.service:rxSession
         * @description If token ID exists, returns value otherwise returns undefined.
         * @returns {String} Token ID
         */
        svc.getTokenId = function () {
            return svc.getByKey('access.token.id');
        };

        /**
         * @ngdoc function
         * @name rxSession.getUserId
         * @methodOf utilities.service:rxSession
         * @description Gets user id
         * @returns {String} User ID
         */
        svc.getUserId = function () {
            return svc.getByKey('access.user.id');
        };

        /**
         * @ngdoc function
         * @name rxSession.getUserName
         * @methodOf utilities.service:rxSession
         * @description Gets user name
         * @returns {String} User Name
         */
        svc.getUserName = function () {
            return svc.getByKey('access.user.name');
        };

        /**
         * @ngdoc function
         * @name rxSession.storeToken
         * @methodOf utilities.service:rxSession
         * @description Stores token
         * @param {Function} token callback
         */
        svc.storeToken = function (token) {
            rxLocalStorage.setObject(TOKEN_ID, token);
        };

        /**
         * @ngdoc function
         * @name rxSession.logout
         * @methodOf utilities.service:rxSession
         * @description Logs user off
         */
        svc.logout = function () {
            rxLocalStorage.removeItem(TOKEN_ID);
        };

        /**
         * @ngdoc function
         * @name rxSession.isCurrent
         * @methodOf utilities.service:rxSession
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
         * @name rxSession.isAuthenticated
         * @methodOf utilities.service:rxSession
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
         * @name rxSession.getRoles
         * @methodOf utilities.service:rxSession
         * @description Fetch all the roles tied to the user (in the exact format available in their auth token).
         * @returns {Array} List of all roles associated to the user.
         */
        svc.getRoles = function () {
            var token = svc.getToken();
            return (token && token.access && token.access.user && token.access.user.roles) ?
                token.access.user.roles : [];
        };

        /**
         * @ngdoc function
         * @name rxSession.hasRole
         * @methodOf utilities.service:rxSession
         * @description Check if user has at least _one_ of the given roles.
         * @param {String[]} roles List of roles to check against
         * @returns {Boolean} True if user has at least _one_ of the given roles; otherwise, false.
         */
        svc.hasRole = function (roles) {
            return checkRoles(roles, _.some);
        };

        /**
         * @ngdoc function
         * @name rxSession.hasAllRoles
         * @methodOf utilities.service:rxSession
         * @description Checks if user has _every_ role in given list.
         * @param {String[]} roles List of roles to check against
         * @returns {Boolean} True if user has _every_ role in given list; otherwise, false.
         */
        svc.hasAllRoles = function (roles) {
            return checkRoles(roles, _.every);
        };

        return svc;
    }//rxSessionFactory();
})();
