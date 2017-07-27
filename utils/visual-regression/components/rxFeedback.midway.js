describe('demo component', function () {

    before(function () {
        demoPage.go('#/elements/Feedback');
    });

    it('default', function () {
        encore.rxFeedback.initialize($('#rxFeedbackSucceeds')).open();
        screenshot.snap(this, encore.rxModalAction.initialize().rootElement, { threshold: 1 });
    });

});
