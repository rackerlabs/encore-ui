describe('rxToggle', function () {
    var rxToggle, rxToggleContent;

    before(function () {
        demoPage.go('#/utilities/rxToggle');
        rxToggle = $('#vacillator');
        rxToggleContent = $('#vacillated');
    });

    it('should toggle content on show', function () {
        expect(rxToggleContent.isDisplayed()).to.eventually.be.false;

        rxToggle.click();

        expect(rxToggleContent.isDisplayed()).to.eventually.be.true;

        rxToggle.click();

        expect(rxToggleContent.isDisplayed()).to.eventually.be.false;
    });
});
