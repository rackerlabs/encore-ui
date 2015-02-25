angular.module('encore.ui.rxModalAction', ['ui.bootstrap'])
.run(function ($compile, $templateCache) {
    $compile($templateCache.get('templates/rxModalFooters.html'));
})
/**
* @ngdoc directive
* @name encore.ui.rxModalAction:rxModalForm
* @restrict E
* @scope
* @description
* Responsible for creating the HTML necessary for modal form
*
* @param {string} title Title of modal window
* @param {string} [subtitle] Subtitle of modal window
* @param {boolean} [isLoading] True to show a spinner by default
* @param {string} [submitText] 'Submit' button text to use. Defaults to 'Submit'
* @param {string} [cancelText] 'Cancel' button text to use. Defaults to 'Cancel'
* @param {string} [defaultFocus] default focus element. May be 'submit' or 'cancel'. Defaults to 'firstTabbable'
*
* @example
* <rx-modal-form title="My Form" is-loading="true" submit-text="Yes!"></rx-modal-form>
*/
.directive('rxModalForm', function ($timeout, $compile, rxModalFooterTemplates) {
    return {
        transclude: true,
        templateUrl: 'templates/rxModalActionForm.html',
        restrict: 'E',
        scope: {
            title: '@',
            subtitle: '@',
            isLoading: '=',
            submitText: '@',
            cancelText: '@',
            returnText: '@',
            defaultFocus: '@'
        },
        controller: function ($scope, $element) {
            _.assign($scope.$parent, _.pick($scope, ['submitText', 'cancelText', 'returnText']));
            $compile(rxModalFooterTemplates.flush())($scope.$parent, function (clone) {
                $element.children('div.modal-footer').append(clone);
            });
        },
        link: function (scope, element) {
            var focusSelectors = {
                'cancel': 'button.cancel',
                'submit': 'button.submit',
                'firstTabbable': 'input:not([type="hidden"]):not([disabled="disabled"]), textarea, select'
            };
            var setFocus = function (focus) {
                var formSelector, focusElement;

                if (focus === 'cancel' || focus === 'submit') {
                    formSelector = element[0].querySelector('.modal-footer');
                    focusElement = formSelector.querySelector(focusSelectors[focus]);
                } else {
                    focus = 'firstTabbable';
                    formSelector = element[0].querySelector('.modal-form');
                    // first check for an element with autofocus
                    focusElement = formSelector.querySelector('[autofocus]');
                    if (!focusElement) {
                        focusElement = formSelector.querySelector(focusSelectors[focus]);
                    }
                }
                if (focusElement) {
                    focusElement.focus();
                }
            };

            // Give content some time to load to set the focus
            $timeout(function () {
                setFocus(scope.defaultFocus);
            }, 400);

            // Remove the title attribute, as it will cause a popup to appear when hovering over page content
            // @see https://github.com/rackerlabs/encore-ui/issues/256
            element.removeAttr('title');
        }
    };
})
.controller('rxModalCtrl', function ($scope, $modalInstance, $rootScope) {
    // define a controller for the modal to use
    $scope.submit = function () {
        $modalInstance.close($scope);
    };

    $scope.cancel = $modalInstance.dismiss;

    // cancel out of the modal if the route is changed
    $rootScope.$on('$routeChangeSuccess', $modalInstance.dismiss);
})
.factory('rxModalFooterTemplates', function () {
    var globals = {};
    var locals = {};

    return {
        flush: function () {
            var states = _.assign({}, globals, locals);
            locals = {};
            return _.values(states).reduce(function (html, template) {
                return html + template;
            }, '<div ng-switch="state">') + '</div>';
        },
        add: function (state, template, options) {
            if (options.global) {
                globals[state] = template;
            } else {
                locals[state] = template;
            }
        }
    };
})
/**
* @ngdoc directive
* @name encore.ui.rxModalAction:rxModalFooter
* @restrict E
* @scope
* @description
* Define a footer for the next modal.
*
* @param {string} [state] The content will be shown in the footer when this state is activated.
* @param {string} [global] If the global attribute is present, then this footer can be used
*                          in other modals. This attribute takes no values.
*
* @example
* <rx-modal-footer state="confirm">
*     <button class="button" ng-click="setState('pending')">I understand the risks.</button>
* </rx-modal-footer>
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
})
/**
* @ngdoc directive
* @name encore.ui.rxModalAction:rxModalAction
* @restrict E
* @scope
* @description
* Link which will show a modal window on click, and handle callbacks for pre/post modal actions
*
* @param {function} [preHook] Function to call when a modal is opened
* @param {function} [postHook] Function to call when a modal is submitted (not called when cancelled out of)
* @param {string} [templateUrl] URL of template to use for modal content
* @param {string} [disable-esc] If the `disable-esc` attribute is present, then "Press Esc to close" will be disabled
*                               for the modal. This attribute takes no values.
*
* @example
* <rx-modal-action
*     pre-hook="myPreHook(this)"
*     post-hook="myPostHook(fields)"
*     template-url="modalContent.html"
*     disable-esc>
*         My Link Text
*  </rx-modal-action>
*/
.directive('rxModalAction', function ($modal) {
    var createModal = function (config, scope) {
        config = _.defaults(config, {
            templateUrl: config.templateUrl,
            controller: 'rxModalCtrl',
            scope: scope
        });

        config.windowClass = 'rxModal';

        var modal = $modal.open(config);

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

            var focusLink = function () {
                element.find('a')[0].focus();
            };

            var handleSubmit = function () {
                focusLink();

                // Since we don't want to isolate the scope, we have to eval our attr instead of using `&`
                // The eval will execute function
                scope.$eval(attrs.postHook);
            };

            scope.showModal = function (evt) {
                evt.preventDefault();

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

                modal.result.then(handleSubmit, focusLink);
            };
        }
    };
});
