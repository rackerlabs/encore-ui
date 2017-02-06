describe('utilities: StatusUtil', function () {
    var util,
        rootScope,
        status = {
            setScope: function () { }
        };

    beforeEach(function () {
        module('ngRoute');
        module('encore.ui.utilities', function ($provide) {
            $provide.value('rxStatus', status);
        });

        inject(function ($rootScope, StatusUtil) {
            util = StatusUtil;
            rootScope = $rootScope;

            sinon.spy(status, 'setScope');
        });
    });

    afterEach(function () {
        status.setScope.restore();
    });

    it('StatusUtil: should allow storing of rootScope reference', function () {
        util.setupScope();
        expect(status.setScope.args[0][0]).to.deep.equal(rootScope);
    });

    it('StatusUtil: should allow storing of provided scope reference', function () {
        util.setupScope({ fake: 'object' });
        expect(status.setScope.args[0][0]).to.deep.equal({ fake: 'object' });
    });
});
