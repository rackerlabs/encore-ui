angular.module('encore.ui.rxApp')
/**
 * @deprecated This directive will be removed in EncoreUI 4.0.0
 * @ngdoc directive
 * @name rxApp.directive:rxStatusTag
 * @restrict E
 * @scope
 * @description
 * This is used to draw the Alpha/Beta/etc tags in page titles and in breadcrumbs. It's not
 * intended as a public directive.
 */
.directive('rxStatusTag', function (rxStatusTags, suppressDeprecationWarnings) {
    if (!suppressDeprecationWarnings) {
        console.warn(
            'DEPRECATED: rxStatusTag will be removed in EncoreUI 4.0.0'
        );
    }

    return {
        template: '<span ng-if="status && validKey" class="status-tag {{ class }}">{{ text }}</span>',
        restrict: 'E',
        scope: {
            status: '@'
        },
        link: function (scope) {
            scope.validKey = rxStatusTags.hasTag(scope.status);
            if (scope.validKey) {
                var config = rxStatusTags.getTag(scope.status);
                scope.class = config.class;
                scope.text = config.text;
            }
        }
    };
});
