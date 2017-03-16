// this loads all the module controllers used in the demos





angular.module('demoApp')
.controller('rxAppCtrl', function ($scope, $location, $rootScope, $window, encoreRoutes, rxVisibility, rxSession) {
    rxSession.getUserId = function () {
        return 'bert3000';
    };

    $scope.subtitle = 'With a subtitle';

    $scope.changeSubtitle = function () {
        $scope.subtitle = 'With a new subtitle at ' + Date.now();
    };

    rxVisibility.addMethod(
        'isUserDefined',
        function () {
            return !_.isEmpty($rootScope.user);
        }
    );

    $scope.changeRoutes = function () {
        var newRoute = {
            linkText: 'Updated Route',
            childVisibility: 'true',
            children: [
                {
                    linkText: 'New child route'
                }
            ]
        };

        encoreRoutes.setRouteByKey('accountLvlTools', newRoute);
    };

    // Fake navigation
    var customApp = document.getElementById('custom-rxApp');
    customApp.addEventListener('click', function (ev) {
        var target = ev.target;

        if (target.className.indexOf('item-link') > -1) {
            // prevent the default jump to top
            ev.preventDefault();

            var href = target.getAttribute('href');

            // update angular location (if href has a value)
            if (!_.isEmpty(href)) {
                // we need to prevent the window from scrolling (the demo does this)
                // so we get the current scrollTop position
                // and set it after the demo page has run '$routeChangeSuccess'
                var currentScollTop = document.body.scrollTop;

                $location.hash(href);

                $rootScope.$apply();

                $window.scrollTo(0, currentScollTop);
            }
        }
    });

    var searchDirective = [
        'rx-app-search placeholder="Enter User"',
        'model="$root.user"',
        'pattern="/^([0-9a-zA-Z._ -]{2,})$/"'
    ].join(' ');

    $scope.customMenu = [{
        title: 'Example Menu',
        children: [
            {
                href: 'Lvl1-1',
                linkText: '1st Order Item'
            },
            {
                linkText: '1st Order Item (w/o href) w/ Children',
                childVisibility: [ 'isUserDefined' ],
                childHeader: '<strong class="current-search">Current User:</strong>' +
                             '<span class="current-result">{{$root.user}}</span>',
                directive: searchDirective,
                children: [
                    {
                        href: 'Lvl1-2-Lvl2-1',
                        linkText: '2nd Order Item w/ Children',
                        children: [{
                            href: 'Lvl1-2-Lvl2-1-Lvl3-1',
                            linkText: '3rd Order Item'
                        }]
                    },
                    {
                        href: 'Lvl1-2-Lvl2-2',
                        linkText: '2nd Order Item w/ Children',
                        children: [
                            {
                                href: 'Lvl1-2-Lvl2-2-Lvl3-1',
                                linkText: '3rd Order Item'
                            },
                            {
                                href: 'Lvl1-2-Lvl2-2-Lvl3-2',
                                linkText: '3rd Order Item'
                            },
                            {
                                href: 'Lvl1-2-Lvl2-2-Lvl3-3',
                                linkText: '3rd Order Item'
                            },
                            {
                                href: 'Lvl1-2-Lvl2-2-Lvl3-4',
                                linkText: '3rd Order Item'
                            }
                        ]
                    },
                    {
                        href: 'Lvl1-2-Lvl2-3',
                        linkText: '2nd Order Item'
                    }
                ]
            },
            {
                href: 'Lvl1-3',
                linkText: '1st Order Item w/ Children',
                children: [
                    {
                        href: 'Lvl1-3-Lvl2-1',
                        linkText: '2nd Order Item'
                    }
                ]
            }
        ]
    }];

    // Load docs homepage ('Overview')
    // NOTE: Trailing forward slash is not an accident.
    // This is required to get Firefox to load the iframe.
    //
    // The resulting url should have double forward slashes `//`.
    $scope.embedUrl = $location.absUrl().split('#')[0] + '/';
});


angular.module('demoApp')
.controller('rxOptionTableCtrl', function ($scope) {
    $scope.radioValue = 0;
    $scope.checkboxValues = [true, 'unchecked'];

    $scope.optionTableData = [
        {
            'id': 'option1',
            'name': 'Option #1',
            'value': 0,
            'obj': {
                'name': 'Nested Name 1'
            }
        }, {
            'id': 'option2',
            'name': 'Option #2',
            'value': 1,
            'obj': {
                'name': 'Nested Name 2'
            }
        }, {
            'id': 'option3',
            'name': 'Option #3',
            'value': 2,
            'obj': {
                'name': 'Nested Name 3'
            }
        }, {
            'id': 'option4',
            'name': 'Option #4',
            'value': 3,
            'obj': {
                'name': 'Nested Name 4'
            }
        }
    ];

    $scope.optionTableColumns = [
        {
            'label': 'Name',
            'key': 'name',
            'selectedLabel': '(Already saved data)'
        }, {
            'label': 'Static Content',
            'key': 'Some <strong>Text &</strong> HTML'
        }, {
            'label': 'Expression 2',
            'key': '{{ value * 100 | number:2 }}'
        }, {
            'label': 'Expression 3',
            'key': '{{ obj.name | uppercase }}'
        }, {
            'label': 'Expression 4',
            'key': '{{ value | currency }}'
        }
    ];

    $scope.optionTableCheckboxData = [
        {
            'name': 'Item 1'
        }, {
            'name': 'Item 2',
            'value': 'checked',
            'falseValue': 'unchecked'
        }
    ];

    $scope.optionTableEmptyData = [];

    $scope.disableOption = function (tableId, fieldId, rowId) {
        return rowId === 'option4';
    };
});


// Note that these factories are only present for the purposes of this demo. In a real application,
// SupportAccount, Teams, AccountStatusGroup, and Encore will have to be provided from elsewhere,
// outside of encore-ui. Specifically, we implement them in encore-ui-svcs.

angular.module('demoApp')
.value('Badges',
       [{
           url: 'http://mirrors.creativecommons.org/presskit/icons/cc.large.png',
           description: 'Enables the free distribution of an otherwise copyrighted work.',
           name: 'Creative Commons'
       }, {
           url: 'http://mirrors.creativecommons.org/presskit/icons/by.large.png',
           description: ['You must give appropriate credit, provide a link to the',
                         'license, and indicate if changes were made.'].join(' '),
           name: 'Attribution'
       }, {
           url: 'http://mirrors.creativecommons.org/presskit/icons/nc.large.png',
           description: 'You may not use the material for commercial purposes.',
           name: 'Non-Commercial'
       }, {
           url: 'http://mirrors.creativecommons.org/presskit/icons/zero.large.png',
           description: 'Waives as many rights as legally possible, worldwide.',
           name: 'Public Domain'
       }]
)
.value('TeamBadges',
       [{
           url: 'http://mirrors.creativecommons.org/presskit/icons/share.large.png',
           description: ['Licensees may distribute derivative works only under a license',
                         'identical to the license that governs the original work.'].join(' '),
           name: 'ShareAlike'
       }, {
           url: 'http://mirrors.creativecommons.org/presskit/icons/nd.large.png',
           description: ['Licensees may copy, distribute, display and perform only verbatim',
                         'copies of the work, not derivative works based on it.'].join(' '),
           name: 'No-Derivs'
       }]
)
.factory('SupportAccount', function ($q, Badges) {
    return {
        getBadges: function (config, success, failure) {
            var deferred = $q.defer();

            if (config.accountNumber === '6789') {
                deferred.reject();
            } else {
                deferred.resolve(Badges);
            }

            deferred.promise.then(success, failure);

            return deferred.promise;
        }
    };
})
.factory('Teams', function ($q, TeamBadges) {
    return {
        badges: function (config) {
            var deferred = $q.defer();

            if (config.id === '9876') {
                deferred.reject();
            } else {
                deferred.resolve(TeamBadges);
            }

            deferred.$promise = deferred.promise;

            return deferred;
        }
    };
})
.factory('Encore', function ($q) {
    return {
        getAccount: function (config, success, failure) {
            var deferred = $q.defer();

            if (config.id === '9876') {
                deferred.reject();
            } else if (config.id === '5623') {
                deferred.resolve({ name: 'DelinquentAccount', status: 'Delinquent', accessPolicy: 'Full' });
            } else if (config.id === '3265') {
                deferred.resolve({ name: 'UnverifiedAccount', status: 'Unverified', accessPolicy: 'Full' });
            } else {
                deferred.resolve({ name: 'Mosso', status: 'Active', accessPolicy: 'Full' });
            }

            deferred.promise.then(success, failure);

            return deferred.promise;
        }
    };
})
.factory('AccountStatusGroup', function () {
    var warning = ['suspended', 'delinquent'];
    var info = ['unverified', 'pending approval', 'approval denied', 'teststatus', 'terminated'];

    return function (statusText) {
        var lower = statusText.toLowerCase();
        if (_.includes(warning, lower)) {
            return 'warning';
        } else if (_.includes(info, lower)) {
            return 'info';
        }
        return '';
    };
});


angular.module('demoApp')
.controller('actionMenuSimpleCtrl', function ($scope, rxNotify) {
    $scope.add = function () {
        rxNotify.add('Added!', {
            type: 'success',
            repeat: false,
            timeout: 3
        });
    };

    $scope.remove = function () {
        rxNotify.add('Deleted!', {
            type: 'error',
            repeat: false,
            timeout: 3
        });
    };
});


angular.module('demoApp')
.controller('breadcrumbsSimpleCtrl', function ($scope, rxBreadcrumbsSvc) {
    rxBreadcrumbsSvc.set([{
        path: '#/elements',
        name: 'Elements',
    }, {
        name: '<strong>All Elements</strong>',
        status: 'demo'
    }]);
});


angular.module('demoApp')
.controller('buttonAnimatedExampleCtrl', function ($scope, $timeout) {
    $scope.status = {
        loading: false,
        disable: false
    };

    $scope.clickMe = function () {
        $scope.status.loading = true;
        $timeout(function () {
            $scope.status.loading = false;
        }, 4000);
    };
});

angular.module('demoApp')
.controller('buttonDisableCtrl', function ($scope, $timeout) {
    $scope.status = {
        loading: false,
        disable: true
    };

    $scope.login = function () {
        $scope.status.loading = true;

        $timeout(function () {
            $scope.status.loading = false;
        }, 4000);
    };//login()
});

angular.module('demoApp')
.controller('buttonGroupExampleCtrl', function ($scope) {
    $scope.status = 'off';
});

angular.module('demoApp')
.controller('buttonSimpleCtrl', function ($scope, $timeout) {
    $scope.isLoading = false;

    $scope.login = function () {
        $scope.isLoading = true;

        $timeout(function () {
            $scope.isLoading = false;
        }, 4000);
    };//login()
});




angular.module('demoApp')
.controller('copyAdvancedCtrl', function ($scope) {
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

angular.module('demoApp')
.controller('copyTableCtrl', function ($scope) {
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


angular.module('demoApp')
.controller('feedbackSimpleExampleCtrl', function ($scope, rxNotify) {
    $scope.alwaysSucceed = function () {
        rxNotify.add('Thanks for your feedback!', {
            type: 'success',
            timeout: 3
        });
    };

    $scope.alwaysFail = function () {
        rxNotify.add('Feedback not received!', {
            type: 'error',
            timeout: 3
        });
    };
});




angular.module('demoApp')
.controller('characterCountDocsCtrl', function ($scope) {
    $scope.data = {
        comment1: '',
        comment2: '',
        comment3: '',
        comment4: '',
        comment5: 'I have an initial value',
        comment6: ''
    };
});

angular.module('demoApp')
.controller('checkboxDocsCtrl', function ($scope) {
    $scope.chkValidEnabledOne = true;
    $scope.chkValidEnabledTwo = false;
    $scope.chkValidDisabledOne = true;
    $scope.chkValidDisabledTwo = false;
    $scope.chkValidNgDisabledOne = true;
    $scope.chkValidNgDisabledTwo = false;

    $scope.chkInvalidEnabledOne = true;
    $scope.chkInvalidEnabledTwo = false;
    $scope.chkInvalidDisabledOne = true;
    $scope.chkInvalidDisabledTwo = false;
    $scope.chkInvalidNgDisabledOne = true;
    $scope.chkInvalidNgDisabledTwo = false;
});

angular.module('demoApp')
.controller('datePickerDocsCtrl', function ($scope) {
    $scope.enabledValid = '2015-12-15';
    $scope.disabledValid = '2015-12-15';

    $scope.enabledInvalid = '2015-12-15';
    $scope.disabledInvalid = '2015-12-15';
});

angular.module('demoApp')
.controller('multiSelectDocsCtrl', function ($scope) {
    $scope.classification = [];
});

angular.module('demoApp')
.controller('radioDocsCtrl', function ($scope) {
    $scope.validEnabled = 1;
    $scope.validDisabled = 1;
    $scope.validNgDisabled = 1;

    $scope.invalidEnabled = 1;
    $scope.invalidDisabled = 1;
    $scope.invalidNgDisabled = 1;

    $scope.plainHtmlRadio = 'isChecked';
});

angular.module('demoApp')
.controller('selectDocsCtrl', function ($scope) {
    $scope.validEnabled = 3;
    $scope.validNgDisabled = 'na';
    $scope.validDisabled = 'na';

    $scope.invalidEnabled = 4;
    $scope.invalidNgDisabled = 'na';
    $scope.invalidDisabled = 'na';

    $scope.htmlSelectAlternativeValue = 'second';
});

angular.module('demoApp')
.controller('timePickerDocsCtrl', function ($scope) {
    $scope.enabledValid = '06:00-06:00';
    $scope.disabledValid = '20:00+08:00';

    $scope.enabledInvalid = '17:45+05:00';
    $scope.disabledInvalid = '05:15+00:00';
});

angular.module('demoApp')
.controller('checkboxShowHideCtrl', function ($scope) {
    $scope.amSure = false;
    $scope.amReallySure = false;

    $scope.$watch('amSure', function (newVal) {
        if (newVal === false) {
            $scope.amReallySure = false;
        }
    });
});

angular.module('demoApp')
.controller('datePickerEmptyCtrl', function ($scope) {
    $scope.emptyDate = '';

    $scope.undefinedDate = undefined;
});

angular.module('demoApp')
.controller('datePickerSimpleCtrl', function ($scope) {
    $scope.dateModel = moment(new Date()).format('YYYY-MM-DD');
});

angular.module('demoApp')
.controller('formAdvancedControlsDemoCtrl', function ($scope) {
    $scope.radChoice = 'default';
    $scope.inputEnabled = false;
});

angular.module('demoApp')
.controller('formsAutoSaveExampleController', function ($scope, rxAutoSave) {
    $scope.forms = { autosave: '' };
    rxAutoSave($scope, 'forms');
});

angular.module('demoApp')
.controller('formCheckboxOptionTableDemoCtrl', function ($scope) {

    $scope.optionTableColumns = [
        {
            'label': 'Name',
            'key': 'name',
            'selectedLabel': '(Already saved data)'
        }, {
            'label': 'Static Content',
            'key': 'Some <strong>Text &</strong> HTML'
        }, {
            'label': 'Expression 2',
            'key': '{{ value * 100 | number:2 }}'
        }, {
            'label': 'Expression 3',
            'key': '{{ obj.name | uppercase }}'
        }, {
            'label': 'Expression 4',
            'key': '{{ value | currency }}'
        }
    ];

    $scope.optionTableCheckboxData = [
        {
            'name': 'Item 1'
        }, {
            'name': 'Item 2',
            'value': 'checked',
            'falseValue': 'unchecked'
        }
    ];
    // example with first checkbox automatically checked
    $scope.table = {
        checkbox: [true, 'unchecked']
    };
});

angular.module('demoApp')
.controller('formsDisabledExamplesCtrl', function ($scope) {
    $scope.txtDisabled = 'Disabled Text Input';
    $scope.selDisabled = 'disabled';
    $scope.radDisabled = 1;
    $scope.chkDisabledOne = true;
    $scope.chkDisabledTwo = false;
    $scope.togDisabledOn = true;
    $scope.togDisabledOff = false;
    $scope.txtAreaDisabled = 'Disabled Textarea';
});

angular.module('demoApp')
.controller('formDropDownDemoCtrl', function ($scope) {
    /* ========== DATA ========== */
    $scope.volumeTypes = [
        {
            'value': 'SATA',
            'label': 'SATA'
        },
        {
            'value': 'SSD',
            'label': 'SSD'
        },
        {
            'value': 'CD',
            'label': 'CD'
        },
        {
            'value': 'DVD',
            'label': 'DVD'
        },
        {
            'value': 'BLURAY',
            'label': 'BLURAY'
        },
        {
            'value': 'TAPE',
            'label': 'TAPE'
        },
        {
            'value': 'FLOPPY',
            'label': 'FLOPPY'
        },
        {
            'value': 'LASERDISC',
            'label': 'LASERDISC'
        },
        {
            'value': 'JAZDRIVE',
            'label': 'JAZDRIVE'
        },
        {
            'value': 'PUNCHCARDS',
            'label': 'PUNCHCARDS'
        },
        {
            'value': 'RNA',
            'label': 'RNA'
        }
    ];

    $scope.services = [
        {
            'value': 'good',
            'label': 'Good Service'
        },
        {
            'value': 'cheap',
            'label': 'Cheap Service'
        },
        {
            'value': 'fast',
            'label': 'Fast Service'
        },
        {
            'value': 'custom',
            'label': 'Custom Service'
        }
    ];
    // select the first type by default
    $scope.volumeType = _.head($scope.volumeTypes).value;
    $scope.selectedServices = [];
});

angular.module('demoApp')
.controller('formEmptyOptionTableDemoCtrl', function ($scope) {
  
    $scope.optionTableColumns = [
        {
            'label': 'Name',
            'key': 'name',
            'selectedLabel': '(Already saved data)'
        }, {
            'label': 'Static Content',
            'key': 'Some <strong>Text &</strong> HTML'
        }, {
            'label': 'Expression 2',
            'key': '{{ value * 100 | number:2 }}'
        }, {
            'label': 'Expression 3',
            'key': '{{ obj.name | uppercase }}'
        }, {
            'label': 'Expression 4',
            'key': '{{ value | currency }}'
        }
    ];

    $scope.optionTableEmptyData = [];

    $scope.table = {
        empty: [true, 'unchecked']
    };
});

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

angular.module('demoApp')
.controller('formIntermediateControlsDemoCtrl', function ($scope) {
    $scope.userEmail = '';
    $scope.isNameRequired = true;
    $scope.volumeName = '';
})
.directive('foocheck', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.foocheck = function (modelValue, viewValue) {
                var value = modelValue || viewValue;
                return _.includes(value, 'foo');
            }
        }
    };
});

angular.module('demoApp')
.controller('formsManualSaveExampleController', function ($scope, $timeout, rxNotify) {
    $scope.saving = false;
    $scope.save = function () {
        $scope.saving = true;
        rxNotify.clear('page');
        $timeout(function () {
            $scope.saving = false;
            $scope.lastSaved = Date.now();
            rxNotify.add('Data successfully saved!', {
                type: 'success'
            });
        }, 1000);
    };
});

angular.module('demoApp')
.controller('formRadioOptionTableDemoCtrl', function ($scope) {
    
    $scope.optionTableData = [
        {
            'id': 'option1_id',
            'name': 'Option #1',
            'value': 0,
            'obj': {
                'name': 'Nested Name 1'
            }
        }, {
            'id': 'option2_id',
            'name': 'Option #2',
            'value': 1,
            'obj': {
                'name': 'Nested Name 2'
            }
        }, {
            'id': 'option3_id',
            'name': 'Option #3',
            'value': 2,
            'obj': {
                'name': 'Nested Name 3'
            }
        }, {
            'id': 'option4_id',
            'name': 'Option #4',
            'value': 3,
            'obj': {
                'name': 'Nested Name 4'
            }
        }
    ];

    $scope.optionTableColumns = [
        {
            'label': 'Name',
            'key': 'name',
            'selectedLabel': '(Already saved data)'
        }, {
            'label': 'Static Content',
            'key': 'Some <strong>Text &</strong> HTML'
        }, {
            'label': 'Expression 2',
            'key': '{{ value * 100 | number:2 }}'
        }, {
            'label': 'Expression 3',
            'key': '{{ obj.name | uppercase }}'
        }, {
            'label': 'Expression 4',
            'key': '{{ value | currency }}'
        }
    ];
    /* ========== FUNCTIONS ========== */
    $scope.disableOption = function (tableId, fieldId, rowId) {
        return rowId === 'option4_id';
    };

    $scope.table = {
        radio: 0
    };
});

angular.module('demoApp')
.controller('formsInvalidExamplesCtrl', function ($scope) {
    $scope.txtInvalid = 'Invalid text input';
    $scope.selInvalid = 'invalid';
    $scope.radInvalid = 1;
    $scope.chkInvalidOne = true;
    $scope.chkInvalidTwo = false;
    $scope.togInvalidOn = true;
    $scope.togInvalidOff = false;
    $scope.txtAreaInvalid = 'Invalid Value';
});

angular.module('demoApp')
.controller('multiSelectSimpleCtrl', function ($scope) {
    $scope.classification = [];
});

angular.module('demoApp')
.controller('radioDestroyCtrl', function ($scope) {
    $scope.radCreateDestroy = 'destroyed';
});

angular.module('demoApp')
.controller('searchBoxCustomCtrl', function ($scope) {
    $scope.filterPlaceholder = 'Filter by any...';
});

angular.module('demoApp')
.controller('selectDestroyCtrl', function ($scope) {
    $scope.radCreateDestroy = 'destroyed';
});

angular.module('demoApp')
.controller('timePickerSimpleCtrl', function ($scope) {
    $scope.emptyValue = '';
    $scope.predefinedValue = '22:10-10:00';
});

angular.module('demoApp')
.controller('toggleSwitchAsyncCtrl', function ($scope, $timeout, rxNotify) {
    $scope.toggle3 = true;
    $scope.toggle5 = true;

    $scope.attemptChange = function () {
        $scope.loading = true;
        rxNotify.clear('page');
        rxNotify.add('Saving...', {
            loading: true
        });

        // Simulate an API request
        $timeout(function () {
            $scope.loading = false;
            rxNotify.clear('page');
            rxNotify.add('Change saved', {
                type: 'success'
            });
        }, 1000);
    };

    $scope.attemptFailedChange = function (value) {
        $scope.loading5 = true;
        rxNotify.clear('page');
        rxNotify.add('Attempting to activate...', {
            loading: true
        });

        // Simulate a failed API request
        $timeout(function () {
            $scope.loading5 = false;
            rxNotify.clear('page');
            rxNotify.add('Asynchronous operation failed', {
                type: 'error',
            });

            // Reset toggle switch to original value to simulate failed async operation
            $scope.toggle5 = !value;
        }, 1000);
    };
});








angular.module('demoApp')
.controller('metadataSimpleExampleCtrl', function ($scope) {
    $scope.someDate = new Date('January 6 1989');
    $scope.someAmount = 192.68;
});


angular.module('demoApp')
.controller('modalMultiViewCtrl', function ($scope, $modalInstance, $timeout, rxNotify) {
    var complete = function () {
        $scope.loaded = true;
        $scope.setState('complete');
        rxNotify.add('Operation Success!', {
            stack: 'modal',
            type: 'success'
        });
    };

    $scope.submit = function () {
        $scope.setState('confirm');
    };

    $scope.confirm = function () {
        $scope.loaded = false;
        $scope.setState('pending');
        rxNotify.add('Performing Operation...', {
            stack: 'modal',
            loading: true,
            dismiss: [$scope, 'loaded']
        });
        $timeout(complete, 2000);
    };

    $scope.cancel = function () {
        rxNotify.clear('modal');

        /*
         * You may place custom dismiss logic here,
         * if you do not wish to use a `dismiss-hook` function.
         **/

        // This must be called to dismiss the modal.
        $modalInstance.dismiss();
    };
});

angular.module('demoApp')
.controller('modalRegularCtrl', function ($scope, rxNotify) {
    $scope.password = 'guest';

    $scope.populate = function (modalScope) {
        modalScope.user = 'hey_dude';
    };

    $scope.changePass = function (fields) {
        $scope.password = fields.password;
        rxNotify.add('Password Updated!', {
            type: 'success'
        });
    };

    $scope.notifyDismissal = function () {
        rxNotify.add('Password Unchanged', {
            type: 'info'
        });
    };
});


angular.module('demoApp')
.controller('notificationsRouteCtrl', function ($rootScope, $scope, rxNotify) {

    $scope.routeChange = function (stack) {
        $rootScope.$broadcast('$routeChangeStart', {});
        $rootScope.$broadcast('$routeChangeSuccess', {});

        rxNotify.add('Route Changed', {
            stack: stack
        });
    };

});

angular.module('demoApp')
.controller('notificationsStackCtrl', function ($rootScope, $scope, $window, rxNotify) {
    $scope.message = 'My message';

    $scope.types = [ 'info', 'success', 'warning', 'error' ];

    $scope.options = {
        type: 'info',
        timeout: -1,
        show: 'immediate',
        repeat: true
    };

    $scope.ondismiss = {
        should: false,
        method: function (msg) {
            $window.alert('We are dismissing the message: ' + msg.text);
        }
    };

    $scope.add = function (stack) {
        var messageOptions = _.clone($scope.options);

        if ($scope.ondismiss.should) {
            messageOptions.ondismiss = $scope.ondismiss.method;
        }

        messageOptions.stack = stack;

        rxNotify.add($scope.message, messageOptions);
    };

    // add a default messages (to custom stack so they don't show on the main page)
    rxNotify.add('Helpful Information', {
        stack: 'demo'
    });
    rxNotify.add('Loading', {
        loading: true,
        stack: 'demo'
    });
    rxNotify.add('You did it!', {
        type: 'success',
        stack: 'demo'
    });
    rxNotify.add('Careful now...', {
        type: 'warning',
        stack: 'demo'
    });
    rxNotify.add('Under Attack by Aliens', {
        type: 'error',
        stack: 'custom'
    });

});


angular.module('demoApp')
    .controller('progressbarDynamicCtrl', function ($scope) {
        $scope.value = 22;
        $scope.max = 100;
    });


angular.module('demoApp')
.controller('spinnerSimpleCtrl', function ($scope) {
    $scope.loading = true;
});


angular.module('demoApp')
.controller('bulkSelectAdvancedCtrl', function ($scope) {

    $scope.datacenters = [
        { name: 'ORD1', city: 'Chicago' },
        { name: 'DFW1', city: 'Grapevine' },
        { name: 'DFW2', city: 'Richardson' },
        { name: 'IAD2', city: 'Ashburn' },
        { name: 'IAD3', city: 'Ashburn' },
        { name: 'LON1', city: 'West Drayton' },
        { name: 'LON3', city: 'Berkshire' },
        { name: 'LON5', city: 'Crawley' },
        { name: 'HKG1', city: 'Hong Kong' },
        { name: 'SYD2', city: 'Sydney' }
    ];

    // cloned to avoid interference with first demo table
    $scope.validateDatacenters = _.cloneDeep($scope.datacenters);

    $scope.filter = { keyword: '' };

    $scope.getSelectedDatacenters = function () {
        return _.cloneDeep(_.filter($scope.datacenters, { rowIsSelected: true }));
    };

})
.controller('shutDownDatacentersCtrl', function ($scope, $modalInstance, $timeout, rxSortUtil, rxPageTracker) {
    $scope.sort = rxSortUtil.getDefault('name');
    $scope.sortCol = function (predicate) {
        return rxSortUtil.sortCol($scope, predicate);
    };

    var itemsPerPage = 8;
    $scope.pager = rxPageTracker.createInstance({ itemsPerPage: itemsPerPage });
    $scope.showPagination = itemsPerPage < $scope.selectedDatacenters.length;

    $scope.removeDatacenter = function (dc) {
        _.remove($scope.selectedDatacenters, dc);
    };

    $scope.submit = function () {
        $scope.setState('working');

        $scope.numCompleted = 0;

        var delay = 1000;
        $scope.selectedDatacenters.forEach(function (dc, i) {
            $timeout(function () {
                dc.status = 'pending';
            }, i * delay);
            $timeout(function () {
                dc.status = i % 4 === 0 ? 'failure' : 'success';
                $scope.numCompleted++;
            }, ++i * delay);
        });
        $timeout(function () {
            $scope.setState('complete');
            $scope.errorsPresent = _.some($scope.selectedDatacenters, { status: 'failure' });
        }, $scope.selectedDatacenters.length * delay);
    };

    $scope.cancel = $modalInstance.dismiss;
});

angular.module('demoApp')
.controller('bulkSelectValidateCtrl', function ($scope) {

    $scope.datacenters = [
        { name: 'ORD1', city: 'Chicago' },
        { name: 'DFW1', city: 'Grapevine' },
        { name: 'DFW2', city: 'Richardson' },
        { name: 'IAD2', city: 'Ashburn' },
        { name: 'IAD3', city: 'Ashburn' },
        { name: 'LON1', city: 'West Drayton' },
        { name: 'LON3', city: 'Berkshire' },
        { name: 'LON5', city: 'Crawley' },
        { name: 'HKG1', city: 'Honk Kong' },
        { name: 'SYD2', city: 'Sydney' }
    ];

    // cloned to avoid interference with first demo table
    $scope.validateDatacenters = _.cloneDeep($scope.datacenters);

    $scope.filter = { keyword: '' };

    $scope.getSelectedDatacenters = function () {
        return _.cloneDeep(_.where($scope.datacenters, { rowIsSelected: true }));
    };

})
.controller('shutDownDatacentersCtrl', function ($scope, $modalInstance, $timeout, rxSortUtil, rxPageTracker) {
    $scope.sort = rxSortUtil.getDefault('name');
    $scope.sortCol = function (predicate) {
        return rxSortUtil.sortCol($scope, predicate);
    };

    var itemsPerPage = 8;
    $scope.pager = rxPageTracker.createInstance({ itemsPerPage: itemsPerPage });
    $scope.showPagination = itemsPerPage < $scope.selectedDatacenters.length;

    $scope.removeDatacenter = function (dc) {
        _.remove($scope.selectedDatacenters, dc);
    };

    $scope.submit = function () {
        $scope.setState('working');

        $scope.numCompleted = 0;

        var delay = 1000;
        $scope.selectedDatacenters.forEach(function (dc, i) {
            $timeout(function () {
                dc.status = 'pending';
            }, i * delay);
            $timeout(function () {
                dc.status = i % 4 === 0 ? 'failure' : 'success';
                $scope.numCompleted++;
            }, ++i * delay);
        });
        $timeout(function () {
            $scope.setState('complete');
            $scope.errorsPresent = _.some($scope.selectedDatacenters, { status: 'failure' });
        }, $scope.selectedDatacenters.length * delay);
    };

    $scope.cancel = $modalInstance.dismiss;
});

angular.module('demoApp')
.controller('selectFilterSimpleCtrl', function ($scope, rxSelectFilter) {
    $scope.filter = rxSelectFilter.create({
        properties: ['account', 'status'],
        selected: {
            account: ['A']
        }
    });

    $scope.tickets = [
        { account: 'A', status: 'NEW', description: 'A new ticket' },
        { account: 'A', status: 'IN_PROGRESS', description: 'Fix all the bugs' },
        { account: 'B', status: 'TRANSFERRED', description: 'Don\'t stop believing' },
        { account: 'B', status: 'VENDOR', description: 'Hold on to that feeling' },
        { account: 'A', status: 'TRANSFERRED', description: 'qwertyuiop' }
    ];
});

angular.module('demoApp')
.controller('sortableColumnSimpleCtrl', function ($scope, rxSortUtil) {
    $scope.sort = rxSortUtil.getDefault('name', false);

    $scope.sortCol = function (predicate) {
        return rxSortUtil.sortCol($scope, predicate);
    };

    $scope.talentPool = [
        {
            name: 'Andrew Yurisich',
            jobTitle: 'Mailroom Associate IV'
        },
        {
            name: 'Patrick Deuley',
            jobTitle: 'Design Chaplain'
        },
        {
            name: null,
            jobTitle: 'Chief Mastermind'
        },
        {
            jobTitle: 'Assistant Chief Mastermind'
        },
        {
            name: 'Hussam Dawood',
            jobTitle: 'Evangelist of Roger Enriquez'
        },
        {
            name: 'Kerry Bowley',
            jobTitle: 'Dev Mom'
        },
    ];
});

angular.module('demoApp')
.controller('tableApiPaginationCtrl', function ($scope, $q, $timeout, $filter, rxPageTracker,
                rxSortUtil, rxSelectFilter) {

    var os = ['Ubuntu 12.04', 'Red Hat Enterprise Linux 6.4', 'CentOS 6.4', 'Ubuntu 13.04'];
    var makeServers = function (serverCount) {
        var servers = [];
        for (var i = 1; i < serverCount + 1; i++) {
            var server = {
                id: i,
                name: 'Server ' + i,
                os: os[i % os.length]
            };
            servers.push(server);
        }
        return servers;
    };

    var allLazyServers = makeServers(701);

    var serverInterface = {
        getItems: function (pageNumber, itemsPerPage, params) {
            var deferred = $q.defer();
            var filterText = params.filterText;
            var sortColumn = params.sortColumn;
            var sortDirection = params.sortDirection;

            if (sortColumn === 'name') {
                sortColumn = 'id';
            }

            if (sortDirection === 'DESCENDING') {
                sortColumn = '-' + sortColumn;
            }

            $timeout(function () {
                var first = pageNumber * itemsPerPage;
                var added = first + itemsPerPage;
                var last = (added > allLazyServers.length) ? allLazyServers.length : added;

                var filteredServers = $filter('filter')(allLazyServers, filterText);
                filteredServers = $scope.osFilter.applyTo(filteredServers);
                filteredServers = $filter('orderBy')(filteredServers, sortColumn);

                // Return 100 items more than the user's `itemsPerPage`. i.e. if the
                // user is asking for 25 items per page, return 125 in total
                var lazyServers = filteredServers.slice(first, last + 100);

                var response = {
                    items: lazyServers,
                    pageNumber: pageNumber,
                    totalNumberOfItems: filteredServers.length
                };

                if (filterText === 'error') {
                    deferred.reject();
                } else {
                    deferred.resolve(response);
                }
            }, 300);
            return deferred.promise;
        }
    };

    $scope.sort = rxSortUtil.getDefault('name', false);
    $scope.sortCol = function (predicate) {
        return rxSortUtil.sortCol($scope, predicate);
    };
    $scope.data = { searchText: '' };
    $scope.clearFilter = function () {
        $scope.data.searchText = '';
    };
    $scope.osFilter = rxSelectFilter.create({
        properties: ['os'],
        available: {
            os: os
        }
    });
    $scope.serverInterface = serverInterface;
    $scope.pagedServers = rxPageTracker.createInstance({ itemsPerPage: 25 });
});

angular.module('demoApp')
.controller('tableFilteringExampleCtrl', function ($scope) {
    $scope.people = [
        { name: 'Patrick Deuley', occupation: 'Design Chaplain' },
        { name: 'Hussam Dawood', occupation: 'Cat Lover' },
        { name: 'Kevin Lamping', occupation: 'Framework Father' },
        { name: 'Glynnis Ritchie', occupation: 'Serif Sheriff' },
        { name: 'Freddy Knuth', occupation: 'Venezuelan Hurricane' },
        { name: 'Chris Cantu', occupation: 'Texan Tornado' },
    ];
});

angular.module('demoApp')
.controller('tableFilteringCollapsibleExampleCtrl', function ($scope) {
    $scope.filter = { region: '' };

    $scope.regions = [
        { name: 'DFW', city: 'Dallas-Fort Worth' }, { name: 'ORD', city: 'Chicago' },
        { name: 'IAD', city: 'Northern Virginia' }, { name: 'LON', city: 'London' },
        { name: 'HKG', city: 'Hong Kong' }, { name: 'SYD', city: 'Sydney' }
    ];

    $scope.servers = [
        { name: 'General1-1', ram: '1 GB', cpu: 1, disk: '20GB SSD', region: 'DFW' },
        { name: 'General1-2', ram: '2 GB', cpu: 2, disk: '40GB SSD', region: 'ORD' },
        { name: 'General1-4', ram: '4 GB', cpu: 4, disk: '80GB SSD', region: 'IAD' },
        { name: 'General1-8', ram: '8 GB', cpu: 8, disk: '160GB SSD', region: 'LON' },
        { name: 'I/O1-15', ram: '15 GB', cpu: 4, disk: '40GB SSD', region: 'HKG' },
        { name: 'I/O1-30', ram: '30 GB', cpu: 8, disk: '40GB SSD', region: 'SYD' }
    ];
});

angular.module('demoApp')
.controller('tableFloatingHeaderCtrl', function ($scope) {
    $scope.data = [
        { name: 'First', value: 1 },
        { name: 'A', value: 2 },
        { name: 'B', value: 3 },
        { name: 'C', value: 4 },
        { name: 'D', value: 5 },
        { name: 'E', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'Middle', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'G', value: 2 },
        { name: 'H', value: 3 },
        { name: 'I', value: 4 },
        { name: 'J', value: 5 },
        { name: 'K', value: 1 },
        { name: 'Last', value: 2 }
    ];
});

angular.module('demoApp')
.controller('tableNestedMetadataExampleCtrl', function ($scope) {
    $scope.people = [
        {
            name: 'Patrick Deuley',
            occupation: 'Design Chaplain',
            pet: {
                name: 'Shelly',
                animal: 'Turtle',
                age: 1
            }
        },
        {
            name: 'Hussam Dawood',
            occupation: 'Cat Lover',
            pet: {
                name: 'Sassy',
                animal: 'Cat',
                age: 6
            }
        }
    ];
});

angular.module('demoApp')
.controller('tableNestedTableExampleCtrl', function ($scope) {
    $scope.people = [
        {
            name: 'Patrick Deuley',
            occupation: 'Design Chaplain',
            pets: [
                {
                    name: 'Shelly',
                    animal: 'Turtle',
                    age: 1
                },
                {
                    name: 'Spike',
                    animal: 'Porcupine',
                    age: 10
                }
            ]
        },
        {
            name: 'Hussam Dawood',
            occupation: 'Cat Lover',
            pets: [
                {
                    name: 'Sassy',
                    animal: 'Cat',
                    age: 6
                }
            ]
        }
    ];
});

angular.module('demoApp')
.controller('tableStatusColumnCtrl', function ($scope, rxStatusMappings, rxSortUtil) {
    $scope.servers = [
        { status: 'ACTIVE', title: 'ACTIVE status' },
        { status: 'ERROR', title: 'ERROR status' },
        { status: 'DISABLED', title: 'DISABLED status' },
        { status: 'DELETED', title: 'DELETED status mapped to ERROR' },
        { status: 'UNKNOWN', title: 'UNKNOWN status mapped to ERROR' },
        { status: 'RESCUE', title: 'RESCUE status mapped to INFO' },
        { status: 'SUSPENDED', title: 'SUSPENDED status mapped to WARNING' },
        { status: 'REBUILD', title: 'REBUILD status mapped to PENDING' },
        { status: 'RESIZE', title: 'RESIZE status mapped to PENDING' },
        { status: 'MIGRATING', title: 'MIGRATING status mapped to PENDING' },
        { status: 'DELETING', title: 'DELETING status mapped to PENDING, using `fooApi` mapping', api: 'fooApi' }
    ];

    // We have a few different ways of adding mappings. We've tried to show them all here
    rxStatusMappings.addGlobal({
        'DELETING': 'PENDING'
    });
    rxStatusMappings.mapToInfo('RESCUE');
    rxStatusMappings.mapToWarning('SUSPENDED');
    rxStatusMappings.mapToPending(['REBUILD','RESIZE','MIGRATING']);
    rxStatusMappings.mapToError(['DELETED', 'UNKNOWN']);
    rxStatusMappings.addAPI('fooApi', { 'DELETING': 'PENDING' });
    rxStatusMappings.mapToPending('SomeApiSpecificStatus', 'fooApi');
    $scope.sortCol = function (predicate) {
        return rxSortUtil.sortCol($scope, predicate);
    };
    $scope.sort = rxSortUtil.getDefault('status');
});

angular.module('demoApp')
.controller('tableUiPaginationCtrl', function ($scope, rxPageTracker) {
    $scope.pager = rxPageTracker.createInstance({ itemsPerPage: 3 });

    var os = ['Ubuntu 12.04', 'Red Hat Enterprise Linux 6.4', 'CentOS 6.4', 'Ubuntu 13.04'];
    var makeServers = function (serverCount) {
        var servers = [];
        for (var i = 1; i < serverCount + 1; i++) {
            var server = {
                id: i,
                name: 'Server ' + i,
                os: os[i % os.length]
            };
            servers.push(server);
        }
        return servers;
    };

    $scope.servers = makeServers(21);

    $scope.removeServers = function () {
        if ($scope.servers.length > 2) {
            $scope.servers = $scope.servers.splice(2);
        }
    };

    $scope.addServers = function () {
        $scope.servers = $scope.servers.concat(makeServers(2));
    };
});




angular.module('demoApp')
.controller('tagsSimpleExampleCtrl', function ($scope) {
    $scope.tagOptions = [
        { text: 'apple', category: 'fruit' },
        { text: 'orange', category: 'fruit' },
        { text: 'banana', category: 'fruit' },
        { text: 'squash', category: 'vegetable' }
    ];
    $scope.tags = ['apple'];
});


angular.module('demoApp')
.controller('tooltipsSimpleExampleCtrl', function ($scope) {
    $scope.dynamicTooltip = 'I was defined in the controller!';
    $scope.htmlTooltip = '<span class="tooltip-header">A Tooltip Title</span><p>You can use HTML</p>';
});


angular.module('demoApp')
.controller('typeadheadShowOnFocusCtrl', function ($scope) {
    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
        'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Republic of Dawood',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
});

angular.module('demoApp')
.controller('typeaheadSimpleCtrl', function ($scope) {
    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
        'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Republic of Dawood',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
});
























angular.module('demoApp')
.controller('hotkeysVolumeCtrl', function ($scope, hotkeys) {
    $scope.volume = 5;

    // Remove combos so we don't add them multiple times
    hotkeys.del('ctrl+up');
    hotkeys.del('ctrl+down');

    // Add desired combos
    hotkeys.add({
        combo: 'ctrl+up',
        description: 'Turn up the volume!',
        callback: function () {
            $scope.volume += 1;
        }
    });

    hotkeys.add({
        combo: 'ctrl+down',
        description: 'Turn it down!',
        callback: function () {
            $scope.volume -= 1;
        }
    });
});




angular.module('demoApp')
.controller('rxAgeCtrl', function ($scope) {
    var day = 1000 * 60 * 60 * 24;
    $scope.ageHours = new Date((Date.now() - (day / 2.3))).toString();
    $scope.ageDays = new Date((Date.now() - (day * 1.5))).toString();
    $scope.ageMonths = new Date((Date.now() - (day * 40.2))).toString();
    $scope.ageYears = new Date((Date.now() - (day * 380.1))).toString();
});




angular.module('demoApp')
.controller('rxApplySimpleCtrl', function ($scope, rxSelectFilter) {
    $scope.filter = rxSelectFilter.create({
        properties: ['account', 'status'],
        selected: {
            account: ['A']
        }
    });

    $scope.tickets = [
        { account: 'A', status: 'NEW', description: 'Open a new service ticket.' },
        { account: 'A', status: 'IN_PROGRESS', description: 'Updating server status.' },
        { account: 'B', status: 'TRANSFERRED', description: 'Transferred account to ORD region.' },
        { account: 'B', status: 'VENDOR', description: 'Added new third-party vendor service.' },
        { account: 'A', status: 'TRANSFERRED', description: 'Transferred account to IAD region.' }
    ];
});


angular.module('demoApp')
.controller('rxAttributesCtrl', function ($scope) {
    $scope.customStyles = 'color: red; font-weight: bold;';
    $scope.customContent = '"Custom Content"';
});




angular.module('demoApp')
.controller('rxAutoSaveSimpleCtrl', function ($scope, $timeout, $q, rxNotify, rxAutoSave) {
    $scope.formData = {
        checkbox: false,
        name: '',
        description: '',
        sensitive: ''
    };

    var autosave = rxAutoSave($scope, 'formData', {
        exclude: ['sensitive'],
        ttl: 86400000
    });

    $scope.status = {
        loading: false,
        disable: false,
        deferredLoading: false,
        deferredDisable: false
    };

    var clearMsg = [
        'rxAutoSave data has been cleared!',
        'Navigate away and return, and the form will not be auto-populated'
    ].join(' ');

    // Clear with an explicit autosave.clear() call
    $scope.clearStorage = function () {
        $scope.status.loading = true;
        $timeout(function () {
            $scope.status.loading = false;
            autosave.clear();
            rxNotify.add(clearMsg, { type: 'success' });
        }, 1000);
    };

    // Clear by resolving the associated promise
    $scope.deferredClear = function () {
        var deferred = $q.defer();

        autosave.clearOnSuccess(deferred.promise);
        $scope.status.deferredLoading = true;

        $timeout(function () {
            $scope.status.deferredLoading = false;
            deferred.resolve();
            rxNotify.add(clearMsg, { type: 'success' });
        }, 1000);
    };
});








angular.module('demoApp')
.controller('rxBytesConvertCtrl', function ($scope) {
    $scope.sizeGB = 42e10; // 420 GB
    $scope.sizeTB = 125e12; // 125 TB
    $scope.sizePB = 17134e13; // 171.34 PB
});


angular.module('demoApp')
.controller('rxCapitalizeCtrl', function ($scope) {
    $scope.hello = 'hello world this is my text.';
});


angular.module('demoApp')
.controller('rxCompileDemoCtrl', function ($scope) {
    $scope.world = 'wrrrld';
    $scope.myExpression = 'Hello {{world}}';
});






angular.module('demoApp')
.controller('rxDateDemoCtrl', function ($scope) {
    $scope.dateString = '2015-09-17T19:37:17Z';
});


angular.module('demoApp')
.controller('rxDateTimeDemoCtrl', function ($scope) {
    $scope.dateString = '2015-09-17T19:37:17Z';
});




angular.module('demoApp')
.controller('rxDiskSizeCtrl', function ($scope) {
    $scope.sizeGB = 420;
    $scope.sizeTB = 125000;
    $scope.sizePB = 171337000;
});


angular.module('demoApp')
.controller('rxEnvironmentSimpleCtrl', function ($scope, rxEnvironment) {
    var environment = rxEnvironment.get();
    $scope.url = environment.url;
    $scope.name = environment.name;
});






angular.module('demoApp')
.controller('rxErrorFormatterSimpleCtrl', function ($scope, rxErrorFormatter) {
    $scope.setErrorMsg = function (msg) {
        var error = { message: msg };
        $scope.errorMsg = rxErrorFormatter.buildErrorMsg('Error: ${message}', error);
    };
});


















angular.module('demoApp')
.controller('rxLocalStorageSimpleCtrl', function ($scope, $window, rxLocalStorage) {
    $scope.setSideKick = function () {
        rxLocalStorage.setObject('joker', { name: 'Harley Quinn' });
    };

    $scope.getSideKick = function () {
        var sidekick = rxLocalStorage.getObject('joker');
        $window.alert(sidekick.name);
    };
});








angular.module('demoApp')
.controller('rxMonthDemoCtrl', function ($scope) {
    $scope.dateString = '2015-09-17T19:37:17Z';
});








angular.module('demoApp')
.controller('rxPageTitleSimpleCtrl', function ($scope, rxPageTitle) {
    $scope.changeTitle = function () {
        rxPageTitle.setTitle($scope.newTitle);
    };

    $scope.refreshTitle = function () {
        $scope.pageTitle = rxPageTitle.getTitle();
    };

    $scope.refreshTitle();
});










angular.module('demoApp')
.controller('rxPermissionSimpleCtrl', function ($scope, rxSession, rxNotify) {
    rxNotify.add('Respect My Authority!!', {
        stack: 'permission',
        type: 'warning'
    });

    $scope.storeToken = function () {
        rxSession.storeToken({
            access: {
                user: {
                    roles: [{ name: 'test' }]
                }
            }
        });
    };

    $scope.clearToken = function () {
        rxSession.logout();
    };
});




angular.module('demoApp')
.controller('rxPromiseNotificationsSimpleCtrl', function ($scope, rxNotify, rxPromiseNotifications, $q) {

    $scope.add = function (stack) {
        var messageOptions = _.clone($scope.options);

        if ($scope.ondismiss.should) {
            messageOptions.ondismiss = _.clone($scope.ondismiss.method);
        }

        messageOptions.stack = stack;

        rxNotify.add($scope.message, messageOptions);
    };

    rxNotify.add('Helpful Information', {
        stack: 'demo'
    });
    rxNotify.add('Additional Helpful Information', {
        stack: 'demo'
    });

    $scope.addPromise = function () {
        $scope.deferred = $q.defer();

        rxPromiseNotifications.add($scope.deferred.promise, {
            loading: 'Loading Service',
            success: 'Service Succesfully Loaded',
            error: 'Error Loading Service'
        }, 'demo');
    };
});






angular.module('demoApp')
.controller('rxSessionSimpleCtrl', function ($scope, $window, rxSession) {
    $scope.hasRole = function () {
        $window.alert('Has "superhero" Role? : ' + rxSession.hasRole('superhero'));
    };

    $scope.isAuthenticated = function () {
        $window.alert('Is Authenticated? : ' + rxSession.isAuthenticated());
    };
});


angular.module('demoApp')
.controller('rxSessionStorageSimpleCtrl', function ($scope, $window, rxSessionStorage) {
    $scope.setSideKick = function () {
        rxSessionStorage.setItem('Batman', 'Robin');
    };

    $scope.getSideKick = function () {
        $window.alert(rxSessionStorage.getItem('Batman'));
    };
});


angular.module('demoApp')
.controller('rxSortEmptyTopSimpleCtrl', function ($scope, rxPageTracker, rxSortUtil) {
    $scope.sort = rxSortUtil.getDefault('name');
    $scope.sort = rxSortUtil.getDefault('name', false);
    $scope.pager = rxPageTracker.createInstance();

    $scope.sortCol = function (predicate) {
        return rxSortUtil.sortCol($scope, predicate);
    };

    $scope.serverVolumes = [
        {
            name: 'Monitor Agent 4',
            volumeId: 'a44079a5-040b-495f-be22-35994ea03cc5'
        },
        {
            name: 'Stress Volume 33',
            volumeId: '65d89e82-9363-482e-92d1-f3f7d4f135a7'
        },
        {
            name: null,
            volumeId: '0a87a764-45f0-4a1e-8dbf-20d76291022d'
        },
        {
            name: 'Stress Volume 24',
            volumeId: ''
        },
        {
            name: null,
            volumeId: 'be827f83-8d4c-4d4c-afc3-4c9bf0fdfe00'
        },
    ];
});




angular.module('demoApp')
.controller('rxStatusSimpleCtrl', function ($scope, $rootScope, rxStatus) {
    rxStatus.setScope($scope);

    $scope.triggerRouteChangeSuccess = function () {
        $rootScope.$broadcast('$routeChangeSuccess');
    };

    $scope.clear = function () {
        rxStatus.clear();
        $scope.notify = undefined;
    };

    $scope.setLoading = function (msg) {
        rxStatus.clear();
        $scope.notify = rxStatus.setLoading(msg);
    };

    $scope.setSuccess = function (msg) {
        rxStatus.clear();
        $scope.notify = rxStatus.setSuccess(msg);
    };

    $scope.setSuccessNext = function (msg) {
        rxStatus.clear();
        $scope.notify = rxStatus.setSuccessNext(msg);
    };

    $scope.setSuccessImmediate = function (msg) {
        rxStatus.clear();
        $scope.notify = rxStatus.setSuccessImmediate(msg);
    };

    $scope.setWarning = function (msg) {
        rxStatus.clear();
        $scope.notify = rxStatus.setWarning(msg);
    };

    $scope.setInfo = function (msg) {
        rxStatus.clear();
        $scope.notify = rxStatus.setInfo(msg);
    };

    $scope.setError = function (msg) {
        rxStatus.clear();
        $scope.notify = rxStatus.setError(msg);
    };

    $scope.dismiss = function () {
        $scope.notify && rxStatus.dismiss($scope.notify);
        $scope.notify = undefined;
    };
});




angular.module('demoApp')
.controller('rxStatusMappingsSimpleCtrl', function ($scope, rxStatusMappings) {
    $scope.servers = [
        { status: 'ACTIVE', title: 'ACTIVE status' },
        { status: 'ERROR', title: 'ERROR status' },
        { status: 'DISABLED', title: 'DISABLED status' },
        { status: 'DELETED', title: 'DELETED status mapped to ERROR' },
        { status: 'UNKNOWN', title: 'UNKNOWN status mapped to ERROR' },
        { status: 'RESCUE', title: 'RESCUE status mapped to INFO' },
        { status: 'SUSPENDED', title: 'SUSPENDED status mapped to WARNING' },
        { status: 'REBUILD', title: 'REBUILD status mapped to PENDING' },
        { status: 'RESIZE', title: 'RESIZE status mapped to PENDING' },
        { status: 'MIGRATING', title: 'MIGRATING status mapped to PENDING' },
        { status: 'DELETING', title: 'DELETING status mapped to PENDING, using `fooApi` mapping', api: 'fooApi' }
    ];

    // We have a few different ways of adding mappings. We've tried to show them all here
    rxStatusMappings.addGlobal({
        'DELETING': 'PENDING'
    });
    rxStatusMappings.mapToInfo('RESCUE');
    rxStatusMappings.mapToWarning('SUSPENDED');
    rxStatusMappings.mapToPending(['REBUILD','RESIZE','MIGRATING']);
    rxStatusMappings.mapToError(['DELETED', 'UNKNOWN']);
    rxStatusMappings.addAPI('fooApi', { 'DELETING': 'PENDING' });
    rxStatusMappings.mapToPending('SomeApiSpecificStatus', 'fooApi');
});




angular.module('demoApp')
.controller('rxTimeDemoCtrl', function ($scope) {
    $scope.dateString = '2015-09-17T19:37:17Z';
});




angular.module('demoApp')
.controller('rxTitleizeSimpleCtrl', function ($scope) {
    $scope.sample = 'HELLO_welcome TO ENCore FRamework!';
});








angular.module('demoApp')
.controller('rxUnsafeRemoveHTMLSimpleCtrl', function ($scope) {
    $scope.sample = 'Sample string <strong>without</strong> <span>HTML tags</span>.';
});












