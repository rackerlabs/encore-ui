describe('service:rxStatus', function () {
    var status, scope, rootScope;

    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function ($rootScope, rxStatus) {
            scope = $rootScope.$new();
            status = rxStatus;
            rootScope = $rootScope;

            status.setScope(scope);

            sinon.spy(status, 'setStatus');
        });
    });

    afterEach(function () {
        status.setStatus.restore();
    });

    describe('setLoading()', function () {
        beforeEach(function () {
            status.setLoading('Loading');
        });

        it ('should return a loading message', function () {
            expect(status.setStatus).to.be.calledWithMatch('Loading');
            expect(status.setStatus.args[0][1]).to.include.keys('loaded', 'loading');
            expect(status.setStatus.args[0][1]).to.include({
                repeat: true,
                timeout: -1
            });
        });
    });//setLoading()

    describe('setSuccess()', function () {
        describe('with default options', function () {
            beforeEach(function () {
                status.setSuccess('Yup');
            });

            it('should return a success message', function () {
                expect(status.setStatus).to.be.calledWithMatch('Yup');
                expect(status.setStatus.args[0][1]).to.include.keys('success', 'type');
                expect(status.setStatus.args[0][1]).to.include({
                    repeat: false,
                    timeout: 5
                });
            });
        });//default options

        describe('with timeout override', function () {
            beforeEach(function () {
                status.setSuccess('YupOverride', { timeout: 2 });
            });

            it('should allow the override', function () {
                expect(status.setStatus.args[0][1]).to.include({ timeout: 2 });
            });
        });//with timeout override

        describe('with repeat override', function () {
            beforeEach(function () {
                status.setSuccess('YupOverride2', { repeat: true });
            });

            it('should allow the override', function () {
                expect(status.setStatus.args[0][1]).to.include({ repeat: true });
            });
        });//with repeat override
    });//setSuccess()

    describe('setSuccessNext()', function () {
        beforeEach(function () {
            status.setSuccessNext('Yup later');
        });

        it('should return a success message upon next route change', function () {
            expect(status.setStatus).to.be.calledWithMatch('later');
            expect(status.setStatus.args[0][1]).to.include({
                show: 'next',
                repeat: false,
                timeout: 5
            });
        });
    });//setSuccessNext()

    describe('setError()', function () {
        beforeEach(function () {
            status.setError('Err');
        });

        it('should return an error message', function () {
            expect(status.setStatus).to.be.calledWithMatch('Err');
            expect(status.setStatus.args[0][1]).to.include.keys('success', 'type');
            expect(status.setStatus.args[0][1]).to.include({
                repeat: false,
                timeout: -1
            });
        });
    });//setError()

    describe('setWarning()', function () {
        beforeEach(function () {
            status.setWarning('Warn');
        });

        it('should return a warning message', function () {
            expect(status.setStatus).to.be.calledWithMatch('Warn');
            expect(status.setStatus.args[0][1]).to.include.keys('success', 'type');
            expect(status.setStatus.args[0][1]).to.include({
                repeat: true,
                timeout: -1
            });
        });
    });//setWarning()

    describe('setInfo()', function () {
        beforeEach(function () {
            status.setInfo('Info');
        });

        it('should return an info message', function () {
            expect(status.setStatus).to.be.calledWithMatch('Info');
            expect(status.setStatus.args[0][1]).to.include.keys('success', 'type');
            expect(status.setStatus.args[0][1]).to.include({ repeat: true, timeout: -1 });
        });
    });//setInfo()

    describe('clear()', function () {
        beforeEach(function () {
            status.clear();
        });

        it('should not return a message', function () {
            expect(status.setStatus).to.not.have.been.called;
        });
    });//clear

    describe('complete()', function () {
        beforeEach(function () {
            status.complete();
        });

        it('should result in an immediate success', function () {
            expect(scope.status.show).to.equal('immediate');
        });
    });//complete()

    describe('dismiss()', function () {
        var info;

        beforeEach(function () {
            info = status.setInfo('Info');
            status.dismiss(info);
        });

        it('should remove an existing message', function () {
            expect(scope.status.loading).to.be.false;
        });
    });//dismiss()

    describe('on route reload', function () {
        it('should reset stack to "page"', function () {
            inject(function (rxStatus) {
                var spy = sinon.spy(rxStatus, 'setStack');
                rootScope.$broadcast('$routeChangeStart');
                expect(rxStatus.setStack.args[0][0]).to.equal('page');
                spy.restore();
            });
        });
    });//on route load
});//rxStatus

describe('service:Status (DEPRECATED)', function () {
    var status, scope, rootScope;

    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function ($rootScope, Status) {
            scope = $rootScope.$new();
            status = Status;
            rootScope = $rootScope;

            status.setScope(scope);

            sinon.spy(status, 'setStatus');
        });
    });

    afterEach(function () {
        status.setStatus.restore();
    });

    describe('setLoading()', function () {
        beforeEach(function () {
            status.setLoading('Loading');
        });

        it ('should return a loading message', function () {
            expect(status.setStatus).to.be.calledWithMatch('Loading');
            expect(status.setStatus.args[0][1]).to.include.keys('loaded', 'loading');
            expect(status.setStatus.args[0][1]).to.include({
                repeat: true,
                timeout: -1
            });
        });
    });//setLoading()

    describe('setSuccess()', function () {
        describe('with default options', function () {
            beforeEach(function () {
                status.setSuccess('Yup');
            });

            it('should return a success message', function () {
                expect(status.setStatus).to.be.calledWithMatch('Yup');
                expect(status.setStatus.args[0][1]).to.include.keys('success', 'type');
                expect(status.setStatus.args[0][1]).to.include({
                    repeat: false,
                    timeout: 5
                });
            });
        });//default options

        describe('with timeout override', function () {
            beforeEach(function () {
                status.setSuccess('YupOverride', { timeout: 2 });
            });

            it('should allow the override', function () {
                expect(status.setStatus.args[0][1]).to.include({ timeout: 2 });
            });
        });//with timeout override

        describe('with repeat override', function () {
            beforeEach(function () {
                status.setSuccess('YupOverride2', { repeat: true });
            });

            it('should allow the override', function () {
                expect(status.setStatus.args[0][1]).to.include({ repeat: true });
            });
        });//with repeat override
    });//setSuccess()

    describe('setSuccessNext()', function () {
        beforeEach(function () {
            status.setSuccessNext('Yup later');
        });

        it('should return a success message upon next route change', function () {
            expect(status.setStatus).to.be.calledWithMatch('later');
            expect(status.setStatus.args[0][1]).to.include({
                show: 'next',
                repeat: false,
                timeout: 5
            });
        });
    });//setSuccessNext()

    describe('setError()', function () {
        beforeEach(function () {
            status.setError('Err');
        });

        it('should return an error message', function () {
            expect(status.setStatus).to.be.calledWithMatch('Err');
            expect(status.setStatus.args[0][1]).to.include.keys('success', 'type');
            expect(status.setStatus.args[0][1]).to.include({
                repeat: false,
                timeout: -1
            });
        });
    });//setError()

    describe('setWarning()', function () {
        beforeEach(function () {
            status.setWarning('Warn');
        });

        it('should return a warning message', function () {
            expect(status.setStatus).to.be.calledWithMatch('Warn');
            expect(status.setStatus.args[0][1]).to.include.keys('success', 'type');
            expect(status.setStatus.args[0][1]).to.include({
                repeat: true,
                timeout: -1
            });
        });
    });//setWarning()

    describe('setInfo()', function () {
        beforeEach(function () {
            status.setInfo('Info');
        });

        it('should return an info message', function () {
            expect(status.setStatus).to.be.calledWithMatch('Info');
            expect(status.setStatus.args[0][1]).to.include.keys('success', 'type');
            expect(status.setStatus.args[0][1]).to.include({ repeat: true, timeout: -1 });
        });
    });//setInfo()

    describe('clear()', function () {
        beforeEach(function () {
            status.clear();
        });

        it('should not return a message', function () {
            expect(status.setStatus).to.not.have.been.called;
        });
    });//clear

    describe('complete()', function () {
        beforeEach(function () {
            status.complete();
        });

        it('should result in an immediate success', function () {
            expect(scope.status.show).to.equal('immediate');
        });
    });//complete()

    describe('dismiss()', function () {
        var info;

        beforeEach(function () {
            info = status.setInfo('Info');
            status.dismiss(info);
        });

        it('should remove an existing message', function () {
            expect(scope.status.loading).to.be.false;
        });
    });//dismiss()

    describe('on route reload', function () {
        it('should reset stack to "page"', function () {
            inject(function (Status) {
                var spy = sinon.spy(Status, 'setStack');
                rootScope.$broadcast('$routeChangeStart');
                expect(Status.setStack.args[0][0]).to.equal('page');
                spy.restore();
            });
        });
    });//on route load
});//Status
