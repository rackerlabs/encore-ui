describe('elements:Copy', function () {
    var sandbox;
    var $scope, $compile, el, isoScope;
    var rxCopyUtil;
    var template = '<rx-copy>Hiyoo!</rx-copy>';

    beforeEach(function () {
        module('encore.ui.elements');
        module('encore.ui.utilities');
        module('templates/rxCopy.html');
        module('templates/rxTooltip-html-popup.html');

        inject(function ($rootScope, _$compile_, _rxCopyUtil_) {
            $scope = $rootScope.$new();
            $compile = _$compile_;
            rxCopyUtil = _rxCopyUtil_;
        });

        el = helpers.createDirective(template, $compile, $scope);
        isoScope = el.isolateScope();

        sandbox = sinon.sandbox.create();
        // FIXME: For some reason, we need this line to prevent test failures
        // in rxCopyUtil.spec.js
        sandbox.stub(rxCopyUtil, 'selectNodeText');
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('should be in the "waiting" state', function () {
        expect(isoScope.copyState).to.eq('waiting');
        expect(isoScope.tooltip).to.eq('Click to Copy');
    });

    describe('when copy succeeds', function () {
        beforeEach(function () {
            sandbox.stub(rxCopyUtil, 'execCopy', function (passFn) {
                passFn(); // assume it passes
            });
        });

        it('should transition to "passed" state', function () {
            isoScope.copyText();
            expect(isoScope.copyState).to.eq('success');
            expect(isoScope.tooltip).to.eq('Copied!');
        });
    });//when copy succeeds

    // See http://stackoverflow.com/a/19883965/1014689 for a list of
    // possible "platform" values to use in these tests.
    describe('when copy fails', function () {
        beforeEach(function () {
            sandbox.stub(rxCopyUtil, 'execCopy', function (passFn, failFn) {
                failFn(); // assume it fails
            });
        });

        describe('on a Mac', function () {
            beforeEach(function () {
                sandbox.stub(window, 'navigator', { platform: 'MacIntel' });
            });

            it('should transition to "failed" state', function () {
                isoScope.copyText();
                expect(isoScope.copyState).to.eq('fail');
                expect(isoScope.tooltip).to.eq('Press &#x2318;-C to copy.');
            });
        });//Mac

        describe('on Linux', function () {
            beforeEach(function () {
                sandbox.stub(window, 'navigator', { platform: 'Linux' });
            });

            it('should transition to "failed" state', function () {
                isoScope.copyText();
                expect(isoScope.copyState).to.eq('fail');
                expect(isoScope.tooltip).to.eq('Press Ctrl-C to copy.');
            });
        });//Linux

        describe('on Windows', function () {
            beforeEach(function () {
                sandbox.stub(window, 'navigator', { platform: 'Windows' });
            });

            it('should transition to "failed" state', function () {
                isoScope.copyText();
                expect(isoScope.copyState).to.eq('fail');
                expect(isoScope.tooltip).to.eq('Press Ctrl-C to copy.');
            });
        });//Windows
    });//when copy fails
});
