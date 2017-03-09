angular.module('demoApp')
.controller('datePickerDocsCtrl', function ($scope) {
    $scope.enabledValid = '2015-12-15';
    $scope.disabledValid = '2015-12-15';

    $scope.enabledInvalid = '2015-12-15';
    $scope.disabledInvalid = '2015-12-15';
});
