'use strict';

import {expect} from 'chai';
import {$} from 'protractor';

import {Tab, Tabs} from '../index';

let demoPage = require('../../demo.page');

describe('tabs', () => {
    let tabs: Tabs;
    let tabNames = ['Bacon Ipsum', 'Veggie Ipsum', 'Cat Ipsum (meow)', 'Tupac Ipsum'];

    before(() => {
        demoPage.go('#/elements/Tabs');
        tabs = new Tabs($('#tabs'));
    });

    it('should show element', () => {
        expect(tabs.isDisplayed()).to.eventually.be.true;
    });

    it('should count all the tabs', () => {
        expect(tabs.count()).to.eventually.equal(tabNames.length);
    });

    it('should still have all tabs match the test data', () => {
        expect(tabs.getTabs()).to.eventually.eql(tabNames);
    });

    it('should not find tabs that are not represented', () => {
        expect(tabs.byText('Yankovipsum').isPresent()).to.eventually.be.false;
    });

    it('should find tabs that represent', () => {
        expect(tabs.byText('Tupac Ipsum').isPresent()).to.eventually.be.true;
    });

    it('should have an active tab', () => {
        expect(tabs.activeTab.getName()).to.eventually.equal('Bacon Ipsum');
    });

    it('should get a tab by index', () => {
        expect(tabs.byIndex(1).getName()).to.eventually.equal('Veggie Ipsum');
    });

    it('should report null for tabs missing subtitles', () => {
        expect(tabs.byIndex(-1).getSubtitle()).to.eventually.be.null;
    });

    describe('tab', () => {
        let tab: Tab;

        before(() => {
            tab = tabs.byText('Cat Ipsum');
        });

        it('should be displayed', () => {
            expect(tab.isDisplayed()).to.eventually.be.true;
        });

        it('should still not be the active tab', () => {
            expect(tab.isActive()).to.eventually.be.false;
        });

        it('should report that it is the active tab after clicking it', () => {
            tab.click();
            expect(tab.isActive()).to.eventually.be.true;
        });

        it('should be the active tab in the tabs group', () => {
            expect(tabs.activeTab.getName()).to.eventually.equal('Cat Ipsum');
        });

        it('should have a full name', () => {
            expect(tab.getText()).to.eventually.equal('Cat Ipsum (meow)');
        });

        it('should have a name', () => {
            expect(tab.getName()).to.eventually.equal('Cat Ipsum');
        });

        it('should have a subtitle', () => {
            expect(tab.getSubtitle()).to.eventually.equal('(meow)');
        });

    });

    /* NOTE: This test may become moot/unnecessary with Elements/Utilities refactor */
    describe('main tabs', () => {

        before(() => {
            demoPage.go('#/utilities/rxCapitalize');
        });

        it('should find the only tabs on the page', () => {
            expect(new Tabs($('html')).getTabs()).to.eventually.eql(['Markup', 'JavaScript']);
        });

    });

});
