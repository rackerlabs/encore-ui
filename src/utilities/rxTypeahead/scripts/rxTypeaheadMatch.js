angular.module('encore.ui.utilities')
/**
 * @ngdoc directive
 * @name utilities.directive:rxTypeaheadMatch
 * @scope
 * @description
 * directive used in rxTypeahead to display an element matching the query
 */
.directive('rxTypeaheadMatch', function ($templateRequest, $compile, $parse) {
    return {
        scope: {
            index: '=',
            match: '=',
            query: '='
        },
        link: function (scope, element, attrs) {
            var tplUrl = $parse(attrs.templateUrl)(scope.$parent) || 'templates/rxTypeaheadMatch.html';
            $templateRequest(tplUrl).then(function (tplContent) {
                $compile(tplContent.trim())(scope, function (clonedElement) {
                    element.replaceWith(clonedElement);
                });
            });
        }
    };
});
