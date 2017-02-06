import {expect} from 'chai';
import * as _ from 'lodash';
import * as moment from 'moment';

import * as component from './rxDatePicker.page';
import {Promise} from './rxComponent';

interface rxDatePickerExerciseOptions {
    instance?: component.rxDatePicker;
    isPresent?: boolean;
    isDisplayed?: boolean;
    isEnabled?: boolean;
    isValid?: boolean;
    isOpen?: boolean;
    selectedDate?: string | null;
};

/**
 * rxDatePicker exercises.
 * @exports exercise/rxDatePicker
 * @param {Object} options - Test options. Used to build valid tests.
 * @param {rxDatePicker} [options.instance=new rxDatePicker()] - Component to exercise.
 * @param {Boolean} [options.isPresent=true] - Whether or not the datepicker is present.
 * @param {Boolean} [options.isDisplayed=true] - Whether or not the datepicker is displayed.
 * @param {Boolean} [options.isValid=true] - Whether or not the datepicker is valid.
 * @param {Boolean} [options.isOpen=false] -
 * Whether or not the datepicker has its calendar open.
 * @param {String} [options.selectedDate=null] - The current date that
 * is selected in the datepicker. Pass in `null` for an empty date picker.
 * @example
 * describe('default exercises', encore.exercise.rxDatePicker({
 *     instance: myPage.datepicker, // select one of many pagination instances from your page objects
 *     isValid: false,
 *     selectedDate: moment().format('YYYY-MM-DD')
 * }));
 */
export function rxDatePicker (options: rxDatePickerExerciseOptions) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        instance: new component.rxDatePicker(),
        isPresent: true,
        isDisplayed: true,
        isEnabled: true,
        isValid: true,
        isOpen: false,
        selectedDate: null
    });

    // avoid mangling mocha's `this` context by not using fat-arrow syntax
    return function () {
        let selectedYear: string;
        let selectedMonth: string;
        let selectedDay: string;

        let datepicker: component.rxDatePicker;
        let isoFormat = 'YYYY-MM-DD';
        let formatYear = 'YYYY';
        let formatMonth = 'MM';
        let formatDay = 'DD';

        let currentMonthYear: string;
        let previousMonth: moment.Moment;
        let nextMonth: moment.Moment;

        if (options.selectedDate) {
            let m = moment(options.selectedDate);
            selectedYear = m.format(formatYear);
            selectedMonth = m.format(formatMonth);
            selectedDay = m.format(formatDay);
        } else {
            let m = moment();
            selectedYear = m.format(formatYear);
            selectedMonth = m.format(formatMonth);
            // there is no selected day in a blank datepicker
        }

        before(function () {
            datepicker = options.instance;
        });

        it(`should ${options.isPresent ? '' : 'not '}be present`, function () {
            expect(datepicker.isPresent()).to.eventually.equal(options.isPresent);
        });

        if (!options.isPresent) {
            return;
        }

        it(`should ${options.isDisplayed ? '' : 'not '}be displayed`, function () {
            expect(datepicker.isDisplayed()).to.eventually.equal(options.isDisplayed);
        });

        if (!options.isDisplayed) {
            return;
        }

        if (options.selectedDate !== null) {
            it(`should have '${options.selectedDate}' as the current selected date`, function () {
                expect(datepicker.date).to.eventually.equal(options.selectedDate);
            });
        }

        it(`should ${options.isValid ? '' : 'not '}be valid`, function () {
            expect(datepicker.isValid()).to.eventually.equal(options.isValid);
        });

        it(`should ${options.isEnabled ? '' : 'not '}be enabled`, function () {
            expect(datepicker.isEnabled()).to.eventually.equal(options.isEnabled);
        });

        it(`should ${options.isOpen ? '' : 'not '}already have the calendar open`, function () {
            expect(datepicker.isOpen()).to.eventually.equal(options.isOpen);
        });

        if (!options.isEnabled) {
            return;
        }

        it(`should have '${selectedMonth}' as the current selected month in the dropdown`, function () {
            expect(datepicker.month).to.eventually.equal(selectedMonth);
        });

        it(`should have '${selectedYear}' as the current selected year in the dropdown`, function () {
            expect(datepicker.year).to.eventually.equal(selectedYear);
        });

        it(`should ${options.isOpen ? 'close ' : 'open '}the calendar`, function () {
            options.isOpen ? datepicker.close() : datepicker.open();
            expect(datepicker.isOpen()).to.eventually.equal(!options.isOpen);
        });

        it('should return the calendar back to its original state', function () {
            options.isOpen ? datepicker.open() : datepicker.close();
            expect(datepicker.isOpen()).to.eventually.equal(options.isOpen);
        });

        it('should have some days that are in the current month', function () {
            datepicker.open();
            expect(datepicker.tblCurrentMonthDays.count()).to.eventually.be.above(0);
        });

        it('should have some days that are out of the current month', function () {
            expect(datepicker.$$('.day.outOfMonth').count()).to.eventually.be.above(0);
        });

        it('should not select a date that is out of month', function () {
            (datepicker.date as Promise<string>).then(currentDate => {
                datepicker.$$('.day.outOfMonth span').each(invalidDay => {
                    invalidDay.click();
                    expect(datepicker.date).to.eventually.equal(currentDate);
                });
            });
        });

        it('should navigate back one month', function () {
            (datepicker.year as Promise<string>).then(year => {
                (datepicker.month as Promise<string>).then(month => {
                    datepicker.previousMonth();
                    currentMonthYear = `${year}-${month}`;
                    previousMonth = moment(currentMonthYear, 'YYYY-MM').subtract(1, 'month');
                    expect(datepicker.month).to.eventually.equal(previousMonth.format(formatMonth));
                });
            });
        });

        it('should navigate forward two months', function () {
            datepicker.nextMonth();
            datepicker.nextMonth();
            nextMonth = moment(currentMonthYear).add(1, 'month');
            expect(datepicker.month).to.eventually.equal(nextMonth.format(formatMonth));
        });

        it('should reopen the calendar and have the month unchanged', function () {
            datepicker.close();
            datepicker.open();
            expect(datepicker.month).to.eventually.equal(nextMonth.format(formatMonth));
            expect(datepicker.year).to.eventually.equal(nextMonth.format(formatYear));
            datepicker.previousMonth();
        });

        if (options.selectedDate !== null) {
            it('should update the date to one month from now', function () {
                datepicker.date = nextMonth.format(isoFormat);
                expect(datepicker.date).to.eventually.equal(nextMonth.format(isoFormat));
            });

            it('should update the date to one month ago', function () {
                let previousMonth = moment().subtract(1, 'months').format(isoFormat);
                datepicker.date = previousMonth;
                expect(datepicker.date).to.eventually.equal(previousMonth);
            });

            it('should return the date back to its original date', function () {
                datepicker.date = options.selectedDate;
                expect(datepicker.date).to.eventually.equal(options.selectedDate);
            });
        }

        describe('today\'s date', function () {
            let today: string;
            let currentDate: string;

            before(function () {
                today = moment().format(isoFormat);
                (datepicker.date as Promise<string>).then(date => {
                    currentDate = date;
                    datepicker.date = today;
                });
            });

            it('should be highlighted with a special class', function () {
                expect(datepicker.isDateToday(today)).to.eventually.be.true;
            });

            it('should highlight the currently selected date with a special class', function () {
                expect(datepicker.isDateSelected(today)).to.eventually.be.true;
            });

            it('should update the date to the first of the month', function () {
                var firstOfMonth = moment().startOf('month').format(isoFormat);
                datepicker.date = firstOfMonth;
                expect(datepicker.date).to.eventually.equal(firstOfMonth);
            });

            it('should update the date to the last of the month', function () {
                var lastOfMonth = moment().endOf('month').format(isoFormat);
                datepicker.date = lastOfMonth;
                expect(datepicker.date).to.eventually.equal(lastOfMonth);
            });

            after(function () {
                datepicker.date = currentDate;
            });

        });

        after(function () {
            options.isOpen ? datepicker.open() : datepicker.close();
        });

    };

};
