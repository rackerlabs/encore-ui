describe('rxModalAction', function () {
    var changePasswordModal, triggerModal;

    var customFunctionality = {
        txtNewPassword: {
            get: function () {
                return this.rootElement.element(by.model('fields.password'));
            }
        },

        txtErrorMessage: {
            get: function () {
                return this.rootElement.$('.error-message');
            }
        },

        newPassword: {
            get: function () {
                return this.txtNewPassword.getAttribute('value');
            },
            set: function (password) {
                this.txtNewPassword.clear();
                this.txtNewPassword.sendKeys(password);
            }
        }
    };

    before(function () {
        demoPage.go('#/elements/Modals');
        triggerModal = function () {
            encore.rxMisc.slowClick($('#modChangePassword .modal-link'));
        };

        changePasswordModal = encore.rxModalAction.initialize(customFunctionality);
    });

    it('should not display the modal unless triggered', function () {
        expect(changePasswordModal.isDisplayed()).to.eventually.be.false;
    });

    describe('when triggered', function () {
        before(function () {
            triggerModal();
        });

        it('should display the modal', function () {
            expect(changePasswordModal.isDisplayed()).to.eventually.be.true;
        });

        it('should have a title', function () {
            expect(changePasswordModal.title).to.eventually.equal('Change hey_dude Admin Password');
        });

        it('should have a subtitle', function () {
            expect(changePasswordModal.subtitle).to.eventually.equal('Please read instructions below');
        });

        it('should have a custom submit button', function () {
            expect(changePasswordModal.btnSubmit.getText()).to.eventually.equal('Submit Password');
        });

        it('should have a custom cancel button', function () {
            expect(changePasswordModal.btnCancel.getText()).to.eventually.equal('Cancel Request');
        });

        it('should not let me submit the modal by default', function () {
            expect(changePasswordModal.canSubmit()).to.eventually.be.false;
        });

        it('should show a validation error message by default', function () {
            expect(changePasswordModal.txtErrorMessage.isDisplayed()).to.eventually.be.true;
        });

        it('should let me submit the modal when a new password is entered', function () {
            changePasswordModal.newPassword = 'hunter2';
            expect(changePasswordModal.canSubmit()).to.eventually.be.true;
        });

        it('should hide the validation error message when a new password is entered', function () {
            expect(changePasswordModal.txtErrorMessage.isDisplayed()).to.eventually.be.false;
        });

        it('should submit', function () {
            changePasswordModal.submit();
            expect(changePasswordModal.isDisplayed()).to.eventually.be.false;
        });
    });//when triggered

    describe('when triggered and closed', function () {
        beforeEach(function () {
            triggerModal();
        });

        afterEach(function () {
            encore.rxNotify.all.dismiss();
        });

        describe('when closed with the little X in the corner', function () {
            beforeEach(function () {
                changePasswordModal.close();
            });

            it('should close the modal', function () {
                expect(changePasswordModal.isDisplayed()).to.eventually.be.false;
            });

            it('should display an info notification', function () {
                expect(encore.rxNotify.all.isPresent('Password Unchanged', 'info')).to.eventually.be.true;
            });
        });//when closed with "X"

        describe('when closed via the "cancel" button', function () {
            beforeEach(function () {
                changePasswordModal.cancel();
            });

            it('should close the modal', function () {
                expect(changePasswordModal.isDisplayed()).to.eventually.be.false;
            });

            it('should display an info notification', function () {
                expect(encore.rxNotify.all.isPresent('Password Unchanged', 'info')).to.eventually.be.true;
            });
        });//when closed via "cancel"
    });//when triggered and closed

    describe('default modal behavior', function () {
        var defaultModal;

        before(function () {
            defaultModal = encore.rxModalAction.initialize();
        });

        it('should support basic functionality without supplying any arguments', function () {
            triggerModal();
            expect(defaultModal.title).to.eventually.equal('Change hey_dude Admin Password');
            defaultModal.cancel();
        });
    });

    describe('when disabled', function () {
        var defaultModal;

        before(function () {
            triggerModal = function () {
                encore.rxMisc.slowClick($('#btnDisabledModal .modal-link'));
            };
            defaultModal = encore.rxModalAction.initialize();
        });

        it('should not open modal', function () {
            triggerModal();
            expect(defaultModal.isDisplayed()).to.eventually.be.false;
        });

    });
});
