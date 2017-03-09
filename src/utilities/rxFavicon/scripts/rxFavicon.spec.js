describe('utilities:rxFavicon', function () {
    var scope, compile, el, rxEnvironment, log;

    var paths = {
        prod: 'prod.png',
        staging: 'staging.png',
        local: 'local.png'
    };

    var baseTemplate = _.template('<link rel="icon" type="image/png" href="${prod}"' +
        ' rx-favicon="{ staging: \'${staging}\', local: \'${local}\' }" />');

    var allTemplate = baseTemplate(paths);

    var stagingTemplate = baseTemplate({
        prod: paths.prod,
        staging: paths.staging,
        local: ''
    });

    var localTemplate = baseTemplate({
        prod: paths.prod,
        local: paths.local,
        staging: ''
    });

    beforeEach(function () {
        // load modules
        module('encore.ui.utilities');

        // Inject in angular constructs
        inject(function ($location, $rootScope, $compile, _rxEnvironment_, $log) {
            scope = $rootScope.$new();
            compile = $compile;
            rxEnvironment = _rxEnvironment_;
            log = $log;
        });
    });

    afterEach(function () {
        el = null;
    });

    describe('in prod environment', function () {
        beforeEach(function () {
            rxEnvironment.isLocal = function () {
                return false;
            }; 
            rxEnvironment.isPreProd = function () {
                return true;
            };
        }); 

        it('should use prod path', function () {
            el = helpers.createDirective(allTemplate, compile, scope);

            expect(el.attr('href')).to.equal(paths.prod);
        });
    });

    describe('in staging environment', function () {
        beforeEach(function () {
            rxEnvironment.isLocal = function () {
                return false;
            }; 
            rxEnvironment.isUnifiedProd = function () {
                return false;
            };
            rxEnvironment.isPreProd = function () {
                return false;
            };
        });

        it('should use staging path', function () {
            el = helpers.createDirective(allTemplate, compile, scope);

            expect(el.attr('href')).to.equal(paths.staging);
        });

        it('should get fallback to prod environment if staging not set', function () {
            el = helpers.createDirective(localTemplate, compile, scope);

            expect(el.attr('href')).to.equal(paths.prod);
        });
    });

    describe('in local environment', function () {
        beforeEach(function () {
            rxEnvironment.isLocal = function () {
                return true;
            }; 
        });

        it('should use local path', function () {
            el = helpers.createDirective(allTemplate, compile, scope);

            expect(el.attr('href')).to.equal(paths.local);
        });

        it('should get fallback to staging environment if local not set', function () {
            el = helpers.createDirective(stagingTemplate, compile, scope);

            expect(el.attr('href')).to.equal(paths.staging);
        });
    });


    it('should log warning if attribute not an object', function () {
        var badTemplate = '<link rx-favicon="somePath.png">';

        // set to local environment
        sinon.spy(log, 'warn');

        el = helpers.createDirective(badTemplate, compile, scope);

        expect(log.warn).to.be.calledOnce;
    });
});
