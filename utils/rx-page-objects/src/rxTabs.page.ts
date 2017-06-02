'use strict';
import {by, ElementArrayFinder} from 'protractor';
import {OverrideWebdriver, Promise, rxComponentElement} from './rxComponent';

/**
 * Functionality around interacting with a single tab.
 */
export class rxTab extends rxComponentElement {
    /**
     * Whether or not the tab object is set as active.
     *
     * @example
     * it('should mark the current tab as active when visiting it', function () {
     *     var tab = new rxTabset().byText('Home');
     *     expect(tab.isActive()).to.eventually.be.false;
     *     tab.click();
     *     expect(tab.isActive()).to.eventually.be.true;
     * });
     */
    isActive(): Promise<boolean> {
        return this.getAttribute('class').then(className => className.indexOf('active') > -1);
    }

    /**
     * Override getText to trim the result.
     */
    @OverrideWebdriver
    getText(): Promise<string> {
        return this._originalElement.getText().then(text => text.trim());
    }

    // TODO: Refactor out getName() and getSubtitle() and rely on simply getText().  Component DOM refactor?
    /**
     *
     * @example
     *
     *     it('should have the correct name without subtitle', function () {
     *         expect(new tab().byText('Activity').getName()).to.eventually.equal('Activity');
     *     });
     */
    getName(): Promise<string> {
        return this.getSubtitle().then(subtitle => {
            if (subtitle !== null) {
                return this.getText().then(name => {
                    return name.split(subtitle)[0].trim();
                });
            }
            return this.getText();
        });
    }

    /**
     * The subtitle of the tab. Will parse out the name, if it exists.
     *
     * @example
     * it('should have just the subtitle correct', function () {
     *     expect(new rxTabset().byText('Activity').getSubtitle()).to.eventually.equal('recent first');
     * });
     */
    getSubtitle(): Promise<string> {
        let subtitle = this.$('.subdued');
        return subtitle.isPresent().then(present => {
            if (present) {
                return subtitle.getText().then(text => text.trim());
            }
            return null;
        });
    }
}

/**
 * Functions for interacting with a collection of tabs.
 */
export class rxTabset extends rxComponentElement {

    get cssTabs(): string {
        return '.nav-tabs li';
    }

    get tblTabs(): ElementArrayFinder {
        return this.$$(this.cssTabs);
    }

    /**
     * Returns a [[rxTab]] object for the tab matching `tabName`. This will not be able to
     * differentiate between similarly named tabs with different subtitled names. Include any subtitled text
     * to differentiate between them. Matches on partial text matches.
     *
     * @example
     * it('should find the home tab by name', function () {
     *     var tab = new rxTabset().byText('Home');
     *     expect(tab.getName()).to.eventually.equal('Home');
     * });
     */
    byText(tabName: string): rxTab {
        let tabElement = this.element(by.cssContainingText(this.cssTabs, tabName));
        return new rxTab(tabElement);
    }

    /**
     * Will return the tab at position `index` as a [[rxTab]] object.
     *
     * @example
     * it('should have the home tab in the first position', function () {
     *     expect(new rxTabset().byIndex(0).name).to.eventually.equal('Home');
     * });
     */
    byIndex(tabIndex: number): rxTab {
        return new rxTab(this.tblTabs.get(tabIndex));
    }

    /**
     * A list of all tab names in the collection of tabs, in the order they appear.
     *
     * @example
     * it('should have every tab present', function () {
     *     var tabNames = ['Home', 'Profile', 'Activity'];
     *     expect(new rxTabset().getNames()).to.eventually.eql(tabNames);
     * });
     */
    getTabs(): Promise<rxTab[]> {
        return this.tblTabs.map(tabElement => {
            return new rxTab(tabElement).getText();
        });
    }

    /**
     * Return a [[rxTab]] object for the current active tab.
     * If you attempt to call this method when there is no active tab, you will
     * trigger a NoSuchElementException.
     *
     * @example
     * it('should mark a visited tab as active', function () {
     *     var tab = new rxTabset().byText('Home');
     *     expect(tab.isActive()).to.eventually.be.false;
     *     tab.click();
     *     expect(tab.isActive()).to.eventually.be.true;
     *     expect(new rxTabset().activeTab.getName()).to.eventually.equal('Home');
     * });
     */
    get activeTab(): rxTab {
        return new rxTab(this.$('.nav-tabs .active'));
    }

    /**
     * The number of tabs in the collection of tabs.
     *
     * @example
     * it('should have three tabs', function () {
     *     expect(new rxTabset().count()).to.eventually.equal(3);
     * });
     */
    @OverrideWebdriver
    count(): Promise<number> {
        return this.tblTabs.count();
    }

};
