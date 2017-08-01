describe('elements:Breadcrumbs', function () {
    var scope, compile, breadcrumbs;

    var mockBreadcrumbs = [
        {
            path: 'one',
            name: 'One',
            usePageStatusTag: true
        }, {
            path: 'two',
            name: 'Two',
            status: 'beta'
        }, {
            path: 'three',
            name: '<span class="custom-html">Three</span>',
            status: 'alpha'
        }
    ];

    beforeEach(function () {
        // Load the service's module
        module('encore.ui.utilities');
        module('encore.ui.elements');
        module('encore.ui.rxApp');

        // load the template
        module('templates/rxBreadcrumbs.html');

        // Inject in angular constructs otherwise,
        // you would need to inject these into each test
        inject(function (rxBreadcrumbsSvc, $rootScope, $compile) {
            breadcrumbs = rxBreadcrumbsSvc;
            scope = $rootScope.$new();
            compile = $compile;
        });
    });

    describe('directive', function () {
        var el,
            validTemplate = '<rx-breadcrumbs></rx-breadcrumbs>';

        beforeEach(function () {
            // Inject mock breadcrumbs
            breadcrumbs.set(mockBreadcrumbs);

            el = helpers.createDirective(validTemplate, compile, scope);

            scope.$digest();
        });

        it('should not have last breadcrumb as a link', function () {
            var lastText = mockBreadcrumbs[2].name;
            expect(el.find('a').text()).to.not.contain(lastText);
        });

        it('should create links for each breadcrumb', function () {
            // spy on location service
            var links = el.find('a');

            expect(links).to.have.length(3);
            expect(links.eq(0).attr('href')).to.eql('/');
            expect(links.eq(1).attr('href')).to.eql('one');
            expect(links.eq(2).attr('href')).to.eql('two');
        });

        it('should add a class of "first" to the first breadcrumb', function () {
            var firstLink = el.find('a').eq(0);

            expect(firstLink.hasClass('first')).to.be.true;
        });

        it('should add a class of "last" to the last breadcrumb', function () {
            var items = el[0].getElementsByClassName('breadcrumb-name');

            expect(items[items.length - 1].className).to.contain('last');
        });

        it('should allow HTML in breadcrumb name', function () {
            var customSpan = el.find('.custom-html').eq(0);

            expect(customSpan.text()).to.equal('Three');
        });

        it('should draw a tag specificed with `status` on a middle breadcrumb', function () {
            var tag = el.find('.beta-status').eq(0);

            expect(tag.text()).to.equal('Beta');
        });

        it('should draw a tag specificed with `status` on the last breadcrumb', function () {
            var tag = el.find('.alpha-status').eq(0);

            expect(tag.text()).to.equal('Alpha');
        });

        it('should not draw a tag on the first breadcrumb', function () {
            var items = el[0].getElementsByClassName('breadcrumb-name');

            expect($(items[1]).find('.status-tag').length).to.equal(0);

        });
    });

    describe('directive with status attribute', function () {
        var el,
            validTemplate = '<rx-breadcrumbs status="alpha"></rx-breadcrumbs>';

        beforeEach(function () {
            // Inject mock breadcrumbs
            breadcrumbs.set(mockBreadcrumbs);

            el = helpers.createDirective(validTemplate, compile, scope);

            scope.$digest();
        });

        it('should draw a tag on the first breadcrumb', function () {
            var items = el[0].getElementsByClassName('breadcrumb-name');

            expect($(items[1]).find('.status-tag').length).to.equal(1);

        });

        it('should draw a tag specificed with `status` on a middle breadcrumb', function () {
            var tag = el.find('.beta-status').eq(0);

            expect(tag.text()).to.equal('Beta');
        });

        it('should draw a tag specificed with `status` on the last breadcrumb', function () {
            var tag = el.find('.alpha-status').eq(0);

            expect(tag.text()).to.equal('Alpha');
        });
    });
});
