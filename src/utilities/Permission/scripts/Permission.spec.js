describe('utilities:Permission', function () {
    describe('service:Permission (DEPRECATED)', function () {
        var permission, session, mockToken;

        mockToken = {
            access: {
                token: {
                    id: 'someid',
                },
                user: {
                    id: 'joe.customer',
                    'roles': [
                        { 'id': '9','name': 'Customer' },
                        { 'id': '9','name': 'Test' }
                    ]
                }
            }
        };

        beforeEach(function () {
            module('encore.ui.utilities');

            inject(function ($injector) {
                permission = $injector.get('Permission');
                session = $injector.get('Session');
                session.getToken = sinon.stub().returns(mockToken);
            });
        });

        it('should return list of roles on getRoles', function () {
            expect(permission.getRoles()).not.be.empty;
            expect(permission.getRoles().length).to.be.eq(2);

            session.getToken = sinon.stub().returns(null);
            expect(permission.getRoles()).to.be.empty;
            expect(session.getToken).to.be.called;
        });

        it('should validate if user has role', function () {
            expect(permission.hasRole('Customer')).to.be.true;
            expect(permission.hasRole('Invalid Role')).to.be.false;
            expect(session.getToken).to.be.called;
        });

        it('should validate if user has any of roles', function () {
            expect(permission.hasRole('Customer, Invalid Role')).to.be.true;
            expect(permission.hasRole('Custom, Er Role, Today')).to.be.false;
            expect(permission.hasRole('Test, Er Role, Today')).to.be.true;
            expect(session.getToken).to.be.called;
        });

        it('should accept array of roles', function () {
            expect(permission.hasRole(['Customer', 'Invalid Role'])).to.be.true;
            expect(permission.hasRole(['Custom', 'Er Role', 'Today'])).to.be.false;
            expect(permission.hasRole(['Test', 'Er Role', 'Today'])).to.be.true;
            expect(session.getToken).to.be.called;

        });

        it('should validate if user has all roles', function () {
            expect(permission.hasAllRoles(['Customer', 'Invalid Role'])).to.be.false;
            expect(permission.hasAllRoles(['Customer', 'Test'])).to.be.true;
            expect(permission.hasAllRoles(['Customer', 'Test', 'Today'])).to.be.false;
            expect(session.getToken).to.be.called;
        });
    });
});
