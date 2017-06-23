/* eslint-disable */
describe('rxTypeahead Matches', function () {
    var scope, $rootScope, $compile, $document, $timeout, changeInputValueTo;

    //utility functions
    var prepareInputEl = function (inputTpl) {
        var el = $compile(angular.element(inputTpl))(scope);
        scope.$digest();
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
    var toBeClosed = function (element) {
        var typeaheadEl = findDropDown(element);

        return typeaheadEl.hasClass('ng-hide');
    };

    var toBeOpenWithActive = function (actual, noOfMatches, activeIdx) {
        var typeaheadEl = findDropDown(actual);
        var liEls = findMatches(actual);

        return typeaheadEl.length === 1 &&
            !typeaheadEl.hasClass('ng-hide') &&
            liEls.length === noOfMatches &&
            activeIdx === -1 ? !$(liEls).hasClass('active') : $(liEls[activeIdx]).hasClass('active');
    };

    beforeEach(module('encore.ui.elements'));
    beforeEach(module('encore.ui.utilities'));
    beforeEach(module('templates/rxTypeaheadMatch.html'));
    beforeEach(module('templates/rxTypeaheadPopup.html'));
    beforeEach(inject (function (_$rootScope_, _$compile_, _$document_, _$timeout_, $sniffer) {
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        $compile = _$compile_;
        $document = _$document_;
        $timeout = _$timeout_;
        scope.source = ['foo', 'bar', 'baz'];
        scope.states = [{
            code: 'AL',
            name: 'Alaska'
        }, {
            code: 'CL',
            name: 'California'
        }];
        changeInputValueTo = function (element, value) {
            var inputEl = findInput(element);
            inputEl.val(value);
            inputEl.trigger($sniffer.hasEvent('input') ? 'input' : 'change');
            scope.$digest();
        };
    }));

    afterEach(function () {
        findDropDown($document.find('body')).remove();
    });

    describe('selecting a match', function () {
        it('should select a match on enter', function () {
            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead="item for item in source | filter:$viewValue"></div>');
            var inputEl = findInput(element);

            changeInputValueTo(element, 'b');
            triggerKeyDown(element, 13);

            expect(scope.result).to.eq('bar');
            expect(inputEl.val()).to.eq('bar');
            expect(toBeClosed(element)).to.be.true;
        });

        it('should select a match on tab', function () {
            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead="item for item in source | filter:$viewValue"></div>');
            var inputEl = findInput(element);

            changeInputValueTo(element, 'b');
            triggerKeyDown(element, 9);

            expect(scope.result).to.eq('bar');
            expect(inputEl.val()).to.eq('bar');
            expect(toBeClosed(element)).to.be.true;
        });

        it('should not select any match on blur without \'select-on-blur=true\' option', function () {
            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead="item for item in source | filter:$viewValue"></div>');
            var inputEl = findInput(element);

            changeInputValueTo(element, 'b');
            inputEl.blur(); // input loses focus

            // no change
            expect(scope.result).to.eq('b');
            expect(inputEl.val()).to.eq('b');
        });

        it('should select a match on blur with \'select-on-blur=true\' option', function () {
            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead="item for item in source | filter:$viewValue"' +
                ' rx-typeahead-select-on-blur="true"></div>');
            var inputEl = findInput(element);

            changeInputValueTo(element, 'b');
            inputEl.blur(); // input loses focus

            // first element should be selected
            expect(scope.result).to.eq('bar');
            expect(inputEl.val()).to.eq('bar');
        });

        it('should select match on click', function () {
            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead="item for item in source | filter:$viewValue"></div>');
            var inputEl = findInput(element);

            changeInputValueTo(element, 'b');
            var match = $(findMatches(element)[1]).find('a')[0];

            $(match).click();
            scope.$digest();

            expect(scope.result).to.eq('baz');
            expect(inputEl.val()).to.eq('baz');
            expect(toBeClosed(element)).to.be.true;
        });

        it('should invoke select callback on select', function () {
            scope.onSelect = function ($item, $model, $label) {
                scope.$item = $item;
                scope.$model = $model;
                scope.$label = $label;
            };
            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead-on-select="onSelect($item, $model, $label)"' +
                ' rx-typeahead="state.code as state.name for state in states | filter:$viewValue"></div>');

            changeInputValueTo(element, 'Alas');
            triggerKeyDown(element, 13);

            expect(scope.result).to.eq('AL');
            expect(scope.$item).to.eq(scope.states[0]);
            expect(scope.$model).to.eq('AL');
            expect(scope.$label).to.eq('Alaska');
        });

        it('should correctly update inputs value on mapping where label is not derived from the model', function () {
            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead="state.code as state.name for state in states | filter:$viewValue"></div>');
            var inputEl = findInput(element);

            changeInputValueTo(element, 'Alas');
            triggerKeyDown(element, 13);

            expect(scope.result).to.eq('AL');
            expect(inputEl.val()).to.eq('AL');
        });

        it('should bind no results indicator as true when no matches returned', inject(function ($timeout) {
            scope.isNoResults = false;
            scope.loadMatches = function () {
                return $timeout(function () {
                    return [];
                }, 1000);
            };

            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead="item for item in loadMatches()" rx-typeahead-no-results="isNoResults"></div>');
            changeInputValueTo(element, 'foo');

            expect(scope.isNoResults).to.be.false;
            $timeout.flush();
            expect(scope.isNoResults).to.be.true;
        }));

        it('should bind no results indicator as false when matches are returned', inject(function ($timeout) {
            scope.isNoResults = false;
            scope.loadMatches = function (viewValue) {
                return $timeout(function () {
                    return [viewValue];
                }, 1000);
            };

            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead="item for item in loadMatches()" rx-typeahead-no-results="isNoResults"></div>');
            changeInputValueTo(element, 'foo');

            expect(scope.isNoResults).to.be.false;
            $timeout.flush();
            expect(scope.isNoResults).to.be.false;
        }));

        it('should not focus the input if `typeahead-focus-on-select` is false', function () {
            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead="item for item in source | filter:$viewValue" rx-typeahead-focus-on-select="false"></div>');
            $document.find('body').append(element);
            var inputEl = findInput(element);

            changeInputValueTo(element, 'b');
            var match = $(findMatches(element)[1]).find('a')[0];

            $(match).click();
            scope.$digest();
            $timeout.flush();

            expect(document.activeElement).not.to.eq(inputEl[0]);
            expect(scope.result).to.eq('baz');
        });
    });

    describe('select on exact match', function () {
        it('should select on an exact match when set', function () {
            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead-editable="false" rx-typeahead-on-select="onSelect()"' +
                ' rx-typeahead="item for item in source | filter:$viewValue" rx-typeahead-select-on-exact="true"></div>');
            var inputEl = findInput(element);
            var onSelectStub = sinon.mock();
            scope.onSelect = onSelectStub;

            changeInputValueTo(element, 'bar');

            expect(scope.result).to.eq('bar');
            expect(inputEl.val()).to.eq('bar');
            expect(toBeClosed(element)).to.be.true;
            expect(onSelectStub).to.be.called;
        });

        it('should not select on an exact match by default', function () {
            var onSelectSpy = sinon.spy(scope.onSelect);
            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead-editable="false" rx-typeahead-on-select="onSelect()"' +
                ' rx-typeahead="item for item in source | filter:$viewValue"></div>');
            var inputEl = findInput(element);

            changeInputValueTo(element, 'bar');

            expect(scope.result).to.be.undefined;
            expect(inputEl.val()).to.eq('bar');
            expect(onSelectSpy).to.not.have.been.called;
        });

        it('should not be case sensitive when select on an exact match', function () {
            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead-editable="false" rx-typeahead-on-select="onSelect()"' +
                ' rx-typeahead="item for item in source | filter:$viewValue" rx-typeahead-select-on-exact="true"></div>');
            var inputEl = findInput(element);

            var selectSpy = sinon.mock();
            scope.onSelect = selectSpy;

            changeInputValueTo(element, 'BaR');

            expect(scope.result).to.eq('bar');
            expect(inputEl.val()).to.eq('bar');
            expect(toBeClosed(element)).to.be.true;
            expect(selectSpy).to.have.been.called;
        });

        it('should not auto select when not a match with one potential result left', function () {
            var element = prepareInputEl('<div><input ng-model="result"' +
                ' rx-typeahead-editable="false" rx-typeahead-on-select="onSelect()"' +
                ' rx-typeahead="item for item in source | filter:$viewValue" rx-typeahead-select-on-exact="true"></div>');
            var inputEl = findInput(element);
            var onSelectSpy = sinon.mock();
            scope.onSelect = onSelectSpy;

            changeInputValueTo(element, 'fo');

            expect(scope.result).to.be.undefined;
            expect(inputEl.val()).to.eq('fo');
            expect(onSelectSpy).to.not.have.been.called;
        });
    });
});
/* eslint-enable */
