angular.module('demoApp')
.controller('bulkSelectAdvancedCtrl', function ($scope) {

    $scope.datacenters = [
        { name: 'ORD1', city: 'Chicago' },
        { name: 'DFW1', city: 'Grapevine' },
        { name: 'DFW2', city: 'Richardson' },
        { name: 'IAD2', city: 'Ashburn' },
        { name: 'IAD3', city: 'Ashburn' },
        { name: 'LON1', city: 'West Drayton' },
        { name: 'LON3', city: 'Berkshire' },
        { name: 'LON5', city: 'Crawley' },
        { name: 'HKG1', city: 'Hong Kong' },
        { name: 'SYD2', city: 'Sydney' }
    ];

    // cloned to avoid interference with first demo table
    $scope.validateDatacenters = _.cloneDeep($scope.datacenters);

    $scope.filter = { keyword: '' };

    $scope.getSelectedDatacenters = function () {
        return _.cloneDeep(_.filter($scope.datacenters, { rowIsSelected: true }));
    };

})
.controller('shutDownDatacentersCtrl', function ($scope, $modalInstance, $timeout, rxSortUtil, rxPageTracker) {
    $scope.sort = rxSortUtil.getDefault('name');
    $scope.sortCol = function (predicate) {
        return rxSortUtil.sortCol($scope, predicate);
    };

    var itemsPerPage = 8;
    $scope.pager = rxPageTracker.createInstance({ itemsPerPage: itemsPerPage });
    $scope.showPagination = itemsPerPage < $scope.selectedDatacenters.length;

    $scope.removeDatacenter = function (dc) {
        _.remove($scope.selectedDatacenters, dc);
    };

    $scope.submit = function () {
        $scope.setState('working');

        $scope.numCompleted = 0;

        var delay = 1000;
        $scope.selectedDatacenters.forEach(function (dc, i) {
            $timeout(function () {
                dc.status = 'pending';
            }, i * delay);
            $timeout(function () {
                dc.status = i % 4 === 0 ? 'failure' : 'success';
                $scope.numCompleted++;
            }, ++i * delay);
        });
        $timeout(function () {
            $scope.setState('complete');
            $scope.errorsPresent = _.some($scope.selectedDatacenters, { status: 'failure' });
        }, $scope.selectedDatacenters.length * delay);
    };

    $scope.cancel = $modalInstance.dismiss;
});
