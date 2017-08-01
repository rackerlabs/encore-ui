var Page = require('astrolabe').Page;

describe('rxActionMenu', function () {
    var globalDismiss, localDismiss, customActions;
    var customActionMenuItem = function (actionElement) {
        return Page.create({

            triggerNotification: {
                value: function () {
                    encore.rxMisc.slowClick(actionElement.$('.trigger'));
                }
            }

        });
    };

    var clickSomewhereElse = function () {
        $('#typical-usage').click();
    };

    before(function () {
        demoPage.go('#/elements/ActionMenu');
        globalDismiss = encore.rxActionMenu.initialize($('rx-action-menu#globalDismissal'));
        localDismiss = encore.rxActionMenu.initialize($('rx-action-menu[global-dismiss="false"]'));
        customActions = encore.rxActionMenu.initialize($('rx-action-menu#custom'), customActionMenuItem);
    });

    it('should be visible', function () {
        expect(globalDismiss.isPresent()).to.eventually.be.true;
    });

    it('should be collapsed by default', function () {
        expect(globalDismiss.isExpanded()).to.eventually.be.false;
    });

    it('should expand', function () {
        globalDismiss.expand();
        expect(globalDismiss.isExpanded()).to.eventually.be.true;
    });

    it('should also collapse', function () {
        globalDismiss.collapse();
        expect(globalDismiss.isExpanded()).to.eventually.be.false;
    });

    it('should support global dismiss', function () {
        globalDismiss.expand();
        clickSomewhereElse();
        expect(globalDismiss.isExpanded()).to.eventually.be.false;
    });

    it('should not globally dismiss if unsupported', function () {
        localDismiss.expand();
        clickSomewhereElse();
        expect(localDismiss.isExpanded()).to.eventually.be.true;
    });

    it('should only dismiss exactly if supported', function () {
        localDismiss.collapse();
        expect(localDismiss.isExpanded()).to.eventually.be.false;
    });

    it('should find an action that is present and displayed', function () {
        expect(localDismiss.hasAction('Delete')).to.eventually.be.true;
    });

    it('should not find an action that is present but not displayed', function () {
        expect(customActions.hasAction('Visually Hidden')).to.eventually.be.false;
    });

    it('should not find an action that is neither present nor displayed', function () {
        expect(localDismiss.hasAction('Non-Existent')).to.eventually.be.false;
    });

    describe('default action menu items', function () {
        var actionItem;

        before(function () {
            actionItem = globalDismiss.action('Add');
        });

        it('should have two items', function () {
            expect(globalDismiss.actionCount()).to.eventually.equal(2);
        });

        it('should have a root element', function () {
            expect(actionItem.rootElement).to.exist;
        });

        it('should have text', function () {
            expect(actionItem.getText()).to.eventually.equal('Add');
        });

        it('should include custom functionality for a modal', function () {
            var modal = actionItem.openModal({});
            expect(modal.title).to.eventually.equal('Add Action');
            modal.cancel();
        });

    });

    describe('custom action menu items', function () {
        var actionItem;

        before(function () {
            actionItem = customActions.action('Delete');
        });

        it('should not have any text', function () {
            expect(actionItem.getText).to.not.exist;
        });

        it('should not have a root element', function () {
            expect(actionItem.rootElement).to.not.exist;
        });

        it('should offer custom functionality', function () {
            actionItem.triggerNotification();
            expect(encore.rxNotify.all.count()).to.eventually.equal(1);
        });

    });

});
