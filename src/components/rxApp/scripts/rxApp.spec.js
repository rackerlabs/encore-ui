describe('encore.ui.rxApp', function () {

    beforeEach(function () {
        module('templates/rxFeedback.html');
        module('templates/rxModalAction.html');
    });

    describe('rxApp', function () {
        describe('default', function () {
            var scope, scopeCustomNav, collapsibleScope, compile, rootScope, el, elCustom, elCollapsible,
                httpMock, cdnPath, cdnGet, rxAuth;
            var standardTemplate = '<rx-app></rx-app>';
            var collapsibleTemplate = '<rx-app collapsible-nav="true"></rx-app>';
            var customTemplate = '<rx-app site-title="My App" menu="customNav" new-instance="true"' +
                'hide-feedback="true"></rx-app>';

            // Fake default nav that gets passed as the mock cdn response
            var defaultNav = [{
                title: 'All Tools',
                children: [
                    {
                        'href': '/support',
                        'linkText': 'Support Service',
                        'key': 'supportService',
                        'directive': 'rx-support-service-search'
                    }
                ]
            }];

            var customNav = [{
                title: 'Example Menu',
                children: [
                    {
                        href: '/1',
                        linkText: '1st Order Item'
                    }
                ]
            }];

            var mockNotify = {
                add: sinon.stub()
            };

            beforeEach(function () {
                // load module
                module('encore.ui.rxApp');
                module('encore.ui.utilities');
                module('encore.ui.elements');

                // load templates
                module('templates/rxApp.html');
                module('templates/rxAppNav.html');
                module('templates/rxAppNavItem.html');
                module('templates/rxPage.html');
                module('templates/rxAppSearch.html');
                module('templates/rxAccountSearch.html');

                module(function ($provide) {
                    $provide.value('rxNotify', mockNotify);
                });

                // Inject in angular constructs
                inject(function ($rootScope, $compile, encoreRoutes, $httpBackend, routesCdnPath, rxLocalStorage, 
                _rxAuth_) {
                    rootScope = $rootScope;
                    compile = $compile;
                    httpMock = $httpBackend;
                    cdnPath = routesCdnPath;
                    rxAuth = _rxAuth_;
                    rxAuth.getUserId = sinon.stub().returns('rack0000');

                    rxLocalStorage.clear();
                });

                cdnGet = httpMock.whenGET(cdnPath.staging);
                cdnGet.respond(defaultNav);

                scope = rootScope.$new();

                collapsibleScope = rootScope.$new();
                collapsibleScope.collapsed = false;

                scopeCustomNav = rootScope.$new();
                scopeCustomNav.customNav = customNav;

                el = helpers.createDirective(standardTemplate, compile, scope);
                elCustom = helpers.createDirective(customTemplate, compile, scopeCustomNav);
                elCollapsible = helpers.createDirective(collapsibleTemplate, compile, collapsibleScope);
            });

            describe('default menu', function () {
                it('should have a default title', function () {
                    // get page title element
                    var pageTitle = el[0].querySelector('.site-title');

                    // validate it matches 'Encore'
                    expect($(pageTitle).text()).to.equal('Encore');
                });

                it('should load data from the CDN', function () {
                    // get the nav data from the mock CDN
                    httpMock.flush();

                    // get first nav section
                    var navTitle = el[0].querySelector('.nav-section-title');

                    // validate it matches 'Encore'
                    expect($(navTitle).text()).to.equal(defaultNav[0].title);
                });

                it('should show error message if CDN failed to load', function () {
                    // make CDN request fail.
                    cdnGet.respond(404);

                    // get the nav data from the mock CDN
                    httpMock.flush();

                    // expect rxNotify to be called with error
                    expect(mockNotify.add).to.be.calledWith(sinon.match('Error'), sinon.match({ type: 'error' }));
                });

                it('should have a feedback link if not disabled', function () {
                    var feedbackLink = el[0].querySelector('rx-feedback');

                    // validate it matches 'Encore'
                    expect(feedbackLink).to.exist;

                    var notFeedbackLink = elCustom[0].querySelector('rx-feedback');

                    expect(notFeedbackLink).to.not.exist;
                });

                it('should not show the collapsible toggle if collapsible is not true', function () {
                    var collapsibleToggle = el[0].querySelector('.collapsible-toggle');

                    expect(collapsibleToggle).to.be.null;
                });

                it('should allow you to set the menu as collapsible', function () {
                    var collapsibleToggle = elCollapsible[0].querySelector('.collapsible-toggle');

                    expect(collapsibleToggle).to.be.ok;
                });

                it('should apply the classes to the menu for collapsible status', function () {
                    var collapsibleMenu = elCollapsible[0].querySelector('.collapsible');

                    expect(collapsibleMenu).to.be.not.null;
                });

                it('should apply the classes to the menu for collapsed status', function () {
                    var elScope = elCollapsible.isolateScope();
                    var collapsibleMenu = elCollapsible[0].querySelector('.collapsed');

                    expect(collapsibleMenu).to.be.null;
                    elScope.collapsedNav = true;

                    // We need to run the digest to update the classes
                    collapsibleScope.$digest();
                    collapsibleMenu = elCollapsible[0].querySelector('.collapsed');
                    expect(collapsibleMenu).to.be.not.null;
                });

                it('should not have a custom URL', function () {
                    expect(cdnPath.hasCustomURL).to.be.false;
                });

                it('should not set isWarning', function () {
                    expect(el.isolateScope().isWarning).to.be.false;
                });

                it('should set the user name from the session', function () {
                    expect(rxAuth.getUserId).to.have.been.called;
                    expect(el.isolateScope().userId).to.equal('rack0000');
                });
            });

            describe('custom menu', function () {
                it('should allow you to override the default title', function () {
                    // get page title element
                    var pageTitle = elCustom[0].querySelector('.site-title');

                    // validate it matches custom app name
                    expect(pageTitle.textContent).to.equal('My App');
                });

                it('should allow you to override the default nav', function () {
                    // get first nav section
                    var navTitle = elCustom[0].querySelector('.nav-section-title');

                    // validate it matches custom nav title
                    expect(navTitle.textContent).to.equal(customNav[0].title);
                });
            });
        });

        describe('nav environment detection', function () {
            var mockEnvironment = {
                isPreProd: function () { return false; },
                isUnifiedProd: function () { return false; }
            };

            var mockCdnPath = {
                staging: 'staging',
                preprod: 'preprod',
                production: 'production',
                hasCustomURL: false
            };

            var mockLocalStorage = {
                getObject: sinon.stub()
            };

            var testEnvironment = function (url, suffix) {
                inject(function ($httpBackend, encoreRoutes) {
                    encoreRoutes.fetchRoutes();
                    expect(mockLocalStorage.getObject).to.have.been.calledWith('encoreRoutes-' + suffix);
                    $httpBackend.expectGET(url).respond(500);
                    $httpBackend.verifyNoOutstandingExpectation();
                });
            };

            beforeEach(function () {
                module('encore.ui.rxApp');
                module('encore.ui.utilities');
                module('encore.ui.elements');
                module(function ($provide) {
                    $provide.value('rxEnvironment', mockEnvironment);
                    $provide.value('routesCdnPath', mockCdnPath);
                    $provide.value('rxLocalStorage', mockLocalStorage);
                });

                mockLocalStorage.getObject.reset();
            });

            // These tests are organized in reverse priority order.
            // Since the mocks are not reset on each run, changing their behavior
            // in one test will propagate to the following ones.  That way, the
            // priority of the environments can be tested as well as their results.
            it('recognizes the staging environemnt', function () {
                testEnvironment(mockCdnPath.staging, 'staging');
            });

            it('recognizes a custom url', function () {
                mockCdnPath.hasCustomURL = true;
                testEnvironment(mockCdnPath.staging, 'custom');
            });

            it('recognizes the preprod environment', function () {
                mockEnvironment.isPreProd = function () { return true; };
                testEnvironment(mockCdnPath.preprod, 'preprod');
            });

            it('recognizes the prod environment', function () {
                mockEnvironment.isUnifiedProd = function () { return true; };
                testEnvironment(mockCdnPath.production, 'prod');
            });
        });

        describe('nav caching', function () {
            var scope, compile, rootScope, el, appRoutes, httpMock,
                cdnPath, cdnGet, rxLocalStorage, createDirective;
            var standardTemplate = '<rx-app></rx-app>';

            var mockNotify = {
                add: sinon.stub()
            };

            var defaultNav = [{
                title: 'All Tools',
                children: [
                    {
                        'href': '/app',
                        'linkText': 'App',
                    }
                ]
            }];

            beforeEach(function () {
                // load module
                module('encore.ui.rxApp');
                module('encore.ui.utilities');

                // load templates
                module('templates/rxApp.html');
                module('templates/rxAppNav.html');
                module('templates/rxAppNavItem.html');

                module(function ($provide) {
                    $provide.value('rxNotify', mockNotify);
                });

                // Inject in angular constructs
                inject(function ($rootScope, $compile, encoreRoutes, $httpBackend, routesCdnPath, _rxLocalStorage_) {
                    rootScope = $rootScope;
                    compile = $compile;
                    appRoutes = encoreRoutes;
                    httpMock = $httpBackend;
                    cdnPath = routesCdnPath;
                    rxLocalStorage = _rxLocalStorage_;
                });

                cdnGet = httpMock.whenGET(cdnPath.staging);
                cdnGet.respond(defaultNav);

                rxLocalStorage.clear();
                sinon.spy(appRoutes, 'setAll');

                scope = rootScope.$new();

                createDirective = function () {
                    el = helpers.createDirective(standardTemplate, compile, scope);
                };
            });

            afterEach(function () {
                rxLocalStorage.clear();
            });

            it('should load the cached menu from the local storage', function () {
                rxLocalStorage.setObject('encoreRoutes-staging', defaultNav);
                createDirective();
                var navTitle = el[0].querySelector('.nav-section-title');
                expect($(navTitle).text()).to.equal(defaultNav[0].title);
            });

            it('should cache the CDN-loaded menu', function () {
                createDirective();
                httpMock.flush();
                expect(rxLocalStorage.getObject('encoreRoutes-staging')).to.eql(defaultNav);
            });

            describe('when the CDN request fails', function () {

                beforeEach(function () {
                    cdnGet.respond(404);
                });

                it('should fall back to the cached menu if available', function () {
                    rxLocalStorage.setObject('encoreRoutes-staging', defaultNav);
                    createDirective();

                    // Nav content is written before the request responds
                    var navTitle = el[0].querySelector('.nav-section-title');
                    expect($(navTitle).text()).to.equal(defaultNav[0].title);

                    httpMock.flush();
                    expect(mockNotify.add).to.have.been
                        .calledWith(sinon.match('cached version'), { type: 'warning' });
                    expect(appRoutes.setAll).to.have.been.calledOnce;

                    // angular.copy() used to remove $$hashKey for matching
                    var routes = appRoutes.setAll.firstCall.args[0];
                    expect(angular.copy(routes)).to.eql(defaultNav);
                });

                it('should show error message if nothing is cached', function () {
                    createDirective();
                    httpMock.flush();

                    expect(mockNotify.add).to.have.been
                        .calledWith(sinon.match('Error'), { type: 'error' });
                    expect(appRoutes.setAll).to.not.have.been.called;
                });

            });
        });

        describe('customURL', function () {
            var scope, isolateScope, compile, rootScope, el, httpMock, cdnGet, cdnPath;
            var standardTemplate = '<rx-app></rx-app>';

            var localNav = [{
                title: 'Local Nav',
                children: [
                    {
                        'href': '/local',
                        'linkText': 'Local Nav test',
                        'key': 'localNav',
                        'directive': 'localNav'
                    }
                ]
            }];

            beforeEach(function () {

                var customURL = 'foo.json';

                // load module
                module('encore.ui.utilities');
                module('encore.ui.elements');

                // load templates
                module('templates/rxApp.html');
                module('templates/rxAppNav.html');
                module('templates/rxAppNavItem.html');

                // Initialize a fake module to get at its config block
                // This is the main purpose of this whole `describe` block,
                // to test that this can be set in a `.config` and will be used
                // when running against local/staging
                angular.module('testApp', function () {})
                    .config(function (routesCdnPathProvider) {
                        routesCdnPathProvider.customURL = customURL;
                    });
                module('encore.ui.rxApp', 'testApp');

                // Inject in angular constructs
                inject(function ($rootScope, $compile, encoreRoutes, $httpBackend, routesCdnPath) {
                    rootScope = $rootScope;
                    compile = $compile;
                    httpMock = $httpBackend;
                    cdnPath = routesCdnPath;
                });

                cdnGet = httpMock.whenGET(customURL);
                cdnGet.respond(localNav);

                scope = rootScope.$new();

                el = helpers.createDirective(standardTemplate, compile, scope);

                // Because we want to test things on the scope that were defined
                // outside of the scope: {} object, we need to use the isolateScope
                // function
                isolateScope = el.isolateScope();
            });

            it('should load data from customURL', function () {
                // get the nav data from the URL pointed to by .customURL
                httpMock.flush();

                // get first nav section
                var navTitle = el[0].querySelector('.nav-section-title');

                // validate it matches 'Local Nav'
                expect($(navTitle).text()).to.equal(localNav[0].title);
            });

            it('hasCustomURL should be set to true', function () {
                expect(cdnPath.hasCustomURL).to.be.true;
            });

            it('should have set isWarning on the scope', function () {
                expect(isolateScope.isWarning).to.be.true;
            });

            it('should set the local nav file warning message', function () {
                expect(isolateScope.warningMessage).to.contain('You are using a local nav file');
            });
        });

        describe('preprod environment', function () {
            var scope, compile, rootScope, el,
                httpMock, cdnPath, cdnGet, isolateScope;
            var standardTemplate = '<rx-app></rx-app>';

            // Fake default nav that gets passed as the mock cdn response
            var defaultNav = [{
                title: 'All Tools',
                children: [
                    {
                        'href': '/support',
                        'linkText': 'Support Service',
                        'key': 'supportService',
                        'directive': 'rx-support-service-search'
                    }
                ]
            }];

            var mockEnvironment = {
                isPreProd: function () { return true; },
                isLocal: function () { return false; },
                isUnifiedProd: function () { return false; }
            };

            beforeEach(function () {
                // load module
                module('encore.ui.rxApp');
                module('encore.ui.utilities');
                module('encore.ui.elements');

                // load templates
                module('templates/rxApp.html');
                module('templates/rxAppNav.html');
                module('templates/rxAppNavItem.html');

                module(function ($provide) {
                    $provide.constant('rxEnvironment', mockEnvironment);
                });

                // Inject in angular constructs
                inject(function ($rootScope, $compile, encoreRoutes, $httpBackend, routesCdnPath) {
                    rootScope = $rootScope;
                    compile = $compile;
                    httpMock = $httpBackend;
                    cdnPath = routesCdnPath;
                });

                cdnGet = httpMock.whenGET(cdnPath.preprod);
                cdnGet.respond(defaultNav);

                scope = rootScope.$new();

                el = helpers.createDirective(standardTemplate, compile, scope);
                isolateScope = el.isolateScope();
            });

            it('hasCustomURL should be set to false', function () {
                expect(cdnPath.hasCustomURL).to.be.false;
            });

            it('should have set isPreProd on the scope', function () {
                expect(isolateScope.isPreProd).to.be.true;
            });

            it('should have set isWarning on the scope', function () {
                expect(isolateScope.isWarning).to.be.true;
            });

            it('should set the preprod warning message', function () {
                expect(isolateScope.warningMessage)
                    .to.contain('You are using a pre-production environment that has real, live production data!');
            });
        });

        describe('updateRoutes', function () {
            var encoreRoutes, encoreRoutesSpy, rootScope,
                compile, httpMock, encoreRoutes, cdnGet, scope;

            var standardTemplate = '<rx-app></rx-app>';

            var localNav = [{
                title: 'Local Nav',
                children: [
                    {
                        'href': '/local',
                        'linkText': 'Local Nav test',
                        'key': 'localNav',
                        'directive': 'localNav'
                    }
                ]
            }];

            beforeEach(function () {

                var customURL = 'foo.json';

                // load module
                module('encore.ui.utilities');
                module('encore.ui.elements');

                // load templates
                module('templates/rxApp.html');
                module('templates/rxAppNav.html');
                module('templates/rxAppNavItem.html');

                // Initialize a fake module to get at its config block
                // when running against local
                angular.module('testApp', function () {})
                    .config(function (routesCdnPathProvider) {
                        routesCdnPathProvider.customURL = customURL;
                    });
                module('encore.ui.rxApp', 'testApp');

                // Inject in angular constructs
                inject(function ($rootScope, $compile, $httpBackend, _encoreRoutes_) {
                    rootScope = $rootScope;
                    compile = $compile;
                    httpMock = $httpBackend;
                    encoreRoutes = _encoreRoutes_;

                    encoreRoutesSpy = sinon.spy(encoreRoutes, 'getAll');
                });

                cdnGet = httpMock.whenGET(customURL);
                cdnGet.respond(localNav);

                scope = rootScope.$new();

                helpers.createDirective(standardTemplate, compile, scope);
            });

            it('should load routes', function () {
                // get the nav data from the URL pointed to by .customURL
                httpMock.flush();

                expect(encoreRoutesSpy.calledOnce, 'getAll called on load').to.be.true;
            });

            it('should update routes', function () {
                // get the nav data from the URL pointed to by .customURL
                httpMock.flush();

                expect(encoreRoutesSpy.calledOnce, 'getAll called on load').to.be.true;

                rootScope.$broadcast('rxUpdateNavRoutes');
                rootScope.$digest();

                expect(encoreRoutesSpy.calledTwice, 'getAll called on update event').to.be.true;
            });

        });
    });
});
