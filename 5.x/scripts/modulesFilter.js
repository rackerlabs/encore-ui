angular.module('demoApp')
/**
 * @ngdoc filter
 * @name demoApp:modulesFilter
 * @description
 * Used to filter modules list. Given a string, filter checks for the following case insensitive conditions:
 *  - input string matches any part of module name value
 *  - input string matches begining of stability value
 *  - input string matches any part of module category
 *
 * @param {Array} modules list of modules to be filtered
 * @param {String} search input string to filter list by
 */
.filter('modulesFilter', function () {
    return function (modules, search) {
        if (!search) {
            return modules;
        }

        // build case-insensitive, regular expression from search term
        var searchRegExp = new RegExp(search, 'i');

        function matchesDisplayName (mod) {
            return mod.displayName.match(searchRegExp);
        }

        function matchesStability (mod) {
            return mod.stability.match(searchRegExp);
        }

        function matchesCategory (mod) {
            return mod.category.match(searchRegExp);
        }

        function matchesKeyword (mod) {
            return _.some(mod.keywords, function (keyword) {
                return keyword.match(searchRegExp);
            });
        }

        return _.filter(modules, function (mod) {
            return _.some([
                matchesDisplayName(mod),
                matchesStability(mod),
                matchesCategory(mod),
                matchesKeyword(mod)
            ]);
        });
    };
});
