describe('rxButton', function () {
    var rxButton;

    before(function () {
        demoPage.go('#/elements/Buttons');
        rxButton = encore.rxButton.initialize($('#demo-ui-rx-button'));
    });

    it('should show element', function () {
        expect(rxButton.rootElement.isDisplayed()).to.eventually.be.true;
    });
});
