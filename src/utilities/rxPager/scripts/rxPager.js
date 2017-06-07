(function () {
    angular
        .module('encore.ui.utilities')
        .filter('rxPager', rxPagerFilter);

    /**
     * @ngdoc filter
     * @name utilities.filter:rxPager
     * @description
     * This is the pagination filter that is used to limit the number of pages
     * shown.
     *
     * @param {Object} pager The instance of the rxPageTracker service. If not
     * specified, a new one will be created.
     *
     * @returns {Array} The list of page numbers that will be displayed.
     */
    function rxPagerFilter (rxPageTracker) {
        return function (pager) {
            if (!pager) {
                pager = rxPageTracker.createInstance();
            }

            var displayPages = [],
                // the next four variables determine the number of pages to show ahead of and behind the current page
                pagesToShow = pager.pagesToShow || 5,
                pageDelta = (pagesToShow - 1) / 2,
                pagesAhead = Math.ceil(pageDelta),
                pagesBehind = Math.floor(pageDelta);

            if (pager && pager.length !== 0) {
                // determine starting page based on (current page - (1/2 of pagesToShow))
                var pageStart = Math.max(Math.min(pager.pageNumber - pagesBehind, pager.totalPages - pagesToShow), 0),

                    // determine ending page based on (current page + (1/2 of pagesToShow))
                    pageEnd = Math.min(Math.max(pager.pageNumber + pagesAhead, pagesToShow - 1), pager.totalPages - 1);

                for (pageStart; pageStart <= pageEnd; pageStart++) {
                    // create array of page indexes
                    displayPages.push(pageStart);
                }
            }

            return displayPages;
        };
    }//rxPagerFilter
})();
