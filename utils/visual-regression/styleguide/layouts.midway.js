describe('layouts', function () {
    describe('details', function () {
        before(function () {
            demoPage.go('#/styles/layout/detail');
        });

        it('page actions', function () {
            screenshot.snap(this, $('.page-actions'));
        });

        it('metadata', function () {
            screenshot.snap(this, $('rx-metadata'));
        });

        it('data tables', function () {
            screenshot.snap(this, $('.data-section'));
        });
    });

    describe('data table', function () {
        before(function () {
            demoPage.go('#/styles/layout/data-table');
        });

        it('full table', function () {
            screenshot.snap(this, $('main'));
        });
    });

    describe('create form', function () {
        before(function () {
            demoPage.go('#/styles/layout/form');
        });

        it('form area', function () {
            screenshot.snap(this, $('#form-area'));
        });

        it('first tab', function () {
            screenshot.snap(this, $('.tab-area'));
        });

        it('second tab', function () {
            encore.tabs.initialize($('.nav-tabs')).byName('Tab 2').click(true);
            screenshot.snap(this, $('.tab-area'));
        });
    });
});
