// functionally identical to Auth
describe('utilities:rxAuth (DEPRECATED)', function () {
    var rxAuth, rxIdentity, rxSession;
    var token = {
        'access': {
            'token': {
                'id': 'somecrazyid',
                'expires': '2014-03-20T19:47:36.711Z',
                'tenant': {
                    'id': '655062',
                    'name': '655062'
                },
                'RAX-AUTH:authenticatedBy': ['PASSWORD']
            }
        }
    };

    beforeEach(function () {
        module('encore.ui.utilities');
        module({ suppressDeprecationWarnings: true });


        inject(function ($injector) {
            rxIdentity = $injector.get('rxIdentity');
            rxIdentity.loginWithJSON = sinon.stub().returns(token);

            rxSession = $injector.get('rxSession');
            rxSession.getToken = sinon.stub().returns(token);
            rxSession.storeToken = sinon.stub();
            rxSession.logout = sinon.stub();
            rxSession.isCurrent = sinon.stub().returns(true);
            rxSession.isAuthenticated = sinon.stub().returns(true);
            rxSession.getRoles = sinon.stub().returns([{ 'name': 'admin' }]);

            rxAuth = $injector.get('rxAuth');
        });
    });

    describe('service:rxAuth', function () {
        it('login() should get a token', function () {
            var result = rxAuth.login({ username: 'Batman', password: 'dark-knight' });
            expect(result.access).not.be.empty;
            expect(rxAuth.loginWithJSON).to.be.called;
        });

        it('loginWithJSON() should get a token', function () {
            var result = rxAuth.loginWithJSON({ username: 'Batman', token: 'bat-token' });
            expect(result.access).not.be.empty;
        });

        it('getToken() should return a token', function () {
            var result = rxAuth.getToken();
            expect(result).not.be.empty;
            expect(result.access).not.be.empty;
            expect(rxAuth.getToken).to.be.called;
        });

        it('storeToken() should store a token', function () {
            rxAuth.storeToken(token);
            expect(rxAuth.storeToken).to.be.called;
        });

        it('logout() should log off user via rxAuth.logout', function () {
            rxAuth.logout();
            expect(rxAuth.logout).to.be.called;
        });

        it('isCurrent() should check token via rxAuth.isCurrent', function () {
            expect(rxAuth.isCurrent()).to.be.true;
            expect(rxAuth.isCurrent).to.be.called;
        });

        it('isAuthenticated() should check token via rxAuth.isAuthenticated', function () {
            expect(rxAuth.isAuthenticated()).to.be.true;
            expect(rxAuth.isAuthenticated).to.be.called;
        });

        it('getRoles() should retrieve user roles via rxAuth.getRoles', function () {
            expect(rxAuth.getRoles().length).to.eq(1);
            expect(rxAuth.getRoles).to.be.called;
        });

        it('hasRole() should validate user has role via rxAuth.hasRole', function () {
            expect(rxAuth.hasRole('admin')).to.be.true;
            expect(rxAuth.hasRole('fakeRole')).to.be.false;
            expect(rxAuth.getRoles).to.be.called;
        });
    });
});
