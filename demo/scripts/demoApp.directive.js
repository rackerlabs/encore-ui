(function () {
    angular
        .module('demoApp')
        .directive('demoApp', DemoAppDirective);

    function DemoAppDirective ($rootScope, $location, Modules) {
        var linksForModuleCategory = function (kategory) {
            var filteredModules = _.filter(Modules, {
                category: kategory,
                isCategory: false
            });

            var sortedModules = _.sortBy(filteredModules, function (mod) {
                return mod.displayName.toLowerCase();
            });

            return sortedModules.map(function (mod) {
                return {
                    href: ['#', kategory, mod.name].join('/'),
                    linkText: mod.displayName
                };
            });
        };//linksForModuleCategory()

        var _appRoutes = [
            {
                linkText: 'Overview',
                href: '#/overview'
            },
            {
                linkText: 'Styleguide',
                children: [
                    {
                        linkText: 'Color',
                        href: '#/styles/color'
                    },
                    {
                        linkText: 'Date/Time Formatting',
                        href: '#/styles/formatting'
                    },
                    {
                        linkText: 'Layouts',
                        children: [
                            {
                                linkText: 'Layout 1: Detail Page',
                                href: '#/styles/layout/detail'
                            },
                            {
                                linkText: 'Layout 2: Data Table',
                                href: '#/styles/layout/data-table'
                            },
                            {
                                linkText: 'Layout 3: Form Page',
                                href: '#/styles/layout/form'
                            }
                        ]
                    },
                    {
                        linkText: 'Typography',
                        href: '#/styles/typography'
                    }
                ]
            },
            { /* temporary solution until site-wide search is implemented */
                linkText: 'All Modules',
                href: '#/modules'
            },
            {
                linkText: 'Elements',
                children: linksForModuleCategory('elements')
            },
            {
                linkText: 'Utilities',
                children: linksForModuleCategory('utilities')
            },
            {
                linkText: 'Components',
                children: linksForModuleCategory('components')
            }
        ];

        function setDynamicRoutes (routes) {
            var currentUrl = $location.url();

            routes.forEach(function (route) {
                if (route.children) {
                    /*
                     * Recurse through children to see if any of them
                     * should be active
                     */
                    route.children = setDynamicRoutes(route.children);
                    /*
                     * Route is active if ANY child is active.
                     */
                    route.active = _.some(route.children, 'active');
                } else if (!_.isEmpty(route.href)) {
                    // Prepend a "#" for easier matching
                    var normalizedUrl = '#' + currentUrl;
                    var regexHref = new RegExp(route.href + '\\b', 'g');

                    /*
                     * Does the normalizedUrl contain the route.href?
                     * https://regex101.com/r/xFBHll/1
                     *
                     * $location.url() | normalizedUrl | route.href | result
                     * --------------- | ------------- | ---------- | ------
                     * /foo/bar        | #/foo/bar     | #/foo      | TRUE
                     * /foo/bar?a=b    | #/foo/bar?a=b | #/foo      | TRUE
                     * /foo/bar?a=b    | #/foo/bar?a=b | #/bar      | FALSE
                     * /foobar         | #/foobar      | #/foo      | FALSE
                     */
                    route.active = regexHref.test(normalizedUrl);
                } else {
                    /*
                     * Route should not be active
                     * - Not part of current url
                     * - No active children
                     */
                    route.active = false;
                }
            });

            return routes;
        }//setDynamicRoutes()

        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            templateUrl: 'templates/demo-app.html',
            controller: function ($scope) {
                var setRoutes = function () {
                    var routesToBe = _.cloneDeep(_appRoutes);
                    $scope.routes = setDynamicRoutes(routesToBe);
                };//setRoutes()

                $scope.$evalAsync(setRoutes);
                $rootScope.$on('$routeChangeSuccess', setRoutes);
            }
        };
    }//DemoAppDirective
})();
