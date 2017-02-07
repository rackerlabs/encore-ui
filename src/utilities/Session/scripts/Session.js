angular.module('encore.ui.utilities')
/**
 * @deprecated
 * Please use rxAuth instead. This item will be removed on the 4.0.0 release.
 * @ngdoc service
 * @name utilities.service:Session
 * @requires utilities.service:rxAuth
 */
.factory('Session', function (rxAuth) {
    console.warn(
        'DEPRECATED: Session - Please use rxAuth.' +
        'Session will be removed in EncoreUI 4.0.0'
    );
    return rxAuth;
});
