(function () {
    angular
        .module('encore.ui.utilities')
        .factory('rxIdentity', rxIdentityFactory);

    /**
     * @ngdoc service
     * @name utilities.service:rxIdentity
     * @description Service which provides authentication logic.
     */
    function rxIdentityFactory ($resource) {
        /**
         * @ngdoc function
         * @name rxIdentity.loginWithJSON
         * @methodOf utilities.service:rxIdentity
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
         * @name rxIdentity.login
         * @methodOf utilities.service:rxIdentity
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
        };//login()

        return svc;
    }//rxIdentityFactory()
})();
