describe('demo component', function () {

    before(function () {
        demoPage.go('#/elements/Breadcrumbs');
    });

    it('default', function () {
        screenshot.snap(this, $('.site-breadcrumbs rx-breadcrumbs ol'), { threshold: 1 });
    });

});
