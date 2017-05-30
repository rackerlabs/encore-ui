angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxModalWindow
 * @requires utilities.facjkjkjktory:rxModalStack
 * @description
 * Element for modal window
 */
.directive('rxModalWindow', function($q, $animate, $injector, rxModalStack) {
        var $animateCss = null;

        if ($injector.has('$animateCss')) {
            $animateCss = $injector.get('$animateCss');
        }

        return {
            scope: {
                index: '@'
            },
            replace: true,
            transclude: true,
            templateUrl: function(tElement, tAttrs) {
                return tAttrs.templateUrl || 'templates/rxModalWindow.html';
            },
            link: function(scope, element, attrs) {
                element.addClass(attrs.windowClass || '');
                element.addClass(attrs.windowTopClass || '');
                scope.size = attrs.size;

                scope.close = function(evt) {
                    var modal = rxModalStack.getTop();
                    if (modal && modal.value.backdrop && modal.value.backdrop !== 'static' && (evt.target === evt.currentTarget)) {
                        evt.preventDefault();
                        evt.stopPropagation();
                        rxModalStack.dismiss(modal.key, 'backdrop click');
                    }
                };

                // moved from template to fix issue #2280
                element.on('click', scope.close);

                // This property is only added to the scope for the purpose of detecting when this directive is rendered.
                // We can detect that by using this property in the template associated with this directive and then use
                // {@link Attribute#$observe} on it. For more details please see {@link TableColumnResize}.
                scope.$isRendered = true;

                // Deferred object that will be resolved when this modal is render.
                var modalRenderDeferObj = $q.defer();
                // Observe function will be called on next digest cycle after compilation, ensuring that the DOM is ready.
                // In order to use this way of finding whether DOM is ready, we need to observe a scope property used in modal's template.
                attrs.$observe('modalRender', function(value) {
                    if (value == 'true') {
                        modalRenderDeferObj.resolve();
                    }
                });

                modalRenderDeferObj.promise.then(function() {
                    var animationPromise = null;

                    if (attrs.modalInClass) {
                        if ($animateCss) {
                            animationPromise = $animateCss(element, {
                                addClass: attrs.modalInClass
                            }).start();
                        } else {
                            animationPromise = $animate.addClass(element, attrs.modalInClass);
                        }

                        scope.$on(rxModalStack.NOW_CLOSING_EVENT, function(e, setIsAsync) {
                            var done = setIsAsync();
                            if ($animateCss) {
                                $animateCss(element, {
                                    removeClass: attrs.modalInClass
                                }).start().then(done);
                            } else {
                                $animate.removeClass(element, attrs.modalInClass).then(done);
                            }
                        });
                    }


                    $q.when(animationPromise).then(function() {
                        var inputWithAutofocus = element[0].querySelector('[autofocus]');
                        /**
                         * Auto-focusing of a freshly-opened modal element causes any child elements
                         * with the autofocus attribute to lose focus. This is an issue on touch
                         * based devices which will show and then hide the onscreen keyboard.
                         * Attempts to refocus the autofocus element via JavaScript will not reopen
                         * the onscreen keyboard. Fixed by updated the focusing logic to only autofocus
                         * the modal element if the modal does not contain an autofocus element.
                         */
                        if (inputWithAutofocus) {
                            inputWithAutofocus.focus();
                        } else {
                            element[0].focus();
                        }
                    });

                    // Notify {@link rxModalStack} that modal is rendered.
                    var modal = rxModalStack.getTop();
                    if (modal) {
                        rxModalStack.modalRendered(modal.key);
                    }
                });
            }
        };
    }
);
