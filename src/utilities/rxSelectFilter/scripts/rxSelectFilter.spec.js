describe('service:rxSelectFilter', function () {
    var filter;

    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function (rxSelectFilter) {
            filter = rxSelectFilter.create({
                properties: ['status', 'type'],
                selected: {
                    status: ['ENABLED']
                }
            });
        });
    });

    describe('service:rxSelectFilter', function () {
        var result;
        var inputArray = [
            {
                status: 'DISABLED',
                type: 'COMPUTER'
            }, {
                status: 'ENABLED',
                type: 'SWITCH'
            }
        ];

        beforeEach(function () {
            result = filter.applyTo(inputArray);
        });

        describe('first run', function () {
            it('initializes the list of available options', function () {
                expect(filter.available).to.eql({
                    type: ['COMPUTER', 'SWITCH'],
                    status: ['DISABLED', 'ENABLED']
                });
            });

            it('selects all options for properties without explicit selection', function () {
                expect(filter.selected).to.eql({
                    type: ['COMPUTER', 'SWITCH'],
                    status: ['ENABLED']
                });
            });
        });

        it('keeps items with properties that are all selected', function () {
            expect(result).to.eql(_.tail(inputArray));
        });

        it('removes items with properties that are not selected', function () {
            expect(filter.applyTo([{
                type: 'SWITCH',
                status: 'UNKNOWN'
            }])).to.eql([]);
        });
    });
});

describe('service:SelectFilter (DEPRECATED)', function () {
    var filter;

    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function (SelectFilter) {
            filter = SelectFilter.create({
                properties: ['status', 'type'],
                selected: {
                    status: ['ENABLED']
                }
            });
        });
    });

    describe('service:rxSelectFilter', function () {
        var result;
        var inputArray = [
            {
                status: 'DISABLED',
                type: 'COMPUTER'
            }, {
                status: 'ENABLED',
                type: 'SWITCH'
            }
        ];

        beforeEach(function () {
            result = filter.applyTo(inputArray);
        });

        describe('first run', function () {
            it('initializes the list of available options', function () {
                expect(filter.available).to.eql({
                    type: ['COMPUTER', 'SWITCH'],
                    status: ['DISABLED', 'ENABLED']
                });
            });

            it('selects all options for properties without explicit selection', function () {
                expect(filter.selected).to.eql({
                    type: ['COMPUTER', 'SWITCH'],
                    status: ['ENABLED']
                });
            });
        });

        it('keeps items with properties that are all selected', function () {
            expect(result).to.eql(_.tail(inputArray));
        });

        it('removes items with properties that are not selected', function () {
            expect(filter.applyTo([{
                type: 'SWITCH',
                status: 'UNKNOWN'
            }])).to.eql([]);
        });
    });
});
