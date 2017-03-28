'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var index_1 = require("../index");
var demoPage = require('../../demo.page');
describe('utilities:rxTimePickerUtil', function () {
    before(function () {
        demoPage.go('#/utilities/rxTimePickerUtil');
    });
    // Don't forget to update rxTimePickerUtil specs
    describe('parseUtcOffset()', function () {
        [
            ['8:00 (-06:00)', '-06:00'],
            ['13:00 (UTC-0800)', '-0800'],
            ['20:00-04:00', '-04:00'],
            ['non-time string', ''],
            ['20:00-0400', '-0400'],
            ['20:00-400', ''],
            ['20:00-4', ''],
        ].forEach(function (strPair) {
            var strInput = strPair[0];
            var strOutput = strPair[1];
            it('should return "' + strOutput + '" as parsed from "' + strInput + '"', function () {
                var result = index_1.rxTimePickerUtil.parseUtcOffset(strInput);
                chai_1.expect(result).to.eq(strOutput);
            });
        });
    }); // parseUtcOffset()
});
