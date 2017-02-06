angular.module('encore.ui.rxApp')
/**
 * @ngdoc directive
 * @name rxApp.directive:rxAppNavItem
 * @restrict E
 * @scope
 * @description
 * Creates a menu item. Recursively creates rx-app-nav if 'children' present.
 * 'Item' must be avialable via scope
 *
 * @example
 * <pre>
 * <rx-app-nav-item ng-repeat="item in items"></rx-app-nav-item>
 * </pre>
 */
.directive('rxAppNavItem', function ($compile, $location, $route) {
    var linker = function (scope, element) {
        var injectContent = function (selector, content) {
            var el = element[0].querySelector(selector);
            el = angular.element(el);

            $compile(content)(scope, function (compiledHtml) {
                el.append(compiledHtml);
            });
        };

        var directiveHtml = '<directive></directive>';
        // add navDirective if defined
        if (angular.isString(scope.item.directive)) {
            // convert directive string to HTML
            // e.g. my-directive -> <my-directive></my-directive>
            directiveHtml = directiveHtml.replace('directive', scope.item.directive);

            injectContent('.item-directive', directiveHtml);
        }

        // increment nesting level for child items
        var childLevel = scope.$parent.level + 1;
        // safety check that child level is a number
        if (isNaN(childLevel)) {
            childLevel = 2;
        }
        // add children if present
        // Note: this can't be added in the HTML due to angular recursion issues
        var rxNavTemplate = '<rx-app-nav items="item.children" level="' + childLevel + '">' +
            '</rx-app-nav>';
        if (angular.isArray(scope.item.children)) {
            injectContent('.item-children', rxNavTemplate);
        }
    };

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/rxAppNavItem.html',
        link: linker,
        scope: {
            item: '='
        },
        controller: function ($scope, $location, $injector, rxVisibility, Permission, rxUrlUtils) {
            /*
             * @description Determines whether or not a nav item should have its href prefixed
             * based on whether the `$injector` has a `NAV_ITEM_PREFIX` injectable
             *
             * _This is *NOT* meant for general consumption, this is strictly for the Origin Project_
             * _This will eventually be deprecated and removed_
             *
             * @param {string} [url] - URL for the nav item's href
             */
            $scope.getUrl = function (url) {
                // For URLs that have no URL definition, let's go ahead and return right away
                // this avoids issues when we do have a prefix but really the nav item should not have
                // any defined href, i.e. items that have subitems
                if (_.isEmpty(url)) {
                    return url;
                }

                // Check if we have a definition of NAV_ITEM_PREFIX, if so let's retrieve it and return the given URL
                // appended to the prefix.  This allows applications like origin to prefix nav items, while not
                // messing with nav items in the demo/documentation.
                //
                // _This is *NOT* meant for general consumption, this is strictly for the Origin Project_
                // _This will eventually be deprecated and removed_
                //

                if ($injector.has('NAV_ITEM_PREFIX')) {
                    var prefix = rxUrlUtils.parseUrl($injector.get('NAV_ITEM_PREFIX'));
                    return prefix.protocol.concat('//').concat(prefix.host).concat(url);
                } else {
                    // Return as normal if no prefix
                    return url;
                }

            };
            /*
             * @description Determines whether or not the links need to point to a target, this allows
             * for origin and applications that show the nav to implement a target in which to have the links
             * open in.
             *
             * If ever there was a need to point links to a different target than an application specific
             * target, we could implement logic here to inspect the item and determine the target.
             * (i.e. opening an external application in a new window)
             */
            $scope.getTarget = function () {
                // Check if we have a definition of NAV_ITEM_TARGET, if so let's retrieve it and enable the target attr
                // on the nav item.  This allows applications like origin to give a target to it's nav items, while not
                // messing with nav items in the demo/documentation.
                // We have to pass null in order for the `target` attribute to have no value, the reason for this
                // is ngRoute will take an href with `target="_self"` and not use it's $location service
                // allowing the browser to reload the angular application
                return $injector.has('NAV_ITEM_TARGET') ? $injector.get('NAV_ITEM_TARGET') : null;
            };
            // provide `route` as a scope property so that links can tie into them
            $scope.route = $route;

            var roleCheck = function (roles) {
                if (_.isUndefined(roles)) {
                    return true;
                }

                if (!_.isUndefined(roles.any)) {
                    return Permission.hasRole(roles.any);
                }

                if (!_.isUndefined(roles.all)) {
                    return Permission.hasAllRoles(roles.all);
                }

                return false;
            };

            /*
             * @description Determines whether or not a nav item should be displayed, based on `visibility`
             * criteria and `roles` criteria
             * @param [visibility] - Can be an expression, a function, an array (using format below) to
             *                     determine visibility
             * @param {object} [roles] - An object with a format { 'any': ['role1', 'role2'] } or
             *                           { 'all': ['role1', 'role2'] }
             */
            $scope.isVisible = function (visibility, roles) {
                var locals = {
                    location: $location
                };
                if (_.isUndefined(visibility) && _.isUndefined(roles)) {
                    // no visibility or role criteria specified, so default to true
                    return true;
                }

                if (_.isArray(visibility)) {
                    // Expected format is
                    // ["someMethodName", { param1: "abc", param2: "def" }]
                    // The second element of the array is optional, used to pass extra
                    // info to "someMethodName"
                    var methodName = visibility[0];
                    var configObj = visibility[1]; //optional

                    _.merge(locals, configObj);

                    // The string 'false' will evaluate to the "real" false
                    // in $scope.$eval
                    visibility = rxVisibility.getMethod(methodName) || 'false';
                }

                // If `visibility` isn't defined, then default it to `true` (i.e. visible)
                var visible = _.isUndefined(visibility) ? true : $scope.$eval(visibility, locals),
                    hasRole = true;

                // Only do a roleCheck() if `visible` is true. If we failed the visibility test,
                // then we must ensure the nav item is not displayed, regardless of the roles
                if (visible && _.isObject(roles)) {
                    hasRole = roleCheck(roles);
                }

                return visible && hasRole;
            };

            $scope.toggleNav = function (ev, href) {
                // if no href present, simply toggle active state
                if (_.isEmpty(href)) {
                    ev.preventDefault();
                    $scope.item.active = !$scope.item.active;
                }
                // otherwise, let the default nav do it's thing
            };

            $scope.navigateToApp = function (ev, url) {
                // We want to control what the click to the <a> tag does
                // If it is Origin prevent the default click action
                // otherwise handle the click as normal (implied by the lack of else block)
                if ($injector.has('oriLocationService')) {
                    var oriLocationService = $injector.get('oriLocationService');
                    var currentIframeUrl = oriLocationService.getCanvasURL();
                    var finalUrl = $scope.getUrl(url);

                    ev.preventDefault();
                    // Only change the iFrame if the urls are different
                    if (!_.isEmpty(finalUrl) && currentIframeUrl !== finalUrl) {
                        oriLocationService.setCanvasURL(finalUrl);
                    }
                }
            };

            $scope.navClickHandler = function (clickEvent, item) {
                $scope.toggleNav(clickEvent, item.href);
                $scope.navigateToApp(clickEvent, item.url);
            }
        }
    };
});
