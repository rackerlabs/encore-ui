var _ = require('lodash');

var diskSize = encore.rxDiskSize;

describe('rxBytesConvert', function () {
    var diskSizesTable;
    var diskSizeStrings = [
        '420 GB',
        '125 TB',
        '171.34 PB',
        '420 GB',
        '125 TB',
        '171.34 PB'
    ];

    before(function () {
        demoPage.go('#/utilities/rxBytesConvert');
        diskSizesTable = $$('#rx-bytes-convert-demo ul li');
    });

    _.forEach(diskSizeStrings, function (testData, index) {
        it('should still have ' + testData + ' as test data on the page', function () {
            diskSizesTable.get(index).getText().then(function (text) {
                var onPage = text.split('→')[1].trim();
                expect(onPage).to.equal(testData);
            });
        });

        it('should convert ' + testData + ' back to bytes', function () {
            diskSizesTable.get(index).getText().then(function (text) {
                var gigabytes = parseInt(text.split(' ')[0], 10);
                expect(diskSize.toBytes(testData)).to.equal(gigabytes);
            });
        });
    });

});
