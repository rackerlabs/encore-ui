angular.module('encore.ui.utilities')
/**
 * @deprecated
 * Please use rxSession instead. This item will be removed on the 4.0.0 release.
 * @ngdoc service
 * @name utilities.service:Permission
 * @requires utilities.service:rxSession
 */
.factory('Permission', function (rxSession) {
    console.warn(
        'DEPRECATED: Permission - Please use rxSession. ' +
        'Permission will be removed in EncoreUI 4.0.0'
    );
    return rxSession;
});
