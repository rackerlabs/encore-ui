describe('rxNotification', function () {
    var scope, compile, el, notifySvc;
    var messageText1 = 'My Message 1';
    var defaultStack = 'page';
    var template;

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
            template = '<rx-notification type="warning">' + messageText1 + '</rx-notification>';
            el = helpers.createDirective(template, compile, scope);
        });

        it('should have warning CSS class when setting type attribute to warning', function () {
            // Find the first div and check for class.
            var wrapper = el.find('.rx-notification').eq(0);
            expect(wrapper.hasClass('notification-warning')).to.be.true;
        });

        it('should contain the message', function () {
            var elText = el.find('.notification-text').eq(0);
            expect(elText.text()).to.contain(messageText1);
        });

        it.skip('should add notification to stack and remove original element', function () {
            var stackTemplate = '<div><rx-notification stack="page" type="info">' + messageText1 +
                                    '</rx-notification></div>';

            // Before compiling this notification, stack should be empty
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
            el = helpers.createDirective(stackTemplate, compile, scope);

            // Stack should now have the contents of the notification directive
            expect(notifySvc.stacks[defaultStack].length).to.equal(1);
            expect(notifySvc.stacks[defaultStack][0].type).to.equal('info');
            expect(notifySvc.stacks[defaultStack][0].text).to.contain(messageText1);

            // el is now <div></div> and it should have no children
            expect(el.children().length).to.equal(0);
        });
    });
});
