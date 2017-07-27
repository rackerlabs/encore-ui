describe('rxMultiSelect', function () {
    before(function () {
        demoPage.go('#/elements/Forms');
    });

    describe('(state) Valid Enabled', encore.exercise.rxMultiSelect({
        instance: encore.rxMultiSelect.initialize($('#msValidEnabled')),
        inputs: ['Type A', 'Type B', 'Type C', 'Type D'],
        valid: true,
        disabled: false
    }));

    describe('(state) Valid Disabled', encore.exercise.rxMultiSelect({
        instance: encore.rxMultiSelect.initialize($('#msValidDisabled')),
        inputs: ['Not Allowed'],
        valid: true,
        disabled: true
    }));

    describe('(state) Invalid Enabled', encore.exercise.rxMultiSelect({
        instance: encore.rxMultiSelect.initialize($('#msInvalidEnabled')),
        inputs: ['Type A', 'Type B', 'Type C', 'Type D'],
        valid: false,
        disabled: false
    }));

    describe('(state) Invalid Disabled', encore.exercise.rxMultiSelect({
        instance: encore.rxMultiSelect.initialize($('#msInvalidDisabled')),
        inputs: ['Not Allowed'],
        valid: false,
        disabled: true
    }));
});
