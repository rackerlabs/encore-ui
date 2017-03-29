describe('demo component', function () {

    before(function () {
        demoPage.go('#/elements/Feedback');
    });

    it('default', function () {
        new encore.rxFeedback($('#rxFeedbackSucceeds')).open();
        screenshot.snap(this, new encore.rxModalAction($('.modal')), { threshold: 1 });
    });

});
