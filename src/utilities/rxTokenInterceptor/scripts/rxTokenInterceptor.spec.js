describe('provider:rxTokenInterceptor', function () {
    var interceptor, session;

    beforeEach(function () {
        // load module
        module('encore.ui.utilities');

        // Initialize a fake module to get at its config block
        angular.module('testApp', function () {})
            .config(function (rxTokenInterceptorProvider) {
                rxTokenInterceptorProvider.exclusionList.push('abcd.com');
            });

        // Initialize injector for rxTokenInterceptor
        module('encore.ui.utilities', 'testApp');

        inject(function ($injector) {
            interceptor = $injector.get('rxTokenInterceptor');
            session = $injector.get('Session');
            session.getTokenId = sinon.stub().returns('12345');
        });
    });

    it('Interceptor should exist', function () {
        expect(interceptor).to.exist;
    });

    it('Interceptor sets X-Auth-Token in headers', function () {
        var config = { headers: {}};
        interceptor.request(config);
        expect(config.headers).not.be.empty;
        expect(config.headers['X-Auth-Token']).to.eq('12345');
    });

    it('should not inject headers for rackcdn requests', function () {
        var config = {
            headers: {},
            url: 'https://foo.bar.rackcdn.com'
        };
        interceptor.request(config);
        expect(config.headers).to.be.empty;
    });

    it('should not inject headers for domains added to exclusionList', function () {
        var config = {
            headers: {},
            url: 'https://foo.bar.abcd.com'
        };
        interceptor.request(config);
        expect(config.headers).to.be.empty;
    });

    it('should only compare exclusionList to the hostname', function () {
        var config = {
            headers: {},
            url: 'https://rackspace.com/rackcdn.com'
        };
        interceptor.request(config);
        expect(config.headers).to.not.be.empty;
    });
});

describe('provider:TokenInterceptor (DEPRECATED)', function () {
    var interceptor, session;

    beforeEach(function () {
        // load module
        module('encore.ui.utilities');

        // Initialize a fake module to get at its config block
        angular.module('testApp', function () {})
            .config(function (TokenInterceptorProvider) {
                TokenInterceptorProvider.exclusionList.push('abcd.com');
            });

        // Initialize injector for TokenInterceptor
        module('encore.ui.utilities', 'testApp');

        inject(function ($injector) {
            interceptor = $injector.get('TokenInterceptor');
            session = $injector.get('Session');
            session.getTokenId = sinon.stub().returns('12345');
        });
    });

    it('Interceptor should exist', function () {
        expect(interceptor).to.exist;
    });

    it('Interceptor sets X-Auth-Token in headers', function () {
        var config = { headers: {}};
        interceptor.request(config);
        expect(config.headers).not.be.empty;
        expect(config.headers['X-Auth-Token']).to.eq('12345');
    });

    it('should not inject headers for rackcdn requests', function () {
        var config = {
            headers: {},
            url: 'https://foo.bar.rackcdn.com'
        };
        interceptor.request(config);
        expect(config.headers).to.be.empty;
    });

    it('should not inject headers for domains added to exclusionList', function () {
        var config = {
            headers: {},
            url: 'https://foo.bar.abcd.com'
        };
        interceptor.request(config);
        expect(config.headers).to.be.empty;
    });

    it('should only compare exclusionList to the hostname', function () {
        var config = {
            headers: {},
            url: 'https://rackspace.com/rackcdn.com'
        };
        interceptor.request(config);
        expect(config.headers).to.not.be.empty;
    });
});
