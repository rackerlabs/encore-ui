angular.module('encore.ui.utilities')
/**
 * @deprecated
 * Please use rxSession instead. This item will be removed in a future release of EncoreUI.
 * @ngdoc service
 * @name utilities.service:Permission
 * @requires utilities.service:rxSession
 */
.factory('Permission', function (rxSession, suppressDeprecationWarnings) {
    if (!suppressDeprecationWarnings) {
        console.warn(
            'DEPRECATED: Permission - Please use rxSession.' +
            'Permission will be removed in a future release of EncoreUI.'
        );
    }
    return rxSession;
});
