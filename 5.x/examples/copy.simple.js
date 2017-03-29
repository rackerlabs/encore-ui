angular.module('demoApp')
.controller('copySimpleCtrl', function ($scope) {
    $scope.shortValue = 'This is a short sentence.';

    $scope.loremIpsum = [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit',
        'amet elit ut metus semper tempor ac vitae nunc. Fusce cursus odio',
        'eget maximus vulputate. Nullam hendrerit enim vitae augue vulputate,',
        'eu consequat tellus imperdiet. Duis magna dolor, scelerisque non',
        'magna ac, bibendum interdum turpis. Phasellus placerat placerat',
        'nunc, in sodales neque. Proin at urna quis tellus congue feugiat.',
        'Praesent dictum porttitor tristique. In tincidunt dignissim ultricies.',
        'Maecenas in turpis a odio dictum molestie.'
    ].join(' ');
});
