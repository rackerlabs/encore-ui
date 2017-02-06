describe('rxFeedbackSvc', function () {
    var feedbackSvc, mockResource, mockWindow, mockNotifySvc;
    var apiUrl = 'myurl';

    beforeEach(function () {
        // load module
        module('encore.ui.utilities');

        mockResource = sinon.stub().returns({
            save: sinon.stub()
        });

        mockWindow = {
            location: {},
            open: sinon.stub()
        };

        mockNotifySvc = {
            add: sinon.stub()
        };

        module(function ($provide) {
            $provide.constant('rxFeedbackApi', apiUrl);
            $provide.value('$resource', mockResource);
            $provide.value('$window', mockWindow);
            $provide.value('rxNotify', mockNotifySvc);
        });

        // Inject in angular constructs
        inject(function (rxFeedbackSvc) {
            feedbackSvc = rxFeedbackSvc;
        });
    });

    it('should exist', function () {
        expect(feedbackSvc).to.exist;
    });

    it('should have a default apiEndpoint', function () {
        expect(mockResource).to.be.calledWith(apiUrl);
        expect(feedbackSvc.api.save).to.exist;
    });

    it('should allow overwriting that endpoint', function () {
        // set new api url
        var newUrl = 'newUrl';
        var resource = 'newUrlResource';

        mockResource.returns(resource);
        feedbackSvc.setEndpoint(newUrl);

        expect(mockResource).to.be.calledWith(newUrl);
        expect(feedbackSvc.api).to.equal(resource);
    });

    it('should have default fallback function to send e-mail', function () {
        var fackFeedback = {
            type: {
                label: 'test'
            },
            descrption: 'test'
        };

        expect(feedbackSvc.fallback).to.be.a.function;

        feedbackSvc.fallback(fackFeedback);

        expect(mockWindow.open).to.be.calledOnce;
    });

    it('should show e-mail feedback in current window if new window fails to load', function () {
        var feedback = {
            type: {
                label: 'test'
            },
            description: 'test'
        };

        expect(feedbackSvc.fallback).to.be.a.function;

        mockWindow.open.returns(undefined);
        feedbackSvc.fallback(feedback);

        expect(mockWindow.location.href).to.contain(feedback.type.label);
        expect(mockWindow.location.href).to.contain(feedback.description);
    });

    it('should allow setting a custom e-mail address', function () {
        var feedback = {
            type: {
                label: 'test'
            },
            description: 'test'
        };

        var ninetiesEmail = '_x_masta-ram_x_@aol.com';

        feedbackSvc.email = ninetiesEmail;

        mockWindow.open.returns(undefined);
        feedbackSvc.fallback(feedback);

        expect(mockWindow.location.href).to.contain(ninetiesEmail);
    });
});
