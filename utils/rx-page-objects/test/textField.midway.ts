'use strict';

import {expect} from 'chai';
import {$} from 'protractor';

import {textFieldAccessor} from '../index';

let demoPage = require('../../demo.page');

// an anonymous page object to prove that form filling works
class FormPageObject {
    @textFieldAccessor($('#txtPlain')) plainTextbox;
}

let formPageObject = new FormPageObject();

describe('textField Accessor', () => {
    before(() => {
        demoPage.go('#/elements/Forms');
    });

    it('should have filled the plainTextbox value', () => {
        formPageObject.plainTextbox = 'This is a plain textbox';
        expect(formPageObject.plainTextbox).to.eventually.equal('This is a plain textbox');
    });
});
