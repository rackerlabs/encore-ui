angular.module('encore.ui.rxApp')
/**
 * @ngdoc directive
 * @name rxApp.directive:rxApp
 * @restrict E
 * @scope
 * @description
 * Responsible for creating the HTML necessary for a common Encore layout.
 *
 * @param {String=} siteTitle Title of site to use in upper right hand corner
 * @param {Array=} menu Menu items used for left-hand navigation
 * @param {String=} collapsibleNav Set to 'true' if the navigation menu should be collapsible
 * @param {String=} collapsedNav Binding for the collapsed state of the menu.
 * @param {Boolean=} newInstance Whether the menu items should be a new instance of `rxAppRoutes`
 * @param {Boolean=} [hideFeeback=false] Whether to hide the 'feedback' link
 * @param {String=} logoutUrl URL to pass to rx-logout
 *
 * @example
 * <pre>
 * <rx-app site-title="Custom Title"></rx-app>
 * </pre>
 */
.directive('rxApp', function (encoreRoutes, rxAppRoutes, hotkeys,
                              Environment, routesCdnPath, Session, $window) {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'templates/rxApp.html',
        scope: {
            siteTitle: '@?',
            menu: '=?',
            collapsibleNav: '@',
            collapsedNav: '=?',
            newInstance: '@?',
            hideFeedback: '@?',
            logoutUrl: '@?'
        },
        link: function (scope) {
            scope.userId = Session.getUserId();

            scope.isPreProd = Environment.isPreProd();

            scope.isLocalNav = routesCdnPath.hasCustomURL && (Environment.isLocal());

            scope.isWarning = scope.isPreProd || scope.isLocalNav;

            scope.isEmbedded = $window.self !== $window.top;

            if (scope.isPreProd) {
                scope.warningMessage =
                    'You are using a pre-production environment that has real, live production data!';
            } else if (scope.isLocalNav) {
                scope.warningMessage =
                    'You are using a local nav file. Remove it from your config before committing!';
            }

            // default hideFeedback to false
            var appRoutes = scope.newInstance ? new rxAppRoutes() : encoreRoutes;

            // we only want to set new menu data if a new instance of rxAppRoutes was created
            // or if scope.menu was defined
            if (scope.newInstance || scope.menu) {
                appRoutes.setAll(scope.menu);
            } else {
                // if the default menu is needed, load it from the CDN
                // a cached copy is assigned if available
                scope.routes = appRoutes.fetchRoutes();
            }

            var setRoutes = function () {
                appRoutes.getAll().then(function (routes) {
                    scope.routes = routes;
                });
            };

            scope.$evalAsync(setRoutes);
            scope.$on('rxUpdateNavRoutes', setRoutes);

            // default hideFeedback to false
            scope.hideFeedback = scope.hideFeedback ? true : false;

            if (scope.collapsibleNav) {
                hotkeys.add({
                    combo: 'h',
                    description: 'Show/hide the main menu',
                    callback: function () {
                        scope.collapsedNav = !scope.collapsedNav;
                    }
                });
            }
        }
    };
});
