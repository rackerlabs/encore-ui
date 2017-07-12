describe('rxCharacterCount', function () {

    before(function () {
        demoPage.go('#/elements/Forms');
    });

    describe('defaults', encore.exercise.rxCharacterCount({
        instance: encore.rxCharacterCount.initialize($('.demo-default-char-count-values'))
    }));

    describe('low max characters', encore.exercise.rxCharacterCount({
        instance: encore.rxCharacterCount.initialize($('.demo-custom-max-characters')),
        maxCharacters: 25
    }));

    describe('high near limit level', encore.exercise.rxCharacterCount({
        instance: encore.rxCharacterCount.initialize($('.demo-custom-low-boundary')),
        nearLimit: 250
    }));

    describe('count insignificant whitespace', encore.exercise.rxCharacterCount({
        instance: encore.rxCharacterCount.initialize($('.demo-custom-do-not-trim')),
        ignoreInsignificantWhitespace: false
    }));

    describe('initial value', encore.exercise.rxCharacterCount({
        instance: encore.rxCharacterCount.initialize($('.demo-initial-value'))
    }));
});
