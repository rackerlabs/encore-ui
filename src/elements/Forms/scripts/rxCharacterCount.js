angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxCharacterCount
 * @restrict A
 * @scope
 * @description
 *
 * Provides an attribute directive intended for adding to `<textarea>`
 * elements. Place the `rx-character-count` attribute into your `<textarea>`, and
 * a new `<div>` will be added directly underneath it. This directive requires
 * that you're using `ng-model` with your `<textarea>`.
 *
 * This `<div>` will watch the content of the `<textarea>`, and display how many
 * characters are remaining. By default, 254 characters are "allowed". If there
 * are less than 10 characters remaining, the counter will go orange. If the user
 * enters more than 254 characters, the counter will go red.
 *
 * ### Leading and Trailing characters ###
 * By default, any text field using `ng-model` has `ng-trim="true"` applied to it.
 * This means that any leading and trailing spaces/blanks in your text field will
 * be ignored. They will not count towards the remaining character count. If you
 * want it to count leading/trailing spaces, then just add `ng-trim="false"` to
 * your `<textarea>`.
 *
 * ### Styling ###
 * When specifying a width other than the default, you should style some built-in
 * classes in addition to the text field itself. As in the demo, the
 * `.input-highlighting` class should have the same width as the text field
 * (if highlighting is used), and the `.counted-input-wrapper` should be used to
 * correctly position the counter.
 *
 * ### ngShow/ngHide/ngIf/ngSwitch/etc. ###
 * If you wish to show/hide your `textarea` element, we recommend placing the
 * element inside of a `<div>` or `<span>`, and doing the

 * `ng-show` / `ng-hide` / etc. on that `div` / `span`. For example,
 *
 * <pre>
 * <span ng-show="isShown">
 *     <textarea rx-character-count>{{someValue}}</textarea>
 * </span>
 * </pre>
 *
 * We _do_ have preliminary support for putting these directives directly inside
 * the `textarea`, i.e.
 *
 * <pre>
 * <textarea rx-character-count ng-show="isShown">{{someValue}}</textarea>
 * </pre>
 *
 * But this support should be considered experimental. If you choose to take
 * advantage of it, please ensure you've extensively tested that it performs
 * correctly for your uses.
 *
 * @param {Number=} [low-boundary=10] How far from the maximum to enter a warning state
 * @param {Number=} [max-characters=254] The maximum number of characters allowed
 * @example
 * <pre>
 * <textarea ng-model="model" rx-character-count></textarea>
 * </pre>
 */
.directive('rxCharacterCount', function ($compile, $timeout) {
    var counterStart = '<div class="character-countdown" ';
    var counterEnd =   'ng-class="{ \'near-limit\': nearLimit, \'over-limit\': overLimit }"' +
                  '>{{ remaining }}</div>';

    var extraDirectives = function (attrs) {
        var extra = '';
        if (_.has(attrs, 'ngShow')) {
            extra += 'ng-show="' + attrs.ngShow + '" ';
        }
        if (_.has(attrs, 'ngHide')) {
            extra += 'ng-hide="' + attrs.ngHide + '" ';
        }
        return extra;
    };

    var buildCounter = function (attrs) {
        return counterStart + extraDirectives(attrs) + counterEnd;
    };

    return {
        restrict: 'A',
        require: 'ngModel',
        // scope:true ensures that our remaining/nearLimit/overLimit scope variables
        // only live within this directive
        scope: true,
        link: function (scope, element, attrs) {
            // Wrap the textarea so that an element containing a copy of the text
            // can be layered directly behind it.
            var wrapper = angular.element('<div class="counted-input-wrapper" />');
            element.after(wrapper);

            $compile(buildCounter(attrs))(scope, function (clone) {
                wrapper.append(element);
                wrapper.append(clone);
            });

            var maxCharacters = _.parseInt(attrs.maxCharacters) || 254;
            var lowBoundary = _.parseInt(attrs.lowBoundary) || 10;
            scope.remaining = maxCharacters;
            scope.nearLimit = false;
            scope.overLimit = false;

            // This gets called whenever the ng-model for this element
            // changes, i.e. when someone enters new text into the textarea
            scope.$watch(
                function () { return element[0].value; },
                function (newValue) {
                    if (typeof newValue !== 'string') {
                        return;
                    }
                    // $evalAsync will execute the code inside of it, during the
                    // same `$digest` that triggered the `$watch`, if we were to
                    // use `$applyAsync` the execution would happen at a later
                    // stage. The reason for changing scope variables within the
                    // `$evalAsync` is to ensure that the UI gets rendered with
                    // the proper value, and is not delayed by waiting for
                    // `$digest` dirty checks. For more information, please
                    // refer to https://www.bennadel.com/blog/2751-scope-applyasync-vs-scope-evalasync-in-angularjs-1-3.htm
                    scope.$evalAsync(function () {
                        if (!attrs.ngTrim || attrs.ngTrim !== 'false') {
                            newValue = newValue.trim();
                        }

                        scope.remaining = maxCharacters - newValue.length;
                        scope.nearLimit = scope.remaining >= 0 && scope.remaining < lowBoundary;
                        scope.overLimit = scope.remaining < 0;
                    });
                });

            scope.$on('$destroy', function () {
                $timeout(function () {
                    // When the element containing the rx-character-count is removed, we have to
                    // ensure we also remove the `wrapper`, which we created. This has to happen
                    // in a $timeout() to ensure it occurs on the next $digest cycle, otherwise
                    // we go into an infinite loop.
                    wrapper.remove();
                });
            });

        }
    };
});
