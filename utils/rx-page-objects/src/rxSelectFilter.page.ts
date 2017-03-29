'use strict';

import * as _ from 'lodash';
import {by} from 'protractor';
import {rxComponentElement} from './rxComponent';
import {rxMultiSelect} from './rxMultiSelect.page';

/**
 * @example
 *     multiSelect.apply({
 *         Account: {
 *             All: false,
 *             US: true
 *         },
 *         Status: {
 *             All: false,
 *             Open: true
 *         }
 *     });
 */
interface IRxMultiSelectFilterData {
    [id: string]: {
        [id: string]: boolean,
    };
}

/**
 * @class
 */
export class rxSelectFilter extends rxComponentElement {

    multiSelectByLabel(label: string) {
        let selectWrapper = this.element(by.cssContainingText('.select-wrapper', label));
        return new rxMultiSelect(selectWrapper.$('rx-multi-select'));
    }

    /**
     * @description From `filterData`'s key-value pairs, select the options contained in the values against
     * the {@link rxMultiSelect} (identified by text) in each key.
     * @see rxMultiSelect
     * @example
     * it('should select only the US accounts that are still open', function () {
     *     var multiSelect = new rxSelectFilter($('rx-multi-select));
     *     multiSelect.apply({
     *         Account: {
     *             All: false,
     *             US: true
     *         },
     *         Status: {
     *             All: false,
     *             Open: true
     *         }
     *     });
     *
     *     expect(myPage.myTable.column('Account').data.then(_.uniq)).to.eventually.eql(['US']);
     *     expect(myPage.myTable.column('Status').data.then(_.uniq)).to.eventually.eql(['Open']);
     * });
     */
    apply(filterData: IRxMultiSelectFilterData) {
        _.each(filterData, (options, label) => {
            let multiSelect = this.multiSelectByLabel(label);
            multiSelect.open();
            _.each(options, (shouldSelect, option) => {
                if (shouldSelect) {
                    multiSelect.select([option]);
                } else {
                    multiSelect.deselect([option]);
                }
            });
            multiSelect.close();
        });
    }
}
