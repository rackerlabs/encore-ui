angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxPaginate
 * @restrict E
 * @description
 * The rxPaginate component adds pagination to a table.
 *
 * Two different forms of pagination are supported:
 *
 * 1. UI-based pagination, where all items are retrieved at once, and paginated in the UI
 * 2. Server-side pagination, where the pagination directive works with a paginated API
 *
 * # UI-Based Pagination
 * With UI-Based pagination, the entire set of data is looped over via an `ngRepeat` in the table's
 * `<tbody>`, with the data passed into the `Paginate` filter. This filter does the work of paginating
 * the set of data and communicating with the `<rx-paginate>` to draw the page selection buttons at the
 * bottom of the table.
 *
 * As shown in the first example below, the `ngRepeat` will usually look like this:
 *
 * <pre>
 * <tr ng-repeat="server in servers |
 *                orderBy: sorter.predicate:sorter.reverse |
 *                Paginate:pager ">
 * </pre>
 *
 * In this case,
 *
 * 1. `servers` is a variable bound to your page `$scope`, and contains the full set of servers.
 * 2. This is then passed to `orderBy`, to perform column sorting with `rxSortableColumn`.
 * 3. The sorted results are then passed to `Paginate:pager`, where `Paginate` is a filter from the
 * `rxPaginate` module, and `pager` is a variable on your scope created like
 * `$scope.pager = rxPageTracker.createInstance();`.
 *
 * This `pager` is responsible for tracking pagination state (i.e. "which page are we on", "how many
 * items per page", "total number of items tracked", etc.
 *
 * To add the pagination buttons to your table, do the following in your `<tfoot>`:
 * <pre>
 * <tfoot>
 *     <tr class="paginate-area">
 *         <td colspan="2">
 *             <rx-paginate page-tracking="pager"></rx-paginate>
 *         </td>
 *     </tr>
 * </tfoot>
 * </pre>
 *
 * Here we are using the `<rx-paginate>` directive to draw the buttons, passing it the same `pager`
 * instance described above.
 *
 * Because all of the `servers` get passed via `ng-repeat`, it means you don't need to take explicit
 * action if the set of data changes. You can change `$scope.servers` at any time, and `<rx-paginate>`
 * will automatically re-process it.
 *
 * ## Persistence
 *
 * The user's preference for the number of items to display per page will be persisted across applications
 * using {@link utilities.service:rxLocalStorage rxLocalStorage}. This preference is set whenever the user selects
 * a new number to show.
 *
 * This applies to both UI-based pagination and API-based pagination.
 *
 * *NOTE*: If `itemsPerPage` is explicitly specified in the `opts` you pass to `rxPageTracker.createInstance()`,
 * then that pager instance will load using the `itemsPerPage` you specified, and _not_ the globally persisted value.
 *
 * *NOTE*: If you don't want a specific pager to have its `itemsPerPage` persisted to other pagers,
 * pass `persistItemsPerPage: false` with the `opts` to `createInstance()`.
 *
 * ## Hiding the pagination
 *
 * In some instances, the pagination should be hidden if there isn't enough data to require it. For example,
 * if you have `itemsPerPage` set to 10, but only have 7 items of data (so only one page). Hiding the
 * pagination is pretty simple:
 *
 * <pre>
 * <rx-paginate page-tracking="pager" ng-hide="pager.totalPages === 1"></rx-paginate>
 * </pre>
 *
 * You can use this code on any part of your view. For example, if you have pagination in your table
 * footer, it's a good idea to hide the entire footer:
 *
 * <pre>
 * <tfoot ng-hide="pager.totalPages === 1">
 *     <tr class="paginate-area">
 *         <td colspan="12">
 *             <rx-paginate page-tracking="pager"></rx-paginate>
 *         </td>
 *     </tr>
 * </tfoot>
 * </pre>
 *
 *
 * This applies to both UI-based pagination and API-based pagination.
 *
 * # API-Based Pagination
 * Many APIs support pagination on their own. Previously, we would have to grab _all_ the data at once,
 * and use the UI-Based Pagination described above. Now we have support for paginated APIs, such that we
 * only retrieve data for given pages when necessary.
 *
 * With API-based pagination, the `ngRepeat` for your table will instead look like this:
 * <pre>
 * <tr ng-repeat="server in pagedServers.items">
 * </pre>
 *
 * Note a few things here:
 *
 * 1. We now loop over a variable provided by the pager.
 * 2. We no longer pass the values through _any_ filters. Not a search text filter, not sorting filter,
 * and not the `Paginate` filter.
 *
 * ** BEGIN WARNING **
 *
 * You should _never_ access `pagedServers.items` from anywhere other than the `ng-repeat`. Do not touch
 * it in your controller. It is a dynamic value that can change at anytime. It is only intended for use
 * by `ng-repeat`.
 *
 * ** END WARNING **
 *
 * The `<tfoot>` will look like this:
 *
 * <pre>
 * <tfoot>
 *     <tr class="paginate-area">
 *         <td colspan="2">
 *             <rx-paginate
 *                 page-tracking="pagedServers"
 *                 server-interface="serverInterface"
 *                 filter-text="searchText"
 *                 selections="selectFilter.selected"
 *                 sort-column="sort.predicate"
 *                 sort-direction="sort.reverse">
 *             </rx-paginate>
 *         </td>
 *     </tr>
 * </tfoot>
 * </pre>
 *
 *  * `page-tracking` still receives the pager (`pagedServers` in this case) as an argument. What's
 *  new are the next four parameters.
 *  * `server-interface` _must_ be present. It has to be passed an object with a `getItems()` method
 *  on it. This method is what `<rx-paginate>` will use to request data from the paginated API.
 *  * `filter-text`, `selections`, `sort-column` and `sort-direction` are all optional. If present,
 *  `<rx-paginate>` will watch the variables for changes, and will call `getItems()` for updates whenever
 *  the values change.
 *
 * *Note:* If using `<rx-select-filter>` in the table, the `available` option passed to the `rxSelectFilter`
 * constructor **must** be provided and include every property.  This is because the filter cannot reliably
 * determine all available options from a paginated API.
 *
 * You will still create a `rxPageTracker` instance on your scope, just like in UI-based pagination:
 *
 * <pre>
 * $scope.pagedServers = rxPageTracker.createInstance();
 * </pre>
 *
 * ## getItems()
 * The `getItems()` method is one you write on your own, and lives as an interface between `<rx-paginate>`
 * and the server-side paginated API that you will be calling. The framework will make calls to `getItems()`
 * when appropriate. Rather than have to teach `<rx-paginate>` about how to call and parse a multitude of
 * different paginated APIs, it is your responsibility to implement this generic method.
 *
 * `getItems()` takes two required parameters, and one optional parameter object. When the framework calls it,
 * it looks like:
 *
 * <pre>
 * getItems(pageNumber, itemsPerPage, {
 *     filterText: some_filter_search_text,
 *     selections: selected_options_from_filters,
 *     sortColumn: the_selected_sort_column,
 *     sortDirection: the_direction_of_the_sort_column
 * });
 * </pre>
 *
 * where:
 *
 * * `pageNumber`: the 0-based page of data that the user has clicked on/requested
 * * `itemsPerPage`: the value the user currently has selected for how many items per page they wish to see
 * * `filterText`: the filter search string entered by the user, if any
 * * `selections`: an object containing the item properties and their selected options
 * * `sortColumn`: the name of the selected sort column, if any
 * * `sortDirection`: either `'ASCENDING'` or `'DESCENDING'`
 *
 * When the framework calls `getItems()`, you **_must_ return a promise**. When this promise resolves,
 * the resolved object must have the following properties on it:
 *
 * * `items`: An array containing the actual items/rows of the table returned for the request. This should at
 * least contain `itemsPerPage` items, if that many items exist on the given page
 * * `pageNumber`: The 0-based page number that these items belong to. Normally this should be the same as the
 * `pageNumber` value passed to `getItems()`
 * * `totalNumberOfItems`: The total number of items available, given the `filterText` parameter.
 *
 * Examples are below.
 *
 * ## `totalNumberOfItems`
 *
 * If you could get all items from the API in _one call_, `totalNumberOfItems` would reflect the number of items
 * returned (given necessary search parameters). For example, say the following request was made:
 *
 * <pre>
 * var pageNumber = 0;
 * var itemsPerPage = 50;
 *
 * getItems(pageNumber, itemsPerPage);
 * </pre>
 *
 * This is asking for all the items on page 0, with the user currently viewing 50 items per page. A valid response
 * would return 50 items. However, the _total_ number of items available might be 1000 (i.e. 20 pages of results).
 * Your response must then have `totalNumberOfItems: 1000`. This data is needed so we can display to the
 * user "Showing 1-50 of 1000 items" in the footer of the table.
 *
 * If `filterText` is present, then the total number of items might change. Say the request became:
 *
 * <pre>
 * var pageNumber = 0;
 * var itemsPerPage = 50;
 * var opts = {
 *         filterText: "Ubuntu"
 *     };
 *
 * getItems(pageNumber, itemsPerPage, opts);
 * </pre>
 *
 * This means "Filter all your items by the search term 'Ubuntu', then return page 0".
 * If the total number of items matching "Ubuntu" is 200, then your response would have
 * `totalNumberOfItems: 200`. You might only return 50 items in `.items`, but the framework
 * needs to know how many total items are available.
 *
 * ## Forcing a Refresh
 *
 * When using API-based pagination, there might be instances where you want to force a reload of
 * the current items. For example, if the user takes an action to delete an item. Normally, the
 * items in the view are only updated when the user clicks to change the page. To force a refresh, a
 * `refresh()` method is available on the `pagedServers`. Calling this will tell `<rx-paginate>` to
 * refresh itself. You can also pass it a `stayOnPage = true` to tell it to make a fresh request for
 * the current page, i.e.:
 * <pre>
 * var stayOnPage = true;
 * pagedServers.refresh(stayOnPage);
 * </pre>
 *
 * Internally, calling `refresh()` equates to `<rx-paginate>` doing a new `getItems()` call, with
 * the current filter/sort criteria. But the point is that you can't just call `getItems()` yourself
 * to cause an update. The framework has to call that method, so it knows to wait on the returned promise.
 *
 *
 * ## Error Handling
 *
 *
 * `<rx-paginate>` includes a simple way to show error messages when `getItems()` rejects instead of
 * resolves. By passing `error-message="Some error text!"` to `<rx-paginate>`, the string entered
 * there will be shown in an rxNotification whenever `getItems()` fails. If `error-message` is
 * not specified, then nothing will be shown on errors. In either case, on a failure, the table will
 * stay on the page it was on before the request went out.
 *
 * If you wish to show more complicated error messages (and it is highly recommended that you do!),
 * then you'll have to do that yourself. Either put error handling code directly into your `getItems()`,
 * or have something else wait on the `getItems()` promise whenever it's called, and perform the handling there.
 *
 * One way to do this is as so:
 *
 * Let's say that you had defined your `getItems()` method on an object called `pageRequest`,
 *
 * <pre>
 * var pageRequest = {
 *         getItems: function (pageNumber, itemsPerPage, opts) {
 *             var defer = $q.deferred();
 *             ...
 *         }
 *     };
 * </pre>
 *
 * You want your `getItems()` to be unaware of the UI, i.e. you don't want to mix API and UI logic into one method.
 *
 * Instead, you could do something like this:
 *
 * <pre>
 * var pageRequest = {
 *         getItemsFromAPI: function (pageNumber, itemsPerPage, opts) {
 *             var defer = $q.deferred();
 *                ...
 *         }
 *
 *         getItems: function (pageNumber, itemsPerPage, opts) {
 *             var promise = this.getItemsFromAPI(pageNumber, itemsPerPage, opts);
 *
 *             rxPromiseNotifications.add(promise, {
 *                 error: 'Error loading page ' + pageNumber
 *             }
 *
 *             return promise;
 *         }
 *     };
 * </pre>
 *
 * Thus we've moved the API logic into `getItemsFromAPI`, and handled the UI logic separately.
 *
 * ## Extra Filtering Parameters
 *
 * By default, `<rx-paginate>` can automatically work with a search text field (using `search-text=`).
 * If you need to filter by additional criteria (maybe some dropdowns/radiobox, extra filter boxes, etc),
 * you'll need to do a bit more work on your own.
 *
 * To filter by some element X, set a `$watch` on X's model. Whenever it changes, call
 * `pagedServers.refresh()` to force `<rx-paginate>` to do a new `getItems()` call. Then, in your
 * `getItems()`, grab the current value of X and send it out along with the normal criteria that are passed
 * into `getItems()`. Something like:
 *
 * <pre>
 * $scope.watch('extraSearch', $scope.pagedServers.refresh);
 *
 * var serverInterface = {
 *         getItems: function (pageNumber, itemsPerPage, opts) {
 *             var extraSearch = $scope.extraSearch;
 *             return callServerApi(pageNumber, itemsPerPage, opts, extraSearch);
 *         }
 *     };
 *
 *    ...
 *
 * <rx-paginate server-interface="serverInterface" ... ></rx-paginate>
 * </pre>
 *
 * Remember that calling `refresh()` without arguments will tell `rx-paginate` to make a fresh request for
 * page 0. If you call it with `true` as the first argument, the request will be made with whatever the current
 * page is, i.e. `getItems(currentPage, ...)`. If you have your own search criteria, and they've changed since the
 * last time this was called, note that the page number might now be different. i.e. If the user was on page 10,
 * they entered some new filter text, and you call `refresh(true)`, there might not even be 10 pages of results
 * with that filter applied.
 *
 * In general, if you call `refresh(true)`, you should check if _any_ of the filter criteria have changed since
 * the last call. If they have, you should ask for page 0 from the server, not the page number passed in to
 * `getItems()`. If you call `refresh()` without arguments, then you don't have to worry about comparing to the
 * last-used filter criteria.
 *
 * ## Local Caching
 *
 * **If you are ok with a call to your API every time the user goes to a new page in the table, then you can ignore
 * this section. If you want to reduce the total number of calls to your API, please read on.**
 *
 * When a `getItems()` request is made, the framework passes in the user's `itemsPerPage` value. If it is 50, and
 * there are 50 results available for the requested page, then you should return _at least_ 50 results. However, you
 * may also return _more_ than 50 items.
 *
 * Initially, `<rx-paginate>` will call `getItems()`, wait for a response, and then update items in the table.  If
 * your `getItems()` returned exactly `itemsPerPage` results in its `items` array, and the user navigates to a
 * different page of data, `getItems()` will be called again to fetch new information from the API.  The user will
 * then need to wait before they see new data in the table. This remains true for every interaction with page data
 * navigation.
 *
 * For example, say the following request is made when the page first loads:
 *
 * <pre>
 * var pageNumber = 0;
 * var itemsPerPage = 50;
 *
 * getItems(pageNumber, itemsPerPage);
 * </pre>
 *
 * Because no data is available yet, `<rx-paginate>` will call `getItems()`, wait for the response, and then draw
 * the items in the table. If you returned exactly 50 items, and the user then clicks "Next" or 2 (to go to the
 * second page), then `getItems()` will have to be called again (`getItems(1, 50)`), and the user will have to wait
 * for the results to come in.
 *
 * However, if your `getItems()` were to pull more than `itemsPerPage` of data from the API, `<rx-paginate>` is
 * smart enough to navigate through the saved data without needing to make an API request every time the page is
 * changed.
 *
 * There are some caveats, though.
 *
 * 1. Your returned `items.length` must be a multiple of `itemsPerPage` (if `itemsPerPage = 50`, `items.length`
 * must be 50, 100, 150, etc.)
 * 2. You will need to calculate the page number sent to the API based on requested values in the UI.
 * 3. If the user enters any search text, and you've passed the search field to `<rx-paginate>` via `search-text`,
 * then the cache will be immediately flushed and a new request made.
 * 4. If you've turned on column-sorting, and passed `sort-column` to `<rx-paginate>`, then the cache will be
 * flushed whenever the user changes the sort, and a new request will be made to `getItems()`
 * 5. If you've passed `sort-direction` to `<rx-paginate>, and the user changes the sort
 * direction, then the cache will be flushed and a new request will be made to `getItems()`
 *
 * Details on this are below.
 *
 * ### Local Caching Formula
 *
 * You have to be careful with grabbing more items than `itemsPerPage`, as you'll need to modify the values
 * you send to your server. If you want to be careful, then **don't ever request more than `itemsPerPage`
 * from your API.**
 *
 * Let's say that `itemsPerPage` is 50, but you want to grab 200 items at a time from the server, to reduce
 * the round-trips to your API. We'll call this 200 the `serverItemsPerPage`. First, ensure that your
 * `serverItemsPerPage` meets this requirement:
 *
 * <pre>
 * (serverItemsPerPage >= itemsPerPage) && (serverItemsPerPage % itemsPerPage === 0)
 * </pre>
 *
 * If you're asking for 200 items at a time, the page number on the server won't match the page number
 * requested by the user. Before, a user call for `pageNumber = 4` and `itemsPerPage = 50` means
 * "Give me items 200-249". But if you're telling your API that each page is 200 items long, then
 * `pageNumber = 4` is not what you want to ask your API for (it would return items 800-999!). You'll need to
 * send a custom page number to the server. In this case, you'd need `serverPageNumber` to be `1`, i.e.
 * the second page of results from the server.
 *
 * We have written a utility function do these calculations for you, `rxPaginateUtils.calculateApiVals`. It
 * returns an object with `serverPageNumber` and `offset` properties. To use it, your `getItems()` might
 * look something like this.
 *
 * <pre>
 * var getItems = function (pageNumber, itemsPerPage) {
 *         var deferred = $q.defer();
 *         var serverItemsPerPage = 200;
 *         var vals = rxPaginateUtils.calculateApiVals(pageNumber, itemsPerPage, serverItemsPerPage);
 *
 *         yourRequestToAPI(vals.serverPageNumber, serverItemsPerPage)
 *         .then(function (items) {
 *             deferred.resolve({
 *                 items: items.slice(vals.offset),
 *                 pageNumber: pageNumber,
 *                 totalNumberOfItems: items.totalNumberOfItems
 *             });
 *
 *         });
 *
 *         return deferred.promise;
 *     };
 * </pre>
 *
 * The following tables should help illustrate what we mean with these conversions. In all three cases,
 * there are a total of 120 items available from the API.
 *
 *
 * | pageNumber | itemsPerPage | Items   | Action     | serverPageNumber | serverItemsPerPage | Items  |
 * |------------|--------------|---------|------------|------------------|--------------------|--------|
 * | 0          | 50           | 1-50    | getItems() | 0                | 50                 | 1-50   |
 * | 1          | 50           | 51-100  | getItems() | 1                | 50                 | 51-100 |
 * | 2          | 50           | 101-120 | getItems() | 2                | 50                 | 101-120|
 *
 *
 * This first table is where you don't want to do any local caching. You send the `pageNumber` and
 * `itemsPerPage` to your API, unchanged from what the user requested. Every time the user clicks to go to
 * a new page, an API request will take place.
 *
 * ***
 *
 *
 * |pageNumber   | itemsPerPage | Items   | Action     | serverPageNumber | serverItemsPerPage | Items |
 * |-------------|--------------|---------|------------|------------------|--------------------|-------|
 * | 0           | 50           | 1-50    | getItems() | 0                | 100                | 1-100 |
 * | 1           | 50           | 51-100  | use cached |                  |                    |       |
 * | 2           | 50           | 101-120 | getItems() | 1                | 100                |101-120|
 *
 *
 * This second example shows the case where the user is still looking at 50 `itemsPerPage`, but you want to
 * grab 100 items at a time from your API.
 *
 * When the table loads (i.e. the user wants to look at the first page of results), an "Action" of
 * `getItems(0, 50)` will take place. Using `calculateApiVals`, the `serverPageNumber` will be 0 when you
 * provide `serverItemsPerPage=100`. When you resolve the `getItems()` promise, you'll return items 1-100.
 *
 * When the user clicks on the second page (page 1), `getItems()` will not be called, `<rx-paginate>` will
 * instead use the values it has cached.
 *
 * When the user clicks on the third page (page 2), `getItems(2, 50)` will be called. You'll use
 * `rxPaginateutils.calculateApiVals` to calculate that `serverPageNumber` now needs to be `1`. Because
 * only 120 items in total are available, you'll eventually resolve the promise with `items` containing
 * items 101-120.
 *
 * ***
 *
 * | pageNumber | itemsPerPage | Items   | Action     | serverPageNumber | serverItemsPerPage | Items |
 * |------------|--------------|---------|------------|------------------|--------------------|-------|
 * | 0          | 50           | 1-50    | getItems() | 0                | 200                | 1-120 |
 * | 1          | 50           | 51-100  | use cached |                  |                    |  &nbsp;     |
 * | 2          | 50           | 101-120 | use cached |                  |                    |  &nbsp;     |
 *
 * In this final example, there are still only 120 items available, but you're asking your API for 200 items
 * at a time. This will cause an API request on the first page, but the next two pages will be cached, and
 * `<rx-paginate>` will use the cached values.
 *
 *
 * Directive that takes in the page tracking object and outputs a page
 * switching controller. It can be used in conjunction with the Paginate
 * filter for UI-based pagination, or can take an optional serverInterface
 * object if you instead intend to use a paginated server-side API
 *
 * @param {Object} pageTracking
 * This is the page tracking service instance to be used for this directive.
 * See {@link utilities.service:rxPageTracker rxPageTracker}
 * @param {Number} numberOfPages
 * This is the maximum number of pages that the page object will display at a
 * time.
 * @param {Object=} serverInterface
 * An object with a `getItems()` method. The requirements of this method are
 * described in the rxPaginate module documentation
 * @param {Object=} filterText
 * The model for the table filter input, if any. This directive will watch that
 * model for changes, and request new results from the paginated API, on change
 * @param {Object=} selections
 * The `selected` property of a rxSelectFilter instance, if one is being used.
 * This directive will watch the filter's selections, and request new results
 * from the paginated API, on change
 * @param {Object=} sortColumn
 * The model containing the current column the results should sort on. This
 * directive will watch that column for changes, and request new results from
 * the paginated API, on change
 * @param {Object=} sortDirection
 * The model containing the current direction of the current sort column. This
 * directive will watch for changes, and request new results from the paginated
 * API, on change.
 * @param {String=} errorMessage
 * An error message that should be displayed if a call to the request fails
 */
.directive('rxPaginate', function ($q, $compile, debounce, rxPromiseNotifications) {
    return {
        templateUrl: 'templates/rxPaginate.html',
        replace: true,
        restrict: 'E',
        require: [
            '?^rxLoadingOverlay',
            '?^rxFloatingHeader'
        ],
        scope: {
            pageTracking: '=',
            numberOfPages: '@',
            serverInterface: '=?',
            filterText: '=?',
            selections: '=?',
            sortColumn: '=?',
            sortDirection: '=?'
        },
        link: function (scope, element, attrs, ctrls) {
            var errorMessage = attrs.errorMessage;

            var rxLoadingOverlayCtrl = ctrls[0] || {
                show: _.noop,
                hide: _.noop,
                showAndHide: _.noop
            };

            var rxFloatingHeaderCtrl = ctrls[1] || {
                reapply: _.noop
            };

            // We need to find the `<table>` that contains
            // this `<rx-paginate>`
            var parentElement = element.parent();
            while (parentElement.length && parentElement[0].tagName !== 'TABLE') {
                parentElement = parentElement.parent();
            }

            var table = parentElement;

            scope.scrollToTop = function () {
                table[0].scrollIntoView(true);
            };

            // Everything here is restricted to using server-side pagination
            if (!_.isUndefined(scope.serverInterface)) {
                var params = function () {
                    var direction = scope.sortDirection ? 'DESCENDING' : 'ASCENDING';
                    return {
                        filterText: scope.filterText,
                        selections: scope.selections,
                        sortColumn: scope.sortColumn,
                        sortDirection: direction
                    };
                };

                var getItems = function (pageNumber, itemsPerPage) {
                    var response = scope.serverInterface.getItems(pageNumber,
                                                   itemsPerPage,
                                                   params());
                    rxLoadingOverlayCtrl.showAndHide(response);

                    if (errorMessage) {
                        rxPromiseNotifications.add(response, {
                            error: errorMessage
                        });
                    }
                    return response;
                };

                // Register the getItems function with the PageTracker
                scope.pageTracking.updateItemsFn(getItems);

                var notifyPageTracking = function () {
                    var pageNumber = 0;
                    scope.pageTracking.newItems(getItems(pageNumber, scope.pageTracking.itemsPerPage));
                };

                // When someone changes the sort column, it will go to the
                // default direction for that column. That could cause both
                // `sortColumn` and `sortDirection` to get changed, and
                // we don't want to cause two separate API requests to happen
                var columnOrDirectionChange = debounce(notifyPageTracking, 100);

                var textChange = debounce(notifyPageTracking, 500);

                var selectionChange = debounce(notifyPageTracking, 1000);

                var ifChanged = function (fn) {
                    return function (newVal,  oldVal) {
                        if (newVal !== oldVal) {
                            fn();
                        }
                    };
                };
                // Whenever the filter text changes (modulo a debounce), tell
                // the PageTracker that it should go grab new items
                if (!_.isUndefined(scope.filterText)) {
                    scope.$watch('filterText', ifChanged(textChange));
                }

                if (!_.isUndefined(scope.selections)) {
                    scope.$watch('selections', ifChanged(selectionChange), true);
                }

                if (!_.isUndefined(scope.sortColumn)) {
                    scope.$watch('sortColumn', ifChanged(columnOrDirectionChange));
                }
                if (!_.isUndefined(scope.sortDirection)) {
                    scope.$watch('sortDirection', ifChanged(columnOrDirectionChange));
                }

                notifyPageTracking();

            }

            /*
             * Wrap pageTracking functions to reapply floating header
             * when navigating to another page of data.
             */
            scope.goToFirstPage = function () {
                rxFloatingHeaderCtrl.reapply();
                scope.pageTracking.goToFirstPage();
            };

            scope.goToPrevPage = function () {
                rxFloatingHeaderCtrl.reapply();
                scope.pageTracking.goToPrevPage();
            };

            scope.goToPage = function (n) {
                rxFloatingHeaderCtrl.reapply();
                scope.pageTracking.goToPage(n);
            };

            scope.goToNextPage = function () {
                rxFloatingHeaderCtrl.reapply();
                scope.pageTracking.goToNextPage();
            };

            scope.goToLastPage = function () {
                rxFloatingHeaderCtrl.reapply();
                scope.pageTracking.goToLastPage();
            };
        }
    };
});
