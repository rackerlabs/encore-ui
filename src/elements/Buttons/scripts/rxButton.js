angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxButton
 * @restrict E
 * @scope
 * @description
 * Renders a button which will disable when clicked and show a loading message,
 * and re-enable when the operation is complete. If you set `classes` attributes
 * `<rx-button>`, those will get passed to the `<button>` instance as `class`.
 *
 * `rxButton` is used to create buttons with a dynamically-displayed loading
 * indicator. This is meant to be used as a replacement for `<button>` elements
 * in scenarios where the button has multiple states.
 *
 * ## Button State
 *
 * The state of the button is controlled via the `toggle` attribute, which
 * disables the button and replaces the `default-msg` with the `toggle-msg` as
 * the button's text.  There are no defaults for these messages, so they must
 * be defined if the toggle behavior is desired.  While the button is in the
 * toggled state, it is also disabled (no matter what the value of `ng-disabled`
 * may be).
 *
 * The button does not modify the variable passed to `toggle`; it should be
 * modified in the handler provided to `ng-click`.  Usually, the handler will
 * set the variable to `true` immediately, and then to `false` once the the
 * process (e.g. an API call) is complete.
 *
 * ## Styling
 *
 * There are several styles of buttons available, and they are documented in the
 * Buttons [demo](../#/elements/Buttons). Any classes that need to be
 * added to the button should be passed to the `classes` attribute.
 *
 * @param {String} loadingMsg Text to be displayed when an operation is in progress.
 * @param {String} defaultMsg Text to be displayed by default when no operation is in progress.
 * @param {Boolean=} [toggle=false] When true, the button will display the loading text.
 * @param {Expression=} [ngDisabled=false] If the expression is truthy, then the
 * `disabled` attribute will be set on the button
 * @param {String=} [classes=""] The class names to be applied to the button.
 *
 */
.directive('rxButton', function () {
    return {
        templateUrl: 'templates/rxButton.html',
        restrict: 'E',
        scope: {
            toggleMsg: '@',
            defaultMsg: '@',
            toggle: '=?',
            isDisabled: '=?ngDisabled',
            classes: '@?'
        }
    };
});
