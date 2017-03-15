'use strict';

import * as _ from 'lodash';
import * as moment from 'moment';
import {ElementFinder} from 'protractor';
import {by} from 'protractor';
import {AccessorPromiseString, OverrideWebdriver, Promise, rxComponentElement} from './rxComponent';
import {rxSelect} from './rxSelect.page';

/**
 * @class
 */
export class rxDatePicker extends rxComponentElement {
    private get currentMonth() {
        return this.element(by.model('currentMonth'));
    }
    private get currentYear() {
        return this.element(by.model('currentYear'));
    }

    get tblCurrentMonthDays() {
        return this.$$('.day.inMonth');
    }

    @OverrideWebdriver
    isEnabled() {
        return this.getAttribute('disabled')
            .then(disabled => !disabled);
    }

    /**
     * @description (get/set) Month value of the picker _calendar_.
     * **Format:** `MM` (e.g. "04", "05", "06").
     */
    get month(): AccessorPromiseString {
        // Check if it's open, we'll try to open it anyway but this is so we can put it back.
        return this.isOpen().then(isOpen => {
            this.open(); // you have to in order to get to the dropdown

            let month = new rxSelect(this.currentMonth).selectedOption.getText().then(text => {
                return moment(text, 'MMM').format('MM');
            });

            // if datepicker was closed before starting, put it back
            if (!isOpen) {
                this.close();
            }

            return month;
        });
    }
    set month(value: AccessorPromiseString) {
        this.open();
        let dropdownExpectedValue = moment(<string> value, 'MM').format('MMM');
        if (dropdownExpectedValue === 'Invalid date') {
            throw new Error(
                `Unexpected month value for month number "${value}". Months are not zero-indexed!`,
            );
        }

        new rxSelect(this.currentMonth).select(dropdownExpectedValue);
    }

    /**
     * @description (get/set) Year value of the picker _calendar_.
     *
     * The date picker provides a 10-year range before and after the selected date,
     * if present.  Otherwise, the range is calculated from today's date.
     *
     * **Format:** `YYYY` (e.g. "2016")
     */
    get year(): AccessorPromiseString {
        return this.isOpen().then(isOpen => {
            this.open(); // you have to in order to get to the dropdown
            let year = new rxSelect(this.currentYear).selectedOption.getText();

            // if datepicker was closed before starting, put it back
            if (!isOpen) {
                this.close();
            }

            return year;
        });
    }
    set year(value: AccessorPromiseString) {
        this.open();
        new rxSelect(this.currentYear).select(value);
    }

    /**
     * @description (get/set) _Selected value_ of the picker.
     * **Format:** `YYYY-MM-DD` (e.g. "2016-05-25")
     * @example
     * let datepicker = new rxDatePicker($('rx-date-picker'));
     * datepicker.date = '2016-01-01';
     * expect(datepicker.date).to.eventually.equal('2016-01-01');
     */
    get date(): AccessorPromiseString {
        return this.$('.displayValue').getAttribute('datetime');
    }
    set date(dateString: AccessorPromiseString) {
        let date = moment(dateString as string, 'YYYY-MM-DD');
        this.month = date.format('MM');
        this.year = date.format('YYYY');
        this._selectVisibleDate(dateString as string);
    }

    /**
     * @description
     * Sets the calendar's date by clicking the date corresponding to the value of
     * `date`.
     * @example
     * let picker = new rxDatePicker($('rx-date-picker'));
     * picker._selectVisibleDate('2014-05-13');
     * expect(picker.date).to.eventually.eq('2014-05-13');
     */
    private _selectVisibleDate(date: string): Promise<void> {
        this.open();
        return this._dateElementByDate(date).$('span').click();
    };

    /**
     * @description
     * Return a day seen on the picker calendar that corresponds to the value of
     * `date`.
     * @example
     * let picker = new encore.rxDatePicker();
     * picker.open();
     * picker._dateElementByDate('2012-06-23').getAttribute('class');
     */
    private _dateElementByDate(date: string): ElementFinder {
        return this.$(`[data-date="${date}"]`);
    };

    /**
     * @see rxDatePicker#close
     * @description Ensures that the date picker is open.
     * @example
     * let picker = new encore.rxDatePicker();
     * picker.open();
     * picker.open(); // does nothing
     */
    open(): Promise<void> {
        return this.isOpen().then(open => {
            if (!open) {
                return this.$('.control').click();
            }
        });
    };

    /**
     * @see rxDatePicker#open
     * @description Ensures that the date picker is closed.
     * @example
     * let picker = new encore.rxDatePicker();
     * picker.open();
     * picker.close();
     * picker.close(); // does nothing
     */
    close(): Promise<void> {
        return this.isOpen().then(isOpen => {
            if (isOpen) {
                return this.$('.control').click();
            }
        });
    };

    /**
     * @description Click over to the next month in the calendar.
     */
    nextMonth(): Promise<void> {
        this.open();
        return this.$('.arrow.next').click();
    };

    /**
     * @description Click back to the previous month in the calendar.
     */
    previousMonth(): Promise<void> {
        this.open();
        return this.$('.arrow.prev').click();
    };

    /**
     * @description Whether or not the date requested is currently selected.
     */
    isDateSelected(date: string) {
        this.open();
        return this._dateElementByDate(date).getAttribute('class')
            .then(classes => _.includes(classes, 'selected'));
    };

    /**
     * @description
     * Whether or not the date passed in matches the "today" date in the calendar.
     */
    isDateToday(date: string) {
        this.open();
        return this._dateElementByDate(date).getAttribute('class')
            .then(classes => _.includes(classes, 'today'));
    };

    /**
     * @description Whether or not the calendar is in an invalid state.
     */
    isValid() {
        return this.getAttribute('class')
            .then(classes => !_.includes(classes, 'ng-invalid'));
    };

    /**
     * @description Whether or not the calendar is open.
     */
    isOpen() {
        return this.$('.popup').getAttribute('class')
            .then(classes => !_.includes(classes, 'ng-hide'));
    };
};
