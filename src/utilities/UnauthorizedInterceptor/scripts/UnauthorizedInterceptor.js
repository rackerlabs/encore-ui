angular.module('encore.ui.utilities')
/**
 * @deprecated
 * Please use rxUnauthorizedInterceptor instead. This item will be removed in a future release of EncoreUI.
 * @ngdoc service
 * @name utilities.service:UnauthorizedInterceptor
 * @requires utilities.service:rxUnauthorizedInterceptor
 */
.service('UnauthorizedInterceptor', function (rxUnauthorizedInterceptor, suppressDeprecationWarnings) {
    if (!suppressDeprecationWarnings) {
        console.warn (
            'DEPRECATED: UnauthorizedInterceptor - Please use rxUnauthorizedInterceptor. ' +
            'UnauthorizedInterceptor will be removed in a future release of EncoreUI.'
        );
    }
    return rxUnauthorizedInterceptor;
});
