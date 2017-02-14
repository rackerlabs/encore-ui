angular.module('encore.ui.rxOptionTable')
/**
 * @deprecated This directive will be removed in EncoreUI 4.0.0
 * @ngdoc directive
 * @name rxOptionTable.directive:rxOptionTable
 * @restrict E
 * @scope
 * @description
 * This directive is used to build a table of radio/checkbox inputs.
 *
 * @param {String} fieldId Used as the base for unique identifiers within the generated markup.
 * @param {Object} model The AngularJS model to tie all radios/checkboxes together.
 * @param {String} type (`radio` | `checkbox`) Type of input to be used.
 * @param {String} emptyMessage A default message if the data attribute is empty.
 * @param {Array} data Array of objects used to populate table. Properties must match column keys.
 * For checkboxes, checked values default to true unless `value` and `falseValue` attributes are given.
 *
 * Example:
 * <pre>
 * [
 *     {
 *         'name': 'Option 1',
 *         'value': 0
 *     }, {
 *         'name': 'Option 2',
 *         'value': 1
 *     }, {
 *         'name': 'Option 3',
 *         'value': 2
 *     }
 * ]
 * </pre>
 * @param {Object} columns Array of column data to match against data objects.
 * Each object may include the following properties.
 * @param {String} columns.label Column display value
 * @param {String} columns.key Object key used to display data from the data object
 * @param {String=} columns.selectedLabel (optional) Label to display alongside preseleted-values. 
 * Expressions are allowed; see demonstration samples.
 *
 * Example:
 *
 * <pre>
 * [{
 *     'label': 'Name',
 *     'key': 'name'
 * }]
 * </pre>
 * @param {String=} selected Array of objects to match against data for preselection on page load.
 * If excluded, no values will be preselected on initial load.
 * @param {Boolean=} required Value passed to input's `ng-required` attribute.
 * For checkboxes, a `true` value means that there must be at least one checkbox selected.
 * @param {Function=} disableFn Optional callback function to determine if option should be disabled.
 * Parameters `tableId`, `fieldId`, and `rowId` will be passed to the function.
 *
 * Example:
 *
 * <pre>
 * <rx-option-table disable-fn="disableOption(tableId, fieldId, rowId)"></rx-option-table>
 * </pre>
 */
.directive('rxOptionTable', function ($interpolate) {
    return {
        restrict: 'E',
        templateUrl: 'templates/rxOptionTable.html',
        scope: {
            data: '=',
            columns: '=',
            selected: '@',
            type: '@',
            model: '=',
            fieldId: '@',
            required: '=',
            emptyMessage: '@',
            disableFn: '&?'
        },
        link: function (scope, element) {
            console.warn(
                'DEPRECATED: rxOptionTable will be removed in EncoreUI 4.0.0'
            );

            var boxesChecked = 0;
            scope.selectAllModel = false;

            scope.$watchCollection('modelProxy', function (newValue) {
                scope.selectAllModel = !_.some(newValue, function (val) {
                    return val === false;
                });
            });

            var determineMatch = function (val1, val2) {
                if (_.isUndefined(val1) || _.isUndefined(val2)) {
                    return false;
                }

                val1 = val1.toString();
                val2 = val2.toString();
                return (val1 === val2);
            };

            scope.selectAll = function (currentVal) {
                scope.selectAllModel = !currentVal;
                scope.modelProxy.forEach(function (model, index) {
                    // assigning the value to `model` variable caused the
                    // select all functionality to not select checkboxes
                    // so using `modelProxy[index]` is workaround
                    scope.modelProxy[index] = scope.selectAllModel;
                    scope.updateCheckboxes(scope.selectAllModel, index);
                });
            };

            scope.checkDisabled = function (row) {
                return scope.disableFn({
                    tableId: element.attr('id'),
                    fieldId: scope.fieldId,
                    rowId: row.id
                });
            };

            // Determines whether the row is the initial choice
            scope.isCurrent = function (val) {
                return determineMatch(val, scope.selected);
            };

            // Determines whether the row is selected
            scope.isSelected = function (val, idx) {
                // row can only be 'selected' if it's not the 'current' value
                if (!scope.isCurrent(val)) {
                    if (scope.type === 'radio') {
                        return determineMatch(val, scope.model);
                    } else if (scope.type === 'checkbox') {
                        if (!_.isUndefined(val)) {
                            // if 'val' is defined, run it through our custom matcher
                            return determineMatch(val, scope.model[idx]);
                        } else {
                            // otherwise, just return the value of the model and angular can decide
                            return scope.modelProxy[idx];
                        }
                    }
                }

                return false;
            };

            /*
             * checkRequired: Returns true/false to the ng-required attribute for checkboxes.
             * Returns a true value if required="true" and there is at least one checkbox
             * checked (based on $scope.values).
             */
            scope.checkRequired = function () {
                if (_.isBoolean(scope.required)) {
                    return scope.required && boxesChecked === 0;
                } else {
                    return false;
                }
            };

            // Because of a bug in Angular 1.2.x, we can't use `required` and
            // ngTrueValue/ngFalseValue simultaneously. We'll
            // build a `modelProxy` which is simply a mapping of $scope.model to
            // an array of `true` / `false` values. We then have to take care
            // of updating the actual $scope.model ourselves in `updateCheckboxes`
            // with the correct ngTrueValue/ngFalseValue values
            scope.modelProxy = _.map(scope.model, function (val, index) {
                var data = scope.data[index];
                var trueValue = _.has(data, 'value') ? data.value : true;
                return val === trueValue;
            });

            // If we are using checkboxes and the required attribute is set, then we
            // need an array to store the indexes of checked boxes. ng-required is
            // specifically set if required is true and the array is empty.
            _.forEach(scope.modelProxy, function (el) {
                if (el) {
                    boxesChecked += 1;
                }
            });

            /**
             * Updates $scope.values when a checkbox is clicked.
             * @param {String|Boolean} val The checkbox value (Boolean, ng-true-value or ng-false-value per row)
             * @param {Integer} index Array index of the checkbox element marked true
             */
            scope.updateCheckboxes = function (val, index) {
                var data = scope.data[index];
                var trueValue = _.has(data, 'value') ? data.value : true;
                var falseValue = _.has(data, 'falseValue') ? data.falseValue : false;

                scope.model[index] = val ? trueValue : falseValue;

                if (val) {
                    boxesChecked += 1;
                } else {
                    boxesChecked -= 1;
                }
            };

            /**
             * Get the value out of a key from the row, or parse an expression
             * @param {Object} column Column whose `key` is an Angular Expression or HTML to be compiled
             * @param {Object} row Data object with data to be used against the expression
             */
            scope.getContent = function (column, row) {
                var expr = column.key;
                // If no expression exit out;
                if (!expr) {
                    return '';
                }

                // if the expr is a property of row, then we expect the value of the key.
                if (row.hasOwnProperty(expr)) {
                    return String(row[expr]);
                }

                // Compile expression & Run output template
                var outputHTML = $interpolate(expr)(row);
                return outputHTML;
            };
        }
    };
});
