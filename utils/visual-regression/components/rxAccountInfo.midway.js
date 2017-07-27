describe('demo component', function () {

    before(function () {
        demoPage.go('#/elements/AccountInfo');
    });

    it('default', function () {
        var elem = $('rx-example[name="accountInfo.rxPage"] .account-info-banner');
        screenshot.snap(this, elem, { threshold: 1 });
    });

});
