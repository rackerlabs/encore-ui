angular.module('encore.ui.utilities')
/**
 * @ngdoc directive
 * @name elements.directive:rxModalAnimationClass
 * @description
 * Element for modal animation class
 */
.directive('rxModalAnimationClass', function () {
    return {
        compile: function (tElement, tAttrs) {
            if (tAttrs.modalAnimation) {
                tElement.addClass(tAttrs.rxModalAnimationClass);
            }
        }
    };
});
