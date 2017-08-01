describe('rxSpinner', function () {
    before(function () {
        demoPage.go('#/elements/Spinner');
    });

    it.skip('should show element', function () {
        expect(encore.rxSpinner.rxSpinnerElement.isDisplayed()).toEqual(true);
    });
});
