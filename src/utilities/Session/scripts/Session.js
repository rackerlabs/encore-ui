angular.module('encore.ui.utilities')
/**
 * @deprecated
 * Please use rxSession instead. This item will be removed in a future release of EncoreUI.
 * @ngdoc service
 * @name utilities.service:Session
 * @requires utilities.service:rxSession
 */
.factory('Session', function (rxSession, suppressDeprecationWarnings) {
    if (!suppressDeprecationWarnings) {
        console.warn(
            'DEPRECATED: Session - Please use rxSession.' +
            'Session will be removed in a future release of EncoreUI.'
        );
    }
    return rxSession;
});
