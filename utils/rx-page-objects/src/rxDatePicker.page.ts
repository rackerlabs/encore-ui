'use strict';

import * as moment from 'moment';
import * as _ from 'lodash';
import {ElementFinder, ElementArrayFinder} from 'protractor';
import {$$, browser, by, protractor} from 'protractor';
import {rxComponentElement, AccessorPromiseString, Promise} from './rxComponent';

let rxSelect = require('./rxSelect.page').rxSelect;

/**
 * @class
 */
export class rxDatePicker extends rxComponentElement {
    public rootElement: ElementFinder;
    public tblCurrentMonthDays: ElementArrayFinder;

    /**
     * @param {ElementFinder} [rxDatePickerElement=$('rx-date-picker')]
     * ElementFinder to be transformed into an rxDatePicker page object
     * @returns {rxDatePicker}
     */
    constructor(rxDatePickerElement?: ElementFinder) {
        if (!rxDatePickerElement) {
            rxDatePickerElement = $$('rx-date-picker').first();
        }

        super(rxDatePickerElement);
        this.rootElement = rxDatePickerElement; // deprecate in 3.x

        this.tblCurrentMonthDays = this.$$('.day.inMonth');

        // Overrides
        this.isEnabled = (): Promise<boolean> => {
            return this.getAttribute('disabled')
                .then((disabled) => !disabled);
        };
    }

    /**
     * @private
     * @type {String}
     * @description (get/set) Month value of the picker _calendar_.
     * **Format:** `MM` (e.g. "04", "05", "06")
     */
    get month(): AccessorPromiseString {
        let currentMonth = this.element(by.model('currentMonth'));
        return this.isOpen().then(isOpen => {
            this.open(); // you have to in order to get to the dropdown

            return rxSelect.initialize(currentMonth).selectedOption.getText().then(month => {
                // if datepicker was closed before starting, put it back
                if (!isOpen) {
                    this.close();
                }

                return moment(`${month} 2000`, 'MMM YYYY').format('MM');
            });
        });
    }
    set month(value: AccessorPromiseString) {
        this.open();
        let dropdownExpectedValue = moment(`2000-${value}`, 'YYYY-MM').format('MMM');
        if (dropdownExpectedValue === 'Invalid date') {
            throw new Error(
                `Unexpected month value for month number "${value}". Months are not zero-indexed!`
            );
        }

        let slowClick = false;
        rxSelect.initialize(this.element(by.model('currentMonth'))).select(dropdownExpectedValue, slowClick);
    }

    /**
     * @private
     * @type {String}
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
            let year = rxSelect.initialize(this.element(by.model('currentYear'))).selectedOption.getText();

            // if datepicker was closed before starting, put it back
            if (!isOpen) {
                this.close();
            }

            return year;
        });
    }
    set year(value: AccessorPromiseString) {
        this.open();
        let slowClick = false;
        rxSelect.initialize(this.element(by.model('currentYear'))).select(value, slowClick);
    }

    /**
     * @type {String}
     * @description (get/set) _Selected value_ of the picker.
     *
     * **Format:** `YYYY-MM-DD` (e.g. "2016-05-25")
     * @example
     * let datepicker = new encore.rxDatePicker();
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
     * @private
     * @description
     * Sets the calendar's date by clicking the date corresponding to the value of
     * `date`.
     *
     * @param {String} date
     * `YYYY-MM-DD` formatted string to select on the current month.
     *
     * @example
     * let picker = new rxDatePicker();
     * picker._selectVisibleDate('2014-05-13');
     * expect(picker.date).to.eventually.eq('2014-05-13');
     */
    private _selectVisibleDate(date: string): Promise<void> {
        this.open();
        return this._dateElementByDate(date).$('span').click();
    };

    /**
     * @private
     * @deprecated Now that datepickers return strings, this complicated logic is not needed.
     * @description
     * Will select the last day of the current month seen on the picker calendar.
     * Does not accept arguments. Set the calendar month yourself with
     * {@link rxDatePicker#month} and {@link rxDatePicker#year} first, so that logic
     * picks the correct date.
     */
    private _selectLastDayOfCurrentMonth(): Promise<void> {
        this.open();
        return protractor.promise.all([
            (this.month as Promise<string>),
            (this.year as Promise<string>),
        ]).then(results => {
            let month = results[0];
            let year = results[1];
            let formattedDate = `${year}-${month}`;
            let lastOfMonth = moment(formattedDate, 'YYYY-MM').endOf('month');
            return this._selectVisibleDate(lastOfMonth.format('YYYY-MM-DD'));
        });
    };

    /**
     * @private
     * @description
     * Return a day seen on the picker calendar that corresponds to the value of
     * `date`.
     *
     * @param {String} date
     * `YYYY-MM-DD` formatted string of the date to select.
     *
     * @example
     * let picker = new encore.rxDatePicker();
     * picker.open();
     * picker._dateElementByDate('2012-06-23').getAttribute('class');
     *
     * @returns {ElementFinder}
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
        return this.isOpen().then((open) => {
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
        return this.isOpen().then((isOpen) => {
            if (isOpen) {
                return this.$('.control').click();
            }
        });
    };

    /**
     * @private
     * @description Click over to the next month in the calendar.
     */
    nextMonth(): Promise<void> {
        this.open();
        return this.$('.arrow.next').click();
    };

    /**
     * @private
     * @description Click back to the previous month in the calendar.
     */
    previousMonth(): Promise<void> {
        this.open();
        return this.$('.arrow.prev').click();
    };

    /**
     * @description Whether or not the date requested is currently selected.
     * @param {String} date
     * `YYYY-MM-DD` formatted date to check if it is currently selected.
     * @returns {Promise<Boolean>}
     */
    isDateSelected(date: string): Promise<boolean> {
        this.open();
        return this._dateElementByDate(date).getAttribute('class')
            .then(classes => _.includes(classes, 'selected'));
    };

    /**
     * @private
     * @description
     * Whether or not the date passed in matches the "today" date in the calendar.
     * @param {String} date
     * `YYYY-MM-DD` formatted date to check if it is styled as today's date.
     * @returns {Promise<Boolean>}
     */
    isDateToday(date: string): Promise<boolean> {
        this.open();
        return this._dateElementByDate(date).getAttribute('class')
            .then(classes => _.includes(classes, 'today'));
    };

    /**
     * @description Whether or not the calendar is in an invalid state.
     * @returns {Promise<Boolean>}
     */
    isValid(): Promise<boolean> {
        return this.getAttribute('class')
            .then(classes => !_.includes(classes, 'ng-invalid'));
    };

    /**
     * @description Whether or not the calendar is open.
     * @returns {Promise<Boolean>}
     */
    isOpen(): Promise<boolean> {
        return this.$('.popup').getAttribute('class')
            .then(classes => !_.includes(classes, 'ng-hide'));
    };

    /**
     * @param {ElementFinder} rxDatePickerElement
     * @deprecated Prefer use of `new` constructor. Will be removed at version 3.0.
     * ElementFinder to be transformed into an rxDatePicker page object.
     * @returns {rxDatePicker} Page object representing the rxDatePicker element.
     */
    static initialize(rxDatePickerElement?: ElementFinder): rxDatePicker {
        return new rxDatePicker(rxDatePickerElement);
    };

};
