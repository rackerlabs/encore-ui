'use strict';

import * as _ from 'lodash';
import * as moment from 'moment';
import {by, ElementArrayFinder, ElementFinder} from 'protractor';
import {AccessorPromiseString, OverrideWebdriver, Promise, rxComponentElement} from './rxComponent';
import {rxSelect} from './rxSelect.page';

/**
 * @class
 */
export class rxDatePicker extends rxComponentElement {

    private get currentMonth(): ElementFinder {
        return this.element(by.model('currentMonth'));
    }

    private get currentYear(): ElementFinder {
        return this.element(by.model('currentYear'));
    }

    get currentMonthDays(): ElementArrayFinder {
        return this.$$('.day.inMonth');
    }

    /**
     * @description (get/set) Month value of the picker _calendar_.
     * **Format:** `MM` (e.g. "04", "05", "06").
     */
    get month(): AccessorPromiseString {
        return new rxSelect(this.currentMonth).selectedOption.getText().then(text => {
            return moment(text, 'MMM').format('MM');
        });
    }
    set month(value: AccessorPromiseString) {
        let dropdownExpectedValue = moment(<string> value, 'MM').format('MMM');
        if (dropdownExpectedValue === 'Invalid date') {
            throw new Error(`Unexpected month value for month number "${value}". Months are not zero-indexed!`);
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
        return new rxSelect(this.currentYear).selectedOption.getText();
    }
    set year(value: AccessorPromiseString) {
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
        this.$(`[data-date="${dateString}"]`).$('span').click();
    }

    @OverrideWebdriver
    isEnabled(): Promise<boolean> {
        return this.getAttribute('disabled').then(disabled => !disabled);
    }

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
        return this.$('.arrow.next').click();
    };

    /**
     * @description Click back to the previous month in the calendar.
     */
    previousMonth(): Promise<void> {
        return this.$('.arrow.prev').click();
    };

    /**
     * @description The currently selected date as a string.
     */
    getDateSelected(): Promise<string> {
        return this.$('.day.selected').getAttribute('data-date');
    };

    /**
     * @description Today's date as a string.
     */
    getDateToday(): Promise<string> {
        return this.$('.day.today').getAttribute('data-date');
    };

    /**
     * @description Whether or not the calendar is in an invalid state.
     */
    isValid(): Promise<boolean> {
        return this.getAttribute('class').then(classes => {
            return !_.includes(classes, 'ng-invalid');
        });
    };

    /**
     * @description Whether or not the calendar is open.
     */
    isOpen(): Promise<boolean> {
        return this.$('.popup:not(.ng-hide)').isPresent();
    };
};
