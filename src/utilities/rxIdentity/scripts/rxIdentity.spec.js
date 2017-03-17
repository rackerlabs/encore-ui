describe('utilities:rxIdentity', function () {
    var rxIdentity, $httpBackend, result;
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
            $httpBackend = $injector.get('$httpBackend');
            $httpBackend.expectPOST('/api/identity/tokens').respond(token);
        });
    });

    describe('login()', function () {
        beforeEach(function () {
            rxIdentity.loginWithJSON = sinon.stub().returns(token);
            result = rxIdentity.login({
                username: 'Batman',
                password: 'dark-knight'
            });
        });

        it('should get a token', function () {
            expect(result.access).to.not.be.empty;
        });

        it('should call loginWithJSON()', function () {
            expect(rxIdentity.loginWithJSON).to.be.called;
        });
    });//login()

    describe('loginWithJSON()', function () {
        beforeEach(function () {
            result = rxIdentity.loginWithJSON({
                username: 'Batman',
                token: 'bat-token'
            });
            $httpBackend.flush();
        });

        it('should get a token', function () {
            expect(result.access).to.not.be.empty;
        });
    });//loginWithJSON()
});
