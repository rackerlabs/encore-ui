angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxModalAction
 * @restrict E
 * @scope
 * @description
 * Link which will show a modal window on click, and handle callbacks for
 * pre/post modal actions
 *
 * # Template URL
 *
 * Due to the complex nature of the information passed into modal windows,
 * HTML is handled via a template (versus transcluding the content).
 *
 * One benefit is that this allows for multiple actions to re-use the same
 * template. It also allows modal content to live in a separate file, which
 * can be helpful for maintainability if the modal HTML is complex. While this
 * can be done via `ng-include`, it would be a little extra work for a common
 * scenario.
 *
 * # Hooks
 *
 * `rxModalAction` allows you to define functions to be called at different
 * points of the modal lifecycle.  These hooks are optional and the modal window
 * is fully functional without any being defined.
 *
 * ## Pre-hook
 *
 * The `pre-hook` function is called before the modal window is shown.  Use this
 * to populate field information inside of the modal.  This is useful when you
 * have information you don't want loaded when the page is first opened, but do
 * need for the modal.  It is also useful for dynamic information that is based
 * on actions taken.
 *
 * ## Post-hook
 *
 * The `post-hook` function is called after the modal is submitted.  A
 * `post-hook` is useful to take actions based upon input in the modal.  For
 * example, you can use the user input that gets entered to send API requests
 * with specific JSON data.  Or you can simply run a pre-defined API call
 * (assuming the modal is a simple confirmation dialog).
 *
 * ## Dismiss-hook
 *
 * The `dismiss-hook` function is called after the modal is closed without
 * submitting.  This may happen via any of the following scenarios:
 *
 * * Clicking the "Cancel" button
 * * Clicking the "X" button in the top right
 * * Pressing `ESC`
 * * Explicitly calling `$modalInstance.dismiss()` in your javascript logic
 *
 * This hook is useful for making changes to UI state when the user wants to
 * cancel the given action.  For example, you may use this to return an
 * indeterminate component to a previous state (e.g. toggle switches).
 *
 * @param {Function=} preHook
 * Function to call when a modal is opened
 * @param {Function=} postHook
 * Function to call when a modal is submitted (not called when modal cancelled)
 * @param {Function=} dismissHook
 * Function to call when a modal is dismissed (not called when modal submitted)
 * @param {String=} templateUrl
 * URL of template to use for modal content
 * @param {*=} disable-esc
 * If the `disable-esc` attribute is present, then "Press Esc to close" will be
 * disabled for the modal. This attribute takes no values.
 * @param {Expression=} [ngDisabled=false]
 * If the expression evaluates truthy, then the link for opening the modal will
 * be disabled.
 * @param {String=} [controller='rxModalCtrl']
 * Identifies the controller name to use for modal functionality. At minimum, 
 * the controller should implement `submit()` and `cancel()` for use by the modal 
 * footer. Use this attribute if you need advanced behavior of the modal. 
 * Currently used in wizard-like modals and multi-view modals. 
 *
 * @example
 * <pre>
 * <rx-modal-action
 *     pre-hook="myPreHook(this)"
 *     post-hook="myPostHook(fields)"
 *     template-url="modalContent.html"
 *     disable-esc>
 *         My Link Text
 * </rx-modal-action>
 * </pre>
 */
.directive('rxModalAction', function (rxModal) {
    var createModal = function (config, scope) {
        config = _.defaults(config, {
            templateUrl: config.templateUrl,
            controller: 'rxModalCtrl',
            scope: scope
        });

        config.windowClass = 'rxModal';

        var modal = rxModal.open(config);

        return modal;
    };

    return {
        transclude: true,
        templateUrl: 'templates/rxModalAction.html',
        restrict: 'E',
        scope: true,
        link: function (scope, element, attrs) {
            // add any class passed in to scope
            scope.classes = attrs.classes;

            attrs.$observe('ngDisabled', function (newValue) {
                scope.isDisabled = scope.$eval(newValue);
            });

            var focusLink = function () {
                element.find('a')[0].focus();
            };

            var handleDismiss = function () {
                focusLink();

                // Since we don't want to isolate the scope, we have to eval our attr instead of using `&`
                // The eval will execute function (if it exists)
                scope.$eval(attrs.dismissHook);
            };

            var handleSubmit = function () {
                focusLink();

                // Since we don't want to isolate the scope, we have to eval our attr instead of using `&`
                // The eval will execute function
                scope.$eval(attrs.postHook);
            };

            scope.showModal = function (evt) {
                evt.preventDefault();

                if (scope.isDisabled) {
                    return false;
                }

                // Note: don't like having to create a 'fields' object in here,
                // but we need it so that the child input fields can bind to the modalScope
                scope.fields = {};

                scope.setState = function (state) {
                    scope.state = state;
                };
                scope.setState('editing');

                // Since we don't want to isolate the scope, we have to eval our attr instead of using `&`
                // The eval will execute function (if it exists)
                scope.$eval(attrs.preHook);

                if (_.has(attrs, 'disableEsc')) {
                    attrs.keyboard = false;
                }

                var modal = createModal(attrs, scope);

                modal.result.then(handleSubmit, handleDismiss);
            };
        }
    };
});
