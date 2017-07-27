// Until we upgrade to protractor 4 (to get selenium 2.53+),
// we'll skip these tests on Travis to pass checks.
if (!process.env.TRAVIS) {
    describe('rxCopy', function () {
        var subject;

        before(function () {
            demoPage.go('#/elements/Copy');
        });

        describe('simple usage', encore.exercise.rxCopy({
            instance: new encore.rxCopy($('#copy-simple-short')),
            expectedText: 'This is a short sentence.',
            testCopyArea: $('#test-textarea')
        }));

        describe('simple usage with angular variables', encore.exercise.rxCopy({
            instance: new encore.rxCopy($('#copy-simple-long')),
            expectedText: /^A paragraph that will wrap/,
            testCopyArea: $('#test-textarea')
        }));

        describe('compact paragraph', encore.exercise.rxCopy({
            instance: new encore.rxCopy($('#copy-long-compact')),
            expectedText: /^A compacted paragraph/,
            testCopyArea: $('#test-textarea')
        }));

        describe('compact metadata', encore.exercise.rxCopy({
            instance: new encore.rxCopy($('#copy-metadata-compact')),
            expectedText: /^A compacted metadata value/,
            testCopyArea: $('#test-textarea')
        }));

        describe('table usage', function () {
            describe('(icon visibility)', function () {
                before(function () {
                    subject = new encore.rxCopy($('td.copy-short rx-copy:first-of-type'));
                });

                it('should have an icon', function () {
                    expect(subject.eleAction.isPresent()).to.eventually.be.true;
                });

                it('should not show an icon', function () {
                    expect(subject.eleAction.isDisplayed()).to.eventually.be.false;
                });

                describe('on hover', function () {
                    beforeEach(function () {
                        browser.actions().mouseMove(subject.rootElement).perform();
                    });

                    it('should show icon', function () {
                        expect(subject.eleAction.isDisplayed()).to.eventually.be.true;
                    });
                });//on hover
            });//icon visibility

            describe('short visible values', encore.exercise.rxCopy({
                instance: new encore.rxCopy($('td.copy-short rx-copy:first-of-type')),
                expectedText: 'Short',
                testCopyArea: $('#test-textarea')
            }));//short visible values

            describe('long overflow values', encore.exercise.rxCopy({
                instance: new encore.rxCopy($('td.copy-long rx-copy:first-of-type')),
                expectedText: /^An extremely long cell value/,
                testCopyArea: $('#test-textarea')
            }));//long overflow values
        });
    });
}
