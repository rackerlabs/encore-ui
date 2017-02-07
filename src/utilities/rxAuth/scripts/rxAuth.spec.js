describe('utilities:rxAuth', function () {
    var auth, token, $httpBackend;

    token = {
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
            auth = $injector.get('rxAuth');
            auth.getToken = sinon.stub().returns(token);
            auth.storeToken = sinon.stub();
            auth.logout = sinon.stub();
            auth.isCurrent = sinon.stub().returns(true);
            auth.isAuthenticated = sinon.stub().returns(true);
            auth.getRoles = sinon.stub().returns([{ 'name': 'admin' }]);

            $httpBackend = $injector.get('$httpBackend');
            $httpBackend.expectPOST('/api/identity/tokens').respond(token);
        });
    });

    describe('service:rxAuth', function () {
        it('login() should get a token', function () {
            auth.loginWithJSON = sinon.stub().returns(token);
            var result = auth.login({ username: 'Batman', password: 'dark-knight' });
            expect(result.access).not.be.empty;
            expect(auth.loginWithJSON).to.be.called;
        });

        it('loginWithJSON() should get a token', function () {
            var result = auth.loginWithJSON({ username: 'Batman', token: 'bat-token' });
            $httpBackend.flush();
            expect(result.access).not.be.empty;
        });

        it('getToken() should return a token', function () {
            var result = auth.getToken();
            expect(result).not.be.empty;
            expect(result.access).not.be.empty;
            expect(auth.getToken).to.be.called;
        });

        it('storeToken() should store a token', function () {
            auth.storeToken(token);
            expect(auth.storeToken).to.be.called;
        });

        it('logout() should log off user via rxAuth.logout', function () {
            auth.logout();
            expect(auth.logout).to.be.called;
        });

        it('isCurrent() should check token via rxAuth.isCurrent', function () {
            expect(auth.isCurrent()).to.be.true;
            expect(auth.isCurrent).to.be.called;
        });

        it('isAuthenticated() should check token via rxAuth.isAuthenticated', function () {
            expect(auth.isAuthenticated()).to.be.true;
            expect(auth.isAuthenticated).to.be.called;
        });

        it('getRoles() should retrieve user roles via rxAuth.getRoles', function () {
            expect(auth.getRoles().length).to.eq(1);
            expect(auth.getRoles).to.be.called;
        });

        it('hasRole() should validate user has role via rxAuth.hasRole', function () {
            expect(auth.hasRole('admin')).to.be.true;
            expect(auth.hasRole('fakeRole')).to.be.false;
            expect(auth.getRoles).to.be.called;
        });
    });
});
