angular.module('encore.ui.utilities')
/**
 * @name utilities.service:rxFormUtils
 * @ngdoc service
 *
 * @description
 * Set of utility functions used by rxForm to access form data in 
 * {@link rxOptionTable.directive:rxOptionTable rxOptionTable}.
 *
 * <pre>
 * // Returns the selected option for the rxOptionTable with id tableId
 * // [{ tableId: 'tableId', fieldId: 'fieldId', rowId: 'rowId' }]
 * getSelectedOptionForTable(tableId)
 * </pre>
 * <pre>
 * // Returns the selected option for the rxOptionTable in the tabset with id tabsetId
 * // [{ tableId: 'tableId', fieldId: 'fieldId', rowId: 'rowId' }]
 * getSelectedOptionForTabSet(tabsetId)
 * </pre>
 */
.factory('rxFormUtils', function ($document) {
    var rxFormUtils = {};

    /**
     * @ngdoc function
     * @name  rxFormUtils.getSelectedOptionForTable
     * @methodOf utilities.service:rxFormUtils
     * @description
     * Returns the selected option for the {@link rxOptionTable.directive:rxOptionTable rxOptionTable} with
     * `id`: tableId and `fieldId`: fieldId (optional).
     * @param {String} tableId The id of the table
     * @returns {object} The rowId of the selected option
     */
    rxFormUtils.getSelectedOptionForTable = function (tableId) {
        var selectedRow;
        var row = $document[0].querySelector('rx-option-table#' + tableId + ' .selected input');

        if (_.isObject(row) && 'value' in row) {
            selectedRow = { rowId: row.value };
        }
        return selectedRow;
    };

    /**
     * @ngdoc function
     * @name  rxFormUtils.getSelectedOptionForTabSet
     * @methodOf utilities.service:rxFormUtils
     * @description
     * Returns the selected option within the tabset.
     * @param {String} tabsetId - The id of the tabset
     * @returns {object} The tableId, fieldId, and rowId of the selected option
     */
    rxFormUtils.getSelectedOptionForTabSet = function (tabsetId) {
        var selectedOption;
        var xpathToTable = '//div[@id="' + tabsetId +
            '"]//tr[contains(@class, "selected")]//ancestor::rx-option-table';
        var result = $document[0].evaluate(xpathToTable, $document[0], null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        if (result.singleNodeValue) {
            var table = result.singleNodeValue;
            var fieldId = table.getAttribute('field-id');
            var rowId = rxFormUtils.getSelectedOptionForTable(table.id).rowId;
            selectedOption = { tableId: table.id, fieldId: fieldId, rowId: rowId };
        }
        return selectedOption;
    };

    return rxFormUtils;
});
