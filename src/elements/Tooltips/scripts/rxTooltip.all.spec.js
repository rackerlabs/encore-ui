describe('rxTooltip directive', function () {
    var $rootScope, $compile, $document, $timeout, body, fragment;

    beforeEach(module('encore.ui.elements'));
    beforeEach(module('templates/rxTooltip-html-popup.html'));
    beforeEach(module('templates/rxTooltip-popup.html'));
    beforeEach(module('templates/rxTooltip-template-popup.html'));

    chai.use(function (_chai) {
        _chai.Assertion.addChainableMethod('haveOpenTooltips', function (){
            var subject = this._obj.find('.rxTooltip');
            this.assert(
                subject.length > 0,
                'expected #{this} to have open tooltips',
                'expected #{this} to not have open tooltips'
            );
        });
    });

    beforeEach(inject(function (_$rootScope_, _$compile_, _$document_, _$timeout_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        $document = _$document_;
        $timeout = _$timeout_;

        body = $document.find('body');
    }));

    afterEach(function () {
        $document.off('keypress');
        fragment.remove();
    });

    function compileTooltip (ttipMarkup) {
        fragment = $compile('<div>' + ttipMarkup + '</div>')($rootScope);
        $rootScope.$digest();
        body.append(fragment);
    }

    function closeTooltip (hostEl, triggerEvt, shouldNotFlush) {
        trigger(hostEl, triggerEvt || 'mouseleave');
        hostEl.scope().$$childTail.$digest();
        if (!shouldNotFlush) {
            $timeout.flush();
        }
    }

    function trigger (element, evt) {
        element.trigger(evt);
        element.scope().$$childTail.$digest();
    }

    describe('basic scenarios with default options', function () {
        it('shows default tooltip on mouse enter and closes on mouse leave', function () {
            compileTooltip('<span rx-tooltip="tooltip text">Trigger here</span>');

            trigger(fragment.find('span'), 'mouseenter');
            expect(fragment).to.haveOpenTooltips();

            closeTooltip(fragment.find('span'));
            expect(fragment).to.not.haveOpenTooltips();
        });

        it('should not show a tooltip when its content is empty', function () {
            compileTooltip('<span rx-tooltip=""></span>');
            trigger(fragment.find('span'), 'mouseenter');
            expect(fragment).to.not.haveOpenTooltips();
        });

        it('should not show a tooltip when its content becomes empty', function () {
            $rootScope.content = 'some text';
            compileTooltip('<span rx-tooltip="{{ content }}"></span>');

            trigger(fragment.find('span'), 'mouseenter');
            $timeout.flush(0);
            expect(fragment).to.haveOpenTooltips();

            $rootScope.content = '';
            $rootScope.$digest();
            $timeout.flush();
            expect(fragment).to.not.haveOpenTooltips();
        });

        it('should update tooltip when its content becomes empty', function () {
            $rootScope.content = 'some text';
            compileTooltip('<span rx-tooltip="{{ content }}"></span>');

            $rootScope.content = '';
            $rootScope.$digest();

            trigger(fragment.find('span'), 'mouseenter');
            expect(fragment).to.not.haveOpenTooltips();
        });
    });

    describe('option by option', function () {
        var tooltipTypes = {
            'tooltip': 'rx-tooltip="tooltip text"',
            'tooltip-html': 'rx-tooltip-html="tooltipSafeHtml"',
            'tooltip-template': 'rx-tooltip-template="\'tooltipTextUrl\'"'
        };

        beforeEach(inject(function ($sce, $templateCache) {
            $rootScope.tooltipText = 'tooltip text';
            $rootScope.tooltipSafeHtml = $sce.trustAsHtml('tooltip text');
            $templateCache.put('tooltipTextUrl', [200, '<span>tooltip text</span>', {}]);
        }));

        angular.forEach(tooltipTypes, function (html, key) {
            describe(key, function () {
                describe('placement', function () {

                    it('can specify an alternative, valid placement', function () {
                        compileTooltip('<span ' + html + ' rx-tooltip-placement="left">Trigger here</span>');
                        trigger(fragment.find('span'), 'mouseenter');

                        var ttipElement = fragment.find('div.rxTooltip');
                        expect(fragment).to.haveOpenTooltips();
                        expect(ttipElement[0].classList.contains('left')).to.be.true;

                        closeTooltip(fragment.find('span'));
                        expect(fragment).to.not.haveOpenTooltips();
                    });
                });

                describe('class', function () {
                    it('can specify a custom class', function () {
                        compileTooltip('<span ' + html + ' rx-tooltip-class="custom">Trigger here</span>');
                        trigger(fragment.find('span'), 'mouseenter');

                        var ttipElement = fragment.find('div.rxTooltip');
                        expect(fragment).to.haveOpenTooltips();
                        expect(ttipElement[0].classList.contains('custom')).to.be.true;

                        closeTooltip(fragment.find('span'));
                        expect(fragment).to.not.haveOpenTooltips();
                    });
                });
            });
        });
    });

    it('should show even after close trigger is called multiple times - issue #1847', function () {
        compileTooltip('<span rx-tooltip="tooltip text">Trigger here</span>');

        trigger(fragment.find('span'), 'mouseenter');
        expect(fragment).to.haveOpenTooltips();

        closeTooltip(fragment.find('span'), null, true);
        // Close trigger is called again before timer completes
        // The close trigger can be called any number of times (even after close has already been called)
        // since users can trigger the hide triggers manually.
        closeTooltip(fragment.find('span'), null, true);
        expect(fragment).to.haveOpenTooltips();

        trigger(fragment.find('span'), 'mouseenter');
        expect(fragment).to.haveOpenTooltips();

        $timeout.flush();
        expect(fragment).to.haveOpenTooltips();
    });

    it('should hide even after show trigger is called multiple times', function () {
        compileTooltip('<span rx-tooltip="tooltip text" rx-tooltip-popup-delay="1000">Trigger here</span>');

        trigger(fragment.find('span'), 'mouseenter');
        trigger(fragment.find('span'), 'mouseenter');

        closeTooltip(fragment.find('span'));
        expect(fragment).to.not.haveOpenTooltips();
    });

    it('should not show tooltips element is disabled (button) - issue #3167', function () {
        compileTooltip('<button rx-tooltip="cancel!" ng-disabled="disabled"' +
        'ng-click="disabled = true">Cancel</button>');

        trigger(fragment.find('button'), 'mouseenter');
        expect(fragment).to.haveOpenTooltips();

        trigger(fragment.find('button'), 'click');
        $timeout.flush();
        // One needs to flush deferred functions before checking there is no tooltip.
        expect(fragment).to.not.haveOpenTooltips();
    });
});
