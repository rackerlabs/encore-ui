(function () {
    angular
        .module('encore.ui.utilities')
        .filter('rxPaginate', rxPaginateFilter)
        .filter('Paginate', PaginateFilter);

    /**
     * @ngdoc filter
     * @name utilities.filter:rxPaginate
     * @description
     * This is the pagination filter that is used to calculate the division in the
     * items list for the paging.
     *
     * @param {Object} items The list of items that are to be sliced into pages
     * @param {Object} pager The instance of the rxPageTracker service. If not
     * specified, a new one will be created.
     *
     * @returns {Object} The list of items for the current page in the rxPageTracker object
     */
    function rxPaginateFilter (rxPageTracker, rxPaginateUtils) {
        return function (items, pager) {
            if (!pager) {
                pager = rxPageTracker.createInstance();
            }
            if (pager.showAll) {
                pager.total = items.length;
                return items;
            }
            if (items) {

                pager.total = items.length;
                // We were previously on the last page, but enough items were deleted
                // to reduce the total number of pages. We should now jump to whatever the
                // new last page is
                // When loading items over the network, our first few times through here
                // will have totalPages===0. We do the _.max to ensure that
                // we never set pageNumber to -1
                if (pager.pageNumber + 1 > pager.totalPages) {
                    if (!pager.isLastPage()) {
                        pager.goToLastPage();
                    }
                }
                var firstLast = rxPaginateUtils.firstAndLast(pager.currentPage(), pager.itemsPerPage, items.length);
                return items.slice(firstLast.first, firstLast.last);
            }
        };
    }//rxPaginateFilter

    /**
     * @deprecated
     * Use rxPaginate instead. This filter will be removed on the 4.0.0 release.
     * @ngdoc filter
     * @name utilities.filter:Paginate
     * @requires utilities.filter:rxPaginate
     */
    function PaginateFilter (rxPageTracker, rxPaginateUtils) {
        return function (items, pager) {
            console.warn(
                'DEPRECATED: Paginate - Please use rxPaginate. ' +
                'Paginate will be removed in EncoreUI 4.0.0'
            );           
            return rxPaginateFilter(rxPageTracker, rxPaginateUtils)(items, pager);
        };
    }//PaginateFilter
})();
