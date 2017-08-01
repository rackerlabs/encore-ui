var _ = require('lodash');

var feedback = encore.rxFeedback;

describe('rxFeedback', function () {
    var successfulFeedback, unsuccessfulFeedback;
    var defaultFeedback = 'Software Bug';

    before(function () {
        demoPage.go('#/elements/Feedback');
        successfulFeedback = feedback.initialize($('#rxFeedbackSucceeds'));
        unsuccessfulFeedback = feedback.initialize($('#rxFeedbackFails'));
    });

    it('should select the "' + defaultFeedback + '" feedback type by default', function () {
        successfulFeedback.open();
        expect(successfulFeedback.type).to.eventually.equal(defaultFeedback);
    });

    it('should have the default feedback description label for "' + defaultFeedback + '"', function () {
        expect(successfulFeedback.descriptionLabel).to.eventually.equal('Bug Description:');
    });

    it('should have the default feedback placeholder text for "' + defaultFeedback + '"', function () {
        var placeholder = 'Please be as descriptive as possible so we can track it down for you.';
        expect(successfulFeedback.descriptionPlaceholder).to.eventually.equal(placeholder);
    });

    describe('feedback types and labels', function () {
        var typesAndLabels = {
            'Incorrect Data': {
                descriptionLabel: 'Problem Description:',
                descriptionPlaceholder: ['Please be as descriptive as possible ',
                                         'so we can figure it out for you.'].join('')
            },
            'Feature Request': {
                descriptionLabel: 'Feature Description:',
                descriptionPlaceholder: ['Please be as descriptive as possible ',
                                         'so we can make your feature awesome.'].join('')
            },
            'Kudos': {
                descriptionLabel: 'What made you happy?:',
                descriptionPlaceholder: ['We love to hear that you\'re enjoying Encore! ',
                                         'Tell us what you like, and what we can do to ',
                                         'make it even better'].join('')
            }
        };

        it('should have all feedback types', function () {
            var types = [defaultFeedback].concat(_.keys(typesAndLabels));
            expect(successfulFeedback.types).to.eventually.eql(types);
        });

        _.forEach(typesAndLabels, function (typeData, type) {
            it('should switch feedback types', function () {
                successfulFeedback.type = type;
                expect(successfulFeedback.type).to.eventually.equal(type);
            });

            _.forEach(typeData, function (text, property) {
                it('should have the correct label set for ' + property, function () {
                    expect(successfulFeedback[property]).to.eventually.equal(text);
                });
            });

        });

    });

    describe('submitting feedback', function () {

        it('should successfully submit feedback', function () {
            var send = function () {
                var deferred = protractor.promise.defer();
                deferred.fulfill(successfulFeedback.send('Software Bug', 'test', 3000));
                return deferred.promise;
            };
            expect(send()).to.not.be.rejectedWith(Error);
        });

        it('should catch errors on unsuccessful feedback', function () {
            var send = function () {
                var deferred = protractor.promise.defer();
                deferred.fulfill(unsuccessfulFeedback.send('Software Bug', 'test', 3000));
                return deferred.promise;
            };
            browser.sleep(3000);
            expect(send()).to.be.rejectedWith(Error);
        });

    });

});
