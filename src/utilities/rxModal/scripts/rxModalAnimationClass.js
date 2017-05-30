angular.module('encore.ui.utilities')

.directive('rxModalAnimationClass', function () {
    return {
        compile: function (tElement, tAttrs) {
            if (tAttrs.modalAnimation) {
                tElement.addClass(tAttrs.rxModalAnimationClass);
            }
        }
    };
});
