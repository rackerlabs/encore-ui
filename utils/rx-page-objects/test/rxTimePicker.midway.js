describe('rxTimePicker', function () {
    var picker;

    before(function () {
        demoPage.go('#/elements/Forms');
    });

    describe('predefined picker', function () {
        before(function () {
            picker = new encore.rxTimePicker($('#predefinedPicker'));
        });

        it('should have a time already set in place', function () {
            expect(picker.time).to.eventually.eq('22:10-10:00');
        });

        it('should close by clicking away from it', function () {
            picker.open();
            expect(picker.isOpen()).to.eventually.eq(true);
            $('body').click();
            expect(picker.isOpen()).to.eventually.eq(false);
        });
    });//predefined picker

    describe('empty picker', function () {
        before(function () {
            picker = new encore.rxTimePicker($('#emptyPicker'));
        });

        describe('picker form', function () {
            beforeEach(function () {
                picker.open();
            });

            it('should not display any errors', function () {
                expect(picker.errors).to.eventually.be.empty;
            });

            // VALIDATION
            describe('hour', function () {
                it('should default to empty', function () {
                    expect(picker.hour).to.eventually.be.empty;
                });

                describe('entering alpha characters', function () {
                    before(function () {
                        picker.open();
                        picker.hour = 'hh';
                    });

                    it('should display errors', function () {
                        expect(picker.errors).to.eventually.not.be.empty;
                    });

                    it('should not be able to submit', function () {
                        expect(picker.canSubmit()).to.eventually.eq(false);
                    });

                    it('should be able to cancel', function () {
                        expect(picker.canCancel()).to.eventually.eq(true);
                    });
                });//alpha characters

                describe('entering a negative number', function () {
                    before(function () {
                        picker.open();
                        picker.hour = -5;
                    });

                    it('should display errors', function () {
                        expect(picker.errors).to.eventually.not.be.empty;
                    });

                    it('should not be able to submit', function () {
                        expect(picker.canSubmit()).to.eventually.eq(false);
                    });

                    it('should be able to cancel', function () {
                        expect(picker.canCancel()).to.eventually.eq(true);
                    });
                });//negative number

                describe('leaving a blank input', function () {
                    before(function () {
                        picker.open();
                        picker.hour = '7'; // trigger $dirty
                        picker.hour = '';
                    });

                    it('should display errors', function () {
                        expect(picker.errors).to.eventually.not.be.empty;
                    });

                    it('should not be able to submit', function () {
                        expect(picker.canSubmit()).to.eventually.eq(false);
                    });

                    it('should be able to cancel', function () {
                        expect(picker.canCancel()).to.eventually.eq(true);
                    });
                });//leaving blank input

                describe('entering an out of bound value (13)', function () {
                    before(function () {
                        picker.open();
                        picker.hour = '13';
                    });

                    it('should display errors', function () {
                        expect(picker.errors).to.eventually.not.be.empty;
                    });

                    it('should not be able to submit', function () {
                        expect(picker.canSubmit()).to.eventually.eq(false);
                    });

                    it('should be able to cancel', function () {
                        expect(picker.canCancel()).to.eventually.eq(true);
                    });
                });//out of bound value

                // VALID INPUT
                _.map(_.range(1, 13), function (validHour) {
                    describe('entering a value of ' + validHour, function () {
                        before(function () {
                            picker.open();
                            picker.hour = validHour;
                        });

                        it('should have expected hour', function () {
                            expect(picker.hour).to.eventually.eq(validHour.toString());
                        });

                        it('should not display errors', function () {
                            expect(picker.errors).to.eventually.be.empty;
                        });

                        // remaining information hasn't been set in picker
                        it('should not be able to submit', function () {
                            expect(picker.canSubmit()).to.eventually.eq(false);
                        });

                        it('should be able to cancel', function () {
                            expect(picker.canCancel()).to.eventually.eq(true);
                        });
                    });
                });

                // ensure we can continue with remaining tests
                it('should be error free', function () {
                    expect(picker.errors).to.eventually.be.empty;
                });
            });//hours

            describe('minutes', function () {
                it('should default to empty', function () {
                    expect(picker.minutes).to.eventually.be.empty;
                });

                describe('entering alpha characters', function () {
                    before(function () {
                        picker.open();
                        picker.minutes = 'mm';
                    });

                    it('should display errors', function () {
                        expect(picker.errors).to.eventually.not.be.empty;
                    });

                    it('should not be able to submit', function () {
                        expect(picker.canSubmit()).to.eventually.eq(false);
                    });

                    it('should be able to cancel', function () {
                        expect(picker.canCancel()).to.eventually.eq(true);
                    });
                });//alpha characters

                describe('entering a negative number', function () {
                    before(function () {
                        picker.open();
                        picker.minutes = -5;
                    });

                    it('should display errors', function () {
                        expect(picker.errors).to.eventually.not.be.empty;
                    });

                    it('should not be able to submit', function () {
                        expect(picker.canSubmit()).to.eventually.eq(false);
                    });

                    it('should be able to cancel', function () {
                        expect(picker.canCancel()).to.eventually.eq(true);
                    });
                });//negative number

                describe('leaving a blank input', function () {
                    before(function () {
                        picker.open();
                        picker.minutes = '42'; // trigger $dirty
                        picker.minutes = '';
                    });

                    it('should display errors', function () {
                        expect(picker.errors).to.eventually.not.be.empty;
                    });

                    it('should not be able to submit', function () {
                        expect(picker.canSubmit()).to.eventually.eq(false);
                    });

                    it('should be able to cancel', function () {
                        expect(picker.canCancel()).to.eventually.eq(true);
                    });
                });//leaving blank input

                describe('entering an out of bound value (60)', function () {
                    before(function () {
                        picker.open();
                        picker.minutes = '60';
                    });

                    it('should display errors', function () {
                        expect(picker.errors).to.eventually.not.be.empty;
                    });

                    it('should not be able to submit', function () {
                        expect(picker.canSubmit()).to.eventually.eq(false);
                    });

                    it('should be able to cancel', function () {
                        expect(picker.canCancel()).to.eventually.eq(true);
                    });
                });//out of bound value

                describe('entering single digit minutes value (5)', function () {
                    before(function () {
                        picker.open();
                        picker.minutes = '5';
                    });

                    it('should display errors', function () {
                        expect(picker.errors).to.eventually.not.be.empty;
                    });

                    it('should not be able to submit', function () {
                        expect(picker.canSubmit()).to.eventually.eq(false);
                    });

                    it('should be able to cancel', function () {
                        expect(picker.canCancel()).to.eventually.eq(true);
                    });
                });//single digit minutes

                // VALID INPUT
                _.map(['00', '01', '15', '30', '45', '59'], function (validMinute) {
                    describe('entering a value of ' + validMinute, function () {
                        before(function () {
                            picker.open();
                            picker.minutes = validMinute;
                        });

                        it('should have expected hour', function () {
                            expect(picker.minutes).to.eventually.eq(validMinute.toString());
                        });

                        it('should not display errors', function () {
                            expect(picker.errors).to.eventually.be.empty;
                        });

                        it('should be able to submit', function () {
                            expect(picker.canSubmit()).to.eventually.eq(true);
                        });

                        it('should be able to cancel', function () {
                            expect(picker.canCancel()).to.eventually.eq(true);
                        });
                    });//enter value of NN
                });

                // ensure we can continue with remaining tests
                it('should be error free', function () {
                    expect(picker.errors).to.eventually.be.empty;
                });
            });//minutes

            describe('period', function () {
                it('should default to AM', function () {
                    expect(picker.period.value).to.eventually.eq('AM');
                });

                it('should only have valid inputs', function () {
                    expect(picker.pagePeriod.options).to.eventually.deep.eq(['AM', 'PM']);
                });

                // ensure we can continue with remaining tests
                it('should be error free', function () {
                    expect(picker.errors).to.eventually.be.empty;
                });
            });//period

            describe('UTC Offset', function () {
                it('should default to "+00:00"', function () {
                    expect(picker.utcOffset.value).to.eventually.eq('+00:00');
                });
            });//utc offset
        });

        describe('time', function () {
            it('should be blank', function () {
                expect(picker.time).to.eventually.be.empty;
            });

            it('should change using ISO 8601 time string', function () {
                picker.time = '20:00-04:00';
                expect(picker.time).to.eventually.eq('20:00-04:00');
            });
        });
    });//empty picker
});
