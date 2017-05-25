'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var chai = require('chai');
var protractor = require('protractor');
var index = require('../index');
var demoPage = require('../../demo.page');
describe('rxFieldName', function () {
    before(function () {
        demoPage.go('#/elements/Forms');
    });
    describe('"Plain Textbox"', index.exercise.rxFieldName({
        instance: new index.rxFieldName(protractor.$('#fieldNamePlainTextbox')),
        name: 'Plain Textbox:',
        visible: true,
        required: false,
    }));
    describe('"Required Textarea"', index.exercise.rxFieldName({
        instance: new index.rxFieldName(protractor.$('#fieldNameRequiredTextarea')),
        name: 'Required Textarea:',
        visible: true,
        required: true,
    }));
    describe('Example', function () {
        var checkbox;
        var subject;
        before(function () {
            checkbox = new index.rxCheckbox(protractor.$('#chkVolumeNameRequired'));
            subject = new index.rxFieldName(protractor.$('#fieldNameVolumeName'));
        });
        describe('when checkbox checked', function () {
            before(function () {
                checkbox.select();
            });
            it('symbol should be visible', function () {
                chai.expect(subject.symbol.isDisplayed()).to.eventually.be.true;
            });
        });
        describe('when checkbox unchecked', function () {
            before(function () {
                checkbox.deselect();
            });
            it('symbol should not be visible', function () {
                chai.expect(subject.symbol.isDisplayed()).to.eventually.be.false;
            });
        });
    });
});
