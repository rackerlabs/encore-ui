describe('service:rxEnvironment', function () {
    var envSvc, location, log;

    beforeEach(function () {
        // load module
        module('encore.ui.utilities');

        // Inject in angular constructs
        inject(function ($location, $rootScope, rxEnvironment, $log) {
            location = $location;
            envSvc = rxEnvironment;
            log = $log;
        });

        sinon.stub(location, 'absUrl');
    });

    afterEach(function () {
        location.absUrl.restore();
    });

    it('should warn and return first environment if no environment found', function () {
        location.absUrl.returns('http://nonsense');

        sinon.spy(log, 'warn');

        expect(envSvc.get().name).to.equal('local');
        expect(log.warn).to.be.calledOnce;
    });

    it('should get current environment based on location passed in', function () {
        // test local
        expect(envSvc.envCheck('local', 'http://localhost:9001')).to.be.true;

        // test staging
        expect(envSvc.envCheck('unified-preprod', 'http://staging.encore.rackspace.com')).to.be.true;

        // test prod
        expect(envSvc.envCheck('unified-prod', 'http://encore.rackspace.com')).to.be.true;

        // test unified-preprod
        expect(envSvc.envCheck('unified-preprod', 'http://randenv.encore.rackspace.com')).to.be.true;

        // test unified
        expect(envSvc.envCheck('unified', 'http://encore.rackspace.com')).to.be.true;
    });

    it('should get current environment based on location.absUrl', function () {
        // test local
        location.absUrl.returns('http://localhost:9001');
        expect(envSvc.envCheck('local'), 'localhost:9001 is local').to.be.true;
        expect(envSvc.isLocal(), 'isLocal localhost:9001').to.be.true;
        expect(envSvc.isPreProd(), 'test for preprod when environment is local').to.be.false;

        // test local dev tld
        location.absUrl.returns('http://apps.encore.dev');
        expect(envSvc.envCheck('local'), 'apps.encore.dev is local').to.be.true;
        expect(envSvc.isLocal(), 'isLocal apps.encore.dev').to.be.true;
        expect(envSvc.isPreProd(), 'test for preprod when environment is local').to.be.false;

        // test preprod
        location.absUrl.returns('http://preprod.encore.rackspace.com');
        expect(envSvc.envCheck('preprod'), 'preprod.encore.rackspace.com is preprod').to.be.true;
        expect(envSvc.isPreProd(), 'isPreProd for preprod.encore.rackspace.com').to.be.true;
        expect(envSvc.isUnifiedPreProd(), 'test for unified-preprod when environment is preprod').to.be.true;

        // test preprod apps
        location.absUrl.returns('http://apps.preprod.encore.rackspace.com');
        expect(envSvc.envCheck('preprod'), 'apps.preprod.encore.rackspace.com is preprod').to.be.true;
        expect(envSvc.isPreProd(), 'isPreProd for apps.preprod.encore.rackspace.com').to.be.true;
        expect(envSvc.isUnifiedPreProd(), 'test for unified-preprod when environment is preprod').to.be.true;

        // test randenv
        location.absUrl.returns('http://randenv.encore.rackspace.com');
        expect(envSvc.envCheck('unified-preprod'), 'randenv.encore.rackspace.com is unified-preprod').to.be.true;
        expect(envSvc.isPreProd(), 'isPreProd for randenv.encore.rackspace.com').to.be.false;
        expect(envSvc.isUnifiedPreProd(), 'test for unified-preprod when environment is randenv').to.be.true;

        // test staging
        location.absUrl.returns('http://staging.encore.rackspace.com');
        expect(envSvc.envCheck('unified-preprod'), 'staging.encore.rackspace.com is unified-preprod').to.be.true;
        expect(envSvc.isUnifiedPreProd(), 'isUnifiedPreProd for staging.encore.rackspace.com').to.be.true;
        expect(envSvc.isUnified(), 'test for unified when environment is unified-preprod').to.be.true;

        // test staging apps
        location.absUrl.returns('http://apps.staging.encore.rackspace.com');
        expect(envSvc.envCheck('unified-preprod'), 'apps.staging.encore.rackspace.com is unified-preprod').to.be.true;
        expect(envSvc.isUnifiedPreProd(), 'isUnifiedPreProd for apps.staging.encore.rackspace.com').to.be.true;
        expect(envSvc.isUnified(), 'test for unified when environment is unified-preprod').to.be.true;

        // test unified
        location.absUrl.returns('http://encore.rackspace.com');
        expect(envSvc.envCheck('unified'), 'encore.rackspace.com is unified').to.be.true;
        expect(envSvc.isUnified(), 'isUnified for encore.rackspace.com').to.be.true;
        expect(envSvc.isUnifiedProd(), 'isUnifiedProd for encore.rackspace.com').to.be.true;
        expect(envSvc.isLocal(), 'test for local when environment is unified').to.be.false;

        // test unified origin
        location.absUrl.returns('http://origin.encore.rackspace.com');
        expect(envSvc.envCheck('unified'), 'origin.encore.rackspace.com is unified').to.be.true;
        expect(envSvc.isUnified(), 'isUnified for origin.encore.rackspace.com').to.be.true;
        expect(envSvc.isUnifiedProd(), 'isUnifiedProd for origin.encore.rackspace.com').to.be.true;
        expect(envSvc.isLocal(), 'test for local when environment is unified').to.be.false;

        // test unified apps
        location.absUrl.returns('http://apps.encore.rackspace.com');
        expect(envSvc.envCheck('unified'), 'apps.encore.rackspace.com is unified').to.be.true;
        expect(envSvc.isUnified(), 'isUnified for origin.encore.rackspace.com').to.be.true;
        expect(envSvc.isUnifiedProd(), 'isUnifiedProd for origin.encore.rackspace.com').to.be.true;
        expect(envSvc.isLocal(), 'test for local when environment is unified').to.be.false;
    });

    it('should allow defining a new environment', function () {
        // test w/ simple string
        envSvc.add({
            name: 'custom',
            pattern: '//custom',
            url: 'custom'
        });
        location.absUrl.returns('http://custom');
        expect(envSvc.get().name).to.equal('custom');

        // test w/ regexp (matches http://craziness.*.com/)
        envSvc.add({
            name: 'crazy',
            pattern: /\/\/craziness\..*\.com\//,
            url: 'crazy'
        });
        location.absUrl.returns('http://craziness.anything.yeah.com/some/path');
        expect(envSvc.get().name).to.equal('crazy');
    });

    it('should throw error on bad environment', function () {
        sinon.spy(log, 'error');
        // left off some values
        envSvc.add({
            name: 'custom'
        });

        expect(log.error).to.be.calledOnce;
    });

    it('should allow you to completely overwrite defined environments', function () {
        envSvc.setAll([{
            name: 'custom',
            pattern: /./,
            url: 'mycustomurl'
        }]);

        expect(envSvc.get().name).to.equal('custom');
    });
});

describe('service:Environment (DEPRECATED)', function () {
    var envSvc, location, log;

    beforeEach(function () {
        // load module
        module('encore.ui.utilities');

        // Inject in angular constructs
        inject(function ($location, $rootScope, Environment, $log) {
            location = $location;
            envSvc = Environment;
            log = $log;
        });

        sinon.stub(location, 'absUrl');
    });

    afterEach(function () {
        location.absUrl.restore();
    });

    it('should warn and return first environment if no environment found', function () {
        location.absUrl.returns('http://nonsense');

        sinon.spy(log, 'warn');

        expect(envSvc.get().name).to.equal('local');
        expect(log.warn).to.be.calledOnce;
    });

    it('should get current environment based on location passed in', function () {
        // test local
        expect(envSvc.envCheck('local', 'http://localhost:9001')).to.be.true;

        // test staging
        expect(envSvc.envCheck('unified-preprod', 'http://staging.encore.rackspace.com')).to.be.true;

        // test prod
        expect(envSvc.envCheck('unified-prod', 'http://encore.rackspace.com')).to.be.true;

        // test unified-preprod
        expect(envSvc.envCheck('unified-preprod', 'http://randenv.encore.rackspace.com')).to.be.true;

        // test unified
        expect(envSvc.envCheck('unified', 'http://encore.rackspace.com')).to.be.true;
    });

    it('should get current environment based on location.absUrl', function () {
        // test local
        location.absUrl.returns('http://localhost:9001');
        expect(envSvc.envCheck('local'), 'localhost:9001 is local').to.be.true;
        expect(envSvc.isLocal(), 'isLocal localhost:9001').to.be.true;
        expect(envSvc.isPreProd(), 'test for preprod when environment is local').to.be.false;

        // test local dev tld
        location.absUrl.returns('http://apps.encore.dev');
        expect(envSvc.envCheck('local'), 'apps.encore.dev is local').to.be.true;
        expect(envSvc.isLocal(), 'isLocal apps.encore.dev').to.be.true;
        expect(envSvc.isPreProd(), 'test for preprod when environment is local').to.be.false;

        // test preprod
        location.absUrl.returns('http://preprod.encore.rackspace.com');
        expect(envSvc.envCheck('preprod'), 'preprod.encore.rackspace.com is preprod').to.be.true;
        expect(envSvc.isPreProd(), 'isPreProd for preprod.encore.rackspace.com').to.be.true;
        expect(envSvc.isUnifiedPreProd(), 'test for unified-preprod when environment is preprod').to.be.true;

        // test preprod apps
        location.absUrl.returns('http://apps.preprod.encore.rackspace.com');
        expect(envSvc.envCheck('preprod'), 'apps.preprod.encore.rackspace.com is preprod').to.be.true;
        expect(envSvc.isPreProd(), 'isPreProd for apps.preprod.encore.rackspace.com').to.be.true;
        expect(envSvc.isUnifiedPreProd(), 'test for unified-preprod when environment is preprod').to.be.true;

        // test randenv
        location.absUrl.returns('http://randenv.encore.rackspace.com');
        expect(envSvc.envCheck('unified-preprod'), 'randenv.encore.rackspace.com is unified-preprod').to.be.true;
        expect(envSvc.isPreProd(), 'isPreProd for randenv.encore.rackspace.com').to.be.false;
        expect(envSvc.isUnifiedPreProd(), 'test for unified-preprod when environment is randenv').to.be.true;

        // test staging
        location.absUrl.returns('http://staging.encore.rackspace.com');
        expect(envSvc.envCheck('unified-preprod'), 'staging.encore.rackspace.com is unified-preprod').to.be.true;
        expect(envSvc.isUnifiedPreProd(), 'isUnifiedPreProd for staging.encore.rackspace.com').to.be.true;
        expect(envSvc.isUnified(), 'test for unified when environment is unified-preprod').to.be.true;

        // test staging apps
        location.absUrl.returns('http://apps.staging.encore.rackspace.com');
        expect(envSvc.envCheck('unified-preprod'), 'apps.staging.encore.rackspace.com is unified-preprod').to.be.true;
        expect(envSvc.isUnifiedPreProd(), 'isUnifiedPreProd for apps.staging.encore.rackspace.com').to.be.true;
        expect(envSvc.isUnified(), 'test for unified when environment is unified-preprod').to.be.true;

        // test unified
        location.absUrl.returns('http://encore.rackspace.com');
        expect(envSvc.envCheck('unified'), 'encore.rackspace.com is unified').to.be.true;
        expect(envSvc.isUnified(), 'isUnified for encore.rackspace.com').to.be.true;
        expect(envSvc.isUnifiedProd(), 'isUnifiedProd for encore.rackspace.com').to.be.true;
        expect(envSvc.isLocal(), 'test for local when environment is unified').to.be.false;

        // test unified origin
        location.absUrl.returns('http://origin.encore.rackspace.com');
        expect(envSvc.envCheck('unified'), 'origin.encore.rackspace.com is unified').to.be.true;
        expect(envSvc.isUnified(), 'isUnified for origin.encore.rackspace.com').to.be.true;
        expect(envSvc.isUnifiedProd(), 'isUnifiedProd for origin.encore.rackspace.com').to.be.true;
        expect(envSvc.isLocal(), 'test for local when environment is unified').to.be.false;

        // test unified apps
        location.absUrl.returns('http://apps.encore.rackspace.com');
        expect(envSvc.envCheck('unified'), 'apps.encore.rackspace.com is unified').to.be.true;
        expect(envSvc.isUnified(), 'isUnified for origin.encore.rackspace.com').to.be.true;
        expect(envSvc.isUnifiedProd(), 'isUnifiedProd for origin.encore.rackspace.com').to.be.true;
        expect(envSvc.isLocal(), 'test for local when environment is unified').to.be.false;
    });

    it('should allow defining a new environment', function () {
        // test w/ simple string
        envSvc.add({
            name: 'custom',
            pattern: '//custom',
            url: 'custom'
        });
        location.absUrl.returns('http://custom');
        expect(envSvc.get().name).to.equal('custom');

        // test w/ regexp (matches http://craziness.*.com/)
        envSvc.add({
            name: 'crazy',
            pattern: /\/\/craziness\..*\.com\//,
            url: 'crazy'
        });
        location.absUrl.returns('http://craziness.anything.yeah.com/some/path');
        expect(envSvc.get().name).to.equal('crazy');
    });

    it('should throw error on bad environment', function () {
        sinon.spy(log, 'error');
        // left off some values
        envSvc.add({
            name: 'custom'
        });

        expect(log.error).to.be.calledOnce;
    });

    it('should allow you to completely overwrite defined environments', function () {
        envSvc.setAll([{
            name: 'custom',
            pattern: /./,
            url: 'mycustomurl'
        }]);

        expect(envSvc.get().name).to.equal('custom');
    });
});
