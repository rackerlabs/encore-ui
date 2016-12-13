angular.module('demoApp')
.controller('listModulesController', function ($filter, Modules, rxBreadcrumbsSvc, rxPageTitle) {
    var vm = this;

    vm.category = 'modules';
    vm.capitalizedCategory = $filter('rxCapitalize')(vm.category);
    rxPageTitle.setTitle('All ' + vm.capitalizedCategory);
    vm.sortKey = 'displayName';
    vm.sortReverse = false;
    vm.modules = _.filter(Modules, { 'isCategory': false });

    // functions
    vm.getCaretType = getCaretType;
    vm.showCaret = showCaret;
    vm.sortColumn = sortColumn;

    activate();

    function activate () {
        rxBreadcrumbsSvc.set([{
            path: '#/' + vm.category,
            name: vm.capitalizedCategory
        }]);
    }

    function getCaretType () {
        return vm.sortReverse ? 'fa fa-caret-down' : 'fa fa-caret-up';
    }

    function showCaret (key) {
        return vm.sortKey === key;
    }

    function sortColumn (key) {
        // Click new column defaults to ascending; click same column toggles between asc and desc
        vm.sortReverse = (key === vm.sortKey ? !vm.sortReverse : false);
        vm.sortKey = key;
    }
});
