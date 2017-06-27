describe('utilities:rxAppRoutes', function () {
    var appRoutes, envSvc, generatedRoutes, location, rootScope, log;

    var fakeRoutes = [
        {
            href: { tld: 'example', path: 'myPath' },
            key: 'root',
            children: [
                {
                    href: '/{{user}}/1-1',
                    key: 'firstChild',
                    children: [
                        {
                            linkText: '1st-1st-1st',
                            key: 'firstChildChild',
                        }
                    ]
                }, {
                    href: '/1-2',
                    key: 'secondChild',
                }
            ]
        }, {
            href: '/base/path'
        }
    ];

    // mock out route to have param which will replace '{{user}}'
    var route = {
        current: {
            pathParams: {
                user: 'me'
            }
        }
    };

    var duplicateKeyRoutes = [
        {
            href: '/r/BrokenGifs',
            key: 'dupeKey'
        }, {
            href: '/r/wheredidthesodago',
            key: 'nonDupeKey',
            children: [
                {
                    href: '/r/funny',
                    key: 'dupeKey'
                }, {
                    href: '/r/noKey'
                }
            ]
        }, {
            href: '/r/rogecoin',
            key: 'suchDupes'
        }
    ];

    beforeEach(function (done) {
        // load module
        module('encore.ui.utilities');

        // Provide any mocks needed
        module(function ($provide) {
            $provide.value('$route', route);
        });

        // Inject in angular constructs
        inject(function (rxAppRoutes, rxEnvironment, $location, $rootScope, $log) {
            appRoutes = new rxAppRoutes();
            envSvc = rxEnvironment;
            location = $location;
            rootScope = $rootScope;
            log = $log;
        });

        // set environment to build from
        sinon.stub(envSvc, 'get').returns({
            name: 'staging',
            pattern: /\/\/staging\.(?:.*\.)?com/,
            url: '{{tld}}/{{path}}'
        });

        appRoutes.getAll().then(function (routes) {
            generatedRoutes = routes;

            done();
        });

        appRoutes.setAll(fakeRoutes);

        // we have to digest to let all the promises resolve
        rootScope.$digest();
    });

    afterEach(function () {
        log.reset();
    });

    describe('urls and links', function () {
        it('should build url property from rxEnvironmentUrl', function () {
            // first item should have generated URL based on staging href
            expect(generatedRoutes[0].url).to.equal('example/myPath');

            // child item should have default href, since it's just a string
            expect(generatedRoutes[0].children[1].url).to.equal(fakeRoutes[0].children[1].href);
        });

        it('should build urls from route path params', function () {
            // child item should have 'me' in place of '{{user}}'
            expect(generatedRoutes[0].children[0].url).to.equal('/me/1-1');
        });

        it('should ignore links that are not defined', function () {
            expect(generatedRoutes[0].children[0].children[0].url).to.be.undefined;
        });
    });

    describe('active state', function () {
        it('should match based on URL', function () {
            expect(generatedRoutes[0].active, 'route should not be active by default').to.be.false;

            // update location
            location.path(generatedRoutes[0].url);
            rootScope.$apply();

            // sanity check that location actually changed
            expect(location.path()).to.equal('/' + generatedRoutes[0].url);

            expect(generatedRoutes[0].active, 'route should be active when path changes').to.be.true;

            // update location again to somewhere else
            location.path('somewhereElse');
            rootScope.$apply();

            expect(generatedRoutes[0].active, 'route should no longer be active').to.be.false;
        });

        it('should match with a base HTML tag', function (done) {
            var routeParts = fakeRoutes[1].href.split('/');
            var basePath = routeParts[1];
            var subPath = routeParts[2];

            // add a base tag to the page
            $(document.head).append($('<base href="/' + basePath + '/">'));

            // we have to mock out location.path because Angular doesn't pick up on the basePath update
            location.path(generatedRoutes[1].url);

            sinon.stub(location, 'path').returns('/' + subPath);

            rootScope.$apply();

            appRoutes.getAll().then(function (routes) {
                expect(routes[1].active, 'route should be active').to.be.true;

                done();
            });

            rootScope.$apply();

            location.path.restore();
            // restore test state
            $('base').remove();
        });

        it('should match if child element is active', function () {
            expect(generatedRoutes[0].active, 'route should not be active by default').to.be.false;

            // update location
            location.path(generatedRoutes[0].children[0].url);
            rootScope.$apply();

            expect(generatedRoutes[0].active, 'route should be active when child activated').to.be.true;

            // update location again to somewhere else
            location.path('somewhereElse');
            rootScope.$apply();

            expect(generatedRoutes[0].active, 'route should no longer be active').to.be.false;
        });

        it('should match when we navigate to subpaths of a child', function () {
            expect(generatedRoutes[0].active, 'route should not be active by default').to.be.false;

            // update location
            location.path(generatedRoutes[0].children[0].url + '/some/details/view/');
            rootScope.$apply();

            expect(generatedRoutes[0].active, 'route should be active when child activated').to.be.true;

            // update location again to somewhere else
            location.path('somewhereElse');
            rootScope.$apply();

            expect(generatedRoutes[0].active, 'route should no longer be active').to.be.false;
        });
    });

    it('should allow overwritting all the nav items', function () {
        var newRoutes = [{
            href: '/r/BrokenGifs'
        }];

        appRoutes.setAll(newRoutes);

        appRoutes.getAll().then(function (routes) {
            expect(routes[0].url).to.equal(newRoutes[0].href);
        });
    });

    it('should allow getting route index by key', function () {
        var rootRouteIndex = appRoutes.getIndexByKey('root');
        expect(rootRouteIndex, 'root round index').to.eventually.eql([0]);

        return rootRouteIndex.then(function (index) {
            expect(generatedRoutes[index[0]].url).to.equal('example/myPath');
        });
    });

    it('should allow getting firstChild nested route index by key', function () {
        var firstChild = appRoutes.getIndexByKey('firstChild');
        return expect(firstChild, 'child route index').to.eventually.eql([0, 0]);
    });

    it('should allow getting firstChildChild nested route index by key', function () {
        var firstChildChild = appRoutes.getIndexByKey('firstChildChild');
        return expect(firstChildChild, 'child child route index').to.eventually.eql([0, 0, 0]);
    });

    it('should allow getting secondChild nested route index by key', function () {
        var secondChild = appRoutes.getIndexByKey('secondChild');
        return expect(secondChild, 'child route index').to.eventually.eql([0, 1]);
    });

    it('should not warn if no duplicate keys found', function () {
        appRoutes.setAll(duplicateKeyRoutes);

        // shouldn't warn when searching non-dupe keys
        return appRoutes.getIndexByKey('nonDupeKey').then(function () {
            expect(log.warn.logs.length).to.equal(0);
        });
    });

    it('should warn if duplicate keys found', function () {
        appRoutes.setAll(duplicateKeyRoutes);

        // find index w/duplicate key
        var index = appRoutes.getIndexByKey('dupeKey');

        // should return last match

        // should log a message about duplicate keys
        return index.then(function () {
            expect(index).to.eventually.eql([1, 0]);
            expect(log.warn.logs.length).to.equal(1);
        });
    });

    describe('getRouteByKey', function () {
        it('should return the correct route for firstChildChild', function () {
            appRoutes.getRouteByKey('firstChild').then(function (childRoute) {
                expect(childRoute.key).to.equal(fakeRoutes[0].children[0].key);
            });
            rootScope.$digest();
        });

        it('should reject when it cannot find the key', function () {
            appRoutes.getRouteByKey('noSuchKey').then(function () {
                expect(1, 'if you see this it means that noSuchKey did not reject').to.equal(2);
            }, function () {
                expect(1).to.equal(1);
            });
            rootScope.$digest();
        });
    });

    describe('isActiveByKey', function () {
        it('should be inactive on the root key', function () {
            appRoutes.isActiveByKey('root').then(function (active) {
                expect(active).to.be.false;
            });
            rootScope.$digest();
        });

        it('should be active on the root key after navigating to root', function () {
            appRoutes.getRouteByKey('root').then(function (rootRoute) {
                location.path(rootRoute.url);
            });
            rootScope.$apply();
            appRoutes.isActiveByKey('root').then(function (active) {
                expect(active).to.be.true;
            });
            rootScope.$digest();
        });

        it('should have an active parent route when navigating to a child route', function () {
            appRoutes.getRouteByKey('firstChild').then(function (childRoute) {
                location.path(childRoute.url);
            });
            rootScope.$apply();
            appRoutes.isActiveByKey('root').then(function (active) {
                expect(active).to.be.true;
            });
            rootScope.$digest();
        });
    });

    describe('setRouteByKey', function () {
        it('should allow updating a nav item by key', function (done) {
            var newRouteData = {
                href: { tld: 'example', path: 'myOtherPath' }
            };

            // try updating the root element
            appRoutes.setRouteByKey('root', newRouteData).then(function () {
                appRoutes.getAll().then(function (routes) {
                    // get the root route
                    var root = routes[0];

                    // check that it was updated
                    expect(root.href).to.equal(newRouteData.href);
                    expect(root.url).to.equal('example/myOtherPath');

                    // check the first child wasn't modified
                    expect(root.children[0].href).to.equal('/{{user}}/1-1');
                    expect(root.children[0].url).to.equal('/me/1-1');

                    done();
                });
            });

            rootScope.$digest();
        });

        it('should allow updating a child item by key', function (done) {
            // try updating a child item
            var updatedFirstChild = {
                href: 'anotherRoute'
            };

            appRoutes.setRouteByKey('firstChild', updatedFirstChild).then(function () {
                appRoutes.getAll().then(function (routes) {
                    var root = routes[0];

                    // check that parent wasn't modified
                    expect(root.href).to.eql(fakeRoutes[0].href);
                    expect(root.url).to.equal('example/myPath');

                    var firstChild = root.children[0];
                    // check that the first child was updated
                    expect(firstChild.href).to.eql(updatedFirstChild.href);
                    expect(firstChild.url).to.equal(updatedFirstChild.href);

                    // check that the first child's children are still around
                    var originalNestedChild = fakeRoutes[0].children[0].children[0];
                    expect(firstChild.children[0].linkText).to.equal(originalNestedChild.linkText);

                    done();
                });
            });

            rootScope.$digest();
        });

        it('should allow updating the children property', function (done) {
            // try adding children to an item
            var updatedSecondChild = {
                href: 'someOtherRoute',
                children: [
                    {
                        href: 'yetAnotherRoute'
                    }
                ]
            };

            appRoutes.setRouteByKey('secondChild', updatedSecondChild).then(function () {
                appRoutes.getAll().then(function (routes) {
                    // check that the second child was updated
                    expect(routes[0].children[1].href).to.equal(updatedSecondChild.href);

                    // check that the second child now has children
                    var newChild = routes[0].children[1].children[0];
                    expect(newChild.href).to.equal(updatedSecondChild.children[0].href);
                    expect(newChild.url).to.equal(updatedSecondChild.children[0].href);

                    done();
                });
            });

            rootScope.$digest();
        });
    });
});
