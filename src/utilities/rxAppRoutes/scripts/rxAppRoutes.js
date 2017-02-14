angular.module('encore.ui.utilities')
/**
 * @deprecated This service will be removed in EncoreUI 4.0.0
 * @ngdoc service
 * @name utilities.service:rxAppRoutes
 * @description
 * Manages page routes, building urls and marking them as active on route change.
 */
.factory('rxAppRoutes', function ($rootScope, $log, rxUrlUtils, $q) {
    console.warn(
        'DEPRECATED: rxAppRoutes will be removed in EncoreUI 4.0.0'
    );

    var AppRoutes = function (routes) {
        routes = routes || [];
        // we need to get the current path on page load
        var currentPathChunks = rxUrlUtils.getCurrentPathChunks();
        var loadingDeferred = $q.defer();

        // if the routes were already passed in, then we can immediately
        // resolve the promise
        if (routes.length > 0) {
            loadingDeferred.resolve(routes);
        }

        var setDynamicProperties = function (routes, extraUrlContext) {
            _.each(routes, function (route) {
                // build out url for current route
                route.url = rxUrlUtils.buildUrl(route.href, extraUrlContext);

                // check if any children exist, if so, build their URLs as well
                if (route.children) {
                    route.children = setDynamicProperties(route.children, extraUrlContext);
                }

                // set active state (this needs to go after the recursion,
                // so that the URL is built for all the children)
                route.active = rxUrlUtils.isActive(route, currentPathChunks);
            });

            return routes;
        };

        var getRouteIndex = function (key, routes) {
            var routeIndex;
            var routeAlreadyFound = false;

            _.forEach(routes, function (route, index) {
                var foundThisTime = false;
                if (route.key === key) {
                    routeIndex = [index];
                    foundThisTime = true;
                } else if ('children' in route) {
                    // if there are children in the route, we need to search through them as well
                    var childIndex = getRouteIndex(key, route.children);
                    if (childIndex) {
                        routeIndex = [index].concat(childIndex);
                        foundThisTime = true;
                    }
                }
                if (foundThisTime) {
                    if (routeAlreadyFound) {
                        $log.warn('Duplicate routes found for key: ' + key);
                    } else {
                        routeAlreadyFound = true;
                    }
                }
            });

            return routeIndex;
        };

        var updateRouteByIndex = function (indexes, routeInfo, routes, level) {
            var route = routes[indexes[0]];

            if (level < indexes.length - 1) {
                // if there's more than one index, we need to recurse down a level
                route.children = updateRouteByIndex(indexes.slice(1), routeInfo, route.children, level + 1);
            } else {
                _.assign(route, routeInfo);
            }

            return routes;
        };

        // Get the route for a given index
        var getRouteByIndex = function (indexes, subRoutes) {
            var i, route,
                depth = indexes.length;
            for (i = 0; i < depth; i++) {
                route = subRoutes[indexes[i]];
                subRoutes = route.children;
            }
            return route;
        };

        $rootScope.$on('$locationChangeSuccess', function () {
            // NOTE: currentPath MUST be updated before routes
            currentPathChunks = rxUrlUtils.getCurrentPathChunks();

            routes = setDynamicProperties(routes);
        });

        return {
            /**
             * Finds the indexes/path to a route. Will return last match if duplicate keys exist
             * @see setRouteByKey for actual use
             * @param  {String} key Route Key
             * @example
             *     var myRouteIndex = rxAppRoutes.getIndexByKey('myKey'); // [0, 2, 0]
             * @return {Array|undefined} Array of indexes describing path to route (or undefined if not found)
             */
            getIndexByKey: function (key) {
                return loadingDeferred.promise.then(function () {
                    var routeIndex = getRouteIndex(key, routes);
                    if (_.isUndefined(routeIndex)) {
                        $log.debug('Could not find route by key: ', key);
                        return $q.reject();
                    }

                    return routeIndex;
                });
            },

            getRouteByKey: function (key) {
                return this.getIndexByKey(key).then(function (index) {
                    return getRouteByIndex(index, routes);
                }, function () {
                    return $q.reject();
                });
            },

            isActiveByKey: function (key) {
                return this.getRouteByKey(key).then(function (route) {
                    return rxUrlUtils.isActive(route, rxUrlUtils.getCurrentPathChunks());
                }, function () {
                    return $q.reject();
                });

            },
            /**
             * functionality to update routes based on their key
             * @param {String} key Route key used to identify it in navigation
             * @param {Object} routeInfo Information used to overwrite original properties
             * @return {Boolean} true if successfully updated, false if key not found
             */
            setRouteByKey: function (key, routeInfo) {
                return this.getIndexByKey(key).then(function (routeIndex) {
                    routes = updateRouteByIndex(routeIndex, routeInfo, routes, 0);

                    // now that we've updated the route info, we need to reset the dynamic properties
                    routes = setDynamicProperties(routes);

                    return routeIndex;
                }, function () {
                    return $q.reject();
                });
            },
            getAll: function () {
                return loadingDeferred.promise.then(function () {
                    return routes;
                });
            },
            setAll: function (newRoutes) {
                // let's not mess with the original object
                var routesToBe = _.cloneDeep(newRoutes);

                routes = setDynamicProperties(routesToBe);
                loadingDeferred.resolve();
            },
            rebuildUrls: function (extraUrlContext) {
                setDynamicProperties(routes, extraUrlContext);
            }
        };
    };

    return AppRoutes;
});
