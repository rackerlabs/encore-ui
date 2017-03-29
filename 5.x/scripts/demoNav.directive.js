(function () {
    angular
        .module('demoApp')
        .directive('demoNav', DemoNavDirective);

    function DemoNavDirective () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'templates/demo-nav.html',
            scope: {
                items: '=',
                level: '='
            }
        };
    }//DemoNavDirective
})();
