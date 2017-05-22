describe('rxNotification', function () {
    var scope, compile, el2, notifySvc;
    var messageText1 = 'My Message 1';
    var defaultStack = 'page';

    beforeEach(function () {
        module('encore.ui.utilities');
        module('encore.ui.elements');
        module('templates/rxNotification.html');

        inject(function ($rootScope, $compile, rxNotify) {
            scope = $rootScope.$new();
            compile = $compile;
            notifySvc = rxNotify;
        });
    });

    describe('element: Notification', function () {
        beforeEach(function () {
            var rxNotificationTemplate = '<rx-notification type="warning">' + messageText1 + '</rx-notification>';
            el2 = helpers.createDirective(rxNotificationTemplate, compile, scope);
        });

        it('should have warning CSS class when setting type attribute to warning', function () {
            // Find the second div and check for class. Why won't it take div.rx-notification?
            var newEl = el2.find('div').eq(1);
            expect(newEl.hasClass('notification-warning')).to.be.true;
        });

        it.skip('should contain the message', function () {
            var newEl = el2.find('span').eq(1);
            expect(newEl.text()).to.contain(messageText1);
        });

        it.skip('should add notification to stack and remove original element', function () {
            var stackTemplate = '<div><rx-notification stack="page" type="info">' + messageText1 +
                                    '</rx-notification></div>';

            // Before compiling this notification, stack should be empty
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
            el2 = helpers.createDirective(stackTemplate, compile, scope);

            // Stack should now have the contents of the notification directive
            expect(notifySvc.stacks[defaultStack].length).to.equal(1);
            expect(notifySvc.stacks[defaultStack][0].type).to.equal('info');
            expect(notifySvc.stacks[defaultStack][0].text).to.contain(messageText1);

            // el2 is now <div></div> and it should have no children
            expect(el2.children().length).to.equal(0);
        });
    });
});
