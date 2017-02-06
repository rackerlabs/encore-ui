(function () {
    angular
        .module('encore.ui.utilities')
        .filter('rxXor', rxXorFilter)
        .filter('xor', xorFilter);

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

    /**
     * @deprecated
     * Use rxXor instead. This filter will be removed on the 4.0.0 release.
     * @ngdoc filter
     * @name utilities.filter:xor
     * @requires utilities.filter:rxXor
     */
    function xorFilter () {
        return function (a, b) {
            console.warn(
                'DEPRECATED: xor - Please use rxXor. ' +
                'xor will be removed in EncoreUI 4.0.0'
            );
            return rxXorFilter()(a, b);
        };
    }//xorFilter
})();
