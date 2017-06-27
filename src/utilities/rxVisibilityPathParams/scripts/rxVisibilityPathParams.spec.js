describe('utilities:rxVisibilityPathParams', function () {
    describe('rxVisibilityPathParams', function () {
        beforeEach(function () {
            // Necessary so `$routeProvider` is available
            module('ngRoute');

            module('encore.ui.utilities');
        });

        it('should let me set location', function () {
            module(function ($routeProvider) {
                $routeProvider.when('/foo/:barId', {});
            });

            inject(function ($location, $route, $rootScope, $routeParams, rxVisibilityPathParams) {
                $location.path('/foo/someIdForBar');
                $rootScope.$digest();
                expect($routeParams).to.deep.equal({ barId: 'someIdForBar' });
                var scope = $rootScope.$new();
                var method = rxVisibilityPathParams.method;
                expect(method(scope, { param: 'barId' }), ':barId should be present').to.be.true;
                expect(method(scope, { param: 'abc' }), ':abc is not defined, should not be present').to.be.false;
            });

        });
    });
});
