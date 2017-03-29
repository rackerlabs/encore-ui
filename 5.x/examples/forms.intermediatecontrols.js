angular.module('demoApp')
.controller('formIntermediateControlsDemoCtrl', function ($scope) {
    $scope.userEmail = '';
    $scope.isNameRequired = true;
    $scope.volumeName = '';
})
.directive('foocheck', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.foocheck = function (modelValue, viewValue) {
                var value = modelValue || viewValue;
                return _.includes(value, 'foo');
            }
        }
    };
});
