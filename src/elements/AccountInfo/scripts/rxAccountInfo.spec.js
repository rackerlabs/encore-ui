describe('elements:rxAccountInfo', function () {
    describe('directive:rxAccountInfo', function () {
        var scope, compile, el, rxnotify, encoreRoutesMock;
        var validTemplate = '<rx-account-info account-info-banner="true" account-number="123"></rx-account-info>';
        var defaultStack = 'page';

        var account, badges, teamBadges;

        beforeEach(function () {
            account = {
                name: 'Mosso',
                status: 'Active',
                accessPolicy: 'Full',
                collectionsStatus: 'CURRENT'
            };

            badges = [
                {
                    url: 'http://foo.com/bar.jpg',
                    name: 'Plain Badge',
                    description: 'A badge!'
                }
            ];

            teamBadges = [
                {
                    url: 'http://goo.gl/xj1ivh',
                    name: 'A-Team Badge',
                    description: 'A team badge!'
                }
            ];

            angular.module('testApp', function () {})
                .factory('Encore', function () {
                    return {
                        getAccount: function () {
                            return { };
                        }
                    };
                })
                .factory('SupportAccount', function () {
                    return {
                        getBadges: function () {}
                    };
                })
                .factory('Teams', function () {
                    return {
                        badges: function () {}
                    };
                })
                .factory('AccountStatusGroup', function () {
                    return function (accountStatus) {
                        accountStatus = accountStatus.toLowerCase();
                        if (accountStatus === 'active') {
                            return '';
                        } else if (accountStatus === 'delinquent') {
                            return 'warning';
                        } else if (accountStatus === 'pending approval') {
                            return 'info';
                        }
                    };
                })
                .factory('encoreRoutes', function ($q) {
                    var mockReturn = false;
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

            // load module
            module('encore.ui.utilities');
            module('templates/rxInfoPanel.html');
            module('encore.ui.elements', 'testApp');

            // load templates
            module('templates/rxAccountInfo.html');
            module('templates/rxAccountInfoBanner.html');

            // Inject in angular constructs
            inject(function ($location, $rootScope, $compile, $q, Encore, SupportAccount,
                    rxNotify, Teams, encoreRoutes) {
                scope = $rootScope.$new();
                compile = $compile;
                rxnotify = rxNotify;
                encoreRoutesMock = encoreRoutes;
                helpers.resourceStub($q, Encore, 'getAccount', account);
                helpers.resourceStub($q, SupportAccount, 'getBadges', badges);
                helpers.resourceStub($q, Teams, 'badges', teamBadges);
            });

            el = helpers.createDirective(validTemplate, compile, scope);
        });

        it('should render template correctly', function () {
            scope.$digest();
            expect(el).not.be.empty;
        });

        it('should construct the proper account url', function () {
            expect(el.isolateScope().accountPageUrl).to.eq('/accounts/123');
        });

        it('should populate the account number', function () {
            scope.$digest();
            expect(el).not.be.empty;
            expect(el.text()).to.contain('123');
        });

        it('should populate the account name', function () {
            account.$deferred.resolve(account);
            scope.$digest();
            expect(el.text()).to.contain('Mosso');
        });

        it('should populate the account access policy: Full', function () {
            account.$deferred.resolve(account);
            scope.$digest();
            expect(el.text()).to.contain('Full');
        });

        it('should populate the account access policy: Suspended', function () {
            account.accessPolicy = 'Suspended';
            account.$deferred.resolve(account);
            scope.$digest();
            expect(el.text()).to.contain('Suspended');
        });

        it('should populate the account access policy: Terminated', function () {
            account.accessPolicy = 'Terminated';
            account.$deferred.resolve(account);
            scope.$digest();
            expect(el.text()).to.contain('Terminated');
        });

        it('should populate the account collection status: CURRENT', function () {
            account.$deferred.resolve(account);
            scope.$digest();
            expect(el.text()).to.contain('CURRENT');
        });

        it('should set an empty status class for an Active account', function () {
            account.$deferred.resolve(account);
            scope.$digest();
            expect(el.isolateScope().statusClass).to.equal('');
        });

        it('should set the warning class for Deliquent', function () {
            account.status = 'Delinquent';
            account.$deferred.resolve(account);
            scope.$digest();
            expect(el.isolateScope().statusClass).to.equal('msg-warn');
        });

        it('should set the info class for Pending Approval', function () {
            account.status = 'Pending Approval';
            account.$deferred.resolve(account);
            scope.$digest();
            expect(el.isolateScope().statusClass).to.equal('msg-info');
        });

        it('should not show Current User by default', function () {
            expect(el.text()).to.not.contain('Current User');
        });

        it('should show Current User when in Cloud', function () {
            encoreRoutesMock.setMock(true);
            el = helpers.createDirective(validTemplate, compile, scope);
            expect(el.text()).to.contain('Current User');
        });

        it('should populate the badges', function () {
            badges.$deferred.resolve(badges);
            scope.$digest();
            expect(el.find('img').attr('src'), 'badge image source').to.equal('http://foo.com/bar.jpg');
            expect(el.find('img').attr('data-name'), 'badge tooltip name').to.equal('Plain Badge');
            expect(el.find('img').attr('data-description'), 'badge tooltip description').to.equal('A badge!');
        });

        it('should display an error notification when it cannot load badges', function () {
            badges.$deferred.reject();
            scope.$digest();
            expect(rxnotify.stacks[defaultStack][0].text).to.equal('Error retrieving badges for this account');
        });

        it('should not populate the team badges if no team-id was specified', function () {
            expect(_.keys(teamBadges)).to.not.contain('$deferred');
        });

        it('should display an error notification when it cannot load account name', function () {
            account.$deferred.reject();
            scope.$digest();
            expect(rxnotify.stacks[defaultStack][0].text).to.equal('Error retrieving account name');
        });

        describe('with Team Badges', function () {
            beforeEach(function () {
                validTemplate = '<rx-account-info account-number="123" team-id="321"></rx-account-info>';

                el = helpers.createDirective(validTemplate, compile, scope);
            });

            it('should populate the team badges', function () {
                teamBadges.$deferred.resolve(teamBadges);
                scope.$digest();
                expect(el.find('img').attr('src'), 'badge image source').to.equal('http://goo.gl/xj1ivh');
                expect(el.find('img').attr('data-name'), 'badge name').to.equal('A-Team Badge');
                expect(el.find('img').attr('data-description'), 'badge description').to.equal('A team badge!');
            });

            it('should display an error notification when it cannot load badges', function () {
                teamBadges.$deferred.reject();
                scope.$digest();
                expect(rxnotify.stacks[defaultStack][0].text).to.equal('Error retrieving badges for this team');
            });
        });
    });
});
