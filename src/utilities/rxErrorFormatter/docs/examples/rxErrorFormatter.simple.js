angular.module('demoApp')
.controller('rxErrorFormatterSimpleCtrl', function ($scope, rxErrorFormatter) {
    $scope.setErrorMsg = function (msg) {
        var error = { message: msg };
        $scope.errorMsg = rxErrorFormatter.buildErrorMsg('Error: ${message}', error);
    };
});
