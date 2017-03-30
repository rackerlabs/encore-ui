'use strict';

import {expect} from 'chai';
import * as _ from 'lodash';
import * as moment from 'moment';

import {Promise} from './rxComponent';
import * as component from './rxDatePicker.page';

export interface IRxDatePickerExerciseOptions {
    instance: component.rxDatePicker;
    displayed?: boolean;
    enabled?: boolean;
    open?: boolean;
    present?: boolean;
    selectedDate?: string | null;
    valid?: boolean;
};

/**
 * rxDatePicker exercises.
 * @example
 * describe('default exercises', encore.exercise.rxDatePicker({
 *     instance: myPage.datepicker, // select one of many pagination instances from your page objects
 *     valid: false,
 *     selectedDate: moment().format('YYYY-MM-DD')
 * }));
 */
export function rxDatePickerExercise (options: IRxDatePickerExerciseOptions) {
    options = _.defaults(options, {
        displayed: true,
        enabled: true,
        open: false,
        present: true,
        selectedDate: null,
        valid: true,
    });

    // avoid mangling mocha's `this` context by not using fat-arrow syntax
    return () => {
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

        before(() => {
            datepicker = options.instance;
        });

        it(`should ${options.present ? '' : 'not '}be present`, () => {
            expect(datepicker.isPresent()).to.eventually.eql(options.present);
        });

        if (!options.present) {
            return;
        }

        it(`should ${options.displayed ? '' : 'not '}be displayed`, () => {
            expect(datepicker.isDisplayed()).to.eventually.eql(options.displayed);
        });

        if (!options.displayed) {
            return;
        }

        if (options.selectedDate !== null) {
            it(`should have '${options.selectedDate}' as the current selected date`, () => {
                expect(datepicker.date).to.eventually.eql(options.selectedDate);
            });
        }

        it(`should ${options.valid ? '' : 'not '}be valid`, () => {
            expect(datepicker.isValid()).to.eventually.eql(options.valid);
        });

        it(`should ${options.enabled ? '' : 'not '}be enabled`, () => {
            expect(datepicker.isEnabled()).to.eventually.eql(options.enabled);
        });

        it(`should ${options.open ? '' : 'not '}already have the calendar open`, () => {
            expect(datepicker.isOpen()).to.eventually.eql(options.open);
        });

        if (!options.enabled) {
            return;
        }

        it(`should ${options.open ? 'close ' : 'open '}the calendar`, () => {
            options.open ? datepicker.close() : datepicker.open();
            expect(datepicker.isOpen()).to.eventually.eql(!options.open);
        });

        it('should return the calendar back to its original state', () => {
            options.open ? datepicker.open() : datepicker.close();
            expect(datepicker.isOpen()).to.eventually.eql(options.open);
        });

        it(`should have '${selectedMonth}' as the current selected month in the dropdown`, () => {
            datepicker.open();
            expect(datepicker.month).to.eventually.eql(selectedMonth);
        });

        it(`should have '${selectedYear}' as the current selected year in the dropdown`, () => {
            expect(datepicker.year).to.eventually.eql(selectedYear);
        });

        it('should have some days that are in the current month', () => {
            expect(datepicker.currentMonthDays.count()).to.eventually.be.above(0);
        });

        it('should have some days that are out of the current month', () => {
            expect(datepicker.$$('.day.outOfMonth').count()).to.eventually.be.above(0);
        });

        it('should not select a date that is out of month', () => {
            (datepicker.date as Promise<string>).then(currentDate => {
                datepicker.$$('.day.outOfMonth span').each(invalidDay => {
                    invalidDay.click();
                    expect(datepicker.date).to.eventually.eql(currentDate);
                });
            });
        });

        it('should navigate back one month', () => {
            (datepicker.year as Promise<string>).then(year => {
                (datepicker.month as Promise<string>).then(month => {
                    datepicker.previousMonth();
                    currentMonthYear = `${year}-${month}`;
                    previousMonth = moment(currentMonthYear, 'YYYY-MM').subtract(1, 'month');
                    expect(datepicker.month).to.eventually.eql(previousMonth.format(formatMonth));
                });
            });
        });

        it('should navigate forward two months', () => {
            datepicker.nextMonth();
            datepicker.nextMonth();
            nextMonth = moment(currentMonthYear).add(1, 'month');
            expect(datepicker.month).to.eventually.eql(nextMonth.format(formatMonth));
        });

        it('should reopen the calendar and have the month unchanged', () => {
            datepicker.close();
            datepicker.open();
            expect(datepicker.month).to.eventually.eql(nextMonth.format(formatMonth));
            expect(datepicker.year).to.eventually.eql(nextMonth.format(formatYear));
            datepicker.previousMonth();
        });

        if (options.selectedDate !== null) {
            it('should update the date to one month from now', () => {
                datepicker.open();
                datepicker.date = nextMonth.format(isoFormat);
                expect(datepicker.date).to.eventually.eql(nextMonth.format(isoFormat));
            });

            it('should update the date to one month ago', () => {
                datepicker.open();
                let oneMonthAgo = moment().subtract(1, 'months').format(isoFormat);
                datepicker.date = oneMonthAgo;
                expect(datepicker.date).to.eventually.eql(oneMonthAgo);
            });

            it('should return the date back to its original date', () => {
                datepicker.open();
                datepicker.date = options.selectedDate;
                expect(datepicker.date).to.eventually.eql(options.selectedDate);
            });
        }

        describe('today\'s date', () => {
            let today: string;
            let currentDate: string;

            before(() => {
                today = moment().format(isoFormat);
                datepicker.open();
                (datepicker.date as Promise<string>).then(date => {
                    currentDate = date;
                    datepicker.date = today;
                });
            });

            it('should be highlighted with a special class', () => {
                datepicker.open();
                expect(datepicker.getDateToday()).to.eventually.eql(today);
            });

            it('should highlight the currently selected date with a special class', () => {
                datepicker.open();
                expect(datepicker.getDateSelected()).to.eventually.eql(today);
            });

            it('should update the date to the first of the month', () => {
                let firstOfMonth = moment().startOf('month').format(isoFormat);
                datepicker.date = firstOfMonth;
                datepicker.open();
                expect(datepicker.date).to.eventually.eql(firstOfMonth);
                expect(datepicker.getDateSelected()).to.eventually.eql(firstOfMonth);
            });

            after(() => {
                datepicker.open();
                datepicker.date = currentDate;
            });

        });

        after(() => {
            options.open ? datepicker.open() : datepicker.close();
        });

    };

};
