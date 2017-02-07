(function () {
    angular
        .module('encore.ui.utilities')
        .filter('rxXor', rxXorFilter);

    /**
     * @ngdoc filter
     * @name utilities.filter:rxXor
     * @description
     * Returns the exclusive or of two arrays.
     *
     * @param {Array} array The first input array
     * @param {Array} excluded The second input array
     * @returns {Array} - A new array of the unique elements in each array.
     */
    function rxXorFilter () {
        return function () {
            return _.xor.apply(_, arguments);
        };
    }//rxXorFilter
})();
