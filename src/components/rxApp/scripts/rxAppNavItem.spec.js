describe('encore.ui.rxApp', function () {
    describe('rxAppNavItem', function () {
        var scope, compile, el, someProp, rxVisibility, rxEnvironmentUrlFilter, provide;
        var template = '<rx-app-nav-item item="item"></rx-app-nav-item>';

        var menuItem = {
            href: { tld: 'example', path: 'myPath' },
            url: 'someapp.com',
            linkText: '1st',
            directive: 'fake-directive',
            visibility: function () {
                return true;
            },
            childHeader: 'some value',
            children: [
                {
                    href: '/1-1',
                    linkText: '1st-1st',
                    childVisibility: [ 'falseChildVisibilty' ],
                    children: [
                        {
                            href: '/1-1-1',
                            linkText: '1st-1st-1st'
                        }
                    ]
                }, {
                    href: '/1-2',
                    visibility: '2 + 2 == 4',
                    linkText: '1st-2nd'
                }, {
                    linkText: '1st-3rd',
                    visibility: function () {
                        return someProp;
                    },
                    children: [
                        {
                            href: '/1-3-1',
                            linkText: '1st-3rd-1st'
                        }
                    ]
                }, {
                    linkText: '1st-4th',
                    visibility: [ 'somePropMethod', { arg1: 'arg1', arg2: 'arg2' } ],
                    children: [
                        {
                            href: '/1-4-1',
                            linkText: '1st-4th-1st'
                        }
                    ]
                }, {
                    linkText: 'visibilityAndRole',
                    visibility: function () {
                        return true;
                    },
                    roles: { 'any': ['role1'] }
                }, {
                    linkText: 'noVisibilityButRolePresent',
                    roles: { 'any': ['role1'] }
                }, {
                    linkText: 'visibilityOkButRoleFails',
                    roles: { 'any': ['weDontHaveThisRole'] }
                }, {
                    linkText: 'multipleAllRolesPass',
                    roles: { 'all': ['role1', 'role2', 'Test'] }
                }, {
                    linkText: 'multipleAllRolesFailure',
                    roles: { 'all': ['role1', 'role2', 'ThisRoleDoesNotExist'] }
                }, {
                    linkText: 'failedVisibilityAndOKRoles',
                    visibility: function () {
                        return false;
                    },
                    roles: { 'any': ['role1'] }
                }
            ]
        };

        var setURLProperties = function (routes) {
            _.each(routes, function (route) {
                // build out url for current route
                route.url = rxEnvironmentUrlFilter(route.href);

                // check if any children exist, if so, build their URLs as well
                if (route.children) {
                    route.children = setURLProperties(route.children);
                }
            });
            return routes;
        };

        beforeEach(function () {
            // load module
            var mockToken = {
                access: {
                    token: {
                        id: 'someid',
                    },
                    user: {
                        id: 'joe.customer',
                        'roles': [{ 'id': '9','name': 'role1' },
                                  { 'id': '10','name': 'role2' },
                                  { 'id': '11','name': 'Test' }]
                    }
                }
            };

            module('encore.ui.rxApp');
            // load templates
            module('templates/rxAppNav.html');
            module('templates/rxAppNavItem.html');

            module(function ($provide) {
                provide = $provide;
            });

            // Inject in angular constructs
            inject(function ($rootScope, $compile, _rxVisibility_, _rxEnvironmentUrlFilter_, rxAuth) {
                scope = $rootScope.$new();
                compile = $compile;
                rxVisibility = _rxVisibility_;
                rxEnvironmentUrlFilter = _rxEnvironmentUrlFilter_;
                rxAuth.getToken = function () {
                    return mockToken;
                };
            });

            rxVisibility.addMethod(
                'somePropMethod',
                function (scope, locals) {
                    /* should return false */
                    return locals.arg1 === locals.arg2;
                }
            );

            rxVisibility.addMethod(
                'falseChildVisibilty',
                function () { return false; }
            );

            scope.item = _.cloneDeep(menuItem);

            el = helpers.createDirective(template, compile, scope);
        });

        afterEach(function () {
            el = null;
            scope = null;
        });

        it('should exist', function () {
            expect(el).to.have.length.of.at.least(1);
            expect(el.children()).to.have.length.of.at.least(2);
        });

        it('should hide if visibility property evaluates to false', function () {
            // check that first item is visible (since no 'visibility' property)
            expect(el.className).to.not.contain('ng-hide');

            // NOTE: this retreives *all* the child nav items, including the sub-child ones
            // This is why indexing is a little off
            var children = el[0].querySelectorAll('.item-children .rx-app-nav-item');

            // check that first level 2 item is visible (since 'visibility' function returns true)
            expect(children[0].className, 'first child, function').to.not.contain('ng-hide');

            // check that second level 2 item is visible (since 'visibility' expression == true)
            expect(children[2].className, 'middle child, expression').to.not.contain('ng-hide');

            // check that third level 2 item is not visible (since 'visibility' function currently returns false)
            expect(children[3].className, 'third child').to.contain('ng-hide');

            // check that third level 2 item is not visible (since 'somePropMethod' function currently returns false)
            expect(children[5].className, 'fourth child, linkText: 1st-4th').to.contain('ng-hide');

            // we need to set the property that the visibility function is checking to true
            someProp = true;
            scope.$digest();

            // now that visibility = true, el should not be hidden
            expect(children[3].className, 'last child, after someProp = true').to.not.contain('ng-hide');
        });

        it('should show/hide children based on childVisibility value', function () {
            // get children element
            var children = el[0].querySelectorAll('.item-children');

            expect(children[0].className, 'All Children').to.not.contain('ng-hide');
            expect(children[1].className, '1st Subnav Children').to.contain('ng-hide');
        });

        it('should build directive if available', function () {
            // get directive
            var directive = el[0].querySelector('.item-directive');

            expect(directive).to.exist;
            expect(directive.className).to.not.contain('.ng-hide');

            // sanity check that it correctly built directive HTML
            expect(directive.innerHTML).to.contain('<' + menuItem.directive);
            expect(directive.innerHTML).to.contain('</' + menuItem.directive + '>');
        });

        it('should increment the child nav level', function () {
            // get children element
            var children = el[0].querySelector('.item-children .rx-app-nav');
            children = angular.element(children);
            expect(children.hasClass('rx-app-nav-level-2')).to.be.true;
        });

        it('should show header for children if present', function () {
            // get child header element
            var childHeader = el[0].querySelector('.child-header');

            expect(childHeader.textContent).to.equal(menuItem.childHeader);
        });

        describe('Roles visibility', function () {
            it('should show when _all_ roles are present', function () {
                var item = el.find('a:contains("multipleAllRolesPass")').parent();
                expect(item.hasClass('ng-hide')).to.be.false;
            });

            it('should show if visibility and roles criteria are both true', function () {
                var item = el.find('a:contains("visibilityAndRole")').parent();
                expect(item.hasClass('ng-hide')).to.be.false;
            });

            it('should show if there is no visibility criteria but roles are present and true', function () {
                var item = el.find('a:contains("noVisibilityButRolePresent")').parent();
                expect(item.hasClass('ng-hide')).to.be.false;
            });

            it('should not show if visibility is true but role check fails', function () {
                var item = el.find('a:contains("visibilityOkButRoleFails")').parent();
                expect(item.hasClass('ng-hide')).to.be.true;
            });

            it('should not show if visibility check fails but role check passes', function () {
                var item = el.find('a:contains("failedVisibilityAndOKRoles")').parent();
                expect(item.hasClass('ng-hide')).to.be.true;
            });

            it('should not when when not all roles are present', function () {
                var item = el.find('a:contains("multipleAllRolesFailure")').parent();
                expect(item.hasClass('ng-hide')).to.be.true;
            });
        });

        describe('Link href prefix', function () {
            var children;
            beforeEach(function () {
                provide.value('NAV_ITEM_PREFIX', 'http://nothing');
                // Set URL properties
                setURLProperties([scope.item]);

                el = helpers.createDirective(template, compile, scope);

                // NOTE: this retreives *all* the child nav items, including the sub-child ones
                // This is why indexing is a little off
                children = el[0].querySelectorAll('.item-children .rx-app-nav-item');
            });

            it('should prefix the href of a nav item', function () {
                // check that second level 2 item has an href that includes http://nothing the item is '1st-2nd'
                var item = angular.element(children[2].querySelector('a'));
                expect(item.attr('href')).to.contain('http://nothing');
            });

            it('should not add a prefix to items without an href', function () {
                var item = angular.element(children[3].querySelector('a'))
                expect(item.attr('href')).to.not.contain('http://nothing');
                expect(item.attr('href')).to.be.empty;
            });
        });

        describe('Link target', function () {
            it('should define a target for the href', function () {
                provide.value('NAV_ITEM_TARGET', 'some-other-target');

                el = helpers.createDirective(template, compile, scope);

                var item = angular.element(el[0].querySelector('a'));
                expect(item.attr('target')).to.equal('some-other-target');
            });

            it('should use the default target when one is not defined', function () {
                el = helpers.createDirective(template, compile, scope);

                var item = angular.element(el[0].querySelector('a'));
                expect(item.attr('target')).to.equal('');
            });
        });

        describe('Origin Navigation', function () {
            var navigateToAppSpy;
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
                el = helpers.createDirective(template, compile, scope);
                navigateToAppSpy = sinon.spy(el.isolateScope(), 'navigateToApp');
            });

            afterEach(function () {
                navigateToAppSpy.restore();
                setCanvasURLSpy.restore();
            });

            it('should call navigateToApp on click', function () {
                el.find('.item-link').click();
                expect(navigateToAppSpy).to.have.been.called;
            });

            it('should not call setCanvasURL when urls are the same', function () {
                el.find('.item-link').click();
                expect(setCanvasURLSpy).to.have.not.been.called;
            });

            it('should call setCanvasURL when urls are different', function () {
                currentCanvasURL = 'someotherapp.com';
                el.find('.item-link').click();
                expect(setCanvasURLSpy).to.have.been.called;
                expect(setCanvasURLSpy).to.have.been.calledWith('someapp.com');
            });
        })
    });
});
