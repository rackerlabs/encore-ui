describe('rxDatePicker', function () {
    var scope, isoScope, compile, renderDirective;
    var clock;
    var actual, expected;
    var template;
    var isoFormat = 'YYYY-MM-DD';

    beforeEach(function () {
        module('encore.ui.elements');
        module('templates/rxDatePicker.html');

        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });

        // "today" is December 25, 2015
        clock = sinon.useFakeTimers(new Date(2015, 11, 25).getTime());

        renderDirective = function (dirScope) {
            var directive = helpers.createDirective(template, compile, dirScope);
            isoScope = directive.isolateScope();
            return directive;
        };//renderDirective()
    });

    afterEach(function () {
        // restore correct timers
        clock.restore();
    });

    describe('when enabled', function () {
        beforeEach(function () {
            template = '<rx-date-picker ng-model="specModel"></rx-date-picker>';
        });

        describe('with valid date string', function () {
            beforeEach(function () {
                scope.specModel = '2015-12-15';
                renderDirective(scope);
            });

            it('should not have a "date" error', function () {
                template = '<form name="specForm">' +
                    '<rx-date-picker name="specModel" ng-model="specModel"></rx-date-picker>' +
                '</form>';
                renderDirective(scope);
                expect(scope.specForm.specModel.$error.date).to.not.exist;
            });

            it('should set isoScope.selected', function () {
                expect(isoScope.selected).is.eq('2015-12-15');
            });

            it('should set displayValue to long date format', function () {
                expect(isoScope.displayValue).to.eq('December 15, 2015');
            });

            it('should set calendarVisible to false', function () {
                expect(isoScope.calendarVisible).to.eq(false);
            });

            it('should set calendarMonth to beginning of this month', function () {
                expected = moment(new Date()).startOf('month');
                actual = isoScope.calendarMonth;
                expect(moment(actual).isSame(expected)).to.eq(true);
            });

            describe('calendarDays', function () {
                it('should not include Nov 28, 2015', function () {
                    actual = _.some(isoScope.calendarDays, function (day) {
                        return day.format(isoFormat) === '2015-11-28';
                    });
                    expect(actual).to.eq(false);
                });

                it('should include Nov 29, 2015', function () {
                    actual = _.some(isoScope.calendarDays, function (day) {
                        return day.format(isoFormat) === '2015-11-29';
                    });
                    expect(actual).to.eq(true);
                });

                it('should include Dec 10, 2015', function () {
                    actual = _.some(isoScope.calendarDays, function (day) {
                        return day.format(isoFormat) === '2015-12-10';
                    });
                    expect(actual).to.eq(true);
                });

                it('should include Dec 15, 2015', function () {
                    actual = _.some(isoScope.calendarDays, function (day) {
                        return day.format(isoFormat) === '2015-12-15';
                    });
                    expect(actual).to.eq(true);
                });

                it('should include Jan 2, 2016', function () {
                    actual = _.some(isoScope.calendarDays, function (day) {
                        return day.format(isoFormat) === '2016-01-02';
                    });
                    expect(actual).to.eq(true);
                });

                it('should not include Jan 3, 2016', function () {
                    actual = _.some(isoScope.calendarDays, function (day) {
                        return day.format(isoFormat) === '2016-01-03';
                    });
                    expect(actual).to.eq(false);
                });
            });//calendarDays

            describe('toggleCalendar()', function () {
                it('should change calendarVisible to true, false, true', function () {
                    // toggle true
                    isoScope.toggleCalendar();
                    expect(isoScope.calendarVisible).to.eq(true);
                    // back to false
                    isoScope.toggleCalendar();
                    expect(isoScope.calendarVisible).to.eq(false);
                    // back to true
                    isoScope.toggleCalendar();
                    expect(isoScope.calendarVisible).to.eq(true);
                });
            });//toggleCalendar()

            describe('isSelected()', function () {
                var stressDay;

                describe('when passed selected moment day', function () {
                    it('should return true', function () {
                        stressDay = moment('2015-12-15', isoFormat);
                        expect(isoScope.isSelected(stressDay)).to.eq(true);
                    });
                });

                describe('when passed unselected moment day', function () {
                    it('should return false', function () {
                        stressDay = moment('2020-12-20', isoFormat);
                        expect(isoScope.isSelected(stressDay)).to.eq(false);
                    });
                });
            });//isSelected()

            describe('isMonth()', function () {
                var stressDay;

                describe('when passed day in visible month', function () {
                    it('should return true', function () {
                        stressDay = moment('2015-12-10', isoFormat);
                        expect(isoScope.isMonth(stressDay)).to.eq(true);
                    });
                });

                describe('when passed last day of previous month', function () {
                    it('should return false', function () {
                        stressDay = moment('2015-11-30', isoFormat);
                        expect(isoScope.isMonth(stressDay)).to.eq(false);
                    });
                });

                describe('when passed first day of next month', function () {
                    it('should return false', function () {
                        stressDay = moment('2016-1-1', isoFormat);
                        expect(isoScope.isMonth(stressDay)).to.eq(false);
                    });
                });
            });//isMonth()

            describe('isToday()', function () {
                var stressDay;

                describe('when passed today', function () {
                    it('should return true', function () {
                        stressDay = moment('2015-12-25', isoFormat);
                        expect(isoScope.isToday(stressDay)).to.eq(true);
                    });
                });

                describe('when passed tomorrow', function () {
                    it('should return true', function () {
                        stressDay = moment('2015-12-26', isoFormat);
                        expect(isoScope.isToday(stressDay)).to.eq(false);
                    });
                });
            });//isToday()

            describe('selectDate()', function () {
                describe('when passed Feb 14, 2016', function () {
                    var valentines = moment('2016-02-14', isoFormat);

                    it('should set selected to formatted value', function () {
                        isoScope.selectDate(valentines);
                        expect(isoScope.selected).to.eq('2016-02-14');
                    });

                    it('should set calendarVisible to false', function () {
                        isoScope.toggleCalendar();
                        expect(isoScope.calendarVisible).to.eq(true);
                        isoScope.selectDate(valentines);
                        expect(isoScope.calendarVisible).to.eq(false);
                    });

                    it('should set calendar month to February 2016', function () {
                        isoScope.selectDate(valentines);
                        isoScope.$digest();
                        actual = isoScope.calendarMonth;
                        expected = moment('2016-02-01', isoFormat);
                        expect(moment(actual).isSame(expected, 'month')).to.eq(true);
                    });

                    it('should set proper displayValue', function () {
                        isoScope.selectDate(valentines);
                        isoScope.$apply();
                        expect(isoScope.displayValue).to.eq('February 14, 2016');
                    });
                });//passed valentine's day
            });//selectDate()

            describe('navigate()', function () {
                describe('when "prevMonth"', function () {
                    it('should set calendarMonth to November 1, 2015', function () {
                        isoScope.navigate('prevMonth');
                        actual = moment(isoScope.calendarMonth).isSame('2015-11-01', 'day');
                        expect(actual).to.eq(true);

                        isoScope.navigate('prevMonth');
                        actual = moment(isoScope.calendarMonth).isSame('2015-10-01', 'day');
                        expect(actual).to.eq(true);
                    });
                });

                describe('when "nextMonth"', function () {
                    it('should set calendarMonth to January 1, 2016', function () {
                        isoScope.navigate('nextMonth');
                        actual = moment(isoScope.calendarMonth).isSame('2016-01-01', 'day');
                        expect(actual).to.eq(true);

                        isoScope.navigate('nextMonth');
                        actual = moment(isoScope.calendarMonth).isSame('2016-02-01', 'day');
                        expect(actual).to.eq(true);
                    });
                });
            });//navigate()
        });//with valid date string

        describe('with empty string for model', function () {
            beforeEach(function () {
                scope.specModel = '';
                renderDirective(scope);
            });

            it('should set calendarMonth to beginning of this month', function () {
                expected = moment(new Date()).startOf('month');
                actual = isoScope.calendarMonth;
                expect(moment(actual).isSame(expected)).to.eq(true);
            });

            it('should set a null displayValue', function () {
                expect(isoScope.displayValue).to.eq(null);
            });

            it('should have a "date" error', function () {
                template = '<form name="specForm">' +
                    '<rx-date-picker name="specModel" ng-model="specModel"></rx-date-picker>' +
                '</form>';
                renderDirective(scope);
                expect(scope.specForm.specModel.$error.date).to.be.undefined;
            });
        });

        describe('with invalid date string', function () {
            beforeEach(function () {
                scope.specModel = 'abcd';
                renderDirective(scope);
            });

            it('should set calendarMonth to beginning of this month', function () {
                expected = moment(new Date()).startOf('month');
                actual = isoScope.calendarMonth;
                expect(moment(actual).isSame(expected)).to.eq(true);
            });

            it('should set a null displayValue', function () {
                expect(isoScope.displayValue).to.eq(null);
            });

            it('should have a "date" error', function () {
                template = '<form name="specForm">' +
                    '<rx-date-picker name="specModel" ng-model="specModel"></rx-date-picker>' +
                '</form>';
                renderDirective(scope);
                expect(scope.specForm.specModel.$error.date).to.eq(true);
            });
        });

        describe('with undefined date model', function () {
            beforeEach(function () {
                scope.specModel = undefined;
                renderDirective(scope);
            });

            it('should set calendarMonth to beginning of this month', function () {
                expected = moment(new Date()).startOf('month');
                actual = isoScope.calendarMonth;
                expect(moment(actual).isSame(expected)).to.eq(true);
            });

            it('should set a null displayValue', function () {
                expect(isoScope.displayValue).to.eq(null);
            });

            it('should have a "date" error', function () {
                template = '<form name="specForm">' +
                    '<rx-date-picker name="specModel" ng-model="specModel"></rx-date-picker>' +
                '</form>';
                renderDirective(scope);
                expect(scope.specForm.specModel.$error.date).to.be.undefined;
            });
        });
    });

    describe('when disabled', function () {
        beforeEach(function () {
            template = '<rx-date-picker ng-model="specModel" disabled></rx-date-picker>';
        });

        describe('with valid date string', function () {
            beforeEach(function () {
                scope.specModel = '2015-12-15';
                renderDirective(scope);
            });

            describe('toggleCalendar()', function () {
                it('should not modify calendarVisibility', function () {
                    isoScope.toggleCalendar();
                    expect(isoScope.calendarVisible).to.eq(false);

                    isoScope.toggleCalendar();
                    expect(isoScope.calendarVisible).to.eq(false);
                });
            });//toggleCalendar()
        });
    });
});
