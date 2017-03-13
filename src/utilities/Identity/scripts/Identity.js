angular.module('encore.ui.utilities')
/**
 * @deprecated
 * Please use rxIdentity instead. This item will be removed on the 4.0.0 release.
 * @ngdoc service
 * @name utilities.service:Identity
 * @requires utilities.service:rxIdentity
 */
.factory('Identity', function (rxIdentity) {
    console.warn (
        'DEPRECATED: Identity - Please use rxIdentity. ' +
        'Identity will be removed in EncoreUI 4.0.0'
    );
    return rxIdentity;
});
