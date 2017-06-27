describe('encore.ui.rxApp', function () {
    describe('rxAppNav', function () {
        var scope, compile, el;
        var template = '<rx-app-nav items="menuItems" level="1"></rx-app-nav>';

        var menuItems = [{
            href: '/1',
            linkText: '1st Order Item'
        }];

        beforeEach(function () {
            // load module
            module('encore.ui.rxApp');

            // load templates
            module('templates/rxAppNav.html');
            module('templates/rxAppNavItem.html');

            // Inject in angular constructs
            inject(function ($rootScope, $compile) {
                scope = $rootScope.$new();
                compile = $compile;
            });

            scope.menuItems = menuItems;

            el = helpers.createDirective(template, compile, scope);
        });

        it('should exist', function () {
            expect(el).to.have.length.of.at.least(1);
            expect(el.children()).to.have.length.of.at.least(1);
        });

        it('should add "level" class of appropriate level', function () {
            expect(el.hasClass('rx-app-nav-level-1')).to.be.true;
        });

        //TODO: allow children to be dynamically injected
    });
});
