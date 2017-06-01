'use strict';

import {$, by, ElementArrayFinder, ElementFinder} from 'protractor';
import {OverrideWebdriver, Promise, rxComponentElement} from './rxComponent';

/**
 * A lookup for translating types of notifications and their string representations
 * @type {Object}
 * @property {String} error - 'error': A red notification. Used typically for errors or exceptions.
 * @property {String} info - 'info': A blue notification. Used typically for loading actions.
 * @property {String} success - 'success': A green notification. Used typically after successful actions.
 * @property {String} warning - 'warning': An orange warning. Used typically to "sticky" an ever-present message.
 */
export const NOTIFY_TYPES = {
    error: 'error',
    info: 'info',
    success: 'success',
    warning: 'warning',
};
export type NOTIFY_TYPES = keyof typeof NOTIFY_TYPES;

/**
 * Functions for interacting with a single notification. See [[rxNotify]].
 */
export class rxNotification extends rxComponentElement {
    get btnDismiss(): ElementFinder {
        return this.$('.notification-dismiss');
    }

    /**
     * The type of notification. See [[NOTIFY_TYPES]].
     *
     * @example
     *
     *     it('should have the right notification type', function () {
     *         var notificationType = encore.rxNotify.all.byText('Something bad happened').getType();
     *         expect(notificationType).to.eventually.equal('error');
     *         // or, you could write it this way
     *         expect(notificationType).to.eventually.equal(encore.NOTIFY_TYPES.error);
     *     });
     */
    getType(): Promise<NOTIFY_TYPES> {
        let notificationTypes = /error|info|success|warning/;
        return this.getAttribute('class').then(className => {
            return <NOTIFY_TYPES> className.match(notificationTypes)[0];
        });
    }

    /**
     * The message text of the notification.
     *
     * @example
     *
     *     it('should have the right notification text', function () {
     *         var notificationText = encore.rxNotify.all.byText('Something bad happened').getText();
     *         expect(notificationText).to.eventually.equal('Something bad happened: Contact joe@rackspace.com');
     *     });
     */
    @OverrideWebdriver
    getText(): Promise<string> {
        return this.$('.notification-text').getText();
    }

    /**
     * Dismisses the notification.
     *
     * @example
     *
     *     it('should dismiss the notification', function () {
     *         var notification = encore.rxNotify.all.byText('Something bad happened');
     *         expect(encore.rxNotify.all.count()).to.eventually.equal(1);
     *         notification.dismiss();
     *         expect(encore.rxNotify.all.count()).to.eventually.equal(0);
     *     });
     */
    dismiss(): Promise<void> {
        return this.isDismissable().then(dismissable => {
            if (dismissable) {
                this.btnDismiss.click();
            }
        });
    }

    hasSpinner(): Promise<boolean> {
        return this.$('.rx-spinner').isPresent();
    }

    /**
     * Whether or not the notification includes an "x" on the far right side.
     *
     * @example
     *
     *     it('should not let me close the warning on the page', function () {
     *         var notification = encore.rxNotify.byText('Warning: Outage in progress');
     *         expect(notification.type).to.eventually.equal(encore.rxNotify.types.warning);
     *         expect(notification.isDismissable()).to.eventually.be.false;
     *     });
     */
    isDismissable(): Promise<boolean> {
        return this.btnDismiss.isPresent();
    }

}

/**
 * Functions for interacting with groups of notifications, or getting a single notification.
 */
export class rxNotify extends rxComponentElement {

    get tblNotifications(): ElementArrayFinder {
        return this.all(by.repeater('message in messages'));
    }

    /**
     * Returns a collection of functions used to interact with a group of notifications in a stack.
     *
     * @example
     *
     *     it('should have some notifications in the top area', function () {
     *         expect(encore.rxNotify.byStack('banner').count()).to.eventually.be.above(0);
     *         expect(encore.rxNotify.all.count()).to.eventually.be.above(0);
     *     });
     */
    static byStack(stackName: string): rxNotify {
        let rootElement = $(`.rx-notifications[stack="${stackName}"]`);
        return new rxNotify(rootElement);
    }

    /**
     * Returns a collection of functions used to interact with all notifications on the page.
     *
     * @example
     *
     *     it('should have some notifications in the top area', function () {
     *         expect(encore.rxNotify.all.count()).to.eventually.be.above(0);
     *         expect(encore.rxNotify.byStack('banner').count()).to.eventually.be.above(0);
     *     });
     */
    static get all(): rxNotify {
        let rootElement = $('html');
        return new rxNotify(rootElement);
    }

    /**
     * The number of notifications present in the scope of the factory created object.  Using this
     * with [[rxNotify.all]] will yield the count of all the notifications on the page.  Using this
     * with [[rxNotify.byStack]] will yield the count of all notifications in the specified stack.
     *
     * @example
     *
     *     it('should have some notifications in the top area', function () {
     *         expect(encore.rxNotify.byStack('banner').count()).to.eventually.equal(1);
     *         expect(encore.rxNotify.all.count()).to.eventually.equal(2);
     *     });
     */
    count(): Promise<number> {
        return this.tblNotifications.count();
    }

    /**
     * The resulting notification object that matches the `notificationText`. This notification
     * is searched for using a partial text matching strategy. If more than one notification contains
     * `notificationText`, only the first will be returned.
     *
     * @example
     *
     *     it('should have a success message that personally thanks the user', function () {
     *         var notification = encore.rxNotify.all.byText('Good job, ');
     *         expect(notification.getText()).to.eventually.equal('Good job, ' + browser.params.username + '!');
     *     });
     */
    byText(notificationText: string): rxNotification {
        let rootElement = this.element(by.cssContainingText('.rx-notification', notificationText));
        return new rxNotification(rootElement);
    }

    /**
     * Close all notifications in the current scope of notifications.
     *
     * @example
     *
     *     it('should close some notifications', function () {
     *         expect(encore.rxNotify.all.count()).to.eventually.equal(2);
     *         encore.rxNotify.byStack('banner').dismiss();
     *         expect(encore.rxNotify.all.count()).to.eventually.equal(1);
     *         encore.rxNotify.all.dismiss();
     *         expect(encore.rxNotify.all.count()).to.eventually.equal(0);
     *     });
     */
    dismiss(): Promise<void> {
        return this.tblNotifications.filter(notificationElement => {
            return new rxNotification(notificationElement).isDismissable();
        }).then(notificationElements => {
            notificationElements.reverse().forEach(notificationElement => {
                return new rxNotification(notificationElement).dismiss();
            });
        });
    }

    /**
     * Whether or not the notification matching text `message` exists in the current
     * scope of notifications. If no `type` is specified, all notifications are searched. If a
     * `type` is specified, only those types of notifications will be searched.
     *
     * @example
     *
     *     it('should have the notification present', function () {
     *         expect(encore.rxNotify.all.hasNotification('My message', 'error'))
     *              .to.eventually.be.false;
     *         expect(encore.rxNotify.all.byText('My message').getType())
     *              .to.eventually.equal(encore.NOTIFY_TYPES.info);
     *         expect(encore.rxNotify.all.hasNotification('My message'))
     *              .to.eventually.be.true;
     *         expect(encore.rxNotify.all.hasNotification('My message', encore.NOTIFY_TYPES.info))
     *              .to.eventually.be.true;
     *     });
     */
    @OverrideWebdriver
    hasNotification(message: string, type?: string): Promise<boolean> {
        type = type ? '.notification-'.concat(type) : '[class^="notification-"]';
        return this.all(by.cssContainingText(type, message)).first().isPresent();
    }

}
