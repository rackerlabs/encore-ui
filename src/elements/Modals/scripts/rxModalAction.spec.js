describe('rxModalAction', function () {
    var el, scope, compile, rootScope, modalApi, instanceApi, instanceMock, controller;
    var validTemplate = '<rx-modal-action ' +
                            'template-url="test.html" ' +
                            'post-hook="post()" ' +
                            'pre-hook="pre()" ' +
                            'dismiss-hook="dismiss()" ' +
                            '>Title</rx-modal-action>';

    var setupModalCtrl = function (ctrl) {
        controller(ctrl, {
            $scope: scope,
            $modalInstance: instanceApi
        });
    };

    beforeEach(function () {
        // Load the directive's module
        module('encore.ui.elements');
        module('encore.ui.utilities');

        // load the template
        module('templates/rxModalAction.html');
        module('templates/rxModalActionForm.html');

        modalApi = {
            open: sinon.stub().returns({
                result: {
                    then: function (onSubmit, onCancel) {
                        instanceApi.close = onSubmit;
                        instanceApi.dismiss = onCancel;
                    }
                }
            })
        };

        instanceApi = {
            close: function () {},
            dismiss: function () {}
        };
        instanceMock = sinon.mock(instanceApi);

        // Provide any mocks needed
        module(function ($provide) {
            $provide.value('rxModal', modalApi);
        });

        // Inject in angular constructs
        inject(function ($rootScope, $compile, $controller) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            scope.postAction = sinon.spy();

            compile = $compile;
            controller = $controller;
        });

        el = helpers.createDirective(validTemplate, compile, scope);

        scope.$digest();
    });

    afterEach(function () {
        // zero out link element
        el = null;
    });

    it('should create a link to open a modal', function () {
        var link = el.find('a');

        expect(link).to.exist;
        expect(link.text()).to.equal('Title');
    });

    it('should create a new modal on click', function () {
        var link = el.find('a')[0];

        helpers.clickElement(link);

        sinon.assert.calledOnce(modalApi.open);
        expect(modalApi.open.args[0][0]).to.include.keys(['templateUrl','controller','scope']);
    });

    it('should close on submit', function () {
        var link = el.find('a')[0];

        helpers.clickElement(link);

        instanceMock.expects('close').once();
        instanceMock.expects('dismiss').never();

        setupModalCtrl(modalApi.open.getCall(0).args[0].controller);

        scope.submit();

        instanceMock.verify();
    });

    it('should dismiss modal on cancel', function () {
        var link = el.find('a')[0];

        helpers.clickElement(link);

        instanceMock.expects('close').never();
        instanceMock.expects('dismiss').once();

        setupModalCtrl(modalApi.open.getCall(0).args[0].controller);

        scope.cancel();

        instanceMock.verify();
    });

    it('should dismiss modal on routeChange', function () {
        var link = el.find('a')[0];

        helpers.clickElement(link);

        instanceMock.expects('close').never();
        instanceMock.expects('dismiss').once();

        setupModalCtrl(modalApi.open.getCall(0).args[0].controller);

        // fake a route change
        rootScope.$broadcast('$routeChangeSuccess');

        instanceMock.verify();
    });

    it('should focus on calling link after submitting', function () {
        var link = el.find('a')[0];

        helpers.clickElement(link);

        sinon.spy(link, 'focus');

        setupModalCtrl(modalApi.open.getCall(0).args[0].controller);

        scope.submit();

        sinon.assert.calledOnce(link.focus);
    });

    it('should focus on calling link after cancelling or submitting', function () {
        var link = el.find('a')[0];

        helpers.clickElement(link);

        sinon.spy(link, 'focus');

        setupModalCtrl(modalApi.open.getCall(0).args[0].controller);

        scope.cancel();

        helpers.clickElement(link);

        scope.submit();

        sinon.assert.calledTwice(link.focus);
    });

    it('should run prehook function before open', function () {
        scope.pre = sinon.spy();

        el.scope().showModal({ preventDefault: function () {}});

        expect(scope.pre.callCount).to.equal(1);
    });

    it('should run posthook function after close', function () {
        scope.post = sinon.spy();

        el.scope().showModal({ preventDefault: function () {}});

        setupModalCtrl(modalApi.open.getCall(0).args[0].controller);

        scope.submit();

        expect(scope.post.callCount).to.equal(1);
    });

    it('should run dismiss-hook function after cancel', function () {
        scope.dismiss = sinon.spy();

        el.scope().showModal({ preventDefault: function () {}});

        setupModalCtrl(modalApi.open.getCall(0).args[0].controller);

        scope.cancel();

        expect(scope.dismiss.callCount).to.equal(1);
    });

    it('should update callCounts but not close the modal', function () {
        var overridingTemplate = '<rx-modal-action ' +
                                     'controller="rxTestCtrl" ' +
                                     'template-url="test.html" ' +
                                     'post-hook="post()" ' +
                                     'pre-hook="pre()" ' +
                                     'dismiss-hook="dismiss()"' +
                                     '>Title</rx-modal-action>';

        scope.rxTestCtrl = function ($scope) {
            $scope.count = 0;
            $scope.submit = sinon.spy();
        };

        controller('rxTestCtrl', {
            $scope: scope,
            $modalInstance: instanceApi
        });

        el = helpers.createDirective(overridingTemplate, compile, scope);

        var link = el.find('a')[0];

        helpers.clickElement(link);

        instanceMock.expects('close').never();
        instanceMock.expects('dismiss').never();

        setupModalCtrl(modalApi.open.getCall(0).args[0].controller);

        scope.submit();
        expect(scope.submit.callCount).to.equal(1);
    });
});
