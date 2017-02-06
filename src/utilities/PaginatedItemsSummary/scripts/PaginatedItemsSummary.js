angular.module('encore.ui.utilities')
/**
 * @ngdoc filter
 * @name utilities.filter:PaginatedItemsSummary
 * @requires $interpolate
 * @description
 * Given an active pager (i.e. the result of rxPageTracker.createInstance()),
 * return a string like "26-50 of 500", when on the second page of a list of
 * 500 items, where we are displaying 25 items per page
 *
 * @param {Object} pager The instance of the rxPageTracker service.
 *
 * @returns {String} The list of page numbers that will be displayed.
 */
.filter('PaginatedItemsSummary', function (rxPaginateUtils, $interpolate) {
    return function (pager) {
        var template = '{{first}}-{{last}} of {{total}}';
        if (pager.showAll || pager.itemsPerPage > pager.total) {
            template = '{{total}}';
        }
        var firstAndLast = rxPaginateUtils.firstAndLast(pager.currentPage(), pager.itemsPerPage, pager.total);
        return $interpolate(template)({
            first: firstAndLast.first + 1,
            last: firstAndLast.last,
            total: pager.total
        });
    };
});
