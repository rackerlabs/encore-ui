describe('encore.ui.rxApp', function () {
    describe('rxStatusTag', function () {
        var scope, compile, rootScope, el, emptyEl, badEl;
        var standardTemplate = '<rx-status-tag status="alpha"></rx-status-tag>';
        var emptyTemplate = '<rx-status-tag></rx-status-tag>';
        var badTemplate = '<rx-status-tag status="badtag"></rx-status-tag>';

        beforeEach(function () {
            // load module
            module('encore.ui.rxApp');

            // Inject in angular constructs
            inject(function ($rootScope, $compile) {
                rootScope = $rootScope;
                compile = $compile;
            });

            scope = rootScope.$new();

            el = helpers.createDirective(standardTemplate, compile, scope);
            emptyEl = helpers.createDirective(emptyTemplate, compile, scope);
            badEl = helpers.createDirective(badTemplate, compile, scope);
        });

        it('draws an alpha tag', function () {
            var span = el.find('.status-tag');

            expect(span.text(), 'text').to.equal('Alpha');
        });

        it('does not draw the tag when no status key is passed in', function () {
            var span = emptyEl.find('.status-tag');
            expect(span.length).to.equal(0);
        });

        it('does not draw the tag when an unknown status key is provided', function () {
            var span = badEl.find('.status-tag');
            expect(span.length).to.equal(0);
        });
    });
});
