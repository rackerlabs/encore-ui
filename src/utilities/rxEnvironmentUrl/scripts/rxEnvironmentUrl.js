angular.module('encore.ui.utilities')
/**
 * @deprecated rxEnvironmentUrl will be removed in a future release of EncoreUI.
 * @ngdoc filter
 * @name utilities.filter:rxEnvironmentUrl
 * @description
 * Builds a URL based on current environment.
 * Note: if value passed in isn't an object, it will simply return that value
 *
 * @example
 * <pre>
 * {{ { tld: 'cloudatlas', path: 'cbs/servers' } | rxEnvironmentUrl }}
 * Renders as '//staging.cloudatlas.encore.rackspace.com/cbs/servers' in staging
 *
 * {{ '/myPath' | rxEnvironmentUrl }}
 * Renders as '/myPath' regardless of environment, because value passed in was not an object
 * </pre>
 */
.filter('rxEnvironmentUrl', function (rxEnvironment, $interpolate) {
    return function (details) {
        var environment = rxEnvironment.get();

        // convert url template into full path based on details provided (if details is an object)
        return _.isObject(details) ? $interpolate(environment.url)(details) : details;
    };
});
