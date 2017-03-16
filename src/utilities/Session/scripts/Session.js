angular.module('encore.ui.utilities')
/**
 * @deprecated
 * Please use rxSession instead. This item will be removed on the 4.0.0 release.
 * @ngdoc service
 * @name utilities.service:Session
 * @requires utilities.service:rxSession
 */
.factory('Session', function (rxSession) {
    console.warn(
        'DEPRECATED: Session - Please use rxSession. ' +
        'Session will be removed in EncoreUI 4.0.0'
    );
    return rxSession;
});
