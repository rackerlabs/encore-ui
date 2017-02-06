angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:rxUrlUtils
 * @description
 *
 * Set of utility functions to break apart/compare URLs.
 */
.service('rxUrlUtils', function ($location, rxEnvironmentUrlFilter, $interpolate, $route, $document) {
    var urlParser = $document[0].createElement('a');
    // remove any preceding # and / from the URL for cleaner comparison
    this.stripLeadingChars = function (url) {
        // http://regexr.com/39coc
        var leadingChars = /^((?:\/|#)+)/;

        return url.replace(leadingChars, '');
    };

    // remove any trailing /'s from the URL
    this.stripTrailingSlash = function (url) {
        // Match a forward slash / at the end of the string ($)
        var trailingSlash = /\/$/;

        return url.replace(trailingSlash, '');
    };

    // Given a URL, split it on '/' and return all the non-empty components
    this.getChunks = function (url) {
        if (!_.isString(url)) {
            return [''];
        }

        return _.compact(url.split('/'));
    };

    // Get the current path. Knows how to work with the `base` tag
    this.getFullPath = function () {
        var base = $document.find('base');
        var basePath = '';

        if (base.length > 0) {
            basePath = base[0].getAttribute('href');

            // remove trailing '/' if present
            basePath = this.stripTrailingSlash(basePath);
        }

        return basePath + $location.path();
    };

    // get the current path, adding the <base> path if neeeded
    //
    // @example
    // if the current page url is 'http://localhost:9000/encore-ui/#/overviewPage#bookmark?book=harry%20potter'
    // and the page contains a <base href="encore-ui"> tag
    // getCurrentPath() would return '/encore-ui/overviewPage'
    this.getCurrentPathChunks = function () {
        var fullPath = this.stripLeadingChars(this.getFullPath());

        return this.getChunks(fullPath);
    };

    // get the url defined in the route by removing the hash tag, leading slashes and query string
    // e.g. '/#/my/url?param=1' -> 'my/url'
    this.getItemUrl = function (item) {
        if (!_.isString(item.url)) {
            return undefined;
        }

        // remove query string
        var itemUrl = item.url.split('?')[0];
        itemUrl = this.stripLeadingChars(itemUrl);

        return itemUrl;
    };

    // For a given route item, grab its defined URL, and see
    // if it matches the currentPathChunks
    this.isActive = function (item, currentPathChunks) {
        var itemUrlChunks = this.getChunks(this.getItemUrl(item));
        var numChunks = itemUrlChunks.length;

        // check against the path and the hash
        // (in case the difference is the 'hash' like on the encore-ui demo page)
        var pathMatches = this.matchesSubChunks(currentPathChunks, itemUrlChunks, numChunks);
        if (!pathMatches) {
            pathMatches = this.matchesSubChunks(this.getChunks($location.hash()), itemUrlChunks, numChunks);
        }

        // if current item not active, check if any children are active
        // This requires that `isActive` was called on all the children beforehand
        if (!pathMatches && item.children) {
            pathMatches = _.some(item.children, 'active');
        }

        return pathMatches;
    };

    // Given a URL string, interpolate it with $route.current.pathParams
    // If the optional `extraContext` is passed in, then the URL will be interpolated
    // with those values as well, with `extraContext` values taking precedence
    this.buildUrl = function (url, extraContext) {
        // sometimes links don't have URLs defined, so we need to exit before $interpolate throws an error
        if (_.isUndefined(url)) {
            return url;
        }

        // run the href through rxEnvironmentUrl in case it's defined as such
        url = rxEnvironmentUrlFilter(url);

        if ($route.current) {
            // convert any nested expressions to defined route params
            var finalContext = _.defaults(extraContext || {}, $route.current.pathParams);
            url = $interpolate(url)(finalContext);
        }

        return url;
    };

    // Given two sets of chunks, check if the first `numChunks` of `firstChunks`
    // matches all of `subChunks`
    this.matchesSubChunks = function (firstChunks, subChunks, numChunks) {
        return _.isEqual(firstChunks.slice(0, numChunks), subChunks);
    };

    // Given a URL string, parse all the different pieces of it
    this.parseUrl = function (url) {
        urlParser.href = url;
        return _.pick(urlParser, ['protocol', 'hostname', 'port', 'pathname', 'search', 'hash', 'host']);
    };
})
/**
 * @deprecated
 * Please use rxUrlUtils instead. This item will be removed on the 4.0.0 release.
 * @ngdoc service
 * @name utilities.service:urlUtils
 * @requires utilities.service:rxUrlUtils
 */
.service('urlUtils', function (rxUrlUtils) {
    console.warn(
        'DEPRECATED: urlUtils - Please use rxUrlUtils. ' +
        'urlUtils will be removed in EncoreUI 4.0.0'
    );
    return rxUrlUtils;
});
