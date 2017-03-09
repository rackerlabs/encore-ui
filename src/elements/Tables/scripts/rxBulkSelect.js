angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxBulkSelect
 * @restrict A
 * @scope
 * @description
 *
 * A directive you place on your `<table>` element to enable bulk select.
 * This directive will automatically add `<tr bulk-select-message>` into your <thead>,
 * which will appear whenever items are selected, and disappear when none are selected.
 * The main responsibility of this directive is to provide a controller for other
 * bulk-select-related directives to interact with.
 *
 * <pre>
 * <table rx-bulk-select
 *        bulk-source="servers"
 *        selectedKey="rowIsSelected">
 * </table>
 * </pre>
 *
 * The directive is also responsible for adding a row to the table header that
 * indicates how many rows are selected and contains buttons to select or deselect
 * all the rows at once.
 *
 * @param {Object} bulkSource The source list that the table ng-repeats over.
 * @param {String} selectedKey The attribute on items in bulkSource that will be used to track
 *                             if the user has clicked the checkbox for that item.
 * @param {String=} [resourceName=bulkSource] The name of the resource being iterated over.
 */
.directive('rxBulkSelect', function () {
    var elemString = '<tr rx-bulk-select-message></tr>';
    return {
        restrict: 'A',
        require: [
            '?^rxFloatingHeader'
        ],
        scope: {
            bulkSource: '=',
            selectedKey: '@'
        },
        compile: function (elem, attrs) {
            // We add the `<tr rx-bulk-select-message>` row to the header here to save the devs
            // from having to do it themselves.
            var thead = elem.find('thead').eq(0);
            var messageElem = angular.element(elemString);
            messageElem.attr('resource-name', attrs.resourceName || attrs.bulkSource.replace(/s$/, ''));
            thead.append(messageElem);

            return function (scope, element, attrs, controllers) {
                scope._rxFloatingHeaderCtrl = controllers[0] || {
                    reapply: _.noop
                };
                scope.tableElement = element;
            };
        },
        controller: 'rxBulkSelectController'
    };
});
