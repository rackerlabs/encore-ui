// functionally identical to rxAuth
describe('utilities:Auth (DEPRECATED)', function () {
    var Auth, rxIdentity, rxSession;
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

            Auth = $injector.get('Auth');
        });
    });

    describe('service:Auth', function () {
        it('login() should get a token', function () {
            var result = Auth.login({ username: 'Batman', password: 'dark-knight' });
            expect(result.access).not.be.empty;
            expect(Auth.loginWithJSON).to.be.called;
        });

        it('loginWithJSON() should get a token', function () {
            var result = Auth.loginWithJSON({ username: 'Batman', token: 'bat-token' });
            expect(result.access).not.be.empty;
        });

        it('getToken() should return a token', function () {
            var result = Auth.getToken();
            expect(result).not.be.empty;
            expect(result.access).not.be.empty;
            expect(Auth.getToken).to.be.called;
        });

        it('storeToken() should store a token', function () {
            Auth.storeToken(token);
            expect(Auth.storeToken).to.be.called;
        });

        it('logout() should log off user via Auth.logout', function () {
            Auth.logout();
            expect(Auth.logout).to.be.called;
        });

        it('isCurrent() should check token via Auth.isCurrent', function () {
            expect(Auth.isCurrent()).to.be.true;
            expect(Auth.isCurrent).to.be.called;
        });

        it('isAuthenticated() should check token via Auth.isAuthenticated', function () {
            expect(Auth.isAuthenticated()).to.be.true;
            expect(Auth.isAuthenticated).to.be.called;
        });

        it('getRoles() should retrieve user roles via Auth.getRoles', function () {
            expect(Auth.getRoles().length).to.eq(1);
            expect(Auth.getRoles).to.be.called;
        });

        it('hasRole() should validate user has role via Auth.hasRole', function () {
            expect(Auth.hasRole('admin')).to.be.true;
            expect(Auth.hasRole('fakeRole')).to.be.false;
            expect(Auth.getRoles).to.be.called;
        });
    });
});
