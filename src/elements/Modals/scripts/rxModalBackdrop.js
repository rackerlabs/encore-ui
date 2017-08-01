angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxModalBackdrop
 * @requires utilities.service:rxModalStack
 * @description
 * Element for modal backdrop
 */
.directive('rxModalBackdrop', function ($animate, $injector, rxModalStack) {
    var $animateCss = null;

    if ($injector.has('$animateCss')) {
        $animateCss = $injector.get('$animateCss');
    }

    return {
        replace: true,
        templateUrl: 'templates/rxModalBackdrop.html',
        compile: function (tElement, tAttrs) {
            tElement.addClass(tAttrs.backdropClass);
            return linkFn;
        }
    };

    function linkFn (scope, element, attrs) {
        // Temporary fix for prefixing
        element.addClass('modal-backdrop');

        if (attrs.modalInClass) {
            if ($animateCss) {
                $animateCss(element, {
                    addClass: attrs.modalInClass
                }).start();
            } else {
                $animate.addClass(element, attrs.modalInClass);
            }

            scope.$on(rxModalStack.NOW_CLOSING_EVENT, function (e, setIsAsync) {
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
    }
});
