angular.module('demoApp')
.controller('formInputGroupsDemoCtrl', function ($scope) {
    /* ========== DATA ========== */
    $scope.beatles = [
        'Paul McCartney',
        'John Lennon',
        'Ringo Starr',
        'George Harrison'
    ];

    $scope.nevers = [
        'Give you up',
        'Let you down',
        'Run around',
        'Desert you',
        'Make you cry',
        'Say goodbye',
        'Tell a lie',
        'Hurt you'
    ];

    $scope.favoriteBeatle = 'all';
    $scope.settings = {
        first: true,
        second: false,
        third: true,
        fourth: false
    };

});
