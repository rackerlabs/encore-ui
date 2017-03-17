angular.module('encore.ui.utilities')
/**
 * @deprecated
 * Please use rxIdentity or rxSession instead.
 * This item will be removed on the 4.0.0 release.
 *
 * @ngdoc service
 * @name utilities.service:Auth
 * @requires utilities.service:rxAuth
 * @description Alias for {@link utilities.service:rxAuth rxAuth}
 */
.service('Auth', function (rxIdentity, rxSession) {
    console.warn (
        'DEPRECATED: Auth - Please use rxIdentity or rxSession. ' +
        'Auth will be removed in EncoreUI 4.0.0'
    );
    var svc = {};

    _.assign(svc, rxIdentity);
    _.assign(svc, rxSession);

    return svc;
});
