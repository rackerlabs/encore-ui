'use strict';
import * as _ from 'lodash';
import {Promise, rxComponentElement} from './rxComponent';

/**
 * @class
 */
export class rxCollapse extends rxComponentElement {
    /**
     * @description Whether or not the component is currently expanded.
     */
    isExpanded(): Promise<boolean> {
        return this.$('.expanded').isPresent();
    }

    /**
     * @description Whether or not the component has a custom title.
     */
    hasCustomTitle(): Promise<boolean> {
        return this.$('.collapse-title-wrap').getAttribute('class').then(classes => {
            return _.includes(classes.split(' '), 'collapse-title-wrap-custom');
        });
    }

    /**
     * @description Will return the custom title's text if the component uses one. Otherwise, it'll return
     * the default title, found in the `.sml-title` (see-more-less-title) class.
     */
    getTitle(): Promise<string> {
        return this.hasCustomTitle().then(hasCustomTitle => {
            if (hasCustomTitle) {
                return this.$('.rx-collapse-title').getText();
            } else {
                return this.$('.sml-title').getText();
            }
        });
    }

    /**
     * @description Will expand the component if collapsed, or will collapse it if it's expanded.
     */
    toggle(): Promise<void> {
        return this.hasCustomTitle().then(hasCustomTitle => {
            if (hasCustomTitle) {
                return this.$('.double-chevron').click();
            } else {
                return this.$('.sml-title').click();
            }
        });
    }

    /**
     * @description Will toggle the component only if it's currently collapsed.
     */
    expand(): Promise<void> {
        return this.isExpanded().then(expanded => {
            if (!expanded) {
                this.toggle();
            }
        });
    }

    /**
     * @description Will toggle the component only if it's currently expanded.
     */
    collapse(): Promise<void> {
        return this.isExpanded().then(expanded => {
            if (expanded) {
                this.toggle();
            }
        });
    }
}
