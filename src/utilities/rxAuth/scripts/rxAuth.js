angular.module('encore.ui.utilities')
/**
 * @deprecated
 * Please use rxIdentity or rxSession instead.
 * This item will be removed on the 4.0.0 release.
 *
 * @ngdoc service
 * @name utilities.service:rxAuth
 * @requires utilities.service:rxIdentity
 * @requires utilities.service:rxSession
 * @description Proxy service for {@link utilities.service:rxIdentity rxIdentity}
 * and {@link utilities.service:rxSession rxSession} logic.
 */
.factory('rxAuth', function (rxIdentity, rxSession, suppressDeprecationWarnings) {
    if (!suppressDeprecationWarnings) {
        console.warn (
            'DEPRECATED: rxAuth - Please use rxIdentity or rxSession. ' +
            'rxAuth will be removed in EncoreUI 4.0.0'
        );
    }
    var svc = {};

    _.assign(svc, rxIdentity);
    _.assign(svc, rxSession);

    return svc;
});
