angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:rxAuth
 * @description
 * Service which provides an entire solution for authenticating, user session management
 * and permissions in the UI.  The rxAuth service is a wrapper for the Session and
 * Permission services.  These services were broken into smaller components to facilitate
 * customization and re-use.
 * 
 * @requires utilities.service:Session
 * @requires utilities.service:Permission
 *
 * @example
 * <pre>
 * rxAuth.loginWithJSON(json); // Returns a promise
 * rxAuth.login({username: '', password: '', successCallback, errorCallback}); // Returns a promise
 * rxAuth.getToken(); // Returns the stored token
 * rxAuth.storeToken(token); // Stores token
 * rxAuth.logout(); // Logs user off
 * rxAuth.isCurrent(); // Returns true/false if the token has expired.
 * rxAuth.isAuthenticated(); // Returns true/false if the user token is valid.
 * rxAuth.getRoles() // Returns an array of roles for a user
 * rxAuth.hasRole(role) // Returns true/false if user has specified role
 * </pre>
 */
.factory('rxAuth', function ($resource, Session, Permission) {
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

    _.assign(svc, Session);
    _.assign(svc, Permission);

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
