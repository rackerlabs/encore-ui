angular.module('demoApp')
.controller('checkboxDocsCtrl', function ($scope) {
    $scope.chkValidEnabledOne = true;
    $scope.chkValidEnabledTwo = false;
    $scope.chkValidDisabledOne = true;
    $scope.chkValidDisabledTwo = false;
    $scope.chkValidNgDisabledOne = true;
    $scope.chkValidNgDisabledTwo = false;

    $scope.chkInvalidEnabledOne = true;
    $scope.chkInvalidEnabledTwo = false;
    $scope.chkInvalidDisabledOne = true;
    $scope.chkInvalidDisabledTwo = false;
    $scope.chkInvalidNgDisabledOne = true;
    $scope.chkInvalidNgDisabledTwo = false;
});
