angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:rxModalStack
 * @requires utilities.factory:rxMultiMap
 * @requires utilities.factory:rxStackedMap
 * @description
 * Service for modal stacks
 */
.factory('rxModalStack', function ($animate, $timeout, $document, $compile, $rootScope, $q, $injector, rxMultiMap,
        rxStackedMap) {

    var $animateCss = null;

    if ($injector.has('$animateCss')) {
        $animateCss = $injector.get('$animateCss');
    }

    var OPENED_MODAL_CLASS = 'modal-open';

    var backdropDomEl, backdropScope;
    var openedWindows = rxStackedMap.createNew();
    var openedClasses = rxMultiMap.createNew();
    var $modalStack = {
        NOW_CLOSING_EVENT: 'modal.stack.now-closing'
    };

    //Modal focus behavior
    var focusableElementList;
    var focusIndex = 0; // eslint-disable-line
    var tababbleSelector = 'a[href], area[href], input:not([disabled]), ' +
        'button:not([disabled]),select:not([disabled]), textarea:not([disabled]), ' +
        'iframe, object, embed, *[tabindex], *[contenteditable=true]';

    function backdropIndex () {
        var topBackdropIndex = -1;
        var opened = openedWindows.keys();

        for (var i = 0; i < opened.length; i++) {
            if (openedWindows.get(opened[i]).value.backdrop) {
                topBackdropIndex = i;
            }
        }
        return topBackdropIndex;
    }

    $rootScope.$watch(backdropIndex, function (newBackdropIndex) {
        if (backdropScope) {
            backdropScope.index = newBackdropIndex;
        }
    });

    function removeModalWindow (modalInstance, elementToReceiveFocus) {
        var body = $document.find('body').eq(0);
        var modalWindow = openedWindows.get(modalInstance).value;

        //clean up the stack
        openedWindows.remove(modalInstance);

        removeAfterAnimate(modalWindow.modalDomEl, modalWindow.modalScope, function () {
            var modalBodyClass = modalWindow.openedClass || OPENED_MODAL_CLASS;
            openedClasses.remove(modalBodyClass, modalInstance);
            body.toggleClass(modalBodyClass, openedClasses.hasKey(modalBodyClass));
            toggleTopWindowClass(true);
        });
        checkRemoveBackdrop();

        //move focus to specified element if available, or else to body
        if (elementToReceiveFocus && elementToReceiveFocus.focus) {
            elementToReceiveFocus.focus();
        } else {
            body.focus();
        }
    }

    // Add or remove "windowTopClass" from the top window in the stack
    function toggleTopWindowClass (toggleSwitch) {
        var modalWindow;

        if (openedWindows.length() > 0) {
            modalWindow = openedWindows.top().value;
            modalWindow.modalDomEl.toggleClass(modalWindow.windowTopClass || '', toggleSwitch);
        }
    }

    function checkRemoveBackdrop () {
        //remove backdrop if no longer needed
        if (backdropDomEl && backdropIndex() == -1) { // eslint-disable-line
            var backdropScopeRef = backdropScope; // eslint-disable-line
            removeAfterAnimate(backdropDomEl, backdropScope, function () {
                backdropScopeRef = null;
            });
            backdropDomEl = undefined;
            backdropScope = undefined;
        }
    }

    function removeAfterAnimate (domEl, scope, done) {
        var asyncDeferred;
        var asyncPromise = null;
        var setIsAsync = function () {
            if (!asyncDeferred) {
                asyncDeferred = $q.defer();
                asyncPromise = asyncDeferred.promise;
            }

            return function asyncDone () {
                asyncDeferred.resolve();
            };
        };
        scope.$broadcast($modalStack.NOW_CLOSING_EVENT, setIsAsync);

        // Note that it's intentional that asyncPromise might be null.
        // That's when setIsAsync has not been called during the
        // NOW_CLOSING_EVENT broadcast.
        return $q.when(asyncPromise).then(afterAnimating);

        function afterAnimating () {
            if (afterAnimating.done) {
                return;
            }
            afterAnimating.done = true;

            if ($animateCss) {
                $animateCss(domEl, {
                    event: 'leave'
                }).start().then(function () {
                    domEl.remove();
                });
            } else {
                $animate.leave(domEl);
            }
            scope.$destroy();
            if (done) {
                done();
            }
        }
    }

    $document.bind('keydown', function (evt) {
        if (evt.isDefaultPrevented()) {
            return evt;
        }

        var modal = openedWindows.top();
        if (modal && modal.value.keyboard) {
            switch (evt.which) {
                case 27: {
                    evt.preventDefault();
                    $rootScope.$apply(function () {
                        $modalStack.dismiss(modal.key, 'escape key press');
                    });
                    break;
                }
                case 9: {
                    /* eslint-disable max-depth */
                    $modalStack.loadFocusElementList(modal);
                    var focusChanged = false;
                    if (evt.shiftKey) {
                        if ($modalStack.isFocusInFirstItem(evt)) {
                            focusChanged = $modalStack.focusLastFocusableElement();
                        }
                    } else {
                        if ($modalStack.isFocusInLastItem(evt)) {
                            focusChanged = $modalStack.focusFirstFocusableElement();
                        }
                    }
                    /* eslint-enable max-depth */
                    if (focusChanged) {
                        evt.preventDefault();
                        evt.stopPropagation();
                    }
                    break;
                }
            }
        }
    });

    $modalStack.open = function (modalInstance, modal) {
        var modalOpener = $document[0].activeElement,
            modalBodyClass = modal.openedClass || OPENED_MODAL_CLASS;

        toggleTopWindowClass(false);

        openedWindows.add(modalInstance, {
            deferred: modal.deferred,
            renderDeferred: modal.renderDeferred,
            modalScope: modal.scope,
            backdrop: modal.backdrop,
            keyboard: modal.keyboard,
            openedClass: modal.openedClass,
            windowTopClass: modal.windowTopClass
        });

        openedClasses.put(modalBodyClass, modalInstance);

        var body = $document.find('body').eq(0),
            currBackdropIndex = backdropIndex();

        if (currBackdropIndex >= 0 && !backdropDomEl) {
            backdropScope = $rootScope.$new(true);
            backdropScope.index = currBackdropIndex;
            var angularBackgroundDomEl = angular.element('<div rx-modal-backdrop="modal-backdrop"></div>');
            angularBackgroundDomEl.attr('backdrop-class', modal.backdropClass);
            if (modal.animation) {
                angularBackgroundDomEl.attr('modal-animation', 'true');
            }
            backdropDomEl = $compile(angularBackgroundDomEl)(backdropScope);
            body.append(backdropDomEl);
        }

        var angularDomEl = angular.element('<div rx-modal-window="modal-window"></div>');
        angularDomEl.attr({
            'template-url': modal.windowTemplateUrl,
            'window-class': modal.windowClass,
            'window-top-class': modal.windowTopClass,
            'size': modal.size,
            'index': openedWindows.length() - 1,
            'animate': 'animate'
        }).html(modal.content);
        if (modal.animation) {
            angularDomEl.attr('modal-animation', 'true');
        }

        var modalDomEl = $compile(angularDomEl)(modal.scope);
        openedWindows.top().value.modalDomEl = modalDomEl;
        openedWindows.top().value.modalOpener = modalOpener;
        body.append(modalDomEl);
        body.addClass(modalBodyClass);

        $modalStack.clearFocusListCache();
    };

    function broadcastClosing (modalWindow, resultOrReason, closing) {
        return !modalWindow.value.modalScope.$broadcast('modal.closing', resultOrReason, closing).defaultPrevented;
    }

    $modalStack.close = function (modalInstance, result) {
        var modalWindow = openedWindows.get(modalInstance);
        if (modalWindow && broadcastClosing(modalWindow, result, true)) {
            modalWindow.value.modalScope.$$uibDestructionScheduled = true;
            modalWindow.value.deferred.resolve(result);
            removeModalWindow(modalInstance, modalWindow.value.modalOpener);
            return true;
        }
        return !modalWindow;
    };

    $modalStack.dismiss = function (modalInstance, reason) {
        var modalWindow = openedWindows.get(modalInstance);
        if (modalWindow && broadcastClosing(modalWindow, reason, false)) {
            modalWindow.value.modalScope.$$uibDestructionScheduled = true;
            modalWindow.value.deferred.reject(reason);
            removeModalWindow(modalInstance, modalWindow.value.modalOpener);
            return true;
        }
        return !modalWindow;
    };

    $modalStack.dismissAll = function (reason) {
        var topModal = this.getTop();
        while (topModal && this.dismiss(topModal.key, reason)) {
            topModal = this.getTop();
        }
    };

    $modalStack.getTop = function () {
        return openedWindows.top();
    };

    $modalStack.modalRendered = function (modalInstance) {
        var modalWindow = openedWindows.get(modalInstance);
        if (modalWindow) {
            modalWindow.value.renderDeferred.resolve();
        }
    };

    $modalStack.focusFirstFocusableElement = function () {
        if (focusableElementList.length > 0) {
            focusableElementList[0].focus();
            return true;
        }
        return false;
    };
    $modalStack.focusLastFocusableElement = function () {
        if (focusableElementList.length > 0) {
            focusableElementList[focusableElementList.length - 1].focus();
            return true;
        }
        return false;
    };

    $modalStack.isFocusInFirstItem = function (evt) {
        if (focusableElementList.length > 0) {
            return (evt.target || evt.srcElement) == focusableElementList[0]; // eslint-disable-line
        }
        return false;
    };

    $modalStack.isFocusInLastItem = function (evt) {
        if (focusableElementList.length > 0) {
            return (evt.target || evt.srcElement) == focusableElementList[focusableElementList.length - 1]; // eslint-disable-line
        }
        return false;
    };

    $modalStack.clearFocusListCache = function () {
        focusableElementList = [];
        focusIndex = 0;
    };

    $modalStack.loadFocusElementList = function (modalWindow) {
        if (focusableElementList === undefined || !focusableElementList.length) {
            if (modalWindow) {
                var modalDomE1 = modalWindow.value.modalDomEl;
                if (modalDomE1 && modalDomE1.length) {
                    focusableElementList = modalDomE1[0].querySelectorAll(tababbleSelector);
                }
            }
        }
    };

    return $modalStack;
});
