'use strict';

import {expect} from 'chai';
import {$} from 'protractor';

import {Typeahead} from '../index';

let demoPage = require('../../demo.page');

describe('typeahead', () => {
    let typeahead: Typeahead;

    before(() => {
        demoPage.go('#/elements/Typeahead');
        typeahead = new Typeahead($('#typeahead'));
    });

    it('should show element', () => {
        expect(typeahead.isDisplayed()).to.eventually.be.true;
    });

    it('should hide the menu initially', () => {
        expect(typeahead.isOpen()).to.eventually.be.false;
    });

    it('should show the menu when clicked', () => {
        typeahead.click();
        expect(typeahead.isOpen()).to.eventually.be.true;
    });

    it('should hide the menu when the input loses focus', () => {
        $('body').click();
        expect(typeahead.isOpen()).to.eventually.be.false;
    });
});
