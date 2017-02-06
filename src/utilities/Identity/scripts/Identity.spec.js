describe('utilities:Identity (DEPRECATED)', function () {
    var identity, $httpBackend, token;

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
            $httpBackend = $injector.get('$httpBackend');
            identity = $injector.get('Identity');
        });
    });

    describe('service:Identity', function () {
        it('Identity.loginWithJSON() should get a token', function () {
            $httpBackend.expectPOST('/api/identity/tokens').respond(token);
            var result = identity.loginWithJSON({ username: 'Batman', token: 'bat-token' });
            $httpBackend.flush();
            expect(result.access).not.be.empty;
        });

        it('Identity.login() enables login via username/password', function () {
            var callback = function () { return; };
            $httpBackend.expectPOST('/api/identity/tokens').respond(token);
            var result = identity.login({ username: 'Batman', password: 'dark-knight' }, callback, callback);
            $httpBackend.flush();
            expect(result.access).not.be.empty;
        });
    });
});
