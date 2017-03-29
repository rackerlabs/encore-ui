angular.module('demoApp')
.directive('alwaysInvalid', function () {
    return {
        require: 'ngModel',
        link: function (scope, el, attrs, ctrl) {
            ctrl.$setValidity('alwaysInvalid', false);
            /* ng1.2+ (hack) */
            el.addClass('ng-dirty');
            /* ng1.3+ */
            //ctrl.$setDirty();
        }
    };
});
