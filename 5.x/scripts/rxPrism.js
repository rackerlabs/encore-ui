angular.module('demoApp')
.directive('rxPrism', function ($timeout, $http) {
    return {
        restrict: 'E',
        template: '<pre><code class="line-numbers language-{{language}}" ng-transclude></code></pre>',
        scope: {
            language: '@',
            codeUrl: '@',
        },
        transclude: true,
        link: function (scope, el) {
            // delay execution of Prism until ng bindings have completed
            $timeout(function () {
                var code = el.find('code')[0];
                if (scope.codeUrl) {
                    $http.get(scope.codeUrl).then(function (result) {
                        code.textContent = result.data;
                        Prism.highlightElement(code);
                    });
                } else {
                    Prism.highlightElement(code);
                }
            }, 0);
        }
    };
});
