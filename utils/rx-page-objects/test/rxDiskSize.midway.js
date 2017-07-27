var _ = require('lodash');

var diskSize = encore.rxDiskSize;

describe('rxDiskSize', function () {
    var diskSizesTable;
    var diskSizeStrings = [
        '420 GB',
        '125 TB',
        '171.337 PB',
        '420 GB',
        '125 TB',
        '171.337 PB'
    ];

    before(function () {
        demoPage.go('#/utilities/rxDiskSize');
        diskSizesTable = $$('#rx-disk-size-demo ul li');
    });

    _.forEach(diskSizeStrings, function (testData, index) {
        it('should still have ' + testData + ' as test data on the page', function () {
            diskSizesTable.get(index).getText().then(function (text) {
                var onPage = text.split('→')[1].trim();
                expect(onPage).to.equal(testData);
            });
        });

        it('should convert ' + testData + ' back to gigabytes', function () {
            diskSizesTable.get(index).getText().then(function (text) {
                var gigabytes = parseInt(text.split(' ')[0], 10);
                expect(diskSize.toGigabytes(testData)).to.equal(gigabytes);
            });
        });
    });

});
