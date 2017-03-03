angular.module('demoApp')
.controller('datePickerSimpleCtrl', function ($scope) {
    $scope.dateModel = moment(new Date()).format('YYYY-MM-DD');
});
