angular.module('demoApp')
.controller('timePickerDocsCtrl', function ($scope) {
    $scope.enabledValid = '06:00-06:00';
    $scope.disabledValid = '20:00+08:00';

    $scope.enabledInvalid = '17:45+05:00';
    $scope.disabledInvalid = '05:15+00:00';
});
