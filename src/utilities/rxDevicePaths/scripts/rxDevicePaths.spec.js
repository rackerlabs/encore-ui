describe('rxDevicePaths', function () {
    var dp;

    beforeEach(function () {
        // Load the directive's module
        module('encore.ui.utilities');

        // Inject in angular constructs
        inject(function (rxDevicePaths) {
            dp = rxDevicePaths;
        });
    });

    it('should exist', function () {
        expect(dp).to.exist;
    });
});
