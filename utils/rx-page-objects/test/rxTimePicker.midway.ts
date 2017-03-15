'use strict';

import {expect} from 'chai';
import * as _ from 'lodash';
import {$} from 'protractor';

import {rxTimePicker} from '../index';

let demoPage = require('../../demo.page');

describe('rxTimePicker', () => {
    let picker: rxTimePicker;

    before(() => {
        demoPage.go('#/elements/Forms');
    });

    describe('predefined picker', () => {
        before(() => {
            picker = new rxTimePicker($('#predefinedPicker'));
        });

        it('should have a time already set in place', () => {
            expect(picker.time).to.eventually.eq('22:10-10:00');
        });

        it('should close by clicking away from it', () => {
            picker.open();
            expect(picker.isOpen()).to.eventually.eq(true);
            $('body').click();
            expect(picker.isOpen()).to.eventually.eq(false);
        });
    }); // predefined picker

    describe('empty picker', () => {
        before(() => {
            picker = new rxTimePicker($('#emptyPicker'));
        });

        describe('picker form', () => {
            beforeEach(() => {
                picker.open();
            });

            it('should not display any errors', () => {
                expect(picker.getErrors()).to.eventually.be.empty;
            });

            // VALIDATION
            describe('hour', () => {
                it('should default to empty', () => {
                    expect(picker.hours).to.eventually.be.empty;
                });

                describe('entering alpha characters', () => {
                    before(() => {
                        picker.open();
                        picker.hours = 'hh';
                    });

                    it('should display errors', () => {
                        expect(picker.getErrors()).to.eventually.not.be.empty;
                    });

                    it('should not be able to submit', () => {
                        expect(picker.canSubmit()).to.eventually.eq(false);
                    });

                    it('should be able to cancel', () => {
                        expect(picker.canCancel()).to.eventually.eq(true);
                    });
                }); // alpha characters

                describe('entering a negative number', () => {
                    before(() => {
                        picker.open();
                        picker.hours = '-5';
                    });

                    it('should display errors', () => {
                        expect(picker.getErrors()).to.eventually.not.be.empty;
                    });

                    it('should not be able to submit', () => {
                        expect(picker.canSubmit()).to.eventually.eq(false);
                    });

                    it('should be able to cancel', () => {
                        expect(picker.canCancel()).to.eventually.eq(true);
                    });
                }); // negative number

                describe('leaving a blank input', () => {
                    before(() => {
                        picker.open();
                        picker.hours = '7'; // trigger $dirty
                        picker.hours = '';
                    });

                    it('should display errors', () => {
                        expect(picker.getErrors()).to.eventually.not.be.empty;
                    });

                    it('should not be able to submit', () => {
                        expect(picker.canSubmit()).to.eventually.eq(false);
                    });

                    it('should be able to cancel', () => {
                        expect(picker.canCancel()).to.eventually.eq(true);
                    });
                }); // leaving blank input

                describe('entering an out of bound value (13)', () => {
                    before(() => {
                        picker.open();
                        picker.hours = '13';
                    });

                    it('should display errors', () => {
                        expect(picker.getErrors()).to.eventually.not.be.empty;
                    });

                    it('should not be able to submit', () => {
                        expect(picker.canSubmit()).to.eventually.eq(false);
                    });

                    it('should be able to cancel', () => {
                        expect(picker.canCancel()).to.eventually.eq(true);
                    });
                }); // out of bound value

                // VALID INPUT
                _.map(_.range(1, 13), validHour => {
                    describe('entering a value of ' + validHour, () => {
                        before(() => {
                            picker.open();
                            picker.hours = validHour.toString();
                        });

                        it('should have expected hour', () => {
                            expect(picker.hours).to.eventually.eq(validHour.toString());
                        });

                        it('should not display errors', () => {
                            expect(picker.getErrors()).to.eventually.be.empty;
                        });

                        // remaining information hasn't been set in picker
                        it('should not be able to submit', () => {
                            expect(picker.canSubmit()).to.eventually.eq(false);
                        });

                        it('should be able to cancel', () => {
                            expect(picker.canCancel()).to.eventually.eq(true);
                        });
                    });
                });

                // ensure we can continue with remaining tests
                it('should be error free', () => {
                    expect(picker.getErrors()).to.eventually.be.empty;
                });
            }); // hours

            describe('minutes', () => {
                it('should default to empty', () => {
                    expect(picker.minutes).to.eventually.be.empty;
                });

                describe('entering alpha characters', () => {
                    before(() => {
                        picker.open();
                        picker.minutes = 'mm';
                    });

                    it('should display errors', () => {
                        expect(picker.getErrors()).to.eventually.not.be.empty;
                    });

                    it('should not be able to submit', () => {
                        expect(picker.canSubmit()).to.eventually.eq(false);
                    });

                    it('should be able to cancel', () => {
                        expect(picker.canCancel()).to.eventually.eq(true);
                    });
                }); // alpha characters

                describe('entering a negative number', () => {
                    before(() => {
                        picker.open();
                        picker.minutes = '-5';
                    });

                    it('should display errors', () => {
                        expect(picker.getErrors()).to.eventually.not.be.empty;
                    });

                    it('should not be able to submit', () => {
                        expect(picker.canSubmit()).to.eventually.eq(false);
                    });

                    it('should be able to cancel', () => {
                        expect(picker.canCancel()).to.eventually.eq(true);
                    });
                }); // negative number

                describe('leaving a blank input', () => {
                    before(() => {
                        picker.open();
                        picker.minutes = '42'; // trigger $dirty
                        picker.minutes = '';
                    });

                    it('should display errors', () => {
                        expect(picker.getErrors()).to.eventually.not.be.empty;
                    });

                    it('should not be able to submit', () => {
                        expect(picker.canSubmit()).to.eventually.eq(false);
                    });

                    it('should be able to cancel', () => {
                        expect(picker.canCancel()).to.eventually.eq(true);
                    });
                }); // leaving blank input

                describe('entering an out of bound value (60)', () => {
                    before(() => {
                        picker.open();
                        picker.minutes = '60';
                    });

                    it('should display errors', () => {
                        expect(picker.getErrors()).to.eventually.not.be.empty;
                    });

                    it('should not be able to submit', () => {
                        expect(picker.canSubmit()).to.eventually.eq(false);
                    });

                    it('should be able to cancel', () => {
                        expect(picker.canCancel()).to.eventually.eq(true);
                    });
                }); // out of bound value

                describe('entering single digit minutes value (5)', () => {
                    before(() => {
                        picker.open();
                        picker.minutes = '5';
                    });

                    it('should display errors', () => {
                        expect(picker.getErrors()).to.eventually.not.be.empty;
                    });

                    it('should not be able to submit', () => {
                        expect(picker.canSubmit()).to.eventually.eq(false);
                    });

                    it('should be able to cancel', () => {
                        expect(picker.canCancel()).to.eventually.eq(true);
                    });
                }); // single digit minutes

                // VALID INPUT
                _.map(['00', '01', '15', '30', '45', '59'], validMinute => {
                    describe('entering a value of ' + validMinute, () => {
                        before(() => {
                            picker.open();
                            picker.minutes = validMinute;
                        });

                        it('should have expected hour', () => {
                            expect(picker.minutes).to.eventually.eq(validMinute.toString());
                        });

                        it('should not display errors', () => {
                            expect(picker.getErrors()).to.eventually.be.empty;
                        });

                        it('should be able to submit', () => {
                            expect(picker.canSubmit()).to.eventually.eq(true);
                        });

                        it('should be able to cancel', () => {
                            expect(picker.canCancel()).to.eventually.eq(true);
                        });
                    }); // enter value of NN
                });

                // ensure we can continue with remaining tests
                it('should be error free', () => {
                    expect(picker.getErrors()).to.eventually.be.empty;
                });
            }); // minutes

            describe('period', () => {
                it('should default to AM', () => {
                    expect(picker.period).to.eventually.eq('AM');
                });

                it('should only have valid inputs', () => {
                    expect(picker.pagePeriod.options.getText()).to.eventually.eql(['AM', 'PM']);
                });

                // ensure we can continue with remaining tests
                it('should be error free', () => {
                    expect(picker.getErrors()).to.eventually.be.empty;
                });
            }); // period

            describe('UTC Offset', () => {
                it('should default to "+00:00"', () => {
                    expect(picker.utcOffset).to.eventually.eq('+00:00');
                });
            }); // utc offset
        });

        describe('time', () => {
            it('should be blank', () => {
                expect(picker.time).to.eventually.be.empty;
            });

            it('should change using ISO 8601 time string', () => {
                picker.time = '20:00-04:00';
                expect(picker.time).to.eventually.eq('20:00-04:00');
            });
        });
    }); // empty picker
});
