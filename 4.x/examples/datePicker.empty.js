angular.module('demoApp')
.controller('datePickerEmptyCtrl', function ($scope) {
    $scope.emptyDate = '';

    $scope.undefinedDate = undefined;
});
