angular.module('encore.ui.utilities')
/**
 * @deprecated This item will be removed in a future release of EncoreUI.
 * @ngdoc service
 * @name utilities.service:rxBreadcrumbsSvc
 * @description
 * `rxBreadcrumbsSvc` provides various methods to manipulate breadcrumbs.
 *
 */
.factory('rxBreadcrumbsSvc', function () {
    // default will always be home
    var breadcrumbs = [{
        path: '/',
        name: 'Home'
    }];
    var breadcrumbsService = {};

    breadcrumbsService.set = function (items) {
        // reset to just homepage
        breadcrumbs = breadcrumbs.splice(0, 1);
        // add in new breadcrumbs
        breadcrumbs = breadcrumbs.concat(items);
    };

    breadcrumbsService.getAll = function (titleStatus) {
        // return a copy of the array (so it can't be modified)
        var copy = breadcrumbs.slice(0);

        // If a titleStatus tag was passed in for the page, check each of the
        // breadcrumbs to see if they're asking for that tag
        if (_.isString(titleStatus) && titleStatus) {
            _.each(copy, function (breadcrumb) {
                // only add the page status tag to the breadcrumb if it
                // doesn't already have its own status tag defined
                if (breadcrumb.usePageStatusTag && !breadcrumb.status) {
                    breadcrumb.status = titleStatus;
                }
            });
        }
        return copy;
    };

    /**
     * @ngdoc function
     * @name rxBreadcrumbsSvc.setHome
     * @methodOf utilities.service:rxBreadcrumbsSvc
     * @description
     * By default, the first breadcrumb will always have an URL of `'/'` and a name of `'Home'`.  This can be changed
     * with the `rxBreadcrumbsSvc.setHome` method.
     *
     * It takes the *new path* as the `first argument`, and an *optional name* as the `second argument`. If you don't
     * pass the `second argument`, it will reuse whatever name is already there (i.e. `'Home'`).
     * The breadcrumb name can contain HTML (ie. `'<strong>Home</strong>'`).
     *
     * @param {String} path This is the relative path within app.
     * @param {String=} name This will be the display name.
     *
     * @example
     * <pre>
     * breadcrumbsService.setHome = function (path, name) {
     *   breadcrumbs[0] = {
     *     path: path,
     *     name: name || breadcrumbs[0].name
     *   };
     * };
     * </pre>
     *
     */
    breadcrumbsService.setHome = function (path, name) {
        breadcrumbs[0] = {
            path: path,
            name: name || breadcrumbs[0].name
        };
    };

    return breadcrumbsService;
});
