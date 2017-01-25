angular.module('demoApp')
.controller('rxStatusSimpleCtrl', function ($scope, $rootScope, rxStatus) {
    rxStatus.setScope($scope);

    $scope.triggerRouteChangeSuccess = function () {
        $rootScope.$broadcast('$routeChangeSuccess');
    };

    $scope.clear = function () {
        rxStatus.clear();
        $scope.notify = undefined;
    };

    $scope.setLoading = function (msg) {
        rxStatus.clear();
        $scope.notify = rxStatus.setLoading(msg);
    };

    $scope.setSuccess = function (msg) {
        rxStatus.clear();
        $scope.notify = rxStatus.setSuccess(msg);
    };

    $scope.setSuccessNext = function (msg) {
        rxStatus.clear();
        $scope.notify = rxStatus.setSuccessNext(msg);
    };

    $scope.setSuccessImmediate = function (msg) {
        rxStatus.clear();
        $scope.notify = rxStatus.setSuccessImmediate(msg);
    };

    $scope.setWarning = function (msg) {
        rxStatus.clear();
        $scope.notify = rxStatus.setWarning(msg);
    };

    $scope.setInfo = function (msg) {
        rxStatus.clear();
        $scope.notify = rxStatus.setInfo(msg);
    };

    $scope.setError = function (msg) {
        rxStatus.clear();
        $scope.notify = rxStatus.setError(msg);
    };

    $scope.dismiss = function () {
        $scope.notify && rxStatus.dismiss($scope.notify);
        $scope.notify = undefined;
    };
});
