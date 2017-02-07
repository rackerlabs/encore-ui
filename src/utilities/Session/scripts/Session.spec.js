describe('utilities:Session (DEPRECATED)', function () {
    var storage, session, mockToken, tomorrow;

    beforeEach(function () {
        module('encore.ui.utilities');
        tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
        mockToken = {
            access: {
                token: {
                    id: 'someid',
                    expires: '2014-03-11T19:43:14.685Z',
                    'RAX-AUTH:authenticatedBy': ['PASSWORD']
                },
                serviceCatalog: [],
                user: {
                    id: '12345',
                    'roles': [{ 'id': '9','name': 'Customer' }],
                    'RAX-AUTH:defaultRegion': '',
                    name: 'joe.user'
                }
            }
        };

        inject(function ($injector) {
            session = $injector.get('Session');
            storage = $injector.get('rxLocalStorage');
            storage.setObject = sinon.spy();
            storage.getObject = sinon.stub().returns(mockToken);
            storage.removeItem = sinon.spy();
        });
    });

    describe('service:Session', function () {
        it('storeToken: should store token in session storage', function () {
            session.storeToken(mockToken);
            expect(storage.setObject).to.be.called;
        });

        it('getToken: should return token from session storage', function () {
            var token = session.getToken();
            expect(token).not.be.empty;
            expect(storage.getObject).to.be.called;
        });

        it('getTokenId: should return the token id from session storage', function () {
            var tokenId = session.getTokenId();
            expect(tokenId).to.eq('someid');
            expect(storage.getObject).to.be.called;
        });

        it('logout: should remove token from session', function () {
            session.logout('encoreToken');
            expect(storage.removeItem).to.be.called;
        });

        it('isCurrent: should evaluate the expiration date of the token', function () {
            expect(session.isCurrent()).to.be.false;
            storage.getObject = sinon.stub().returns();
            expect(session.isCurrent()).to.be.false;

            mockToken.access.token.expires = tomorrow;
            storage.getObject = sinon.stub().returns(mockToken);
            expect(session.isCurrent(mockToken)).to.be.true;
        });

        it('isAuthenticated: should indicate if user has been authenticated', function () {
            expect(session.isAuthenticated()).to.be.false;
            storage.getObject = sinon.stub().returns({});
            expect(session.isAuthenticated()).to.be.false;
        });

        it('getByKey: should return undefined if key does not exist', function () {
            expect(session.getByKey('fake.key.that.does.not.exist')).to.be.undefined;
        });

        it('getUserId: should return the user id', function () {
            expect(session.getUserId()).not.be.empty;
            expect(session.getUserId()).to.eq('12345');
        });

        it('getUserName: should return the user name', function () {
            expect(session.getUserName()).not.be.empty;
            expect(session.getUserName()).to.eq('joe.user');
        });
    });
});
