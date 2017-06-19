/**
 * @ngdoc overview
 * @name elements
 * @requires utilities
 * @description
 * # Elements
 * Elements are visual directives.
 *
 * See the list in the left-hand navigation.
 */
angular.module('encore.ui.elements', [
    'encore.ui.utilities',
    'ngSanitize',
    'ngAnimate',
    'debounce'
])
.run(function ($compile, $templateCache) {
    $compile($templateCache.get('templates/rxModalFooters.html'));
});
