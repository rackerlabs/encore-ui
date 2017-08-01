describe('utilities:rxTimePickerUtil', function () {
    var result;

    before(function () {
        demoPage.go('#/utilities/rxTimePickerUtil');
    });

    // Don't forget to update rxTimePickerUtil specs
    describe('parseUtcOffset()', function () {
        [
            ['8:00 (-06:00)', '-06:00'],
            ['13:00 (UTC-0800)', '-0800'],
            ['20:00-04:00','-04:00'],
            ['non-time string', ''],
            ['20:00-0400', '-0400'],
            ['20:00-400', ''],
            ['20:00-4', ''],
        ].forEach(function (strPair) {
            var strInput = strPair[0];
            var strOutput = strPair[1];

            it('should return "' + strOutput + '" as parsed from "' + strInput + '"', function () {
                result = encore.rxTimePickerUtil.parseUtcOffset(strInput);
                expect(result).to.eq(strOutput);
            });
        });
    });//parseUtcOffset()
});
