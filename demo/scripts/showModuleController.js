(function () {
    angular
        .module('demoApp')
        .controller('showModuleController', ShowModuleController);

    function ShowModuleController ($scope, $filter, rxBreadcrumbsSvc, module, rxPageTitle) {
        rxPageTitle.setTitle(module.displayName);

        rxBreadcrumbsSvc.set([
            {
                path: '#/modules',
                name: 'Modules'
            }, {
                path: '#/' + module.category,
                name: $filter('rxCapitalize')(module.category)
            }, {
                name: module.displayName
            }
        ]);

        $scope.module = module;
    }//ShowModuleController()
})();
