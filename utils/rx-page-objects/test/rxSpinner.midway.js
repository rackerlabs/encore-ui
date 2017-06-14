describe('rxSpinner', function () {
    before(function () {
        demoPage.go('#/elements/Spinner');
    });

    it('should show element', function () {
        expect(encore.rxSpinner.rxSpinnerElement.isDisplayed()).to.eventually.eq(true);
    });
});
