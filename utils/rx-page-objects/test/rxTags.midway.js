describe('rxTags', function () {

    before(function () {
        demoPage.go('#/elements/Tags');
    });

    describe('exercises', encore.exercise.rxTags({
        instance: encore.rxTags.initialize($('#standard-tags')),
        sampleText: 'orange'
    }));

});
