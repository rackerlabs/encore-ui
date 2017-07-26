angular.module('encore.ui.utilities')
/**
 * @ngdoc controller
 * @name utilities.controller:rxTabsetController
 * @description
 * Controller for creating tabs.
 */
.controller('rxTabsetController', function ($scope) {
    var ctrl = this,
        tabs = ctrl.tabs = $scope.tabs = [];
    var destroyed;

    ctrl.select = function (selectedTab) {
        angular.forEach(tabs, function (tab) {
            if (tab.active && tab !== selectedTab) {
                tab.active = false;
                tab.onDeselect();
                selectedTab.selectCalled = false;
            }
        });
        selectedTab.active = true;
        // only call select if it has not already been called
        if (!selectedTab.selectCalled) {
            selectedTab.onSelect();
            selectedTab.selectCalled = true;
        }
    };

    ctrl.addTab = function (tab) {
        tabs.push(tab);
        // we can't run the select function on the first tab
        // since that would select it twice
        if (tabs.length === 1 && tab.active !== false) {
            tab.active = true;
        } else if (tab.active) {
            ctrl.select(tab);
        } else {
            tab.active = false;
        }
    };

    ctrl.removeTab = function (tab) {
        var index = tabs.indexOf(tab);
        //Select a new tab if the tab to be removed is selected and not destroyed
        if (tab.active && tabs.length > 1 && !destroyed) {
            //If this is the last tab, select the previous tab. else, the next tab.
            var newActiveIndex = index === tabs.length - 1 ? index - 1 : index + 1;
            ctrl.select(tabs[newActiveIndex]);
        }
        tabs.splice(index, 1);
    };

    $scope.$on('$destroy', function () {
        destroyed = true;
    });
});
