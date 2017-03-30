'use strict';

import {ElementFinder} from 'protractor';
import {AccessorPromiseString, OverrideWebdriver, Promise, rxComponentElement} from './rxComponent';
import {rxSelect} from './rxSelect.page';

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
    get eleControl(): ElementFinder {
        return this.$('.control');
    }
    get txtHour(): ElementFinder {
        return this.$('.hour');
    }
    get txtMinutes(): ElementFinder {
        return this.$('.minutes');
    }
    get btnSubmit(): ElementFinder {
        return this.$('button.done');
    }
    get btnCancel(): ElementFinder {
        return this.$('button.cancel');
    }
    get selPeriod(): ElementFinder {
        return this.$('.period');
    }
    get selUtcOffset(): ElementFinder {
        return this.$('.utcOffset');
    }
    get txtDisplayValue(): ElementFinder {
        return this.$('.displayValue');
    }

    // Private Page Objects
    get pagePeriod(): rxSelect {
        return new rxSelect(this.selPeriod);
    }
    get pageUtcOffset(): rxSelect {
        return new rxSelect(this.selUtcOffset);
    }

    getErrors(): Promise<string[]> {
        // Necessary to cast to any to overcome bad protractor typings
        return <any> this.$$('rx-inline-error').getText();
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
        let offset = parseUtcOffset(<string> timeString);
        // force to time zone from input
        date.utcOffset(offset);

        // set via picker
        this.open();

        this.hours = date.format('hh'); // 12-hour format (no padding)
        this.minutes = date.format('mm'); // padded minutes
        this.pagePeriod.select(date.format('A'));
        this.pageUtcOffset.select(date.format('Z'));
        this.submit();
    }

    /**
     * @description Whether the picker can be submitted
     */
    canSubmit(): Promise<boolean> {
        return this.btnSubmit.isEnabled();
    }

    /**
     * @description Whether the picker can be submitted
     */
    canCancel(): Promise<boolean> {
        return this.btnCancel.isEnabled();
    }

    /**
     * @description Whether the picker is open
     */
    isOpen(): Promise<boolean> {
        return this.$('.popup').getAttribute('class').then(classes => !_.includes(classes, 'ng-hide'));
    }

    /**
     * @description Open picker
     */
    open(): Promise<void> {
        return this.isOpen().then(opened => (!opened) && this.eleControl.click());
    }

    /**
     * @description Close picker
     */
    close(): Promise<void> {
        return this.isOpen().then(opened => opened && this.eleControl.click());
    }

    /**
     * @description Submit and close picker
     */
    @OverrideWebdriver
    submit(): Promise<void> {
        return this.btnSubmit.click();
    }

    /**
     * @description Cancel picker, without updating value
     */
    cancel(): Promise<void> {
        return this.btnCancel.click();
    }
}

/**
 * @description return offset value, if present in string
 *
 * **NOTE:** Logic in this function must match the logic in
 * the rxTimePickerUtil service.
 */
export function parseUtcOffset(stringValue: string): string {
    let regex = /([-+]\d{2}:?\d{2})/;
    let matched = stringValue.match(regex);
    return (matched ? matched[0] : '');
}
