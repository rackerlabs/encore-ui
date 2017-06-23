angular.module('encore.ui.utilities')
/**
 * @ngdoc directive
 * @name utilities.directive:rxTypeaheadPopup
 * @scope
 * @description
 * creates a popup used by the rxTypeahead directive
 * @param {string[]} [matches]  values matching typeahead query
 * @param {string} [query]  typeahead query made
 * @param {string} [active]   currently selected choice
 * @param {string} [position]   placement of typeahead results
 * @param {boolean} [moveInProgress=false]  is typeahead results popup moving?
 * @param {string} [select]    method to execute on completion
 * @param {boolean} [assignIsOpen]  is assignment option open?
 * @callback rxDebounce
 */
.directive('rxTypeaheadPopup', function ($$rxDebounce) {
    return {
        scope: {
            matches: '=',
            query: '=',
            active: '=',
            position: '&',
            moveInProgress: '=',
            select: '&',
            assignIsOpen: '&',
            rxDebounce: '&'
        },
        replace: true,
        templateUrl: function (element, attrs) {
            return attrs.rxPopupTemplateUrl || 'templates/rxTypeaheadPopup.html';
        },
        link: function (scope, element, attrs) {
            scope.templateUrl = attrs.rxTemplateUrl;

            scope.isOpen = function () {
                var isDropdownOpen = scope.matches.length > 0;
                scope.assignIsOpen({
                    isOpen: isDropdownOpen
                });
                return isDropdownOpen;
            };

            scope.isActive = function (matchIdx) {
                return scope.active === matchIdx;
            };

            scope.selectActive = function (matchIdx) {
                scope.active = matchIdx;
            };

            scope.selectMatch = function (activeIdx, evt) {
                var debounce = scope.rxDebounce();
                if (angular.isNumber(debounce) || angular.isObject(debounce)) {
                    $$rxDebounce(function () {
                        scope.select({
                            activeIdx: activeIdx,
                            evt: evt
                        });
                    }, angular.isNumber(debounce) ? debounce : debounce['default']);
                } else {
                    scope.select({
                        activeIdx: activeIdx,
                        evt: evt
                    });
                }
            };
        }
    };
});
