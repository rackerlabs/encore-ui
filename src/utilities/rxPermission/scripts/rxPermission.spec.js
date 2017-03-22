describe('rxPermission', function () {
    describe('directive:rxPermission', function () {
        var scope, compile, el, elRoles, elFail, elFailRoles;
        var validTemplate = '<rx-permission role="pass">Hello</rx-permission>';
        var validRolesTemplate = '<rx-permission role="pass,also">Hello</rx-permission>';
        var invalidTemplate = '<rx-permission role="fail">Hello</rx-permission>';
        var invalidRolesTemplate = '<rx-permission role="fail,failure-role">Hello</rx-permission>';

        beforeEach(function () {
            module('encore.ui.utilities', function ($provide) {
                $provide.decorator('rxSession', function ($delegate) {
                    $delegate.hasRole = function (role) {
                        return _.includes(role, 'pass') || _.includes(role, 'also');
                    };

                    return $delegate;
                });
            });

            module('templates/rxPermission.html');

            inject(function ($location, $rootScope, $compile) {
                scope = $rootScope.$new();
                compile = $compile;
            });

            el = helpers.createDirective(validTemplate, compile, scope);
            elRoles = helpers.createDirective(validRolesTemplate, compile, scope);
            elFail = helpers.createDirective(invalidTemplate, compile, scope);
            elFailRoles = helpers.createDirective(invalidRolesTemplate, compile, scope);
        });

        it('should display text when user has role', function () {
            expect(el.text().trim()).to.be.eq('Hello');
        });

        it('should display text when user has any of multiple roles', function () {
            expect(elRoles.text().trim()).to.be.eq('Hello');
        });

        it('should not display text when user does not have role', function () {
            expect(elFail.text().trim()).to.be.empty;
        });

        it('should not display text when user has none of multiple roles', function () {
            expect(elFailRoles.text().trim()).to.be.empty;
        });
    });
});
