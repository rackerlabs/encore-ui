var Page = require('astrolabe').Page;

// anonymous page object
var autoSaving = Page.create({
    form: {
        set: function (formData) {
            encore.rxForm.fill(this, formData);
        }
    },

    checkbox: encore.rxCheckbox.generateAccessor(element(by.model('formData.checkbox'))),

    name: encore.rxForm.textField.generateAccessor(element(by.model('formData.name'))),

    description: encore.rxForm.textField.generateAccessor(element(by.model('formData.description'))),

    sensitiveData: encore.rxForm.textField.generateAccessor(element(by.model('formData.sensitive'))),
});

describe('rxMisc', function () {
    before(function () {
        demoPage.go('#/utilities/rxAutoSave');
    });

    describe('convenience functions', function () {
        var fn;

        describe('currencyToPennies', function () {
            fn = encore.rxMisc.currencyToPennies;

            it('should convert a single penny to the integer one', function () {
                expect(fn('$0.01')).to.equal(1);
            });

            it('should ignore any dollar type indicators (CAN, AUS, USD)', function () {
                expect(fn('$100 CAN')).to.equal(10000);
            });

            it('should convert negative currency notation to a negative integer', function () {
                expect(fn('($100 AUS)')).to.equal(-10000);
            });

            it('should not incur any binary rounding errors', function () {
                expect(fn('$1.10')).to.equal(110);
            });

            it('should not incur any binary rounding errors', function () {
                expect(fn('$150.14')).to.equal(15014);
            });

            it('should convert an array of currencies to an array of pennies', function () {
                expect(fn(['$0.01', '$100 CAN', '($100 AUS)', '$1.10', '$150.14']))
                    .to.eql([1, 10000, -10000, 110, 15014]);
            });
        });

        describe('unless', function () {
            var unless;
            var elem;
            var message;

            before(function () {
                autoSaving.form = {
                    checkbox: false,
                    name: '',
                    description: '',
                    sensitiveData: ''
                };
                message = 'I am possibly not un-authorizing the above: true';
                unless = encore.rxMisc.unless;
                elem = element(by.binding('formData.checkbox'));
                encore.rxMisc.nullValueMatches.push(message);
            });

            it('should return `null` for non-present elements', function () {
                expect(unless(elem)).to.eventually.be.null;
            });

            it('should return a custom fallback value for non-present elements', function () {
                expect(unless(elem, function () {}, false)).to.eventually.be.false;
            });

            it('should return `null` for present elements that match null value text', function () {
                autoSaving.checkbox = true;
                expect(unless(elem)).to.eventually.be.null;
            });

            it('should return the text when an element does not match any null value text', function () {
                encore.rxMisc.nullValueMatches.length = 0;
                expect(unless(elem)).to.eventually.equal(message);
            });

            it('should return the result of a custom function', function () {
                var reverseIt = function (elem) {
                    return elem.getText().then(function (text) {
                        return text.split('').reverse().join('');
                    });
                };
                expect(unless(elem, reverseIt)).to.eventually.equal(message.split('').reverse().join(''));
            });

            it('should return null for elements that are not displayed', function () {
                element(by.cssContainingText('a', 'Hide this message')).click();
                expect(unless(elem)).to.eventually.be.null;
            });

            it('should return a custom fallback value for non-displayed elements', function () {
                expect(unless(elem, function () {}, false)).to.eventually.be.false;
            });

        });

        describe('newDate', function () {
            var date;

            before(function () {
                demoPage.go('#/elements/Metadata');
                var transformFns = {
                    'Date Field': function (elem) {
                        return elem.getText().then(encore.rxMisc.newDate);
                    }
                };

                encore.rxMetadata.initialize('rx-metadata', transformFns).term('Date Field').then(function (dateField) {
                    date = dateField;
                });
            });

            it('should parse a date', function () {
                expect(date instanceof Date).to.be.true;
            });

            it('should match the date exactly', function () {
                var explicitDate = new Date('January 6, 1989 @ 00:00 (UTC-0600)');
                expect(date.valueOf()).to.equal(explicitDate.valueOf());
            });

        });
    });
});
