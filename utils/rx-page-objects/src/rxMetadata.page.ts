'use strict';

import * as _ from 'lodash';
import {$, ElementFinder} from 'protractor';
import {rxComponentElement} from './rxComponent';

/**
 * @class
 * @description Page object representing an rxMetadata element.
 * @example
 * it('should have a term "Field Name" with definition "My Value", () => {
 *     let myPage = new rxMetadata($('rx-metadata'));
 *     expect(myPage.term('Field Name').getDefinition()).to.eventually.eql('My Value');
 * })
 */
export class rxMetadata extends rxComponentElement {

    /**
     * @description The metadata term.
     */
    term(term: string): ElementFinder {
        let rxMetaSelector = `rx-meta[label="${term}"] .definition`;
        let rxMetaShowHideSelector = `rx-meta-show-hide[label="${term}"] .definition`;
        return $(`${rxMetaSelector}, ${rxMetaShowHideSelector}`);
    }

    getLabels(): Promise<string[]> {
        return this.$$('div.label').getText().then(terms => {
            return _.map(terms, term => term.replace(/:$/, ''));
        });
    }
};
