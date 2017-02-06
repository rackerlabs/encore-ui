describe('service:rxUnauthorizedInterceptor', function () {
    var interceptor,
        mockWindow = { location: '/arbitrary/path' },
        session = { logout: sinon.spy() },
        cases = {
            'fullPath': '/app/path',
            'fullPathParams': '/app/path?search=term',
            'login': '/', // /login is an actual app, so the interceptor never kicks in
            'root': '/', // / may not need to be authorized, but in case it is, redirect will be /
        },
        q = { reject: sinon.spy() };

    beforeEach(function () {
        module('encore.ui.utilities',
            function ($provide) {
                $provide.value('$q', q);
                $provide.value('$window', mockWindow);
                $provide.value('Session', session);
            });

        inject(function ($injector) {
            interceptor = $injector.get('rxUnauthorizedInterceptor');
        });
    });

    it('Unauthorized Interceptor shoud exist', function () {
        expect(interceptor).to.exist;
    });

    it('Interceptor handles error responses', function () {
        interceptor.responseError({ status: 500 });

        expect(mockWindow.location).to.not.eq('/login');
        expect(q.reject).to.be.called;

        sinon.stub(interceptor, 'redirectPath').returns(cases.fullPath);
        interceptor.responseError({ status: 401 });

        expect(mockWindow.location).to.contain('redirect=' + encodeURIComponent('/app/path'));
        expect(q.reject).to.be.called;
        expect(session.logout).to.be.called;
    });

    it('Interceptor sets proper redirect path', function () {
        sinon.stub(interceptor, 'redirectPath').returns(cases.fullPath);
        interceptor.responseError({ status: 401 });

        expect(mockWindow.location).to.contain('redirect=' + encodeURIComponent('/app/path'));
    });

    it('Interceptor sets proper redirect path with params', function () {
        sinon.stub(interceptor, 'redirectPath').returns(cases.fullPathParams);
        interceptor.responseError({ status: 401 });

        expect(mockWindow.location).to.contain('redirect=' + encodeURIComponent('/app/path?search=term'));
    });

    it('Interceptor sets proper redirect path for /login', function () {
        sinon.stub(interceptor, 'redirectPath').returns(cases.login);

        interceptor.responseError({ status: 401 });
        expect(mockWindow.location).to.contain('redirect=' + encodeURIComponent('/'));
    });

    it('Interceptor sets proper redirect path for /', function () {
        sinon.stub(interceptor, 'redirectPath').returns(cases.root);

        interceptor.responseError({ status: 401 });
        expect(mockWindow.location).to.contain('redirect=' + encodeURIComponent('/'));
    });

    it('Interceptor should generate redirect with base path specified', function () {
        sinon.stub(interceptor, 'redirectPath').returns(cases.fullPath);

        interceptor.redirect('/mario');
        expect(mockWindow.location).to.contain('/mario');
    });
});

describe('service:UnauthorizedInterceptor (DEPRECATED)', function () {
    var interceptor,
        mockWindow = { location: '/arbitrary/path' },
        session = { logout: sinon.spy() },
        cases = {
            'fullPath': '/app/path',
            'fullPathParams': '/app/path?search=term',
            'login': '/', // /login is an actual app, so the interceptor never kicks in
            'root': '/', // / may not need to be authorized, but in case it is, redirect will be /
        },
        q = { reject: sinon.spy() };

    beforeEach(function () {
        module('encore.ui.utilities',
            function ($provide) {
                $provide.value('$q', q);
                $provide.value('$window', mockWindow);
                $provide.value('Session', session);
            });

        inject(function ($injector) {
            interceptor = $injector.get('UnauthorizedInterceptor');
        });
    });

    it('Unauthorized Interceptor shoud exist', function () {
        expect(interceptor).to.exist;
    });

    it('Interceptor handles error responses', function () {
        interceptor.responseError({ status: 500 });

        expect(mockWindow.location).to.not.eq('/login');
        expect(q.reject).to.be.called;

        sinon.stub(interceptor, 'redirectPath').returns(cases.fullPath);
        interceptor.responseError({ status: 401 });

        expect(mockWindow.location).to.contain('redirect=' + encodeURIComponent('/app/path'));
        expect(q.reject).to.be.called;
        expect(session.logout).to.be.called;
    });

    it('Interceptor sets proper redirect path', function () {
        sinon.stub(interceptor, 'redirectPath').returns(cases.fullPath);
        interceptor.responseError({ status: 401 });

        expect(mockWindow.location).to.contain('redirect=' + encodeURIComponent('/app/path'));
    });

    it('Interceptor sets proper redirect path with params', function () {
        sinon.stub(interceptor, 'redirectPath').returns(cases.fullPathParams);
        interceptor.responseError({ status: 401 });

        expect(mockWindow.location).to.contain('redirect=' + encodeURIComponent('/app/path?search=term'));
    });

    it('Interceptor sets proper redirect path for /login', function () {
        sinon.stub(interceptor, 'redirectPath').returns(cases.login);

        interceptor.responseError({ status: 401 });
        expect(mockWindow.location).to.contain('redirect=' + encodeURIComponent('/'));
    });

    it('Interceptor sets proper redirect path for /', function () {
        sinon.stub(interceptor, 'redirectPath').returns(cases.root);

        interceptor.responseError({ status: 401 });
        expect(mockWindow.location).to.contain('redirect=' + encodeURIComponent('/'));
    });

    it('Interceptor should generate redirect with base path specified', function () {
        sinon.stub(interceptor, 'redirectPath').returns(cases.fullPath);

        interceptor.redirect('/mario');
        expect(mockWindow.location).to.contain('/mario');
    });
});
