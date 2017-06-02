angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxTab
 * @requires elements.directive:rxTabset
 * @restrict EA
 * @param {Boolean=} active True to show active tab by default
 * @param {String} heading Heading text to be displayed by default when rx-tab-heading tags are used
 * @param {Boolean=} onSelect True when tab is selected
 * @param {Boolean=} onDeselect True when tab is deselected
 * @description
 * Element for creating a tab.
 */
.directive('rxTab', function ($parse) {
    return {
        require: '^rxTabset',
        restrict: 'EA',
        replace: true,
        templateUrl: 'templates/rxTab.html',
        transclude: true,
        scope: {
            active: '=?',
            heading: '@',
            onSelect: '&select', //This callback is called in contentHeadingTransclude
            //once it inserts the tab's content into the dom
            onDeselect: '&deselect'
        },
        controller: function () {
            //Empty controller so other directives can require being 'under' a tab
        },
        link: function (scope, elm, attrs, tabsetCtrl, transclude) {
            scope.$watch('active', function (active) {
                if (active) {
                    tabsetCtrl.select(scope);
                }
            });

            scope.disabled = false;
            if (attrs.disable) {
                scope.$parent.$watch($parse(attrs.disable), function (value) {
                    scope.disabled = !!value;
                });
            }

            scope.select = function () {
                if (!scope.disabled) {
                    scope.active = true;
                }
            };

            tabsetCtrl.addTab(scope);
            scope.$on('$destroy', function () {
                tabsetCtrl.removeTab(scope);
            });

            //We need to transclude later, once the content container is ready.
            //when this link happens, we're inside a tab heading.
            scope.$transcludeFn = transclude;
        }
    };
});
