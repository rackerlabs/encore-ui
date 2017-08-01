(function () {
    angular
        .module('demoApp')
        .controller('showModuleController', ShowModuleController);

    function ShowModuleController ($scope, $filter, module, rxBreadcrumbsSvc) {
        rxBreadcrumbsSvc.set([
            {
                path: '#/modules',
                name: 'Modules'
            },
            {
                path: '#/' + module.category,
                name: $filter('rxCapitalize')(module.category)
            }, {
                name: module.displayName
            }
        ]);

        $scope.module = module;
    }//ShowModuleController()
})();
