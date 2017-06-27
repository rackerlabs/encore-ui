describe('encore.ui.rxApp', function () {
    describe('rxAccountUsers', function () {
        var scope, compile, userSelect, users, encoreRoutesMock, $route, $location, provide;
        var validTemplate = '<rx-account-users></rx-account-users>';
        var unregisterCheckCloud = sinon.spy();
        var rootScopeStub = null;

        beforeEach(function () {

            angular.module('testDirective', function () {})
                .factory('Encore', function () {
                    return {
                        getAccountUsers: function () {
                            return {
                                users: [
                                    { username: 'testaccountuser' },
                                    { username: 'hub_cap' }
                                ]
                            };
                        }
                    };
                })
                .factory('encoreRoutes', function ($q) {
                    var mockReturn = true;
                    return {
                        isActiveByKey: function () {
                            var deferred = $q.defer();
                            deferred.resolve(mockReturn);
                            return deferred.promise;
                        },

                        setMock: function (mockValue) {
                            mockReturn = mockValue;
                        }
                    };
                });

            module('encore.ui.rxApp', 'testDirective');
            module('templates/rxAccountUsers.html');
            module(function ($provide) {
                provide = $provide;
            });

            inject(function ($rootScope, $compile, $templateCache, _$location_, _$route_, $q, encoreRoutes) {
                $route = _$route_;
                $location = _$location_;
                compile = $compile;
                scope = $rootScope.$new();
                rootScopeStub = sinon.stub($rootScope, '$on').returns(unregisterCheckCloud);
                encoreRoutesMock = encoreRoutes;

                $location.url('/server/cloud/323676/hub_cap');
                $route.current = {};
                $route.current.originalPath = '/server/cloud/:accountNumber/:user';
                $route.current.params = {
                    accountNumber: 323676,
                    user: 'hub_cap'
                };

                scope.currentUser = 'hub_cap';
                scope.users = [
                    { username: 'testaccountuser', admin: true },
                    { username: 'hub_cap', admin: false }
                ];

                var accountUsersHtml = $templateCache.get('templates/rxAccountUsers.html');
                $templateCache.put('/templates/rxAccountUsers.html', accountUsersHtml);
            });

            userSelect = helpers.createDirective(angular.element(validTemplate), compile, scope);
            users = userSelect.find('option');
        });

        it('should only make external call on good account number', inject(function ($route, Encore) {
            sinon.spy(Encore, 'getAccountUsers');

            $route.current = { params: { accountNumber: 12345 }};
            helpers.createDirective(angular.element(validTemplate), compile, scope);
            expect(Encore.getAccountUsers.called).to.eq(true);

            Encore.getAccountUsers.reset();

            $route.current = { params: { accountNumber: 'nope' }};
            helpers.createDirective(angular.element(validTemplate), compile, scope);
            expect(Encore.getAccountUsers.called).to.eq(false);

            Encore.getAccountUsers.restore();
        }));

        it('should have two account users', function () {
            expect(users).to.have.length(2);
            expect(users[0].text).to.equal('testaccountuser');
            expect(users[1].text).to.equal('hub_cap');
        });

        it('should select current user', function () {
            expect(users[1]).to.be.selected;
        });

        it('should not render when encoreRoutes.isActiveByKey() returns false', function () {
            encoreRoutesMock.setMock(false);
            userSelect = helpers.createDirective(angular.element(validTemplate), compile, scope);
            expect(userSelect.find('select')).to.have.length(0);
        });

        it('should unregister the watcher when the element is removed from the DOM', function () {
            userSelect = helpers.createDirective(angular.element(validTemplate), compile, scope);
            userSelect.remove();
            expect(unregisterCheckCloud.called).to.eq(true);
        });

        describe('Origin Navigation', function () {
            var setCanvasURLSpy;
            var currentCanvasURL = 'someapp.com';

            var fakeOriLocationService = {
                getCanvasURL: function () {
                    return currentCanvasURL;
                },
                setCanvasURL: function () {}
            };

            beforeEach(function () {
                setCanvasURLSpy = sinon.spy(fakeOriLocationService, 'setCanvasURL');
                provide.factory('oriLocationService', function () {
                    return fakeOriLocationService;
                });
            });

            afterEach(function () {
                setCanvasURLSpy.restore();
            });

            it('should use oriLocationService on user change', function () {
                userSelect = helpers.createDirective(angular.element(validTemplate), compile, scope);
                scope.switchUser('testaccountuser');

                expect(setCanvasURLSpy).to.have.been.calledWith('/server/cloud/323676/testaccountuser');

            });
        });

        afterEach(function () {
            rootScopeStub.restore();
        });
    });
});
