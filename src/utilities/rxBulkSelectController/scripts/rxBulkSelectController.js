angular.module('encore.ui.utilities')
/**
 * @ngdoc controller
 * @name utilities.controller:rxBulkSelectController
 * @scope
 * @description
 * Provides controller logic for {@link rxBulkSelect}.
 */
.controller('rxBulkSelectController', function ($scope, NotifyProperties, rxBulkSelectUtils) {
    $scope.showMessage = false;

    var uncheckHeaderFn = _.noop,
        messageStats = {
            // jscs:disable disallowDanglingUnderscores
            _numSelected: 0,
            _total: 0
        };

    this.registerForNumSelected = NotifyProperties.registrationFn(messageStats, 'numSelected', '_numSelected');
    this.registerForTotal = NotifyProperties.registrationFn(messageStats, 'total', '_total');

    this.messageStats = messageStats;

    var numSelected = function () {
        var selected = _.where($scope.bulkSource, $scope.selectedKey);
        return selected.length;
    };

    var updateMessageStats = function () {
        messageStats.numSelected = numSelected();
        messageStats.total = $scope.bulkSource.length;
        $scope._rxFloatingHeaderCtrl.reapply();
    };

    this.key = function () {
        return $scope.selectedKey;
    };

    var setAllVisibleRows = function (state) {
        rxBulkSelectUtils.setAllVisibleRows(state, $scope.tableElement, $scope.selectedKey);
    };

    var setAllRows = function (state) {
        _.each($scope.bulkSource, function (item) {
            item[$scope.selectedKey] = state;
        });
    };

    this.selectAllVisibleRows = function () {
        setAllVisibleRows(true);
        updateMessageStats();
    };

    this.deselectAllVisibleRows = function () {
        setAllVisibleRows(false);
        updateMessageStats();
        uncheckHeaderFn();
    };

    this.selectEverything = function () {
        setAllRows(true);
        updateMessageStats();
    };

    this.deselectEverything = function () {
        setAllRows(false);
        updateMessageStats();
        uncheckHeaderFn();
    };

    $scope.$watch('bulkSource.length', function (newTotal) {
        if (newTotal !== messageStats.total) {
            updateMessageStats();
        }
    });

    this.increment = function () {
        messageStats.numSelected += 1;
        $scope._rxFloatingHeaderCtrl.reapply();
    };

    this.decrement = function () {
        messageStats.numSelected -= 1;
        $scope._rxFloatingHeaderCtrl.reapply();
    };

    this.registerHeader = function (uncheck) {
        if (_.isFunction(uncheck)) {
            uncheckHeaderFn = uncheck;
        }
    };
});
