(function () {
    angular
        .module('demoApp')
        .directive('switchDocs', SwitchDocsDirective);

    function SwitchDocsDirective ($location, DOC_VERSIONS) {
        return {
            restrict: 'E',
            templateUrl: '../components/switchDocs/switch-docs.html',
            controller: function ($scope) {
                $scope.versions = DOC_VERSIONS;

                // Determine which version is currently being viewed
                $scope.version = $scope.versions.filter(function (version) {
                    return $location.absUrl().search('/' + version.path) >= 0;
                })[0];

                /* Navigate to different version on change */
                $scope.$watch('version', function (newVal, oldVal) {
                    if (oldVal && (oldVal.path !== newVal.path)) {
                        window.location.href = '../' + newVal.path;
                    }
                });
            }
        };
    };//SwitchDocsDirective

    angular
        .module('demoApp')
        .constant('DOC_VERSIONS', [
            {
                "label": "5.0.0-x (Unreleased)",
                "path": "5.x",
            },
            {
                "label": "4.x (Current)",
                "path": "4.x",
            },
            {
                "label": "3.x (LTS)",
                "path": "3.x",
            },
            {
                "label": "2.x",
                "path": "2.x",
            },
            {
                "label": "1.x",
                "path": "1.x",
            }
        ]);//DOC_VERSIONS
})();
