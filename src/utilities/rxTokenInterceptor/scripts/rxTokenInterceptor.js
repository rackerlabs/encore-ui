angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:rxTokenInterceptor
 * @description
 * Simple $http injector which will intercept http request and inject the
 * Rackspace Identity's token into every http request.
 *
 * @requires rxAuth.service:rxAuth
 *
 * @example
 * <pre>
 * angular.module('encoreApp', ['encore.ui'])
 *     .config(function ($httpProvider) {
 *         $httpProvider.interceptors.push('rxTokenInterceptor');
 *     });
 * </pre>
 */
.provider('rxTokenInterceptor', function () {
    var exclusionList = this.exclusionList = [ 'rackcdn.com' ];
    this.$get = function (rxAuth, $document) {
        var url = $document[0].createElement('a');
        return {
            request: function (config) {
                // Don't add the X-Auth-Token if the request URL matches
                // something in exclusionList
                // We're specifically looking at hostnames, so we have to
                // do the `createElement('a')` trick to turn the config.url
                // into something with a `.hostname`
                url.href = config.url;
                var exclude = _.some(exclusionList, function (item) {
                    if (_.includes(url.hostname, item)) {
                        return true;
                    }
                });

                if (!exclude) {
                    config.headers['X-Auth-Token'] = rxAuth.getTokenId();
                }

                return config;
            }
        };
    };
});
