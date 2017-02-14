angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxSortableColumn
 * @restrict E
 * @description
 * Renders a clickable link in a table heading which will sort the table by
 * the referenced property in ascending or descending order.
 *
 * @param {String} displayText The text to be displayed in the link
 * @param {Function} sortMethod The sort function to be called when the link is
 * clicked
 * @param {String} sortProperty The property on the array to sort by when the
 * link is clicked.
 * @param {Object} predicate The current property the collection is sorted by.
 * @param {Boolean} reverse Indicates whether the collection should sort the
 * array in reverse order.
 */
.directive('rxSortableColumn', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/rxSortableColumn.html',
        transclude: true,
        scope: {
            sortMethod: '&',
            sortProperty: '@',
            predicate: '=',
            reverse: '='
        }
    };
});
