var rxBreadcrumbs = encore.rxBreadcrumbs;

describe('elements:rxBreadcrumbs', function () {
    var breadcrumbs;

    before(function () {
        demoPage.go('#/elements/Breadcrumbs');
        breadcrumbs = rxBreadcrumbs.initialize($('.module-demo rx-breadcrumbs'));
    });

    it('should show the element', function () {
        expect(breadcrumbs.rootElement.isDisplayed()).to.eventually.be.true;
    });

    describe('first breadcrumb', function () {
        var first;

        before(function () {
            first = breadcrumbs.byPosition(0);
        });

        it('should fetch a single breadcrumb by position', function () {
            expect(first).to.not.be.empty;
        });

        it('should be the first breadcrumb', function () {
            expect(first.isFirst()).to.eventually.be.true;
        });

        it('should not be the last breadcrumb', function () {
            expect(first.isLast()).to.eventually.be.false;
        });

        it('should have the name "Overview"', function () {
            expect(first.name).to.eventually.equal('Overview');
        });

        it('should not have a tag', function () {
            expect(first.lblTag.isPresent()).to.eventually.be.false;
        });

        it('should have the href "/#/overview"', function () {
            expect(first.href).to.eventually.equal(browser.baseUrl + '/#/overview');
        });
    });

    describe('last breadcrumb', function () {
        var last;

        before(function () {
            last = breadcrumbs.byPosition(-1);
        });

        it('should fetch a single breadcrumb by position', function () {
            expect(last).to.not.be.empty;
        });

        it('should not be the first breadcrumb', function () {
            expect(last.isFirst()).to.eventually.be.false;
        });

        it('should be the last breadcrumb', function () {
            expect(last.isLast()).to.eventually.be.true;
        });

        it('should have the name "All Elements"', function () {
            expect(last.name).to.eventually.equal('All Elements');
        });

        it('should have a "DEMO TAG" tag',  function () {
            expect(last.lblTag.isPresent()).to.eventually.be.true;
            expect(last.tag).to.eventually.equal('DEMO TAG');
        });

        it('should have no href property', function () {
            expect(last.isLink()).to.eventually.be.false;
            expect(last.href).to.eventually.be.null;
        });
    });

    describe('by name', function () {
        var middle;

        before(function () {
            middle = breadcrumbs.byName('Elements');
        });

        it('should fetch a single breadcrumb by position', function () {
            expect(middle).to.not.be.empty;
        });

        it('should not be the first breadcrumb', function () {
            expect(middle.isFirst()).to.eventually.be.false;
        });

        it('should not be the last breadcrumb', function () {
            expect(middle.isLast()).to.eventually.be.false;
        });

        it('should have the name "Elements"', function () {
            expect(middle.name).to.eventually.equal('Elements');
        });

        it('should not have a tag', function () {
            expect(middle.tag).to.eventually.be.null;
            expect(middle.lblTag.isPresent()).to.eventually.be.false;
        });

        it('should have an href property', function () {
            expect(middle.isLink()).to.eventually.be.true;
            expect(middle.href).to.eventually.equal(browser.baseUrl + '/#/elements');
        });

        it('should visit the correct page when clicking on the breadcrumb', function () {
            var componentsHref = browser.baseUrl + '/#/elements';

            middle.click();
            expect(browser.getCurrentUrl()).to.eventually.equal(componentsHref);
        });

        after(function () {
            demoPage.go('#/elements/Breadcrumbs');
        });
    });

    describe('default breadcrumbs', function () {
        var defaultBreadcrumbs;

        before(function () {
            demoPage.go('#/utilities/rxTitleize');
            defaultBreadcrumbs = rxBreadcrumbs.initialize();
        });

        it('should find the default breadcrumbs', function () {
            expect(defaultBreadcrumbs.count()).to.eventually.equal(4);
        });

        it('should have the correct names', function () {
            expect(defaultBreadcrumbs.names).to.eventually.eql(['Overview', 'Modules', 'Utilities', 'rxTitleize']);
        });
    });
});
