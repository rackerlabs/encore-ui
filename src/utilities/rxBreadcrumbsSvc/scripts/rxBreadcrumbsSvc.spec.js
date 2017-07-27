describe('rxBreadcrumbsSvc', function () {
    var breadcrumbs, freshBreadcrumbs;

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

    var defaultBreadcrumb = {
        path: '/',
        name: 'Home'
    };

    var newHome = {
        path: '//foo/bar',
        name: 'New Home'
    };

    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function (rxBreadcrumbsSvc) {
            breadcrumbs = rxBreadcrumbsSvc;
        });

        // copy the mockBreadcrumbs so we don't mess it up
        freshBreadcrumbs = mockBreadcrumbs.slice(0);
    });

    it('should have a default first link', function () {
        expect(breadcrumbs.getAll()[0]).to.eql(defaultBreadcrumb);
    });

    it('should allow contents to be set via set method', function () {
        breadcrumbs.set(freshBreadcrumbs);

        // we need to add on the default breadcrumb for comparison since it's added by the service
        freshBreadcrumbs.unshift(defaultBreadcrumb);

        expect(breadcrumbs.getAll()).to.eql(freshBreadcrumbs);
    });

    it('should not allow contents to be set outside set method', function () {
        breadcrumbs.set(freshBreadcrumbs);

        var tmpBreadcrumbs = breadcrumbs.getAll();

        // updating the returned array should not do anything
        tmpBreadcrumbs.push({
            path: '/',
            name: 'something'
        });

        // we need to add on the default breadcrumb for comparison since it's added by the service
        freshBreadcrumbs.unshift(defaultBreadcrumb);

        // breadcrumbs should equal original
        expect(breadcrumbs.getAll()).to.eql(freshBreadcrumbs);
    });

    it('should overwrite previous breadcrumbs', function () {
        // set inital breadcrumbs to be overwritten
        breadcrumbs.set(mockBreadcrumbs);

        var somePage =  {
            path: '/',
            name: 'Some Page'
        };

        // add new item to breadcrumbs
        freshBreadcrumbs.unshift(somePage);

        // update breadcrumbs service
        breadcrumbs.set(freshBreadcrumbs);

        // add homepage for comparison
        freshBreadcrumbs.unshift(defaultBreadcrumb);

        expect(breadcrumbs.getAll()).to.eql(freshBreadcrumbs);
    });

    it('should allow a different default breadcrumb to be set', function () {
        // update breadcrumbs service
        breadcrumbs.set(freshBreadcrumbs);

        // add new home page for comparison
        freshBreadcrumbs.unshift(newHome);

        breadcrumbs.setHome(newHome.path, newHome.name);

        expect(breadcrumbs.getAll()).to.eql(freshBreadcrumbs);
    });

    it('should allow the new home name to reuse the default', function () {
        // update breadcrumbs service
        breadcrumbs.set(freshBreadcrumbs);

        // add new home page for comparison
        freshBreadcrumbs.unshift({
            path: newHome.path,
            name: defaultBreadcrumb.name
        });

        // Add a new home path, not name
        breadcrumbs.setHome(newHome.path);

        expect(breadcrumbs.getAll()).to.eql(freshBreadcrumbs);
    });
});
