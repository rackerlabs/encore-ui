describe('demo component', function () {

    before(function () {
        demoPage.go('#/elements/ActionMenu');
    });

    it('default', function () {
        new encore.rxActionMenu($('rx-action-menu#globalDismissal')).expand();
        screenshot.snap(this, $('.table-striped'), { threshold: 1 });
    });

    describe('links', function () {
        before(function () {
            demoPage.go('#/elements/Links');
        });

        it('all', function () {
            screenshot.snap(this, $('#all-icons'), { threshold: 1 });
        });
    });

});
