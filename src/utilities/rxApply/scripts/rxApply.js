(function () {
    angular
        .module('encore.ui.utilities')
        .filter('rxApply', rxApplyFilter);

    /**
     * @ngdoc filter
     * @name utilities.filter:rxApply
     * @description
     * Used to apply an instance of {@link utilities.service:rxSelectFilter rxSelectFilter} to an array.
     *
     * Merely calls the `applyTo()` method of a `rxSelectFilter` instance to an
     * input array.
     * <pre>
     * <tr ng-repeat="item in list | rxApply:filter">
     * </pre>
     *
     * @param {Array} list The list to be filtered.
     * @param {Object} filter An instance of rxSelectFilter
     */
    function rxApplyFilter () {
        return function (list, filter) {
            return filter.applyTo(list);
        };
    }//rxApplyFilter
})();
