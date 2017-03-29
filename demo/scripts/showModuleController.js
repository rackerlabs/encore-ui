(function () {
    angular
        .module('demoApp')
        .controller('showModuleController', ShowModuleController);

    function ShowModuleController ($scope, $filter, module, rxPageTitle) {
        rxPageTitle.setTitle(module.displayName);

        $scope.module = module;
    }//ShowModuleController()
})();
