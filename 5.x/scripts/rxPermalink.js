angular.module('demoApp')
.directive('rxPermalink', function ($location) {
    return {
        restrict: 'E',
        scope: {},
        transclude: true,
        templateUrl: 'templates/rx-permalink.html',
        link: function (scope, el) {
            // Convert Text content to URL-safe string
            scope.permaId = el.text()
                .toLowerCase() // normalize to lowercase
                .trim() // remove leading/trailing whitespace
                .replace(/[^0-9a-z]/gi, '-') // non-alphanumeric to hyphen
                .replace(/\-{2,}/g, '-'); // condense consecutive hyphens

            scope.permalinkUrl = '#' + $location.path() + '#' + scope.permaId;
        }
    };
});
