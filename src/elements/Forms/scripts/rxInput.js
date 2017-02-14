angular.module('encore.ui.elements')
/**
 * @name elements.directive:rxInput
 * @ngdoc directive
 * @restrict E
 * @description
 * Structural element directive used for layout of sub-elements.
 * Place your HTML control elements within this directive.
 *
 * <dl>
 *   <dt>Display:</dt>
 *   <dd>**block** *(full width of parent)*</dd>
 *
 *   <dt>Parent:</dt>
 *   <dd>{@link elements.directive:rxFieldContent rxFieldContent}</dd>
 *
 *   <dt>Siblings:</dt>
 *   <dd>Any HTML Element</dd>
 *
 *   <dt>Children:</dt>
 *   <dd>
 *     <ul>
 *       <li>{@link elements.directive:rxPrefix rxPrefix}</li>
 *       <li>{@link elements.directive:rxSuffix rxSuffix}</li>
 *       <li>{@link elements.directive:rxCheckbox rxCheckbox}</li>
 *       <li>{@link elements.directive:rxRadio rxRadio}</li>
 *       <li>{@link elements.directive:rxSelect rxSelect}</li>
 *       <li>{@link elements.directive:rxToggleSwitch rxToggleSwitch}</li>
 *       <li>Any HTML Element</li>
 *     </ul>
 *   </dd>
 * </dl>
 *
 * @example
 * <pre>
 * ...
 * <form rx-form>
 *   <rx-form-section>
 *     <rx-field>
 *       <rx-field-name>Salary:</rx-field-name>
 *       <rx-field-content>
 *         <rx-input>
 *           <input type="number" />
 *         </rx-input>
 *       </rx-field-content>
 *     </rx-field>
 *   </rx-form-section>
 * </form>
 * ...
 * </pre>
 */
.directive('rxInput', function (rxNestedElement) {
    return rxNestedElement({
        parent: 'rxFieldContent'
    });
});
