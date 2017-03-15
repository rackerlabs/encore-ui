'use strict';

import {by} from 'protractor';
import {AccessorPromiseString, OverrideWebdriver, rxComponentElement} from './rxComponent';
import {rxSelect} from './rxSelect.page';
import {rxTimePickerUtil} from './rxTimePickerUtil.page';

import * as _ from 'lodash';
import * as moment from 'moment';

/**
 * @class
 * @example
 * var picker = new encore.rxTimePicker($('#myTimePicker'));
 *
 * // ===== Modifying Time =====
 * picker.time = '18:45+04:00'; // automatically commits change
 * picker.time; // '18:45+04:00'
 * picker.hour; // '6'
 * picker.minutes; // '45'
 * picker.period; // 'PM'
 * picker.offset; // '+04:00'
 *
 * // ===== Modifying Time Parts =====
 *
 * // cannot modify without opening picker
 * picker.open();
 *
 * picker.hour = 12;
 * picker.minutes = 15;
 * picker.period = 'PM';
 * picker.offset = '-05:00';
 * picker.time; // '18:45+04:00' (currently unchanged)
 *
 * // makes changes to `time` and automatically closes picker
 * picker.submit();
 *
 * picker.time; // '12:15-05:00' (value updated)
 * picker.hour; // '12'
 * picker.minutes; // '15'
 * picker.period; // 'PM'
 * picker.offset; // '-05:00'
 */
export class rxTimePicker extends rxComponentElement {
    // Private selectors
    get eleControl() {
        return this.$('.control');
    }
    get txtHour() {
        return this.$('.hour');
    }
    get txtMinutes() {
        return this.$('.minutes');
    }
    get btnSubmit() {
        return this.$('button.done');
    }
    get btnCancel() {
        return this.$('button.cancel');
    }
    get selPeriod() {
        return this.$('.period');
    }
    get selUtcOffset() {
        return this.$('.utcOffset');
    }
    get txtDisplayValue() {
        return this.$('.displayValue');
    }

    // Private Page Objects
    get pagePeriod() {
        return new rxSelect(this.selPeriod);
    }
    get pageUtcOffset() {
        return new rxSelect(this.selUtcOffset);
    }

    getErrors() {
        return this.$$('rx-inline-error').getText();
    }

    get hours(): AccessorPromiseString {
        return this.txtHour.getAttribute('value');
    }
    set hours(hour) {
        this.txtHour.clear();
        this.txtHour.sendKeys(hour);
    }

    get minutes(): AccessorPromiseString {
        return this.txtMinutes.getAttribute('value');
    }
    set minutes(minutes) {
        this.txtMinutes.clear();
        this.txtMinutes.sendKeys(minutes);
    }

    get period(): AccessorPromiseString {
        return this.pagePeriod.selectedOption.getText();
    }
    set period(period) {
        this.pagePeriod.select(period);
    }

    get utcOffset(): AccessorPromiseString {
        return this.pageUtcOffset.selectedOption.getText();
    }
    set utcOffset(utcOffset) {
        this.pageUtcOffset.select(utcOffset);
    }

    get time(): AccessorPromiseString {
        return this.txtDisplayValue.getAttribute('data-time');
    }
    set time(timeString) {
        // Accept ISO 8601 Standard Time Format OR custom display format
        let date = moment(<string> timeString, 'HH:mmZ');

        // `date` is currently in local TZ (not expected TZ)
        // extract the expected TZ to update `date`
        let offset = rxTimePickerUtil.parseUtcOffset(<string> timeString);
        // force to time zone from input
        date.utcOffset(offset);

        // set via picker
        this.open();

        this.hours = date.format('hh'); // 12-hour format (no padding)
        this.minutes = date.format('mm'); // padded minutes
        this.selPeriod.element(by.cssContainingText('option', date.format('A'))).click();
        this.selUtcOffset.element(by.cssContainingText('option', date.format('Z'))).click();
        this.submit();
    }

    /**
     * @description Whether the picker can be submitted
     */
    canSubmit() {
        return this.btnSubmit.isEnabled();
    }

    /**
     * @description Whether the picker can be submitted
     */
    canCancel() {
        return this.btnCancel.isEnabled();
    }

    /**
     * @description Whether the picker is open
     */
    isOpen() {
        return this.$('.popup').getAttribute('class').then(classes => !_.includes(classes, 'ng-hide'));
    }

    /**
     * @description Open picker
     */
    open() {
        return this.isOpen().then(opened => (!opened) && this.eleControl.click());
    }

    /**
     * @description Close picker
     */
    close() {
        return this.isOpen().then(opened => opened && this.eleControl.click());
    }

    /**
     * @description Submit and close picker
     */
    @OverrideWebdriver
    submit() {
        return this.btnSubmit.click();
    }

    /**
     * @description Cancel picker, without updating value
     */
    cancel() {
        return this.btnCancel.click();
    }
}
