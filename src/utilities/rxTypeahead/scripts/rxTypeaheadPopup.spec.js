/* eslint-disable */
describe('rxTypeaheadPopup - result rendering', function () {
    var scope, $rootScope, $compile, $templateCache, $document, changeInputValueTo;

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
    beforeEach(inject (function (_$rootScope_, _$compile_, _$templateCache_, _$document_, $sniffer) {
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        $compile = _$compile_;
        $templateCache = _$templateCache_;
        $document = _$document_;
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

    it('should render initial results', function () {
        scope.matches = ['foo', 'bar', 'baz'];
        scope.active = 1;

        var el = $compile('<div><rx-typeahead-popup matches="matches" active="active"'  +
        ' select="select(activeIdx)"></rx-typeahead-popup></div>')(scope);
        $rootScope.$digest();

        var liElems = el.find('li');
        expect(liElems.length).to.eq(3);
        expect(liElems.eq(0).hasClass('active')).not.to.be.true;
        expect(liElems.eq(1).hasClass('active')).to.be.true;
        expect(liElems.eq(2).hasClass('active')).not.to.be.true;
    });

    it('should change active item on mouseenter', function () {
        scope.matches = ['foo', 'bar', 'baz'];
        scope.active = 1;

        var el = $compile('<div><rx-typeahead-popup matches="matches" active="active"' +
        'select="select(activeIdx)"></rx-typeahead-popup></div>')(scope);
        $rootScope.$digest();


        var liElems = el.find('li');
        expect(liElems.eq(1).hasClass('active')).to.be.true;
        expect(liElems.eq(2).hasClass('active')).not.to.be.true;

        liElems.eq(2).trigger('mouseenter');

        expect(liElems.eq(1).hasClass('active')).not.to.be.true;
        expect(liElems.eq(2).hasClass('active')).to.be.true;
    });

    it('should select an item on mouse click', function () {
        scope.matches = ['foo', 'bar', 'baz'];
        scope.active = 1;
        $rootScope.select = angular.noop;
        var rootSelectSpy = sinon.spy($rootScope, 'select');

        var el = $compile('<div><rx-typeahead-popup matches="matches" active="active"' +
        'select="select(activeIdx)"></rx-typeahead-popup></div>')(scope);
        $rootScope.$digest();

        var liElems = el.find('li');
        liElems.eq(2).find('a').trigger('click');
        expect(rootSelectSpy).to.have.callCount(1);
    });

    it('should support custom popup templates', function () {
        $templateCache.put('custom.html', '<div class="custom">foo</div>');
        var element = prepareInputEl('<div><input ng-model="result" rx-typeahead-popup-template-url="custom.html"' +
            ' rx-typeahead="state as state.name for state in states | filter:$viewValue"></div>');
        changeInputValueTo(element, 'Al');
        expect(element.find('.custom').text()).to.eq('foo');
    });

    it('should support custom templates for matched items', function () {
        $templateCache.put('custom.html', '<p>{{ index }} {{ match.label }}</p>');
        var element = prepareInputEl('<div><input ng-model="result" rx-typeahead-template-url="custom.html"' +
            ' rx-typeahead="state as state.name for state in states | filter:$viewValue"></div>');
        changeInputValueTo(element, 'Al');
        expect(findMatches(element).eq(0).find('p').text()).to.eq('0 Alaska');
    });
});
/* eslint-enable */
