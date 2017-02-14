angular.module('encore.ui.elements')
/**
 * @name elements.directive:rxFieldName
 * @ngdoc directive
 * @restrict E
 * @scope
 * @description
 * Stylistic element directive that provides a standardized UI for
 * form field names.
 *
 * <dl>
 *   <dt>Display:</dt>
 *   <dd>**block** *(full width of parent)*</dd>
 *
 *   <dt>Parent:</dt>
 *   <dd>{@link elements.directive:rxField rxField}</dd>
 *
 *   <dt>Siblings:</dt>
 *   <dd>
 *     <ul>
 *       <li>{@link elements.directive:rxFieldContent rxFieldContent}</li>
 *       <li>Any HTML Element</li>
 *     </ul>
 *   </dd>
 *
 *   <dt>Children:</dt>
 *   <dd>Any HTML Element</dd>
 * </dl>
 *
 * @example
 * <pre>
 * ...
 * <form rx-form>
 *   <rx-form-section>
 *     <rx-field>
 *       <rx-field-name>Salary</rx-field-name>
 *       <rx-field-content>...</rx-field-content>
 *     </rx-field>
 *   </rx-form-section>
 * </form>
 * ...
 * </pre>
 *
 * @param {Boolean=} [ngRequired=false]
 * Is this field required? This will add/remove the required symbol to the left of the name.
 */
.directive('rxFieldName', function (rxNestedElement) {
    return rxNestedElement({
        parent: 'rxField',
        transclude: true,
        scope: {
            ngRequired: '=?'
        },
        templateUrl: 'templates/rxFieldName.html'
    });
});
