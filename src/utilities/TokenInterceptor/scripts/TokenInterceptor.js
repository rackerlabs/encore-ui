angular.module('encore.ui.utilities')
/**
 * @deprecated
 * Please use rxTokenInterceptor instead. This item will be removed in a future release of EncoreUI.
 * @ngdoc service
 * @name utilities.service:TokenInterceptor
 * @description
 * Please use {@link utilities.service:rxTokenInterceptor rxTokenInterceptor} instead.
 */
.provider('TokenInterceptor', function () {
    var exclusionList = this.exclusionList = [ 'rackcdn.com' ];

    this.$get = function (rxSession, $document, suppressDeprecationWarnings) {
        if (!suppressDeprecationWarnings) {
            console.warn (
                'DEPRECATED: TokenInterceptor - Please use rxTokenInterceptor. ' +
                'TokenInterceptor will be removed in a future release of EncoreUI.'
            );
        }
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
                    config.headers['X-Auth-Token'] = rxSession.getTokenId();
                }

                return config;
            }
        };
    };
});
