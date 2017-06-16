angular.module('encore.ui.utilities')
/**
 * @deprecated
 * Please use rxIdentity instead. This item will be removed in a future release of EncoreUI.
 * @ngdoc service
 * @name utilities.service:Identity
 * @requires utilities.service:rxIdentity
 */
.factory('Identity', function (rxIdentity, suppressDeprecationWarnings) {
    if (!suppressDeprecationWarnings) {
        console.warn (
            'DEPRECATED: Identity - Please use rxIdentity.' +
            'Identity will be removed in a future release of EncoreUI'
        );
    }
    return rxIdentity;
});
