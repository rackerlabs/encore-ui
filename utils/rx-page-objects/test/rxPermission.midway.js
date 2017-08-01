var rxPermissionPage = encore.rxPermission;

describe('rxPermission', function () {

    before(function () {
        demoPage.go('#/utilities/rxPermission');
    });

    it('rxPermission should display and hide content when appropriate', function () {
        var rxPermission = rxPermissionPage.rxPermission;
        expect(rxPermission.isDisplayed()).to.eventually.be.false;
        demoPage.storeTokenButton.click();
        expect(rxPermission.isDisplayed()).to.eventually.be.true;
        demoPage.clearTokenButton.click();
        expect(rxPermissionPage.rxPermission.isDisplayed()).to.eventually.be.false;
    });
});
