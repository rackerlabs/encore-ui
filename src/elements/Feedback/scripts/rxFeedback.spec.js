describe('rxFeedback', function () {
    var scope, compile, el, feedbackSvc, apiUrl, httpMock,
        notifySvcMock, screenshotSvcMock, elScope, sessionSvcMock, locationMock;
    var validTemplate = '<rx-feedback></rx-feedback>';
    var theScreenshot = 'the screenshot';

    var feedback = {
        type: {
            label: 'type'
        },
        description: 'give me the kitchen sink'
    };

    var feedbackWithScreenshot = {
        type: feedback.type.label,
        description: feedback.description,
        screenshot: theScreenshot
    };

    beforeEach(function () {
        notifySvcMock = {
            add: sinon.stub()
        };

        screenshotSvcMock = {
            capture: sinon.stub().returns({
                then: sinon.stub().callsArgWith(0, theScreenshot)
            })
        };

        sessionSvcMock = {
            getUserId: sinon.stub()
        };

        locationMock = {
            url: sinon.stub()
        };

        // load module
        module('encore.ui.utilities');
        module('encore.ui.elements');

        // load templates
        module('templates/rxFeedback.html');
        module('templates/rxModalAction.html');

        module(function ($provide) {
            $provide.value('rxNotify', notifySvcMock);
            $provide.value('rxScreenshotSvc', screenshotSvcMock);
            $provide.value('Session', sessionSvcMock);
            $provide.value('$location', locationMock);
        });

        // Inject in angular constructs
        inject(function ($rootScope, $compile, rxFeedbackSvc, $httpBackend, rxFeedbackApi) {
            scope = $rootScope.$new();
            compile = $compile;
            feedbackSvc = rxFeedbackSvc;
            apiUrl = rxFeedbackApi;
            httpMock = $httpBackend;
        });

        // overwrite the fallback so it doesn't refresh the page
        feedbackSvc.fallback = sinon.stub();

        el = helpers.createDirective(validTemplate, compile, scope);
        elScope = el.isolateScope();

    });

    it('should set the current url of the page on the modal\'s scope', function () {
        var modalScope = {};
        locationMock.url.returns('/path');
        elScope.setCurrentUrl(modalScope);
        expect(modalScope.currentUrl).to.equal('/path');
    });

    it('should submit data to feedback api', function () {
        httpMock.expectPOST(apiUrl, feedbackWithScreenshot).respond(200);

        elScope.sendFeedback(feedback);

        httpMock.flush();

        expect(notifySvcMock.add.args[0][1].type).to.equal('success');
    });

    it('should submit data even if screenshot fails', function () {
        var failureReason = 'some failure reason';

        var feedbackWithFailure = _.clone(feedbackWithScreenshot);
        feedbackWithFailure.screenshot = failureReason;

        httpMock.expectPOST(apiUrl, feedbackWithFailure).respond(200);

        screenshotSvcMock.capture = sinon.stub().returns({
            then: sinon.stub().callsArgWith(1, failureReason)
        });

        elScope.sendFeedback(feedback);

        httpMock.flush();

        expect(notifySvcMock.add.args[0][1].type).to.equal('success');
    });

    it('should show custom success message', function () {
        var customSuccess = '(successkid)';

        httpMock.expectPOST(apiUrl, feedbackWithScreenshot).respond({
            message: customSuccess
        });

        elScope.sendFeedback(feedback);

        httpMock.flush();

        expect(notifySvcMock.add.args[0][0]).to.equal(customSuccess);
    });

    it('should show error message on API failure', function () {
        httpMock.expectPOST(apiUrl, feedbackWithScreenshot).respond(404);

        elScope.sendFeedback(feedback);

        httpMock.flush();

        expect(notifySvcMock.add.args[0][1].type).to.equal('error');
    });

    it('should call fallback on failure', function () {
        httpMock.expectPOST(apiUrl, feedbackWithScreenshot).respond(404);

        elScope.sendFeedback(feedback);

        httpMock.flush();

        expect(feedbackSvc.fallback).to.be.calledOnce;
    });

    it('should show custom failure message', function () {
        var customFailure = '(fail)';

        httpMock.expectPOST(apiUrl, feedbackWithScreenshot).respond(404, {
            message: customFailure
        });

        elScope.sendFeedback(feedback);

        httpMock.flush();

        expect(notifySvcMock.add.args[0][0]).to.contain(customFailure);
    });

    describe('overwriting sendFeedback functionality', function () {
        var kitchenSink = function () { return 'kitchen sink, please'; };
        var customTemplate = '<rx-feedback on-submit="kitchenSink"></rx-feedback>';
        var elCustomScope, elCustom;

        beforeEach(function () {
            scope.kitchenSink = kitchenSink;
            sinon.spy(scope, 'kitchenSink');
            elCustom = helpers.createDirective(customTemplate, compile, scope);
            elCustomScope = elCustom.isolateScope();
        });

        it('should apply the custom feedback function for on-submit', function () {
            elCustomScope.sendFeedback();
            expect(scope.kitchenSink).to.be.calledOnce;
        });

    });
});
