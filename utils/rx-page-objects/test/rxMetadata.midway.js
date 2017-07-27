var _ = require('lodash');

var transformFns = {
    'Service Level': function (elem) {
        return elem.getText().then(function (text) {
            return _.zipObject(['current', 'proposed'], text.split(' → '));
        });
    },

    'Service Type': function (elem) {
        return elem.getText().then(function (text) {
            return _.zipObject(['current', 'proposed'], text.split(' → '));
        });
    },

    'Amount': function (elem) {
        return elem.getText().then(encore.rxMisc.currencyToPennies);
    },

    'Date Field': function (elem) {
        return elem.getText().then(function (text) {
            return new Date(text);
        });
    },

    'Link Field': function (elem) {
        var promises = [elem.getText(), elem.$('a').getAttribute('href')];
        return protractor.promise.all(promises).then(function (results) {
            return { text: results[0], href: results[1] };
        });
    },

    'Data and Link Field': function (elem) {
        var promises = [elem.getText(), elem.$('a').getAttribute('href')];
        return protractor.promise.all(promises).then(function (results) {
            // 'Some data (Link)' -> ['Some data', 'link']
            var text = results[0].split('(')[0].trim();
            var linkText = results[0].split('(')[1].replace(')', '');
            return {
                text: text,
                href: results[1],
                linkText: linkText
            };
        });
    }
};

describe('rxMetadata', function () {

    before(function () {
        demoPage.go('#/elements/Metadata');
    });

    describe('Status', encore.exercise.rxMetadata({
        present: true,
        visible: true,
        transformFns: transformFns,

        terms: {
            'Field Name': 'Field Value Example',
            'Another Field Name': 'Another Field Value Example',
            'Third Field Name': 'The Third Field Value Example',
            'Super Long Value': 'A super long data value with aseeminglyunbreakablewordthatcouldoverflowtonextcolumn',
            'Short Field Name': 'A long field value given here to show line break style.',
            'Status': 'Active',
            'RCN': 'RCN-555-555-555',
            'Type': 'Cloud',
            'Service Level': { current: 'Managed', proposed: 'Managed' },
            'Service Type': { current: 'DevOps', proposed: 'SysOps' },
            'Amount': 19268,
            'Phone Number Field': '888 - 888 - 8888',
            'Date Field': new Date('January 6, 1989'),
            'Link Field': { text: 'Link', href: browser.baseUrl + '/#' },
            'Data and Link Field': {
                text: 'Some data',
                href: browser.baseUrl + '/#',
                linkText: 'Link'
            }
        }
    }));

    describe('rxMetadata', function () {
        var metadata;

        before(function () {
            metadata = encore.rxMetadata.initialize($('rx-metadata'), transformFns);
        });

        it('should still work fine without any transform functions defined', function () {
            expect(encore.rxMetadata.initialize().term('Amount')).to.eventually.equal('$192.68');
        });

        it('should report back null for definitions that are not present', function () {
            expect(metadata.term('Witty 2015 Pop Culture Reference')).to.eventually.be.null;
        });

        it('should report back custom return values for definitions that are not present', function () {
            expect(metadata.term('Witty 2015 Pop Culture Reference', false)).to.eventually.be.false;
        });

    });
});
