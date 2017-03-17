describe('utilities:rxSession', function () {
    var rxLocalStorage, rxSession, result;
    var mockToken = {
        access: {
            token: {
                id: 'someid',
                expires: '2014-03-11T19:43:14.685Z',
                'RAX-AUTH:authenticatedBy': ['PASSWORD']
            },
            serviceCatalog: [],
            user: {
                id: '12345',
                'roles': [
                    { id: '9', name: 'Customer' },
                    { id: '9', name: 'Test' }
                ],
                'RAX-AUTH:defaultRegion': '',
                name: 'joe.user'
            }
        }
    };

    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function ($injector) {
            rxSession = $injector.get('rxSession');

            rxLocalStorage = $injector.get('rxLocalStorage');
            rxLocalStorage.setObject = sinon.spy();
            rxLocalStorage.getObject = sinon.stub().returns(mockToken);
            rxLocalStorage.removeItem = sinon.spy();
        });
    });

    describe('getByKey()', function () {
        describe('when key does not exist', function () {
            it('should return undefined', function () {
                expect(rxSession.getByKey('fake.key.that.does.not.exist')).to.be.undefined;
            });
        });
    });//getByKey()

    describe('getToken()', function () {
        beforeEach(function () {
            result = rxSession.getToken();
        });

        it('should not be empty', function () {
            expect(result).to.not.be.empty;
        });

        it('should call getObject()', function () {
            expect(rxLocalStorage.getObject).to.be.called;
        });
    });//getToken()

    describe('getTokenId()', function () {
        beforeEach(function () {
            result = rxSession.getTokenId();
        });

        it('should return the token id from session storage', function () {
            expect(result).to.eq('someid');
        });

        it('should call getObject()', function () {
            expect(rxLocalStorage.getObject).to.be.called;
        });
    });//getTokenId()

    describe('getUserId()', function () {
        it('should return the expected user id', function () {
            expect(rxSession.getUserId()).to.eq('12345');
        });
    });//getUserId()

    describe('getUserName()', function () {
        it('should return the expected user name', function () {
            expect(rxSession.getUserName()).not.be.empty;
        });
    });//getUserName()

    describe('storeToken()', function () {
        beforeEach(function () {
            rxSession.storeToken(mockToken);
        });

        it('should call rxLocalStorage.setObject()', function () {
            expect(rxLocalStorage.setObject).to.be.called;
        });
    });//storeToken()

    describe('logout()', function () {
        beforeEach(function () {
            rxSession.logout('encoreToken');
        });

        it('should call rxLocalStorage.removeItem()', function () {
            expect(rxLocalStorage.removeItem).to.be.called;
        });
    });//logout()

    describe('isCurrent()', function () {
        var _dayMs = 24 * 60 * 60 * 1000;
        var yesterday = new Date(Date.now() - _dayMs);
        var tomorrow = new Date(Date.now() + _dayMs);

        describe('when token expires in past', function () {
            beforeEach(function () {
                mockToken.access.token.expires = yesterday;
                rxLocalStorage.getObject = sinon.stub().returns(mockToken);
            });

            it('should not be current', function () {
                expect(rxSession.isCurrent(mockToken)).to.be.false;
            });
        });

        describe('when there is no token in local storage', function () {
            beforeEach(function () {
                rxLocalStorage.getObject = sinon.stub().returns();
            });

            it('should not be current', function () {
                expect(rxSession.isCurrent(mockToken)).to.be.false;
            });
        });

        describe('when token expires tomorrow', function () {
            beforeEach(function () {
                mockToken.access.token.expires = tomorrow;
                rxLocalStorage.getObject = sinon.stub().returns(mockToken);
            });

            it('should be current', function () {
                expect(rxSession.isCurrent(mockToken)).to.be.true;
            });
        });
    });//isCurrent()

    describe('isAuthenticated()', function () {
        describe('when token is undefined', function () {
            beforeEach(function () {
                rxSession.getToken = sinon.stub().returns(undefined);
            });

            it('should not be authenticated', function () {
                expect(rxSession.isAuthenticated()).to.be.false;
            });
        });

        describe('when token is empty', function () {
            beforeEach(function () {
                rxSession.getToken = sinon.stub().returns({});
            });

            it('should not be authenticated', function () {
                expect(rxSession.isAuthenticated()).to.be.false;
            });
        });

        describe('when token is present', function () {
            beforeEach(function () {
                rxSession.getToken = sinon.stub().returns(mockToken);
            });

            it('should match isCurrent()', function () {
                expect(rxSession.isAuthenticated()).to.be.equal(rxSession.isCurrent());
            });
        });
    });//isAuthenticated()

    describe('getRoles()', function () {
        describe('when token is present', function () {
            beforeEach(function () {
                result = rxSession.getRoles();
            });

            it('should not be empty', function () {
                expect(result).to.not.be.empty;
            });

            it('should return two roles', function () {
                expect(result).to.have.lengthOf(2);
            });
        });

        describe('when token is not present', function () {
            beforeEach(function () {
                rxSession.getToken = sinon.stub().returns(null);
                result = rxSession.getRoles();
            });

            it('should be empty', function () {
                expect(result).to.be.empty;
            });
        });
    });//getRoles()

    describe('hasRole()', function () {
        describe('as string', function () {
            it('should be true when user has role', function () {
                expect(rxSession.hasRole('Customer')).to.be.true;
            });

            it('should be false when user does not have role', function () {
                expect(rxSession.hasRole('Invalid Role')).to.be.false;
            });

            it('should be true when user has any of roles', function () {
                expect(rxSession.hasRole('Customer, Invalid Role')).to.be.true;
                expect(rxSession.hasRole('Test, Er Role, Today')).to.be.true;
            });

            it('should be false when user has none of roles', function () {
                expect(rxSession.hasRole('Custom, Er Role, Today')).to.be.false;
            });
        });

        describe('as array', function () {
            it('should be true if user has any role', function () {
                expect(rxSession.hasRole(['Customer', 'Invalid Role'])).to.be.true;
                expect(rxSession.hasRole(['Test', 'Er Role', 'Today'])).to.be.true;
            });

            it('should be false if user has none of roles', function () {
                expect(rxSession.hasRole(['Custom', 'Er Role', 'Today'])).to.be.false;
            });
        });
    });//hasRole()

    describe('hasAllRoles()', function () {
        it('should be true if user has all roles', function () {
            expect(rxSession.hasAllRoles(['Customer', 'Test'])).to.be.true;
        });

        it('should be false if user has some of roles', function () {
            expect(rxSession.hasAllRoles(['Customer', 'Invalid Role'])).to.be.false;
            expect(rxSession.hasAllRoles(['Customer', 'Test', 'Today'])).to.be.false;
        });

        it('should be false if user has none of roles', function () {
            expect(rxSession.hasAllRoles(['Foo', 'Bar', 'Bang'])).to.be.false;
        });
    });//hasAllRoles()
});
