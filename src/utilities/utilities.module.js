/**
 * @ngdoc overview
 * @name utilities
 * @description
 * # Utilities
 * Utilities are features that support functionality among Elements.
 *
 * Such features include, but are not limited to the following:
 *
 * * **Business Logic** (values, constants, controllers, services)
 * * **Display Logic** (filters)
 * * **Application Flow Control** ("if"-like, "switch"-like, and non-visual directives)
 *
 * A full list of functionality can be found in the left-hand nav.
 */
angular.module('encore.ui.utilities', [
    'ngResource',
    'debounce',
    'ngSanitize'
])
.value('suppressDeprecationWarnings', false);
