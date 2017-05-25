describe('rxTooltip template', function () {
    var elm, elmBody, scope, elmScope, tooltipScope, $document;

    beforeEach(module('encore.ui.elements'));
    beforeEach(module('templates/rxTooltip-template-popup.html'));

    beforeEach(inject(function ($templateCache) {
        $templateCache.put('myUrl', [200, '<span>{{ myTemplateText }}</span>', {}]);
    }));

    beforeEach(inject(function ($rootScope, $compile, _$document_) {
        $document = _$document_;
        elmBody = angular.element(
          '<div><span rx-tooltip-template="templateUrl">Selector Text</span></div>'
        );

        scope = $rootScope;
        $compile(elmBody)(scope);
        scope.templateUrl = 'myUrl';

        scope.$digest();
        elm = elmBody.find('span');
        elmScope = elm.scope();
        tooltipScope = elmScope.$$childTail;
    }));

    afterEach(function () {
        $document.off('keypress');
    });

    function trigger (element, evt) {
        element.trigger(evt);
        element.scope().$$childTail.$digest();
    }

    it('should open on mouseenter', inject(function () {
        trigger(elm, 'mouseenter');
        expect(tooltipScope.isOpen).to.be.true;

        expect(elmBody.children().length).to.eq(2);
    }));

    it('should not open on mouseenter if templateUrl is empty', inject(function () {
        scope.templateUrl = null;
        scope.$digest();

        trigger(elm, 'mouseenter');
        expect(tooltipScope.isOpen).to.be.false;

        expect(elmBody.children().length).to.eq(1);
    }));

    it('should show updated text', inject(function () {
        scope.myTemplateText = 'some text';

        trigger(elm, 'mouseenter');
        expect(tooltipScope.isOpen).to.be.true;
        scope.$digest();

        expect(elmBody.children().eq(1).text().trim()).to.contain('some text');

        scope.myTemplateText = 'new text';
        scope.$digest();

        expect(elmBody.children().eq(1).text().trim()).to.contain('new text');
    }));

    it('should hide tooltip when template becomes empty', inject(function ($timeout) {
        trigger(elm, 'mouseenter');
        $timeout.flush(0);
        expect(tooltipScope.isOpen).to.be.true;

        scope.templateUrl = '';
        scope.$digest();

        expect(tooltipScope.isOpen).to.be.false;

        $timeout.flush();
        expect(elmBody.children().length).to.eq(1);
    }));
});
