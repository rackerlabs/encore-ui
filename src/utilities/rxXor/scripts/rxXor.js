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
     * Use rxXor instead. This filter will be removed in a future release of EncoreUI.
     * @ngdoc filter
     * @name utilities.filter:xor
     * @requires utilities.filter:rxXor
     */
    function xorFilter (suppressDeprecationWarnings) {
        return function (a, b) {
            if (!suppressDeprecationWarnings) {
                console.warn(
                    'DEPRECATED: xor - Please use rxXor. ' +
                    'xor will be removed in a future release of EncoreUI.'
                );
            }
            return rxXorFilter()(a, b);
        };
    }//xorFilter
})();
