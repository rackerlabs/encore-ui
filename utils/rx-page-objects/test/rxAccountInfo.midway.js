var rxAccountInfoPage = encore.rxAccountInfo;
var notifications = encore.rxNotify;
var expect = require('chai').use(require('chai-as-promised')).expect;

describe('elements:rxAccountInfo', function () {
    var rxAccountInfo;

    before(function () {
        demoPage.go('#/elements/AccountInfo');
        rxAccountInfo = rxAccountInfoPage.initialize($('.demo-simple-account rx-account-info'));
    });

    it('should show element', function () {
        expect(rxAccountInfo.isDisplayed()).to.eventually.be.true;
    });

    it('should show the account name', function () {
        expect(rxAccountInfo.name).to.eventually.equal('Mosso');
    });

    it('should show the account number', function () {
        expect(rxAccountInfo.number).to.eventually.equal('12345');
    });

    it('should show the account access policy', function () {
        expect(rxAccountInfo.accessPolicy).to.eventually.equal('Full');
    });

    it('should show the account collection status', function () {
        expect(rxAccountInfo.collectionsStatus).to.eventually.equal('CURRENT');
    });

    describe('badges', function () {
        var badgeNames = ['Creative Commons', 'Attribution', 'Non-Commercial', 'Public Domain'];

        it('should have four badges on the first Account Info box', function () {
            expect(rxAccountInfo.badge.count()).to.eventually.equal(4);
        });

        it('should have the correct first badge src via byIndex', function () {
            var src = 'http://mirrors.creativecommons.org/presskit/icons/cc.large.png';
            expect(rxAccountInfo.badge.byIndex(0).src).to.eventually.equal(src);
        });

        it('should have badge names', function () {
            expect(rxAccountInfo.badge.names).to.eventually.eql(badgeNames);
        });

        it('should have the right name on the last badge', function () {
            expect(rxAccountInfo.badge.byIndex(-1).name).to.eventually.equal('Public Domain');
        });

        it('should have the right description on the last badge', function () {
            var description = 'Waives as many rights as legally possible, worldwide.';
            expect(rxAccountInfo.badge.byIndex(-1).description).to.eventually.equal(description);
        });

        describe('searching', function () {

            it('should search for just one badge by string for an exact match', function () {
                expect(rxAccountInfo.badge.byName('Attribution').name).to.eventually.equal('Attribution');
            });

            it('should report that a badge is present', function () {
                expect(rxAccountInfo.badge.isPresent('Non-Commercial')).to.eventually.be.true;
            });

            it('should report that a badge does not exist', function () {
                expect(rxAccountInfo.badge.isPresent('Caveat Emptor')).to.eventually.be.false;
            });

            it('should search for many badges with a regular expression', function () {
                rxAccountInfo.badges.matchingName(/\w\s\w/).then(function (twoWordBadges) {
                    expect(twoWordBadges[0].name).to.eventually.equal('Creative Commons');
                    expect(twoWordBadges[1].name).to.eventually.equal('Public Domain');
                });
            });

        });

    });

    var statuses = rxAccountInfoPage.statuses;
    var statusTypes = rxAccountInfoPage.statusTypes;
    describe('account with warning status type', function () {
        var warningAccount;

        before(function () {
            warningAccount = rxAccountInfoPage.initialize($('.delinquent-account rx-account-info'));
        });

        it('should have a name', function () {
            expect(warningAccount.name).to.eventually.equal('DelinquentAccount');
        });

        it('should have a deliquent status', function () {
            expect(warningAccount.status).to.eventually.equal(statuses.delinquent);
        });

        it('should have a warning type', function () {
            expect(warningAccount.statusType).to.eventually.equal(statusTypes.warning);
        });

    });

    describe('account with info status type', function () {
        var infoAccount;

        before(function () {
            infoAccount = rxAccountInfoPage.initialize($('.unverified-account rx-account-info'));
        });

        it('should have a name', function () {
            expect(infoAccount.name).to.eventually.equal('UnverifiedAccount');
        });

        it('should have a deliquent status', function () {
            expect(infoAccount.status).to.eventually.equal(statuses.unverified);
        });

        it('should have a warning type', function () {
            expect(infoAccount.statusType).to.eventually.equal(statusTypes.info);
        });

    });

    describe('error messages', function () {

        it('should show an error notification when it cannot load badges', function () {
            var errorMessage = 'Error retrieving badges for this account';
            expect(notifications.byStack('badgeError').isPresent(errorMessage)).to.eventually.be.true;
        });

        it('should show an error notification when it cannot load account name', function () {
            var errorMessage = 'Error retrieving account name';
            expect(notifications.byStack('nameError').isPresent(errorMessage)).to.eventually.be.true;
        });
    });

});
