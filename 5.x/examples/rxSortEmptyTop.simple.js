angular.module('demoApp')
.controller('rxSortEmptyTopSimpleCtrl', function ($scope, rxPageTracker, rxSortUtil) {
    $scope.sort = rxSortUtil.getDefault('name');
    $scope.sort = rxSortUtil.getDefault('name', false);
    $scope.pager = rxPageTracker.createInstance();

    $scope.sortCol = function (predicate) {
        return rxSortUtil.sortCol($scope, predicate);
    };

    $scope.serverVolumes = [
        {
            name: 'Monitor Agent 4',
            volumeId: 'a44079a5-040b-495f-be22-35994ea03cc5'
        },
        {
            name: 'Stress Volume 33',
            volumeId: '65d89e82-9363-482e-92d1-f3f7d4f135a7'
        },
        {
            name: null,
            volumeId: '0a87a764-45f0-4a1e-8dbf-20d76291022d'
        },
        {
            name: 'Stress Volume 24',
            volumeId: ''
        },
        {
            name: null,
            volumeId: 'be827f83-8d4c-4d4c-afc3-4c9bf0fdfe00'
        },
    ];
});
