angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxStatusHeader
 * @description
 *
 * Place this attribute directive on the `<th>` for the status columns. It
 * ensures correct styling.
 *
 * For the `<th>` component representing the status column, add the
 * `rx-status-header` attribute, i.e.
 *
 * <pre>
 * <th rx-status-header></th>
 * </pre>
 * Note that status columns are sortable with
 * {@link elements.directive:rxSortableColumn rxSortableColumn}, just like any
 * other column. The demo below shows an example of this.
 *
 * One thing to note about the [demo](../#/elements/Tables#status-column):
 * The `<th>` is defined as:
 *
 * <pre>
 * <th rx-status-header>
 *     <rx-sortable-column
 *         sort-method="sortcol(property)"
 *         sort-property="status"
 *         predicate="sort.predicate"
 *         reverse="sort.reverse">
 *     </rx-sortable-column>
 * </th>
 * </pre>
 *
 * Note that `sort-property="status"` is referring to the `server.status`
 * property on each row. Thus the sorting is done in this example by the status
 * text coming from the API.
 */
.directive('rxStatusHeader', function () {
    return {
        link: function (scope, element) {
            element.addClass('rx-status-header');
        }
    };
});
