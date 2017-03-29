'use strict';

import {expect} from 'chai';
import {$} from 'protractor';

import {rxAction, rxActionMenu} from '../index';

let demoPage = require('../../demo.page');

describe('rxActionMenu', () => {
    let globalDismiss: rxActionMenu;
    let localDismiss: rxActionMenu;
    let customActions: rxActionMenu;

    let clickSomewhereElse = () => {
        $('#typical-usage').click();
    };

    before(() => {
        demoPage.go('#/elements/ActionMenu');
        globalDismiss = new rxActionMenu($('rx-action-menu#globalDismissal'));
        localDismiss = new rxActionMenu($('rx-action-menu[global-dismiss="false"]'));
        customActions = new rxActionMenu($('rx-action-menu#custom'));
    });

    it('should be visible', () => {
        expect(globalDismiss.isPresent()).to.eventually.be.true;
    });

    it('should be collapsed by default', () => {
        expect(globalDismiss.isExpanded()).to.eventually.be.false;
    });

    it('should expand', () => {
        globalDismiss.expand();
        expect(globalDismiss.isExpanded()).to.eventually.be.true;
    });

    it('should also collapse', () => {
        globalDismiss.collapse();
        expect(globalDismiss.isExpanded()).to.eventually.be.false;
    });

    it('should support global dismiss', () => {
        globalDismiss.expand();
        clickSomewhereElse();
        expect(globalDismiss.isExpanded()).to.eventually.be.false;
    });

    it('should not globally dismiss if unsupported', () => {
        localDismiss.expand();
        clickSomewhereElse();
        expect(localDismiss.isExpanded()).to.eventually.be.true;
    });

    it('should only dismiss exactly if supported', () => {
        localDismiss.collapse();
        expect(localDismiss.isExpanded()).to.eventually.be.false;
    });

    it('should find an action that is present and displayed', () => {
        expect(localDismiss.hasAction('Delete')).to.eventually.be.true;
    });

    it('should not find an action that is present but not displayed', () => {
        expect(customActions.hasAction('Visually Hidden')).to.eventually.be.false;
    });

    it('should not find an action that is neither present nor displayed', () => {
        expect(localDismiss.hasAction('Non-Existent')).to.eventually.be.false;
    });

    describe('default action menu items', () => {
        let actionItem: rxAction;

        before(() => {
            actionItem = globalDismiss.action('Add');
        });

        it('should have two items', () => {
            expect(globalDismiss.actionCount()).to.eventually.equal(2);
        });
    });
});
