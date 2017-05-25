'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var protractor = require('protractor');
var index = require('../index');
var demoPage = require('../../demo.page');
describe('rxTabset', function () {
    var tabs;
    var tabNames = ['Bacon Ipsum', 'Veggie Ipsum', 'Cat Ipsum (meow)', 'Tupac Ipsum'];
    before(function () {
        demoPage.go('#/elements/Tabs');
        tabs = new index.rxTabset(protractor.$('#tabs'));
    });
    it('should show element', function () {
        expect(tabs.isDisplayed()).to.eventually.be.true;
    });
    it('should count all the tabs', function () {
        expect(tabs.count()).to.eventually.equal(tabNames.length);
    });
    it('should still have all tabs match the test data', function () {
        expect(tabs.getTabs()).to.eventually.eql(tabNames);
    });
    it('should not find tabs that are not represented', function () {
        expect(tabs.byText('Yankovipsum').isPresent()).to.eventually.be.false;
    });
    it('should find tabs that represent', function () {
        expect(tabs.byText('Tupac Ipsum').isPresent()).to.eventually.be.true;
    });
    it('should have an active tab', function () {
        expect(tabs.activeTab.getName()).to.eventually.equal('Bacon Ipsum');
    });
    it('should get a tab by index', function () {
        expect(tabs.byIndex(1).getName()).to.eventually.equal('Veggie Ipsum');
    });
    it('should report null for tabs missing subtitles', function () {
        expect(tabs.byIndex(-1).getSubtitle()).to.eventually.be.null;
    });
    describe('rxTab', function () {
        var tab;
        before(function () {
            tab = tabs.byText('Cat Ipsum');
        });
        it('should be displayed', function () {
            expect(tab.isDisplayed()).to.eventually.be.true;
        });
        it('should still not be the active tab', function () {
            expect(tab.isActive()).to.eventually.be.false;
        });
        it('should report that it is the active tab after clicking it', function () {
            tab.click();
            expect(tab.isActive()).to.eventually.be.true;
        });
        it('should be the active tab in the tabs group', function () {
            expect(tabs.activeTab.getName()).to.eventually.equal('Cat Ipsum');
        });
        it('should have a full name', function () {
            expect(tab.getText()).to.eventually.equal('Cat Ipsum (meow)');
        });
        it('should have a name', function () {
            expect(tab.getName()).to.eventually.equal('Cat Ipsum');
        });
        it('should have a subtitle', function () {
            expect(tab.getSubtitle()).to.eventually.equal('(meow)');
        });
    });
    /* NOTE: This test may become moot/unnecessary with Elements/Utilities refactor */
    describe('main tabs', function () {
        before(function () {
            demoPage.go('#/utilities/rxCapitalize');
        });
        it('should find the only tabs on the page', function () {
            expect(new index.rxTabset(protractor.$('html')).getTabs()).to.eventually.eql(['Markup', 'JavaScript']);
        });
    });
});
