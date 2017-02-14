angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxActionMenu
 * @restrict E
 * @scope
 * @description
 *
 * Component to add a clickable cog which brings up a menu of configurable actions.
 *
 * Normally the menu is dismissable by clicking anywhere on the page, but this can
 * be disabled by passing an optional `global-dismiss="false"` attribute to the
 * directive.
 *
 * @param {Boolean=} [globalDismiss=true] Optional attribute to make menu dismissable by clicking anywhere on the page
 */
.directive('rxActionMenu', function ($rootScope, $document) {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'templates/rxActionMenu.html',
        scope: {
            globalDismiss: '=?'
        },
        link: function ($scope, element) {
            if (!_.isBoolean($scope.globalDismiss)) {
                $scope.globalDismiss = true;
            }
            $scope.displayed = false;

            $scope.toggle = function () {
                $scope.displayed = !$scope.displayed;
                $rootScope.$broadcast('actionMenuShow', element);
            };

            $scope.modalToggle = function () {
                if ($scope.globalDismiss) {
                    $scope.toggle();
                }
            };

            $scope.$on('actionMenuShow', function (ev, el) {
                if ($scope.globalDismiss && el[0] !== element[0]) {
                    $scope.displayed = false;
                }
            });

            $document.on('click', function (clickEvent) {
                if ($scope.globalDismiss && $scope.displayed && !element[0].contains(clickEvent.target)) {
                    $scope.$apply(function () { $scope.displayed = false;});
                }
            });

            // TODO: Center the Action Menu box so it
            // takes the height of the translucded content
            // and then centers it with CSS.
            // I spent an afternoon trying to see if I could
            // repurpose angularjs' bootstrap popover library
            // and their position.js file, but I spent too
            // much time and had to table this.  -Ernie

            // https://github.com/angular-ui/bootstrap/blob/master/src/position/position.js
            // https://github.com/angular-ui/bootstrap/blob/master/src/tooltip/tooltip.js
        }
    };
});
