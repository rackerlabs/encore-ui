'use strict';

import * as _ from 'lodash';
import {ElementFinder} from 'protractor';
import {OverrideWebdriver, Promise, rxComponentElement} from './rxComponent';

/**
 * Functionality around interacting with toggle switches.
 */
export class rxToggleSwitch extends rxComponentElement {
    get btnToggleSwitch(): ElementFinder {
        return this.$('.rx-toggle-switch');
    }

    /**
     * whether or not the toggle switch has interaction enabled.
     */
    @OverrideWebdriver
    isEnabled(): Promise<boolean> {
        return this.btnToggleSwitch.getAttribute('disabled').then(_.isNull);
    }

    /**
     * Toggles the switch to the "on" position. If the toggle switch is already
     * set to this position, nothing happens.
     *
     * @example
     *
     *     it('should enable the switch', function () {
     *         var mySwitch = new encore.rxToggleSwitch($('.phasers-online'));
     *         expect(mySwitch.isToggled()).to.eventually.be.false;
     *         mySwitch.toggleOn();
     *         expect(mySwitch.isToggled()).to.eventually.be.true;
     *         mySwitch.toggleOn(); // does nothing the second time it is called
     *         expect(mySwitch.isToggled()).to.eventually.be.true;
     *     });
     */
    toggleOn(): Promise<void> {
        return this.isToggled().then(toggled => (!toggled) && this.btnToggleSwitch.click());
    }

    /**
     * Toggles the switch to the "off" position. If the toggle switch is already
     * set to this position, nothing happens.
     *
     * @example
     *
     *     it('should disable the switch', function () {
     *         var mySwitch = new encore.rxToggleSwitch($('.shields-up'));
     *         expect(mySwitch.isToggled()).to.eventually.be.true;
     *         mySwitch.toggleOff();
     *         expect(mySwitch.isToggled()).to.eventually.be.false;
     *         mySwitch.toggleOff(); // does nothing the second time it is called
     *         expect(mySwitch.isToggled()).to.eventually.be.false;
     *     });
     */
    toggleOff(): Promise<void> {
        return this.isToggled().then(toggled => toggled && this.btnToggleSwitch.click());
    }

    /**
     * Whether or not the switch component is currently set to the "on" position.
     */
    isToggled(): Promise<boolean> {
        return this.getText().then(text => (text === 'ON') ? true : false);
    }

    /**
     * The current text of the switch.
     *
     * @example
     *
     *     it('should toggle to the "on" position', function () {
     *         var mySwitch = new encore.rxToggleSwitch($('.torpedos-ready'));
     *         mySwitch.enable();
     *         expect(mySwitch.getText()).to.eventually.equal('ON');
     *     });
     */
    @OverrideWebdriver
    getText(): Promise<string> {
        return this.btnToggleSwitch.$('span').getText();
    }
}
