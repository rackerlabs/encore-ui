function genericListCategoryModulesController (ilk) {
    return function ($filter, Modules, rxBreadcrumbsSvc, rxPageTitle) {
        var vm = this;

        vm.category = ilk;
        vm.capitalizedCategory = $filter('rxCapitalize')(vm.category);
        rxPageTitle.setTitle('All ' + vm.capitalizedCategory);
        vm.sortKey = 'displayName';
        vm.sortReverse = false;
        vm.modules = _.filter(Modules, { 'isCategory': false, 'category': vm.category });

        // functions
        vm.getCaretType = getCaretType;
        vm.showCaret = showCaret;
        vm.sortColumn = sortColumn;

        activate();

        function activate () {
            rxBreadcrumbsSvc.set([
                {
                    path: '#/modules',
                    name: 'Modules'
                },
                {
                    path: '#/' + vm.category,
                    name: vm.capitalizedCategory
                }
            ]);
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
    };
}//genericListCategoryModulesController

angular.module('demoApp')
.controller('listElementsController', genericListCategoryModulesController('elements'))
.controller('listUtilitiesController', genericListCategoryModulesController('utilities'))
.controller('listComponentsController', genericListCategoryModulesController('components'));
