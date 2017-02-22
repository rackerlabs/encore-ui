function genericRouteController (breadcrumbs) {
    return function (rxBreadcrumbsSvc) {
        if (breadcrumbs === undefined) {
            breadcrumbs = [{
                name: '',
                path: ''
            }]
        }

        rxBreadcrumbsSvc.set(breadcrumbs);
    }
}

angular.module('demoApp', ['encore.ui', 'ngRoute'])
.config(function ($routeProvider, rxStatusTagsProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/overview'
        })
        .when('/login', {
            templateUrl: 'templates/login.html',
            controller: genericRouteController()
        })
        .when('/overview', {
            templateUrl: 'templates/overview.html',
            controller: genericRouteController()
        })

        /* Layout */

        /* Style Pages */
        .when('/styles/color', {
            templateUrl: 'templates/styles/color.html',
            controller: genericRouteController([
                { name: 'Color' }
            ])
        })
        .when('/styles/formatting', {
            templateUrl: 'templates/styles/formatting.html',
            controller: genericRouteController([{
                name: 'Formatting'
            }])
        })
        .when('/styles/layout/detail', {
            templateUrl: 'templates/styles/layouts/detail-page.html',
            controller: genericRouteController([
                { name: 'Detail Page' }
            ])
        })
        .when('/styles/layout/data-table', {
            templateUrl: 'templates/styles/layouts/data-table-page.html',
            controller: genericRouteController([
                { name: 'Data Table' }
            ])
        })
        .when('/styles/layout/form', {
            templateUrl: 'templates/styles/layouts/form-page.html',
            controller: genericRouteController([
                { name: 'Form Page' }
            ])
        })
        .when('/styles/typography', {
            templateUrl: 'templates/styles/typography.html',
            controller: genericRouteController([
                {
                    name: 'Typography'
                }
            ])
        })

        /* Module Pages */
        .when('/modules', {
            templateUrl: 'templates/modules/listModules.html',
            controller: 'listModulesController',
            controllerAs: 'vm'
        })
        .when('/modules/:module', {
            templateUrl: 'templates/modules/showModule.html',
            controller: 'showModuleController',
            resolve: {
                'module': function ($route, Modules) {
                    return _.find(Modules, {
                        'name': $route.current.params.module
                    });
                }
            }
        })

        /* Utilities Pages */
        .when('/utilities', {
            templateUrl: 'templates/modules/listCategoryModules.html',
            controller: 'listUtilitiesController',
            controllerAs: 'vm'
        })
        .when('/utilities/:utility', {
            templateUrl: 'templates/modules/showModule.html',
            controller: 'showModuleController',
            resolve: {
                'module': function ($route, Modules) {
                    return _.find(Modules, {
                        'name': $route.current.params.utility,
                        category: 'utilities'
                    });
                }
            }
        })

        /* Elements Pages */
        .when('/elements', {
            templateUrl: 'templates/modules/listCategoryModules.html',
            controller: 'listElementsController',
            controllerAs: 'vm'
        })
        .when('/elements/:element', {
            templateUrl: 'templates/modules/showModule.html',
            controller: 'showModuleController',
            resolve: {
                'module': function ($route, Modules) {
                    return _.find(Modules, {
                        'name': $route.current.params.element,
                        category: 'elements'
                    });
                }
            }
        })

        /* Component Pages */ /* Deprecated in favor of Elements */
        .when('/components', {
            templateUrl: 'templates/modules/listCategoryModules.html',
            controller: 'listComponentsController',
            controllerAs: 'vm'
        })
        .when('/components/:component', {
            templateUrl: 'templates/modules/showModule.html',
            controller: 'showModuleController',
            resolve: {
                'module': function ($route, Modules) {
                    return _.find(Modules, {
                        'name': $route.current.params.component,
                        category: 'components'
                    });
                }
            }
        });

    // Define a custom status tag for use in the rxBreadcrumbs demo
    rxStatusTagsProvider.addStatus({
        key: 'demo',
        class: 'alpha-status',
        text: 'Demo Tag'
    });
})
.run(function ($rootScope, $window, $location, $anchorScroll, $interpolate,
               rxEnvironment, rxBreadcrumbsSvc, rxPageTitle, Modules, $timeout) {
    var baseGithubUrl = '//rackerlabs.github.io/encore-ui/';
    rxEnvironment.add({
        name: 'ghPages',
        pattern: /\/\/rackerlabs.github.io/,
        url: baseGithubUrl + '{{path}}'
    });

    rxBreadcrumbsSvc.setHome('#/overview', 'Overview');

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

    $rootScope.demoNav = [
        {
            type: 'no-title',
            children: [
                {
                    linkText: 'Version 3.4.0-0',
                    directive: 'switch-docs',
                    children: [{}],
                    childVisibility: 'false'
                },
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
                { /* Deprecated in favor of Elements */
                    linkText: 'Components',
                    children: linksForModuleCategory('components')
                }
            ]
        }
    ];

    rxPageTitle.setSuffix(' - EncoreUI');

    $rootScope.$on('$routeChangeSuccess', function () {
        $timeout($anchorScroll, 250);
    });
});
