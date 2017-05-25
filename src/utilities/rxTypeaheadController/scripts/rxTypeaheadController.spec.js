/* eslint-disable */
describe('rxTypeahead Controller', function () {
    var scope, $rootScope, $compile, $document, $timeout, $window, changeInputValueTo;

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
    beforeEach(module('templates/rxTypeaheadPopup.html'));
    beforeEach(module('templates/rxTypeaheadMatch.html'));
    beforeEach(inject (function (_$rootScope_, _$compile_, _$document_, _$timeout_, _$window_, $sniffer) {
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        $compile = _$compile_;
        $document = _$document_;
        $timeout = _$timeout_;
        $window = _$window_;
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

    describe('append to element id', function () {
        it('append typeahead results to element', function () {
            $document.find('body').append('<div id="myElement"></div>');
            var element = prepareInputEl('<div><input name="input" ng-model="result"' +
            ' rx-typeahead="item for item in states | filter:$viewValue"' +
            ' rx-typeahead-append-to-element-id="myElement"></div>');
            changeInputValueTo(element, 'al');
            expect(toBeOpenWithActive($document.find('#myElement'), 2, 0)).to.be.true;
            $document.find('#myElement').remove();
        });
    });

    describe('append to body', function () {
        afterEach(function () {
            angular.element($window).off('resize');
            $document.find('body').off('scroll');
        });

        it('append typeahead results to body', function () {
            var element = prepareInputEl('<div><input ng-model="result"' +
            ' rx-typeahead="item for item in source | filter:$viewValue"' +
            ' rx-typeahead-append-to-body="true"></div>');
            changeInputValueTo(element, 'ba');
            expect(toBeOpenWithActive($document.find('body'), 2, 0)).to.be.true;
        });

        it('should not append to body when value of the attribute is false', function () {
            var element = prepareInputEl('<div><input ng-model="result"' +
            ' rx-typeahead="item for item in source | filter:$viewValue"' +
            ' rx-typeahead-append-to-body="false"></div>');
            changeInputValueTo(element, 'ba');
            expect(findDropDown($document.find('body')).length).to.eq(0);
        });

        it.skip('should have right position after scroll', function () {
            var element = prepareInputEl('<div><input ng-model="result"' +
            ' rx-typeahead="item for item in source | filter:$viewValue"' +
            ' rx-typeahead-append-to-body="true"></div>');
            var body = angular.element(document.body);

            // Set body height to allow scrolling
            body.css({
                height: '10000px'
            });

            // Scroll top
            window.scroll(0, 1000);

            // Set input value to show dropdown
            changeInputValueTo(element, 'ba');

            var dropdown = findDropDown($document.find('body'));
            // Init position of dropdown must be 1000px
            // expect(dropdown.css('top')).to.eq('1000px');

            // After scroll, must have new position
            window.scroll(0, 500);

            body.triggerHandler('scroll');
            $timeout.flush();
            expect(dropdown.css('top')).to.eq('500px');
        });
    });

    describe('focus first', function () {
        it('should focus the first element by default', function () {
            var element = prepareInputEl('<div><input ng-model="result"' +
            ' rx-typeahead="item for item in source | filter:$viewValue"></div>');
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

        it('should not focus the first element until keys are pressed', function () {
            var element = prepareInputEl('<div><input ng-model="result"' +
            ' rx-typeahead="item for item in source | filter:$viewValue"' +
            ' rx-typeahead-focus-first="false"></div>');
            changeInputValueTo(element, 'b');
            expect(toBeOpenWithActive(element, 2, -1)).to.be.true;

            // Down arrow key goes to first element
            triggerKeyDown(element, 40);
            expect(toBeOpenWithActive(element, 2, 0)).to.be.true;

            // Down arrow key goes to second element
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

            // New input goes back to no focus
            changeInputValueTo(element, 'a');
            changeInputValueTo(element, 'b');
            expect(toBeOpenWithActive(element, 2, -1)).to.be.true;

            // Up arrow key goes to last element
            triggerKeyDown(element, 38);
            expect(toBeOpenWithActive(element, 2, 1)).to.be.true;
        });
    });

    it('should not capture enter or tab when an item is not focused', function () {
        scope.select_count = 0;
        scope.onSelect = function ($item) {
            scope.select_count = scope.select_count + 1;
        };
        var element = prepareInputEl('<div><input ng-model="result"' +
        ' ng-keydown="keyDownEvent = $event" rx-typeahead="item for item in source' +
        ' | filter:$viewValue" typeahead-on-select="onSelect($item)"' +
        ' rx-typeahead-focus-first="false"></div>');
        changeInputValueTo(element, 'b');

        // enter key should not be captured when nothing is focused
        triggerKeyDown(element, 13);
        expect(scope.keyDownEvent.isDefaultPrevented()).to.be.false;
        expect(scope.select_count).to.eq(0);

        // tab key should close the dropdown when nothing is focused
        triggerKeyDown(element, 9);
        expect(scope.keyDownEvent.isDefaultPrevented()).to.be.false;
        expect(scope.select_count).to.eq(0);
        expect(toBeClosed(element)).to.be.true;
    });

    it('should capture enter or tab when an item is focused', function () {
        scope.select_count = 0;
        scope.onSelect = function ($item) {
            scope.select_count = scope.select_count + 1;
        };
        var element = prepareInputEl('<div><input ng-model="result"' +
        ' ng-keydown="keyDownEvent = $event" rx-typeahead="item for item in source' +
        ' | filter:$viewValue" rx-typeahead-on-select="onSelect($item, $model)"' +
        ' rx-typeahead-focus-first="false"></div>');
        changeInputValueTo(element, 'b');

        // down key should be captured and focus first element
        triggerKeyDown(element, 40);
        expect(scope.keyDownEvent.isDefaultPrevented()).to.be.true;
        expect(toBeOpenWithActive(element, 2, 0)).to.be.true;

        // enter key should be captured now that something is focused
        triggerKeyDown(element, 13);
        expect(scope.keyDownEvent.isDefaultPrevented()).to.be.true;
        expect(scope.select_count).to.eq(1);
    });

    describe('minLength set to 0', function () {
        it('should open typeahead if input is changed to empty string if defined threshold is 0', function () {
            var element = prepareInputEl('<div><input ng-model="result"' +
            ' rx-typeahead="item for item in source | filter:$viewValue"' +
            ' rx-typeahead-min-length="0"></div>');
            changeInputValueTo(element, '');
            expect(toBeOpenWithActive(element, 3, 0)).to.be.true;
        });
    });

    describe('event listeners', function () {
        afterEach(function () {
            angular.element($window).off('resize');
            $document.find('body').off('scroll');
        });

        it('should register event listeners when attached to body', function () {
            var windowAddEventSpy = sinon.spy(window, 'addEventListener');
            var bodyAddEventSpy = sinon.spy(document.body, 'addEventListener');

            var element = prepareInputEl('<div><input ng-model="result"' +
            ' rx-typeahead="item for item in source | filter:$viewValue"' +
            ' rx-typeahead-append-to-body="true"></div>');

            expect(windowAddEventSpy).to.have.been.called;
            expect(bodyAddEventSpy).to.have.been.called;
        });

        it('should remove event listeners when attached to body', function () {
            var windowRemoveListenerSpy = sinon.spy(window, 'removeEventListener');
            var bodyRemoveListenerSpy = sinon.spy(document.body, 'removeEventListener');

            var element = prepareInputEl('<div><input ng-model="result"' +
            ' rx-typeahead="item for item in source | filter:$viewValue"' +
            ' rx-typeahead-append-to-body="true"></div>');
            scope.$destroy();

            expect(windowRemoveListenerSpy).to.have.been.called;
            expect(bodyRemoveListenerSpy).to.have.been.called;
        });
    });
});
/* eslint-enable */
