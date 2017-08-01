angular.module('encore.ui.utilities')
/**
* @ngdoc filter
* @name utilities.filter:rxTypeaheadHighlight
* @description
* filter to sanitize and display list data
*/
.filter('rxTypeaheadHighlight', function ($sce, $injector, $log) {
    var isSanitizePresent;
    isSanitizePresent = $injector.has('$sanitize');

    function escapeRegexp (queryToEscape) {
        // Regex: capture the whole query string and replace it with the string that will be used to match
        // the results, for example if the capture is "a" the result will be \a
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }

    function containsHtml (matchItem) {
        return /<.*>/g.test(matchItem);
    }

    return function (matchItem, query) {
        if (!isSanitizePresent && containsHtml(matchItem)) {
            $log.warn('Unsafe use of typeahead please use ngSanitize'); // Warn the user about the danger
        }
        // Replaces the capture string with a the same string inside of a "strong" tag
        var captureString = '<strong>$&</strong>';
        matchItem = query ? ('' + matchItem).replace(new RegExp(escapeRegexp(query), 'gi'), captureString) : matchItem;
        if (!isSanitizePresent) {
            // If $sanitize is not present we pack the string in a $sce object for the ng-bind-html directive
            matchItem = $sce.trustAsHtml(matchItem);
        }
        return matchItem;
    };
});
