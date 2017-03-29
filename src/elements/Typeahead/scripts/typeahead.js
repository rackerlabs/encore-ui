/**
 * @ngdoc overview
 * @name elements.directive:typeahead
 * @description
 * # typeahead Component
 *
 * This component provides styles and a demo for the
 * [the Angular-UI Bootstrap Typeahead plugin](https://goo.gl/EMGTTq),
 * which is included as a dependency for EncoreUI.
 *
 * ## Usage
 *
 * Usage is the exact same as demoed on the Angular-UI Bootstrap site. See
 * [the Angular-UI Bootstrap Docs](http://angular-ui.github.io/bootstrap/#/typeahead)
 * for further guidance on usage and configuration of this component.
 *
 * A feature has been added that shows the list of options when the input
 * receives focus.  This list is still filtered according to the input's value,
 * except when the input is empty.  In that case, all the options are shown.
 * To use this feature, add the `allowEmpty` parameter to the `filter` filter
 * in the `typeahead` attribute.  See the Typeahead [demo](../#/elements/Typeahead)
 * for an example.
 *
 */
angular.module('encore.ui.elements')
.config(function ($provide) {
    $provide.decorator('typeaheadDirective', function ($delegate, $filter) {
        var typeahead = $delegate[0];
        var link = typeahead.link;
        var lowercase = $filter('lowercase');

        typeahead.compile = function () {
            return function (scope, element, attrs, ctrls) {
                var ngModelCtrl = ctrls[0];
                link.apply(this, arguments);

                if (/allowEmpty/.test(attrs.typeahead)) {
                    var EMPTY_KEY = '$EMPTY$';

                    // Wrap the directive's $parser such that the $viewValue
                    // is not empty when the function runs.
                    ngModelCtrl.$parsers.unshift(function ($viewValue) {
                        var value = _.isEmpty($viewValue) ? EMPTY_KEY : $viewValue;
                        // The directive will check this equality before populating the menu.
                        ngModelCtrl.$viewValue = value;
                        return value;
                    });

                    ngModelCtrl.$parsers.push(function ($viewValue) {
                        return $viewValue === EMPTY_KEY ? '' : $viewValue;
                    });

                    element.on('click', function () {
                        scope.$apply(function () {
                            // quick change to null and back to trigger parsers
                            ngModelCtrl.$setViewValue(null);
                            ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
                        });
                    });

                    scope.allowEmpty = function (actual, expected) {
                        if (expected === EMPTY_KEY) {
                            return true;
                        }
                        return lowercase(actual).indexOf(lowercase(expected)) !== -1;
                    };
                }
            };
        };

        return $delegate;
    });
});
