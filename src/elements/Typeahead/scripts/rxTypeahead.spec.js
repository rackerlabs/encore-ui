/* eslint-disable */
describe('rxTypeahead tests', function () {
    var $scope, $compile, $document, $templateCache, $timeout, $window;
    var changeInputValueTo, toBeClosed, toBeOpenWithActive;

    beforeEach(module('encore.ui.elements'));
    beforeEach(module('encore.ui.utilities'));
    beforeEach(module('ngSanitize'));
    beforeEach(module('templates/rxTypeaheadPopup.html'));
    beforeEach(module('templates/rxTypeaheadMatch.html'));
    beforeEach(module(function ($compileProvider) {
        $compileProvider.directive('formatter', function () {
            return {
                require: 'ngModel',
                link: function (scope, elm, attrs, ngModelCtrl) {
                    ngModelCtrl.$formatters.unshift(function (viewVal) {
                        return 'formatted' + viewVal;
                    });
                }
            };
        });
        $compileProvider.directive('childDirective', function () {
            return {
                restrict: 'A',
                require: '^parentDirective',
                link: function (scope, element, attrs, ctrl) {}
            };
        });
    }));
    beforeEach(inject(function (_$rootScope_, _$compile_, _$document_, _$templateCache_, _$timeout_, _$window_, $sniffer) {
        $scope = _$rootScope_;
        $scope.source = ['foo', 'bar', 'baz'];
        $scope.states = [{
            code: 'AL',
            name: 'Alaska'
        }, {
            code: 'CL',
            name: 'California'
        }];
        $scope.onSelect = function() {};
        $compile = _$compile_;
        $document = _$document_;
        $templateCache = _$templateCache_;
        $timeout = _$timeout_;
        $window = _$window_;
        changeInputValueTo = function (element, value) {
            var inputEl = findInput(element);
            inputEl.val(value);
            inputEl.trigger($sniffer.hasEvent('input') ? 'input' : 'change');
            $scope.$digest();
        };
    }));

    //utility functions
    var prepareInputEl = function (inputTpl) {
        var el = $compile(angular.element(inputTpl))($scope);
        $scope.$digest();
        return el;
    };

    var findInput = function (element) {
        return element.find('input');
    };

    var findDropDown = function (element) {
        return element.find('ul.dropdown-menu');
    };

    var findMatches = function (element) {
        return findDropDown(element).find('li');
    };

    var triggerKeyDown = function (element, keyCode) {
        var inputEl = findInput(element);
        var e = $.Event('keydown');
        e.which = keyCode;
        inputEl.trigger(e);
    };

    //custom matchers
    toBeClosed = function (element) {
        var typeaheadEl = findDropDown(element);

        return typeaheadEl.hasClass('ng-hide');
    };

    toBeOpenWithActive = function (actual, noOfMatches, activeIdx) {
        var typeaheadEl = findDropDown(actual);
        var liEls = findMatches(actual);

        return typeaheadEl.length === 1 &&
            !typeaheadEl.hasClass('ng-hide') &&
            liEls.length === noOfMatches &&
            activeIdx === -1 ? !$(liEls).hasClass('active') : $(liEls[activeIdx]).hasClass('active');
    };

    afterEach(function () {
        findDropDown($document.find('body')).remove();
    });

    //coarse grained, "integration" tests
    describe('initial state and model changes', function () {
        it('should be closed by default', function () {
            var element = prepareInputEl('<div><input ng-model="result" rx-typeahead="item for item in source"></div>');
            expect(toBeClosed(element)).to.be.true;
        });

        it('should correctly render initial state if the "as" keyword is used', function () {
            $scope.result = $scope.states[0];

            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead="state as state.name for state in states"></div>');
            var inputEl = findInput(element);

            expect(inputEl.val()).to.eq('Alaska');
        });

        it('should default to bound model for initial rendering' +
            ' if there is not enough info to render label',
            function () {
                $scope.result = $scope.states[0].code;

                var element = prepareInputEl('<div><input ng-model="result"' +
                    ' rx-typeahead="state.code as state.name + state.code for state in states"></div>');
                var inputEl = findInput(element);

                expect(inputEl.val()).to.eq('AL');
            });

        it('should not get open on model change', function () {
            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead="item for item in source"></div>');
            $scope.$apply(function () {
                $scope.result = 'foo';
            });
            expect(toBeClosed(element));
        });
    });

    describe('basic functionality', function () {
        it('should open and close typeahead based on matches', function () {
            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead="item for item in source | filter:$viewValue"></div>');
            var inputEl = findInput(element);
            var ownsId = inputEl.attr('aria-owns');

            expect(inputEl.attr('aria-expanded')).to.eq('false');
            expect(inputEl.attr('aria-activedescendant')).to.be.undefined;

            changeInputValueTo(element, 'ba');
            expect(toBeOpenWithActive(element, 2, 0)).to.be.true;
            expect(findDropDown(element).attr('id')).to.eq(ownsId);
            expect(inputEl.attr('aria-expanded')).to.eq('true');
            var activeOptionId = ownsId + '-option-0';
            expect(inputEl.attr('aria-activedescendant')).to.eq(activeOptionId);
            expect(findDropDown(element).find('li.active').attr('id')).to.eq(activeOptionId);

            changeInputValueTo(element, '');
            expect(toBeClosed(element));
            expect(inputEl.attr('aria-expanded')).to.eq('false');
            expect(inputEl.attr('aria-activedescendant')).to.be.undefined;
        });

        it('should allow expressions over multiple lines', function () {
            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead="item for item in source \n' +
                '| filter:$viewValue"></div>');
            changeInputValueTo(element, 'ba');
            expect(toBeOpenWithActive(element, 2, 0));

            changeInputValueTo(element, '');
            expect(toBeClosed(element)).to.be.true;
        });

        it('should not open typeahead if input value smaller than a defined threshold', function () {
            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead="item for item in source' +
                ' | filter:$viewValue" rx-typeahead-min-length="2"></div>');
            changeInputValueTo(element, 'b');
            expect(toBeClosed(element)).to.be.true;
        });

        it('should support custom model selecting function', function () {
            $scope.updaterFn = function (selectedItem) {
                return 'prefix' + selectedItem;
            };
            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead="updaterFn(item) as item for' +
                ' item in source | filter:$viewValue"></div>');
            changeInputValueTo(element, 'f');
            triggerKeyDown(element, 13);
            expect($scope.result).to.eq('prefixfoo');
        });

        it('should support custom label rendering function', function () {
            $scope.formatterFn = function (sourceItem) {
                return 'prefix' + sourceItem;
            };

            var element = prepareInputEl('<div><input ng-model="result" rx-typeahead="item as formatterFn(item) for' +
                ' item in source | filter:$viewValue"></div>');
            changeInputValueTo(element, 'fo');
            var matchHighlight = findMatches(element).find('a').html();
            expect(matchHighlight).to.eq('prefix<strong>fo</strong>o');
        });

        it('should by default bind view value to model even if not part of matches', function () {
            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead="item for item in source | filter:$viewValue"></div>');
            changeInputValueTo(element, 'not in matches');
            expect($scope.result).to.eq('not in matches');
        });

        it('should support the editable property to limit model bindings to matches only', function () {
            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead="item for item in source | filter:$viewValue" rx-typeahead-editable="false"></div>');
            changeInputValueTo(element, 'not in matches');
            expect($scope.result).to.eq(undefined);
        });

        it('should set validation errors for non-editable inputs', function () {
            var element = prepareInputEl(
                '<div><form name="form">' +
                '<input name="input" ng-model="result" rx-typeahead="item for' +
                ' item in source | filter:$viewValue" rx-typeahead-editable="false">' +
                '</form></div>');

            changeInputValueTo(element, 'not in matches');
            expect($scope.result).to.eq(undefined);
            expect($scope.form.input.$error.editable).to.be.true;

            changeInputValueTo(element, 'foo');
            triggerKeyDown(element, 13);
            expect($scope.result).to.eq('foo');
            expect($scope.form.input.$error).to.be.empty;
        });

        it('should not set editable validation error for empty input', function () {
            var element = prepareInputEl(
                '<div><form name="form">' +
                '<input name="input" ng-model="result" rx-typeahead="item for' +
                ' item in source | filter:$viewValue" rx-typeahead-editable="false">' +
                '</form></div>');

            changeInputValueTo(element, 'not in matches');
            expect($scope.result).to.eq(undefined);
            expect($scope.form.input.$error.editable).to.be.true;
            changeInputValueTo(element, '');
            expect($scope.result).to.eq(null);
            expect($scope.form.input.$error).to.be.empty;
        });

        it('should bind loading indicator expression', inject(function ($timeout) {
            $scope.isLoading = false;
            $scope.loadMatches = function () {
                return $timeout(function () {
                    return [];
                }, 1000);
            };

            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead="item for item in loadMatches()" rx-typeahead-loading="isLoading"></div>');
            changeInputValueTo(element, 'foo');

            expect($scope.isLoading).to.be.true;
            $timeout.flush();
            expect($scope.isLoading).to.be.false;
        }));

        it('should support timeout before trying to match $viewValue', inject(function ($timeout) {
            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead="item for item in source | filter:$viewValue" rx-typeahead-wait-ms="200"></div>');
            changeInputValueTo(element, 'foo');
            expect(toBeClosed(element)).to.be.true;

            $timeout.flush();
            expect(toBeOpenWithActive(element, 1, 0)).to.be.true;
        }));

        it('should cancel old timeouts when something is typed within waitTime', inject(function ($timeout) {
            var values = [];
            $scope.loadMatches = function (viewValue) {
                values.push(viewValue);
                return $scope.source;
            };
            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead="item for item in loadMatches($viewValue) |' +
                ' filter:$viewValue" rx-typeahead-wait-ms="200"></div>');
            changeInputValueTo(element, 'first');
            changeInputValueTo(element, 'second');

            $timeout.flush();

            expect(values).not.to.include('first');
        }));

        it('should allow timeouts when something is typed after waitTime has passed', inject(function ($timeout) {
            var values = [];

            $scope.loadMatches = function (viewValue) {
                values.push(viewValue);
                return $scope.source;
            };
            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead="item for item in loadMatches($viewValue)' +
                ' | filter:$viewValue" rx-typeahead-wait-ms="200"></div>');

            changeInputValueTo(element, 'first');
            $timeout.flush();

            expect(values).to.include('first');

            changeInputValueTo(element, 'second');
            $timeout.flush();

            expect(values).to.include('second');
        }));

        it('should support directives which require controllers in custom templates for matched items', function () {
            $templateCache.put('custom.html', '<p child-directive>{{ index }} {{ match.label }}</p>');
            var element = prepareInputEl('<div><input ng-model="result" rx-typeahead-template-url="custom.html"' +
                ' rx-typeahead="state as state.name for state in states | filter:$viewValue"></div>');
            element.data('$parentDirectiveController', {});
            changeInputValueTo(element, 'Al');
            expect(findMatches(element).eq(0).find('p').text()).to.eq('0 Alaska');
        });

        it('should throw error on invalid expression', function () {
            var prepareInvalidDir = function () {
                prepareInputEl('<div><input ng-model="result" rx-typeahead="an invalid expression"></div>');
            };
            expect(prepareInvalidDir).to.throw();
        });
    });

    describe('pop-up interaction', function () {
        var element;

        beforeEach(function () {
            element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead="item for item in source | filter:$viewValue"></div>');
        });

        it('should activate prev/next matches on up/down keys', function () {
            changeInputValueTo(element, 'b');
            expect(toBeOpenWithActive(element, 2, 0)).to.be.true;

            // Down arrow key
            triggerKeyDown(element, 40);
            expect(toBeOpenWithActive(element, 2, 1)).to.be.true;

            // Down arrow key goes back to first element
            triggerKeyDown(element, 40);
            expect(toBeOpenWithActive(element, 2, 0)).to.be.true;

            // Up arrow key goes back to last element
            triggerKeyDown(element, 38);
            expect(toBeOpenWithActive(element, 2, 1)).to.be.true;

            // Up arrow key goes back to first element
            triggerKeyDown(element, 38);
            expect(toBeOpenWithActive(element, 2, 0)).to.be.true;
        });

        it('should close popup on escape key', function () {
            changeInputValueTo(element, 'b');
            expect(toBeOpenWithActive(element, 2, 0)).to.be.true;

            // Escape key
            triggerKeyDown(element, 27);
            expect(toBeClosed(element)).to.be.true;
        });

        it('should highlight match on mouseenter', function () {
            changeInputValueTo(element, 'b');
            expect(toBeOpenWithActive(element, 2, 0)).to.be.true;

            findMatches(element).eq(1).trigger('mouseenter');
            expect(toBeOpenWithActive(element, 2, 1)).to.be.true;
        });
    });

    describe('promises', function () {
        var element, deferred;

        beforeEach(inject(function ($q) {
            deferred = $q.defer();
            $scope.source = function () {
                return deferred.promise;
            };
            element = prepareInputEl('<div><input ng-model="result" rx-typeahead="item for item in source()"></div>');
        }));

        it('should display matches from promise', function () {
            changeInputValueTo(element, 'c');
            expect(toBeClosed(element)).to.be.true;

            deferred.resolve(['good', 'stuff']);
            $scope.$digest();
            expect(toBeOpenWithActive(element, 2, 0));
        });

        it('should not display anything when promise is rejected', function () {
            changeInputValueTo(element, 'c');
            expect(toBeClosed(element)).to.be.true;

            deferred.reject('fail');
            $scope.$digest();
            expect(toBeClosed(element)).to.be.true;
        });

        it('PR #3178, resolves #2999 - should not return property "length"' +
            ' of undefined for undefined matches',
            function () {
                changeInputValueTo(element, 'c');
                expect(toBeClosed(element)).to.be.true;

                deferred.resolve();
                $scope.$digest();
                expect(toBeClosed(element)).to.be.true;
            });
    });

    describe('non-regressions tests', function () {
        it('issue 231 - closes matches popup on click outside typeahead', function () {
            var element = prepareInputEl('<div><input ng-model="result"' +
                'rx-typeahead="item for item in source | filter:$viewValue"></div>');

            changeInputValueTo(element, 'b');

            $document.find('body').click();
            $scope.$digest();

            expect(toBeClosed(element)).to.be.true;
        });

        it('issue 591 - initial formatting for un-selected match and complex label expression', function () {
            var inputEl = findInput(prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead="state as state.name + \' \' + state.code for state in states | filter:$viewValue"></div>'));
            expect(inputEl.val()).to.eq('');
        });

        it('issue 786 - name of internal model should not conflict with scope model name', function () {
            $scope.state = $scope.states[0];
            var element = prepareInputEl('<div><input ng-model="state"' +
                ' rx-typeahead="state as state.name for state in states | filter:$viewValue"></div>');
            var inputEl = findInput(element);

            expect(inputEl.val()).to.eq('Alaska');
        });

        it('issue 863 - it should work correctly with input type="email"', function () {
            $scope.emails = ['foo@host.com', 'bar@host.com'];
            var element = prepareInputEl('<div><input type="email" ng-model="email"' +
                ' rx-typeahead="email for email in emails | filter:$viewValue"></div>');
            var inputEl = findInput(element);

            changeInputValueTo(element, 'bar');
            expect(toBeOpenWithActive(element, 1, 0));

            triggerKeyDown(element, 13);

            expect($scope.email).to.eq('bar@host.com');
            expect(inputEl.val()).to.eq('bar@host.com');
        });

        it('issue 964 - should not show popup with matches if an element is not focused', function () {
            $scope.items = function (viewValue) {
                return $timeout(function () {
                    return [viewValue];
                });
            };
            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead="item for item in items($viewValue)"></div>');
            var inputEl = findInput(element);

            changeInputValueTo(element, 'match');
            $scope.$digest();

            inputEl.blur();
            $timeout.flush();

            expect(toBeClosed(element)).to.be.true;
        });

        it('should properly update loading callback if an element is not focused', function () {
            $scope.items = function (viewValue) {
                return $timeout(function () {
                    return [viewValue];
                });
            };
            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead-loading="isLoading" rx-typeahead="item for item in items($viewValue)"></div>');
            var inputEl = findInput(element);

            changeInputValueTo(element, 'match');
            $scope.$digest();

            inputEl.blur();
            $timeout.flush();

            expect($scope.isLoading).to.be.false;
        });

        it('issue 1140 - should properly update loading callback when deleting characters', function () {
            $scope.items = function (viewValue) {
                return $timeout(function () {
                    return [viewValue];
                });
            };
            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead-min-length="2" rx-typeahead-loading="isLoading"' +
                ' rx-typeahead="item for item in items($viewValue)"></div>');

            changeInputValueTo(element, 'match');
            $scope.$digest();

            expect($scope.isLoading).to.be.true;

            changeInputValueTo(element, 'm');
            $timeout.flush();
            $scope.$digest();

            expect($scope.isLoading).to.be.false;
        });

        it('should cancel old timeout when deleting characters', inject(function ($timeout) {
            var values = [];
            $scope.loadMatches = function (viewValue) {
                values.push(viewValue);
                return $scope.source;
            };
            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead="item for item in loadMatches($viewValue) |' +
                ' filter:$viewValue" rx-typeahead-min-length="2" rx-typeahead-wait-ms="200"></div>');
            changeInputValueTo(element, 'match');
            changeInputValueTo(element, 'm');

            $timeout.flush();

            expect(values).not.to.include('match');
        }));

        describe('', function () {
            // Dummy describe to be able to create an after hook for this tests
            var element;

            it('does not close matches popup on click in input', function () {
                element = prepareInputEl('<div><input ng-model="result"' +
                    ' rx-typeahead="item for item in source | filter:$viewValue"></div>');
                var inputEl = findInput(element);

                // Note that this bug can only be found when element is in the document
                $document.find('body').append(element);

                changeInputValueTo(element, 'b');

                inputEl.click();
                $scope.$digest();

                expect(toBeOpenWithActive(element, 2, 0)).to.be.true;
            });

            it('issue #1773 - should not trigger an error when used with ng-focus', function () {
                element = prepareInputEl('<div><input ng-model="result"' +
                    ' rx-typeahead="item for item in source | filter:$viewValue" ng-focus="foo()"></div>');
                var inputEl = findInput(element);

                // Note that this bug can only be found when element is in the document
                $document.find('body').append(element);

                changeInputValueTo(element, 'b');
                var match = $(findMatches(element)[1]).find('a')[0];

                $(match).click();
                $scope.$digest();
            });

            afterEach(function () {
                element.remove();
            });
        });

        it('issue #1238 - allow names like "query" to be used inside "in" expressions ', function () {
            $scope.query = function () {
                return ['foo', 'bar'];
            };

            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead="item for item in query($viewValue)"></div>');
            changeInputValueTo(element, 'bar');

            expect(toBeOpenWithActive(element, 2, 0)).to.be.true;
        });

        it('issue #3318 - should set model validity to true when set manually', function () {
            var element = prepareInputEl(
                '<div><form name="form">' +
                '<input name="input" ng-model="result"' +
                ' rx-typeahead="item for item in source | filter:$viewValue" rx-typeahead-editable="false">' +
                '</form></div>');

            changeInputValueTo(element, 'not in matches');
            $scope.$apply(function () {
                $scope.result = 'manually set';
            });

            expect($scope.result).to.eq('manually set');
            expect($scope.form.input.$valid).to.be.true;
        });

        it('issue #3166 - should set \'parse\' key as valid when selecting a perfect match and not editable',
            function () {
                var element = prepareInputEl('<div ng-form="test"><input name="typeahead" ng-model="result"' +
                    ' rx-typeahead="state as state.name for state in states' +
                    ' | filter:$viewValue" rx-typeahead-editable="false"></div>');
                var inputEl = findInput(element);

                changeInputValueTo(element, 'Alaska');
                triggerKeyDown(element, 13);

                expect($scope.test.typeahead.$error.parse).to.be.undefined;
            });

        it('issue #3823 - should support ng-model-options getterSetter', function () {
            function resultSetter(state) {
                return state;
            }
            $scope.result = resultSetter;
            var element = prepareInputEl('<div><input name="typeahead" ng-model="result"' +
                ' ng-model-options="{getterSetter: true}" rx-typeahead="state as state.name for state in states' +
                ' | filter:$viewValue" rx-typeahead-editable="false"></div>');

            changeInputValueTo(element, 'Alaska');
            triggerKeyDown(element, 13);

            expect($scope.result).to.eq(resultSetter);
        });
    });

    describe('input formatting', function () {
        it('should co-operate with existing formatters', function () {
            $scope.result = $scope.states[0];

            var element = prepareInputEl('<div><input ng-model="result.name" formatter' +
                    ' rx-typeahead="state.name for state in states | filter:$viewValue"></div>'),
                inputEl = findInput(element);

            expect(inputEl.val()).to.eq('formatted' + $scope.result.name);
        });

        it('should support a custom input formatting function', function () {
            $scope.result = $scope.states[0];
            $scope.formatInput = function ($model) {
                return $model.code;
            };

            var element = prepareInputEl('<div><input ng-model="result"' +
                    ' rx-typeahead-input-formatter="formatInput($model)"' +
                    ' rx-typeahead="state as state.name for state in states | filter:$viewValue"></div>'),
                inputEl = findInput(element);

            expect(inputEl.val()).to.eq('AL');
            expect($scope.result).to.eq($scope.states[0]);
        });
    });
});
/* eslint-enable */
