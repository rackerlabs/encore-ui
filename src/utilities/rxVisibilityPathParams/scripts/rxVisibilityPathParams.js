angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:rxVisibilityPathParams
 * @deprecated
 * This service is deprecated and will be removed in EncoreUI 4.0.0
 * @description
 * Returns an object with `name` and `method` params that can
 * be passed to
 * [rxVisibility.addMethod()](https://github.com/rackerlabs/encore-ui/blob/master/src/utilities/rxVisibility
 * /scripts/rxVisibility.js#L22).
 * We register this by default, as it's used by the nav menu we keep in
 * {@link utilities.service:routesCdnPath routesCdnPath}.
 *
 * The method is used to check if `{param: 'someParamName'}` is present in the current route.
 * Use it as:
 * <pre>
 * visibility: [ 'rxPathParams', { param: 'userName' } ]
 * </pre>
 */
.factory('rxVisibilityPathParams', function ($routeParams) {
    console.warn(
        'DEPRECATED: rxVisibilityPathParams will be removed in EncoreUI 4.0.0'
    );

    var pathParams = {
        name: 'rxPathParams',
        method: function (scope, args) {
            return !_.isUndefined($routeParams[args.param]);
        }
    };

    return pathParams;
});
