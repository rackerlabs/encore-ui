'use strict';
import {by, ElementFinder} from 'protractor';
import {OverrideWebdriver, Promise, rxComponentElement} from './rxComponent';

/**
 * @description class to handle
 */
export class rxAction extends rxComponentElement {
    @OverrideWebdriver
    click(): Promise<void> {
        return this.$('.modal-link').click();
    }
}

/**
 * @description Functions for querying actions in an action menu, and launching those actions.
 * @class
 */
export class rxActionMenu extends rxComponentElement {
    /**
     * @description This selector will grab any top-level child elements under `.actions-area`, one level deep.
     * Since action menus allow for free-form html entry, there is no guarantee that any
     * particular structure will appear inside the action menu. However, we can be sure
     * that they'll use the `.actions-area` class to style it, and inside of it will be some
     * sort of element list. This exposes a hook into the html for matching text or counting nodes.
     */
    cssFirstAny = '.actions-area > *';

    get icoCog(): ElementFinder {
        return this.$('.fa-cog');
    }

    /**
     * @description Whether or not the action cog is showing its underlying menu.
     */
    isExpanded(): Promise<boolean> {
        return this.$('.action-list:not(.ng-hide)').isPresent();
    }

    /**
     * @description Clicks the action cog to expand the action menu, unless it's already open.
     */
    expand(): void {
        this.isExpanded().then(expanded => {
            if (!expanded) {
                this.icoCog.click();
            }
        });
    }

    /**
     * @description Clicks the action cog to collapse the action menu, unless it's already closed.
     */
    collapse(): void {
        this.isExpanded().then(expanded => {
            if (expanded) {
                this.icoCog.click();
            }
        });
    }

    /**
     * @description Whether or not the action menu has an item matching the text `actionName`.
     * Will expand the action menu to determine if the action is available.
     */
    hasAction(actionName: string): Promise<boolean> {
        this.expand();
        return this.action(actionName).isDisplayed().then(displayed => displayed, () => false);
    }

    /**
     * @description Returns an action's element.
     */
    action(actionName: string) {
        this.expand();
        return new rxAction(this.element(by.cssContainingText(this.cssFirstAny, actionName)));
    }

    /**
     * @description The number of action items present in the action menu.
     * Does not expand the action menu to determine the count of menu items.
     */
    actionCount(): Promise<number> {
        return this.$$(this.cssFirstAny).count();
    }

};
