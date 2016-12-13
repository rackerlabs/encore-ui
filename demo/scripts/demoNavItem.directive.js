(function () {
    angular
        .module('demoApp')
        .directive('demoNavItem', DemoNavItemDirective);

    function DemoNavItemDirective ($compile) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'templates/demo-nav-item.html',
            link: function (scope, element) {
                var injectContent = function (selector, content) {
                    var el = element[0].querySelector(selector);
                    el = angular.element(el);

                    $compile(content)(scope, function (compiledHtml) {
                        el.append(compiledHtml);
                    });
                };//injectContent()

                // increment nesting level for child items
                var childLevel = scope.$parent.level + 1;
                // safety check that child level is a number
                if (isNaN(childLevel)) {
                    childLevel = 2;
                }

                // add children if present
                // Note: this can't be added in the HTML due to angular recursion issues
                var navTemplate = '<demo-nav items="item.children" level="' +
                    childLevel + '">' + '</demo-nav>';

                if (angular.isArray(scope.item.children)) {
                    injectContent('.demoNav__item-children', navTemplate);
                }
            },//link()
            scope: {
                item: '=',
                level: '='
            },
            controller: function ($scope) {
                $scope.navClickHandler = function (clickEvent, item) {
                    // if no href present, simply toggle active state
                    if (_.isEmpty(item.href)) {
                        clickEvent.preventDefault();
                        $scope.item.active = !$scope.item.active;
                    }
                    // otherwise, let the default nav do it's thing
                    return;
                }
            }
        };
    }//DemoNavItemDirective
})();
