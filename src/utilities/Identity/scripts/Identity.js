angular.module('encore.ui.utilities')
/**
 * @deprecated
 * Please use rxAuth instead. This item will be removed on the 4.0.0 release.
 * @ngdoc service
 * @name utilities.service:Identity
 * @requires utilities.service:rxAuth
 */
.factory('Identity', function (rxAuth) {
    console.warn (
        'DEPRECATED: Identity - Please use rxAuth.' +
        'Identity will be removed in EncoreUI 4.0.0'
    );
    return rxAuth;
});
