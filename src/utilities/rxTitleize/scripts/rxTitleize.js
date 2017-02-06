(function () {
    angular
        .module('encore.ui.utilities')
        .filter('rxTitleize', rxTitleizeFilter)
        .filter('titleize', titleizeFilter);

    /**
     * @ngdoc filter
     * @name utilities.filter:rxTitleize
     * @description
     * Convert a string to title case, stripping out underscores and capitalizing words.
     *
     * Credit where it's due: https://github.com/epeli/underscore.string/blob/master/titleize.js
     *
     * @param {String} inputString - The string to convert
     * @returns {String} The titleized version of the string
     *
     * @example
     * Both examples result in a string of `"A Simple String"`.
     * <pre>
     * {{ 'a simple_STRING' | rxTitleize }}
     * </pre>
     *
     * <pre>
     * $filter('rxTitleize')('a simple_STRING');
     * </pre>
     */
    function rxTitleizeFilter () {
        return function (inputString) {
            return inputString
                .toLowerCase()
                .replace(/_/g, ' ')
                .replace(/(?:^|\s)\S/g, function (character) {
                    return character.toUpperCase();
                });
        };
    };

    /**
     * @deprecated
     * Please use rxTitleize instead. This filter will be removed in EncoreUI 4.0.0'
     * @ngdoc filter
     * @name utilities.filter:titleize
     * @requires utilities.filter:rxTitleize
     */
    function titleizeFilter () {
        return function (inputString) {
            console.warn(
                'DEPRECATED: titleize - Please use rxTitleize. ' +
                'titleize will be removed in EncoreUI 4.0.0'
            );
            return rxTitleizeFilter()(inputString);
        };
    };
})();
