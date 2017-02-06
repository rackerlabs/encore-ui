angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:rxUnauthorizedInterceptor
 * @description
 * Simple injector which will intercept HTTP responses. If a HTTP 401 response error code is returned,
 * the ui redirects to `/login`.
 *
 * @requires $q
 * @requires @window
 * @requires utilities.service:Session
 *
 * @example
 * <pre>
 * angular.module('encoreApp', ['encore.ui'])
 *     .config(function ($httpProvider) {
 *         $httpProvider.interceptors.push('rxUnauthorizedInterceptor');
 *     });
 * </pre>
 */
.factory('rxUnauthorizedInterceptor', function ($q, $window, Session) {
    var svc = {
        redirectPath: function () {
            // This brings in the entire relative URI (including the path
            // specified in a <base /> tag), along with query params as a
            // string.
            // e.g https://www.google.com/search?q=woody+wood+pecker
            // window.location.pathname = /search?q=woody+wood+pecker
            return $window.location.pathname;
        },
        redirect: function (loginPath) {
            loginPath = loginPath ? loginPath : '/login?redirect=';
            $window.location = loginPath + encodeURIComponent(svc.redirectPath());
        },
        responseError: function (response) {
            if (response.status === 401) {
                Session.logout(); // Logs out user by removing token
                svc.redirect();
            }

            return $q.reject(response);
        }
    };

    return svc;
})

/**
 * @deprecated
 * Please use rxUnauthorizedInterceptor instead. This item will be removed on the 4.0.0 release.
 * @ngdoc service
 * @name utilities.service:UnauthorizedInterceptor
 * @requires utilities.service:rxUnauthorizedInterceptor
 */
.service('UnauthorizedInterceptor', function (rxUnauthorizedInterceptor) {
    console.warn (
        'DEPRECATED: UnauthorizedInterceptor - Please use rxUnauthorizedInterceptor. ' +
        'UnauthorizedInterceptor will be removed in EncoreUI 4.0.0'
    );
    return rxUnauthorizedInterceptor;
});
