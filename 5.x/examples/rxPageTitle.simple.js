angular.module('demoApp')
.controller('rxPageTitleSimpleCtrl', function ($scope, rxPageTitle) {
    $scope.changeTitle = function () {
        rxPageTitle.setTitle($scope.newTitle);
    };

    $scope.refreshTitle = function () {
        $scope.pageTitle = rxPageTitle.getTitle();
    };

    $scope.refreshTitle();
});
