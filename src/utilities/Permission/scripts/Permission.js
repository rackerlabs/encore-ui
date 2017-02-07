angular.module('encore.ui.utilities')
/**
 * @deprecated
 * Please use rxAuth instead. This item will be removed on the 4.0.0 release.
 * @ngdoc service
 * @name utilities.service:Permission
 * @requires utilities.service:rxAuth
 */
.factory('Permission', function (rxAuth) {
    console.warn(
        'DEPRECATED: Permission - Please use rxAuth.' +
        'Permission will be removed in EncoreUI 4.0.0'
    );
    return rxAuth;
});
