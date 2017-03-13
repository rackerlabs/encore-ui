angular.module('encore.ui.elements')
/**
 * @deprecated This directive will be removed in EncoreUI 4.0.0
 * @ngdoc directive
 * @name elements.directive:rxBreadcrumbs
 * @restrict E
 * @scope
 * @description
 * Responsible for drawing the breadcrumbs for a page.
 *
 *
 * By default, the first breadcrumb will always have an URL of `'/'` and a name of `'Home'`. This can be changed
 * with the `rxBreadcrumbsSvc.setHome` method (see {@link utilities.service:rxBreadcrumbsSvc rxBreadcrumbsSvc}).
 *
 * @param {String=} status
 * The tag to apply to any breadcrumbs with usePageStatusTag:true
 *
 * This leverages the tags defined in {@link rxApp} to display status tags directly inside of breadcrumbs.
 * For a given breadcrumb, `status` will take precedence over `usePageStatusTag`, i.e. it will use a tag defined in
 * `status` instead of checking for and using a tag for the page.
 *
 * @param {Boolean=} [usePageStatusTag=false]
 * If you set it to `true`,
 * then the breadcrumb will use whatever status tag was passed to page, i.e.:
 * <pre>
 * <rx-page status="alpha">
 * </pre>
 * This will cause any breadcrumb marked with `usePageStatusTag` on this page to receive the `"alpha"` status tag.
 *
 * @example
 * <pre>
 * <rx-app site-title="Custom Title"></rx-app>
 * </pre>
 */
.directive('rxBreadcrumbs', function (suppressDeprecationWarnings) {
    if (!suppressDeprecationWarnings) {
        console.warn(
            'DEPRECATED: rxBreadcrumbs will be removed in EncoreUI 4.0.0'
        );
    }

    return {
        restrict: 'E',
        templateUrl: 'templates/rxBreadcrumbs.html',
        controller: function ($scope, rxBreadcrumbsSvc) {
            $scope.breadcrumbs = rxBreadcrumbsSvc;
        },
        scope: {
            status: '@'
        }
    };
});
