angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxSelectFilter
 * @restrict E
 * @scope
 * @description
 * Automatically creates the appropriate dropdowns to manage a filter object.
 *
 * **NOTE:** `rxSelectFilter` directive must be instaniated as a child of
 * {@link elements.directive:rxFormSection rxFormSection} directive.  The {@link elements} component
 * hierarchy validation enforces this relationship.
 *
 * ## rxSelectFilter
 * Uses an instance of `rxSelectFilter` to create a set of `<rx-multi-select>`'s
 * that modify the instance object.
 * <pre>
 * // In the controller
 * $scope.filter = rxSelectFilter.create({
 *   // options...
 * });
 * </pre>
 *
 * ## rxSelectFilter usage in rxForm
 * <pre>
 * // rxSelectFilter must be instantiated as a child of rxFormSection
 * <rx-form-section>
 *     <rx-select-filter filter="filter"></rx-select-filter>
 * </rx-form-section>
 * </pre>
 *
 * @param {Object} filter An instance of rxSelectFilter
 *
 */
.directive('rxSelectFilter', function (rxNestedElement) {
    return rxNestedElement({
        parent: 'rxFormSection',
        restrict: 'E',
        templateUrl: 'templates/rxSelectFilter.html',
        scope: {
            filter: '='
        }
    });
});
