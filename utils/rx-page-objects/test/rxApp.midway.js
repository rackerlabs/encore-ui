describe('rxApp', function () {
    var rxAppCustom, rxAppStandard;

    before(function () {
        demoPage.go('#/components/rxApp');
        rxAppCustom = encore.rxApp.initialize($('#custom-rxApp'));
        rxAppStandard = encore.rxApp.initialize($('#standard-rxApp'));
    });

    it('should show element', function () {
        expect(rxAppCustom.rootElement.isDisplayed()).to.eventually.be.true;
    });

    it('should have a title', function () {
        expect(rxAppCustom.title).to.eventually.equal('My App');
    });

    it('should have a section title', function () {
        expect(rxAppCustom.sectionTitle).to.eventually.equal('Example Menu');
    });

    it('should not have a user name', function () {
        expect(rxAppCustom.rootElement.all(by.binding('userId')).count()).to.eventually.equal(0);
    });

    describe('with collapsible navigation', function () {
        it('should have a collapsible navigation menu', function () {
            expect(rxAppCustom.isCollapsible()).to.eventually.be.true;
        });

        it('should be expanded by default', function () {
            expect(rxAppCustom.isExpanded()).to.eventually.be.true;
        });

        it('should collapse the navigation', function () {
            rxAppCustom.collapse();
            expect(rxAppCustom.isExpanded()).to.eventually.be.false;
        });

        it.skip('should expand the navigation', function () {
            rxAppCustom.expand();
            expect(rxAppCustom.isExpanded()).to.eventually.be.true;
        });
    });

    describe('without collapsible navigation', function () {
        it('should not support a toggle show/hide button', function () {
            expect(rxAppStandard.isCollapsible()).to.eventually.be.false;
        });

        it('should throw an error if you attempt to expand and unsupported', function () {
            expect(rxAppStandard.expand()).to.be.rejectedWith('Encore');
        });
    });
});

describe('rxPage', function () {
    var standardPage, customPage;

    before(function () {
        demoPage.go('#/components/rxApp');
        standardPage = encore.rxPage.initialize($('#standard-rxApp .rx-page'));
        customPage = encore.rxPage.initialize($('#custom-rxApp .rx-page'));
    });

    it('should show element', function () {
        expect(customPage.rootElement.isDisplayed()).to.eventually.eq.true;
    });

    it('should have a title', function () {
        expect(standardPage.title).to.eventually.equal('Standard Page Title');
    });

    it('should return a null if no tag is found', function () {
        expect(standardPage.titleTag).to.eventually.be.null;
    });

    it('should return a null if no subtitle is found', function () {
        expect(standardPage.subtitle).to.eventually.be.null;
    });

    it('should have a subtitle', function () {
        expect(customPage.subtitle).to.eventually.equal('With a subtitle');
    });

    it('should have a custom title', function () {
        expect(customPage.title).to.eventually.equal('Customized Page Title');
    });

    it('should have a status tag', function () {
        expect(customPage.titleTag).to.eventually.equal('ALPHA');
    });

    it('should update page subtitle dynamically', function () {
        $('button.changeSubtitle').click();
        expect(customPage.subtitle).to.eventually.contain('With a new subtitle at 1');
    });

    // SKIP: Demo app no longer uses rxApp.
    // Tests in the following describe cannot be performed.
    describe.skip('main title', function () {

        before(function () {
            demoPage.go('#/utilities/rxTitleize');
        });

        it('should grab the main title', function () {
            expect(encore.rxPage.initialize().title).to.eventually.equal('rxTitleize');
        });

    });
});
