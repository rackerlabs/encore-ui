/**
 * @ngdoc overview
 * @name rxApp
 * @description
 * # rxApp Component
 *
 * This component is responsible for creating the HTML necessary for a common
 * Encore layout. It builds out the main navigation, plus breadcrumbs and page
 * titles.
 *
 * # Usage
 *
 * For apps that want to use the default Encore navigation, usage is pretty simple.
 * In your index.html file, add the `rx-app` directive inside your app:
 *
 * <pre>
 * <body ng-app="myApp">
 *     <rx-app>
 *         <ng-view></ng-view>
 *     </rx-app>
 * </body>
 * </pre>
 *
 * By including `ng-view`, your view content will be added inside the directive.
 * This makes setting up views for each page much simpler, since you don't have
 * to include `rx-app` in each view.
 *
 * Inside your view, you'll likely want to use `rx-page` to wrap your content.
 * See the `rx-page` docs for more information on this.
 *
 * # rxApp Navigation
 *
 * By default, the EncoreUI left-hand navigation is loaded at runtime from a
 * separate resource. This source can be changed, and there are many options to
 * control the navigation from an app level.
 *
 * ## Accessing route information
 *
 * Sometimes it's helpful to have the current route information available for
 * menu items. For example, re-using the current params for path building.
 *
 * To help with this, $route is exposed on the scope of all menu items.
 * [`$route` provides many details on the current view](http://goo.gl/IsIscD),
 * including the ability to access the current controller and scope for the view.
 *
 * To see this in action, check out the 'childVisibility' property for
 * Account-level Tool in `encoreNav`.
 *
 * ## Accessing properties on $rootScope
 *
 * If you have a property available on the `$rootScope` of your app that the
 * menu data needs to access,
 * [you can reference `$rootScope` via `$root`](http://goo.gl/8vHlsN).
 * See the demo for an example of this.
 *
 * ## Dynamically updating the menu
 *
 * By default, rxApp will create the navigation menu based on the routes defined
 * in the 'encoreNav' value. This menu is built using the {@link utilities.service:rxAppRoutes rxAppRoutes} service.
 *
 * To update a route, use the `setRouteByKey` function on the `rxAppRoutes` service:
 *
 * <pre>
 * rxAppRoutes.setRouteByKey('myKey', {
 *     linkText: 'myUpdatedRoute'
 * });
 * </pre>
 *
 * You would normally either set this in your app's `.run` function, or in a
 * specific controller.
 *
 * ## Custom Menus
 *
 * If you'd like to create an entirely custom menu, you can pass that data in to
 * the `rx-app` directive via the `menu` attribute. View the demo for an example
 * of this.
 *
 * # Common Styling
 *
 * The rxApp common.less file defines many base CSS rules and classes for app use.
 * Included in this is [normalize.css](http://necolas.github.io/normalize.css/).
 * This helps create a consistent starting point for styles across all browsers.
 *
 * ## Fonts
 *
 * The EncoreUI default font is Roboto. This is used for all text on the page
 * and is loaded via Google Fonts. Be sure your app includes the following line:
 *
 * <pre>
 * <link href="https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,700,700italic"
 *       rel="stylesheet" type="text/css" />
 * </pre>
 *
 * ## Directives
 * * {@link rxApp.directive:rxAccountSearch rxAccountSearch}
 * * {@link rxApp.directive:rxAccountUsers rxAccountUsers}
 * * {@link rxApp.directive:rxApp rxApp}
 * * {@link rxApp.directive:rxAppNav rxAppNav}
 * * {@link rxApp.directive:rxAppNavItem rxAppNavItem}
 * * {@link rxApp.directive:rxAppSearch rxAppSearch}
 * * {@link rxApp.directive:rxAtlasSearch rxAtlasSearch}
 * * {@link rxApp.directive:rxBillingSearch rxBillingSearch}
 * * {@link rxApp.directive:rxPage rxPage}
 * * {@link rxApp.directive:rxStatusTag rxStatusTag}
 * * {@link rxApp.directive:rxTicketSearch rxTicketSearch}
 */
angular.module('encore.ui.rxApp', [
    'encore.ui.utilities',
    'ngRoute',
    'ngSanitize'
]);
