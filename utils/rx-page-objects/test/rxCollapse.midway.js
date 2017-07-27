describe('rxCollapse', function () {

    before(function () {
        demoPage.go('#/elements/Collapse');
    });

    describe('custom title', encore.exercise.rxCollapse({
        instance: encore.rxCollapse.initialize($('.demo-with-title')),
        title: 'A Custom Title',
        expanded: true
    }));

    describe('default title', encore.exercise.rxCollapse({
        instance: encore.rxCollapse.initialize($('.demo-no-title')),
        expanded: false
    }));
});
