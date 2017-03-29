angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxModalFooter
 * @restrict E
 * @scope
 * @description
 * Define a footer for the next modal.
 *
 * When a modal has multiple views or kicks off a process that should be
 * tracked within the modal, the `<rx-modal-footer>` directive should be used.
 *
 * Modal Footers should be defined in the same template as the Modal Form unless
 * the footer is global, in which case it should be loaded in `module.run()`.
 * Global footers can be used in any subsequent modal by changing to the state
 * they were defined with.
 *
 * The modal's controller also inherits the `setState()` method on the scope,
 * which should be used to toggle different views or footers. See the
 * Multi-View Modals [demo](../#/elements/Modals#multi-view-modals)
 * for an example of this design pattern's usage.
 *
 * The default `editing` state shows the standard submit and cancel buttons,
 * and the only other state provided by the framework is `complete` (showing the
 * return button).
 *
 * @param {String} state
 * The content will be shown in the footer when this state is activated.
 * @param {String=} global
 * If the global attribute is present, then this footer can be used in other
 * modals. This attribute takes no values.
 *
 * @example
 * <pre>
 * <rx-modal-footer state="confirm">
 *     <button class="button" ng-click="setState('pending')">
 *         I understand the risks.
 *     </button>
 * </rx-modal-footer>
 * </pre>
 */
.directive('rxModalFooter', function (rxModalFooterTemplates) {
    return {
        restrict: 'E',
        compile: function (element, attrs) {
            var footer = angular.element('<div></div>')
                .append(element.html())
                .attr('ng-switch-when', attrs.state);

            rxModalFooterTemplates.add(attrs.state, footer[0].outerHTML, {
                global: attrs.global !== undefined
            });

            return function (scope, el) {
                el.remove();
            };
        }
    };
});
