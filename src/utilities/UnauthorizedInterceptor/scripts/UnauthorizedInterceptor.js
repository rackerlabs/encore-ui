angular.module('encore.ui.utilities')
/**
 * @deprecated
 * Please use rxUnauthorizedInterceptor instead. This item will be removed on the 4.0.0 release.
 * @ngdoc service
 * @name utilities.service:UnauthorizedInterceptor
 * @requires utilities.service:rxUnauthorizedInterceptor
 */
.service('UnauthorizedInterceptor', function (rxUnauthorizedInterceptor, suppressDeprecationWarnings) {
    if (!suppressDeprecationWarnings) {
        console.warn (
            'DEPRECATED: UnauthorizedInterceptor - Please use rxUnauthorizedInterceptor. ' +
            'UnauthorizedInterceptor will be removed in EncoreUI 4.0.0'
        );
    }
    return rxUnauthorizedInterceptor;
});
