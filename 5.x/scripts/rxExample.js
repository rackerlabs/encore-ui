angular.module('demoApp')
.directive('rxExample', function ($http, Examples) {
    var MAX_PREVIEW_LINES = 10;

    function countLines (content) {
        return content.trim().split('\n').length;
    }//countLines()

    function isExpandable (content) {
        if (!content) {
            return false;
        }
        var lineCount = countLines(content);

        if (lineCount === MAX_PREVIEW_LINES + 1) {
            // collapse is unnecessary
            return false;
        } else {
            return lineCount > MAX_PREVIEW_LINES;
        }
    }//isExpandable()

    function isExpandedOnLoad (content) {
        if (!content) { return false; }

        var lineCount = countLines(content);

        return lineCount <= (MAX_PREVIEW_LINES + 1);
    }//isExpandedOnLoad()

    return {
        restrict: 'E',
        templateUrl: 'templates/rx-example.html',
        scope: {
            name: '@'
        },
        link: function (scope) {
            scope.markupUrl = 'examples/' + scope.name + '.html'; // used by ng-include
            scope.example = Examples[scope.name];

            var _canExpand = {
                markup: isExpandable(scope.example.markup),
                javascript: isExpandable(scope.example.javascript),
                less: isExpandable(scope.example.less)
            }

            var _isExpanded = {
                markup: isExpandedOnLoad(scope.example.markup),
                javascript: isExpandedOnLoad(scope.example.javascript),
                less: isExpandedOnLoad(scope.example.less)
            };

            scope.isExpanded = function (ilk) {
                return _isExpanded[ilk];
            };

            scope.canExpand = function (ilk) {
                return _canExpand[ilk];
            };

            scope.toggleExpanded = function (ilk) {
                _isExpanded[ilk] = !_isExpanded[ilk];
            };

            scope.$applyAsync(function () {
                Prism.highlightAll();
            });
        }
    };
});
