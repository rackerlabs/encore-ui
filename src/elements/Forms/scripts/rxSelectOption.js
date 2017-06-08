angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxSelectOption
 * @restrict E
 * @requires elements.directive:rxCheckbox
 * @description
 * A single option for use within rxMultiSelect.
 *
 * `<rx-select-option>` is to `<rx-multi-select>` as `<option>` is to `<select>`.
 *
 * Just like `<option>`, it has a `value` attribute and uses the element's
 * content for the label. If the label is not provided, it defaults to a
 * titleized version of `value`.
 *
 * <pre>
 * <rx-select-option value="DISABLED">Disabled</rx-select-option>
 * </pre>
 *
 * @param {String} value The value of the option. If no transcluded content is provided,
 *                       the value will also be used as the option's text.
 */
.directive('rxSelectOption', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/rxSelectOption.html',
        transclude: true,
        scope: {
            value: '@'
        },
        require: '^^rxMultiSelect',
        controller: function ($scope) {
            $scope.transclusion = _.isEmpty($scope.$parent.options);
        },
        link: function (scope, element, attrs, selectCtrl) {
            scope.toggle = function (isSelected) {
                if (isSelected) {
                    selectCtrl.unselect(scope.value);
                } else {
                    selectCtrl.select(scope.value);
                }
            };

            // The state of the input may be changed by the 'all' option.
            scope.$watch(function () {
                return selectCtrl.isSelected(scope.value);
            }, function (isSelected) {
                scope.isSelected = isSelected;
            });

            selectCtrl.addOption(scope.value);

            scope.$on('$destroy', function () {
                selectCtrl.removeOption(scope.value);
            });
        }
    };
});
