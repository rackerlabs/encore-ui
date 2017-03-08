angular.module('demoApp')
.value('Modules', [
    {
        "name": "elements",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "description": "",
        "stability": "prototype",
        "keywords": [],
        "displayName": "elements",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": true,
        "srcFiles": [
            "src/elements/elements.module.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "",
            "less": ""
        }
    },
    {
        "name": "utilities",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "description": "",
        "stability": "prototype",
        "keywords": [],
        "displayName": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": true,
        "srcFiles": [
            "src/utilities/utilities.module.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "",
            "less": ""
        }
    },
    {
        "displayName": "rxApp",
        "stability": "stable",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "rxApp",
        "moduleName": "'encore.ui.rxApp'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxApp/rxApp.module.js",
            "src/components/rxApp/scripts/rxAccountSearch.js",
            "src/components/rxApp/scripts/rxAccountUsers.js",
            "src/components/rxApp/scripts/rxApp.js",
            "src/components/rxApp/scripts/rxAppNav.js",
            "src/components/rxApp/scripts/rxAppNavItem.js",
            "src/components/rxApp/scripts/rxAppSearch.js",
            "src/components/rxApp/scripts/rxAtlasSearch.js",
            "src/components/rxApp/scripts/rxBillingSearch.js",
            "src/components/rxApp/scripts/rxPage.js",
            "src/components/rxApp/scripts/rxStatusTag.js",
            "src/components/rxApp/scripts/rxTicketSearch.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxApp/templates/rxAccountSearch.html",
            "templates/rxApp/templates/rxAccountUsers.html",
            "templates/rxApp/templates/rxApp.html",
            "templates/rxApp/templates/rxAppNav.html",
            "templates/rxApp/templates/rxAppNavItem.html",
            "templates/rxApp/templates/rxAppSearch.html",
            "templates/rxApp/templates/rxBillingSearch.html",
            "templates/rxApp/templates/rxPage.html"
        ],
        "docs": {
            "md": "<p>This component is responsible for creating the HTML necessary for a common Encore layout. It builds out the main navigation, plus breadcrumbs and page titles.</p>\n",
            "js": "angular.module('demoApp')\n.controller('rxAppCtrl', function ($scope, $location, $rootScope, $window, encoreRoutes, rxVisibility, rxAuth) {\n    rxAuth.getUserId = function () {\n        return 'bert3000';\n    };\n\n    $scope.subtitle = 'With a subtitle';\n\n    $scope.changeSubtitle = function () {\n        $scope.subtitle = 'With a new subtitle at ' + Date.now();\n    };\n\n    rxVisibility.addMethod(\n        'isUserDefined',\n        function () {\n            return !_.isEmpty($rootScope.user);\n        }\n    );\n \n    $scope.changeRoutes = function () {\n        var newRoute = {\n            linkText: 'Updated Route',\n            childVisibility: 'true',\n            children: [\n                {\n                    linkText: 'New child route'\n                }\n            ]\n        };\n\n        encoreRoutes.setRouteByKey('accountLvlTools', newRoute);\n    };\n\n    // Fake navigation\n    var customApp = document.getElementById('custom-rxApp');\n    customApp.addEventListener('click', function (ev) {\n        var target = ev.target;\n\n        if (target.className.indexOf('item-link') > -1) {\n            // prevent the default jump to top\n            ev.preventDefault();\n\n            var href = target.getAttribute('href');\n\n            // update angular location (if href has a value)\n            if (!_.isEmpty(href)) {\n                // we need to prevent the window from scrolling (the demo does this)\n                // so we get the current scrollTop position\n                // and set it after the demo page has run '$routeChangeSuccess'\n                var currentScollTop = document.body.scrollTop;\n\n                $location.hash(href);\n\n                $rootScope.$apply();\n\n                $window.scrollTo(0, currentScollTop);\n            }\n        }\n    });\n\n    var searchDirective = [\n        'rx-app-search placeholder=\"Enter User\"',\n        'model=\"$root.user\"',\n        'pattern=\"/^([0-9a-zA-Z._ -]{2,})$/\"'\n    ].join(' ');\n\n    $scope.customMenu = [{\n        title: 'Example Menu',\n        children: [\n            {\n                href: 'Lvl1-1',\n                linkText: '1st Order Item'\n            },\n            {\n                linkText: '1st Order Item (w/o href) w/ Children',\n                childVisibility: [ 'isUserDefined' ],\n                childHeader: '<strong class=\"current-search\">Current User:</strong>' +\n                             '<span class=\"current-result\">{{$root.user}}</span>',\n                directive: searchDirective,\n                children: [\n                    {\n                        href: 'Lvl1-2-Lvl2-1',\n                        linkText: '2nd Order Item w/ Children',\n                        children: [{\n                            href: 'Lvl1-2-Lvl2-1-Lvl3-1',\n                            linkText: '3rd Order Item'\n                        }]\n                    },\n                    {\n                        href: 'Lvl1-2-Lvl2-2',\n                        linkText: '2nd Order Item w/ Children',\n                        children: [\n                            {\n                                href: 'Lvl1-2-Lvl2-2-Lvl3-1',\n                                linkText: '3rd Order Item'\n                            },\n                            {\n                                href: 'Lvl1-2-Lvl2-2-Lvl3-2',\n                                linkText: '3rd Order Item'\n                            },\n                            {\n                                href: 'Lvl1-2-Lvl2-2-Lvl3-3',\n                                linkText: '3rd Order Item'\n                            },\n                            {\n                                href: 'Lvl1-2-Lvl2-2-Lvl3-4',\n                                linkText: '3rd Order Item'\n                            }\n                        ]\n                    },\n                    {\n                        href: 'Lvl1-2-Lvl2-3',\n                        linkText: '2nd Order Item'\n                    }\n                ]\n            },\n            {\n                href: 'Lvl1-3',\n                linkText: '1st Order Item w/ Children',\n                children: [\n                    {\n                        href: 'Lvl1-3-Lvl2-1',\n                        linkText: '2nd Order Item'\n                    }\n                ]\n            }\n        ]\n    }];\n\n    // Load docs homepage ('Overview')\n    // NOTE: Trailing forward slash is not an accident.\n    // This is required to get Firefox to load the iframe.\n    //\n    // The resulting url should have double forward slashes `//`.\n    $scope.embedUrl = $location.absUrl().split('#')[0] + '/';\n});\n",
            "html": "<div ng-controller=\"rxAppCtrl\">\n  <h3>Standard rxApp</h3>\n  <rx-app id=\"standard-rxApp\">\n    <rx-page title=\"'Standard Page Title'\">\n      <p class=\"clear\">This is my page content</p>\n      <button ng-click=\"changeRoutes()\" class=\"button\">Change Routes</button>\n    </rx-page>\n  </rx-app>\n\n  <h3>Customized rxApp (collapsible)</h3>\n  <rx-app collapsible-nav=\"true\" site-title=\"My App\" id=\"custom-rxApp\" menu=\"customMenu\" new-instance=\"true\" hide-feedback=\"true\">\n    <rx-page\n      unsafe-html-title=\"'Customized Page <a href=&quot;http://rackspace.com&quot;>Title</a>'\"\n      subtitle=\"subtitle\"\n      status=\"alpha\"\n      account-number=\"12345\">\n\n      <p class=\"clear\">Click a link in the menu to see the active state change</p>\n      <p>Click the toggle to hide the menu</p>\n      <button ng-click=\"changeSubtitle()\" class=\"changeSubtitle button\">Change Subtitle</button>\n    </rx-page>\n  </rx-app>\n\n  <h3>Embedded rxApp</h3>\n  <p>\n    rxApp is smart enough to detect if it is loaded in an iframe and will hide\n    the left nav.\n  </p>\n  <iframe id=\"embedded-app\" ng-src=\"{{embedUrl}}\"></iframe>\n</div>\n\n<!--\nYou'll likely want to implement your HTML in your index.html file as:\n<div ng-app=\"sampleApp\">\n    <rx-app ng-view></rx-app>\n</div>\n\nAnd the template for each view/page will be something like:\n<rx-page title=\"'Example Page'\">\n    Example content\n</rx-page>\n-->\n",
            "less": ""
        }
    },
    {
        "displayName": "rxOptionTable",
        "stability": "deprecated",
        "description": "",
        "isLegacy": true,
        "keywords": [],
        "name": "rxOptionTable",
        "moduleName": "'encore.ui.rxOptionTable'",
        "category": "components",
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/components/rxOptionTable/rxOptionTable.module.js",
            "src/components/rxOptionTable/scripts/rxOptionTable.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxOptionTable/templates/rxOptionTable.html"
        ],
        "docs": {
            "md": "<p>The rxOptionTable component provides functionality to create a series of radio or checkbox inputs within a table.</p>\n",
            "js": "angular.module('demoApp')\n.controller('rxOptionTableCtrl', function ($scope) {\n    $scope.radioValue = 0;\n    $scope.checkboxValues = [true, 'unchecked'];\n\n    $scope.optionTableData = [\n        {\n            'id': 'option1',\n            'name': 'Option #1',\n            'value': 0,\n            'obj': {\n                'name': 'Nested Name 1'\n            }\n        }, {\n            'id': 'option2',\n            'name': 'Option #2',\n            'value': 1,\n            'obj': {\n                'name': 'Nested Name 2'\n            }\n        }, {\n            'id': 'option3',\n            'name': 'Option #3',\n            'value': 2,\n            'obj': {\n                'name': 'Nested Name 3'\n            }\n        }, {\n            'id': 'option4',\n            'name': 'Option #4',\n            'value': 3,\n            'obj': {\n                'name': 'Nested Name 4'\n            }\n        }\n    ];\n\n    $scope.optionTableColumns = [\n        {\n            'label': 'Name',\n            'key': 'name',\n            'selectedLabel': '(Already saved data)'\n        }, {\n            'label': 'Static Content',\n            'key': 'Some <strong>Text &</strong> HTML'\n        }, {\n            'label': 'Expression 2',\n            'key': '{{ value * 100 | number:2 }}'\n        }, {\n            'label': 'Expression 3',\n            'key': '{{ obj.name | uppercase }}'\n        }, {\n            'label': 'Expression 4',\n            'key': '{{ value | currency }}'\n        }\n    ];\n\n    $scope.optionTableCheckboxData = [\n        {\n            'name': 'Item 1'\n        }, {\n            'name': 'Item 2',\n            'value': 'checked',\n            'falseValue': 'unchecked'\n        }\n    ];\n\n    $scope.optionTableEmptyData = [];\n\n    $scope.disableOption = function (tableId, fieldId, rowId) {\n        return rowId === 'option4';\n    };\n});\n",
            "html": "<div ng-controller=\"rxOptionTableCtrl\">\n  <h3>Radio Option Table</h3>\n  <rx-option-table\n      id=\"radioOptionTable\"\n      data=\"optionTableData\"\n      columns=\"optionTableColumns\"\n      type=\"radio\"\n      model=\"radioValue\"\n      field-id=\"optionTable\"\n      selected=\"0\"\n      class=\"full-width\"\n      disable-fn=\"disableOption(tableId, fieldId, rowId)\"\n      ></rx-option-table>\n\n  <p>Bound Value: {{radioValue}}</p>\n\n  <br />\n\n  <h3>Checkbox Option Table</h3>\n  <rx-option-table\n      id=\"checkboxOptionTable\"\n      columns=\"optionTableColumns\"\n      type=\"checkbox\"\n      model=\"checkboxValues\"\n      field-id=\"optionCheckboxTable\"\n      data=\"optionTableCheckboxData\"\n      required=\"true\"\n      ></rx-option-table>\n\n  <p ng-repeat=\"val in checkboxValues\">\n    Item {{$index + 1}} Value: {{val}}\n  </p>\n\n  <br />\n\n  <h3>Empty Option Table</h3>\n  <rx-option-table\n      id=\"emptyOptionTable\"\n      columns=\"optionTableColumns\"\n      type=\"checkbox\"\n      model=\"emptyValue\"\n      field-id=\"optionCheckboxTable\"\n      data=\"optionTableEmptyData\"\n      empty-message=\"You don't have any data!\"\n      ></rx-option-table>\n</div>\n",
            "less": ""
        }
    },
    {
        "displayName": "Account Info",
        "stability": "stable",
        "description": "Responsible for drawing an account info box.",
        "api": "directive:rxAccountInfo",
        "keywords": [
            "account",
            "info",
            "information",
            "rxAccountInfo"
        ],
        "name": "AccountInfo",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/elements/AccountInfo/scripts/rxAccountInfo.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/AccountInfo/templates/rxAccountInfo.html",
            "templates/AccountInfo/templates/rxAccountInfoBanner.html"
        ],
        "docs": {
            "md": "",
            "js": "// Note that these factories are only present for the purposes of this demo. In a real application,\n// SupportAccount, Teams, AccountStatusGroup, and Encore will have to be provided from elsewhere,\n// outside of encore-ui. Specifically, we implement them in encore-ui-svcs.\n\nangular.module('demoApp')\n.value('Badges',\n       [{\n           url: 'http://mirrors.creativecommons.org/presskit/icons/cc.large.png',\n           description: 'Enables the free distribution of an otherwise copyrighted work.',\n           name: 'Creative Commons'\n       }, {\n           url: 'http://mirrors.creativecommons.org/presskit/icons/by.large.png',\n           description: ['You must give appropriate credit, provide a link to the',\n                         'license, and indicate if changes were made.'].join(' '),\n           name: 'Attribution'\n       }, {\n           url: 'http://mirrors.creativecommons.org/presskit/icons/nc.large.png',\n           description: 'You may not use the material for commercial purposes.',\n           name: 'Non-Commercial'\n       }, {\n           url: 'http://mirrors.creativecommons.org/presskit/icons/zero.large.png',\n           description: 'Waives as many rights as legally possible, worldwide.',\n           name: 'Public Domain'\n       }]\n)\n.value('TeamBadges',\n       [{\n           url: 'http://mirrors.creativecommons.org/presskit/icons/share.large.png',\n           description: ['Licensees may distribute derivative works only under a license',\n                         'identical to the license that governs the original work.'].join(' '),\n           name: 'ShareAlike'\n       }, {\n           url: 'http://mirrors.creativecommons.org/presskit/icons/nd.large.png',\n           description: ['Licensees may copy, distribute, display and perform only verbatim',\n                         'copies of the work, not derivative works based on it.'].join(' '),\n           name: 'No-Derivs'\n       }]\n)\n.factory('SupportAccount', function ($q, Badges) {\n    return {\n        getBadges: function (config, success, failure) {\n            var deferred = $q.defer();\n\n            if (config.accountNumber === '6789') {\n                deferred.reject();\n            } else {\n                deferred.resolve(Badges);\n            }\n\n            deferred.promise.then(success, failure);\n\n            return deferred.promise;\n        }\n    };\n})\n.factory('Teams', function ($q, TeamBadges) {\n    return {\n        badges: function (config) {\n            var deferred = $q.defer();\n\n            if (config.id === '9876') {\n                deferred.reject();\n            } else {\n                deferred.resolve(TeamBadges);\n            }\n\n            deferred.$promise = deferred.promise;\n\n            return deferred;\n        }\n    };\n})\n.factory('Encore', function ($q) {\n    return {\n        getAccount: function (config, success, failure) {\n            var deferred = $q.defer();\n\n            if (config.id === '9876') {\n                deferred.reject();\n            } else if (config.id === '5623') {\n                deferred.resolve({ name: 'DelinquentAccount', status: 'Delinquent', accessPolicy: 'Full' });\n            } else if (config.id === '3265') {\n                deferred.resolve({ name: 'UnverifiedAccount', status: 'Unverified', accessPolicy: 'Full' });\n            } else {\n                deferred.resolve({ name: 'Mosso', status: 'Active', accessPolicy: 'Full' });\n            }\n\n            deferred.promise.then(success, failure);\n\n            return deferred.promise;\n        }\n    };\n})\n.factory('AccountStatusGroup', function () {\n    var warning = ['suspended', 'delinquent'];\n    var info = ['unverified', 'pending approval', 'approval denied', 'teststatus', 'terminated'];\n\n    return function (statusText) {\n        var lower = statusText.toLowerCase();\n        if (_.includes(warning, lower)) {\n            return 'warning';\n        } else if (_.includes(info, lower)) {\n            return 'info';\n        }\n        return '';\n    };\n});\n",
            "html": "<h3><rx-permalink>Account Info Demonstrating <code>rxPage</code> Usage </rx-permalink></h3>\n<p>\n  This element is used to draw an account info box at the top of each page,\n  directly underneath the breadcrumbs.\n</p>\n<p>\n  When <code>account-number=\"...\"</code> is passed to <code>&lt;rx-page&gt;</code>, the account info\n  banner will automatically be drawn underneath the breadcrumbs, as shown here.\n</p>\n<rx-example name=\"accountInfo.rxPage\"></rx-example>\n\n<p>\n  The rest of the examples just show the affect of different conditions on the account info banner, rather than\n  showing an entire <code>rxApp</code> sample again.\n</p>\n\n<h3><rx-permalink>Simple Account Info Implementation</rx-permalink></h3>\n<rx-example class=\"demo-simple-account\" name=\"accountInfo.simple\"></rx-example>\n\n<h3><rx-permalink>Deliquent Account</rx-permalink></h3>\n<p>Note the changed styling on \"Account Status\".<p>\n<rx-example class=\"delinquent-account\" name=\"accountInfo.deliquent\"></rx-example>\n\n<h3><rx-permalink>Account Info Implementation with Team Badges</rx-permalink></h3>\n<rx-example class=\"unverified-account\" name=\"accountInfo.withTeamBadges\"></rx-example>\n\n<h3><rx-permalink>Can't Load Badges</rx-permalink></h3>\n<rx-example name=\"accountInfo.errorBadges\"></rx-example>\n\n<h3><rx-permalink>Can't Load Team Badges</rx-permalink></h3>\n<rx-example name=\"accountInfo.errorTeamBadges\"></rx-example>\n\n<h3><rx-permalink>Can't Load Account Name</rx-permalink></h3>\n<rx-example name=\"accountInfo.unknownAccount\"></rx-example>\n\n<h3><rx-permalink>Deprecated Account Format</rx-permalink></h3>\n<p>\n  The Account Info box is intended to appear as a banner directly beneath a page's breadcrumbs, and\n  <code>rxPage</code> has been augmented to support this. In the past though, we supported a different\n  format for the Account Info, which you would explicitly place wherever on the page you liked.\n</p>\n<p>\n  This old format is still available. Simply use <code>rx-account-info</code> as above, but leave out the\n  <code>account-info-banner='true'</code> attribute. This style is considered deprecated, and should not be\n  used for new work.\n</p>\n<rx-example name=\"accountInfo.deprecated\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "Action Menu",
        "stability": "stable",
        "description": "Display configurable action menu",
        "api": "directive:rxActionMenu",
        "keywords": [
            "rxActionMenu",
            "action",
            "menu",
            "table",
            "context"
        ],
        "name": "ActionMenu",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/elements/ActionMenu/scripts/rxActionMenu.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/ActionMenu/templates/rxActionMenu.html"
        ],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('actionMenuSimpleCtrl', function ($scope, rxNotify) {\n    $scope.add = function () {\n        rxNotify.add('Added!', {\n            type: 'success',\n            repeat: false,\n            timeout: 3\n        });\n    };\n\n    $scope.remove = function () {\n        rxNotify.add('Deleted!', {\n            type: 'error',\n            repeat: false,\n            timeout: 3\n        });\n    };\n});\n",
            "html": "<p>A component to create a configurable action menu.</p>\n<h3 id=\"typical-usage\">Typical Usage</h3>\n<p>The cog in the first row is dismissable by clicking anywhere, but the second\n  cog can only be dismissed by clicking on the cog itself.\n</p>\n\n<rx-example name=\"ActionMenu.simple\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "Breadcrumbs",
        "stability": "stable",
        "description": "Displays navigation breadcrumbs on a page",
        "api": "directive:rxBreadcrumbs",
        "keywords": [
            "breadcrumbs",
            "navigation",
            "menu",
            "rxBreadcrumbs"
        ],
        "name": "Breadcrumbs",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/elements/Breadcrumbs/scripts/rxBreadcrumbs.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/Breadcrumbs/templates/rxBreadcrumbs.html"
        ],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('breadcrumbsSimpleCtrl', function ($scope, rxBreadcrumbsSvc) {\n    rxBreadcrumbsSvc.set([{\n        path: '#/elements',\n        name: 'Elements',\n    }, {\n        name: '<strong>All Elements</strong>',\n        status: 'demo'\n    }]);\n});\n",
            "html": "<p>\n  Displays navigation breadcrumbs on a page.\n</p>\n\n<rx-example class=\"site-breadcrumbs\" name=\"Breadcrumbs.simple\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "Buttons",
        "stability": "stable",
        "description": "Several examples and styles of Buttons available for different contexts.",
        "api": "directive:rxButton",
        "keywords": [
            "button",
            "cancel",
            "rxButton",
            "submit"
        ],
        "name": "Buttons",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/elements/Buttons/scripts/rxButton.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/Buttons/templates/rxButton.html"
        ],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('buttonAnimatedExampleCtrl', function ($scope, $timeout) {\n    $scope.status = {\n        loading: false,\n        disable: false\n    };\n\n    $scope.clickMe = function () {\n        $scope.status.loading = true;\n        $timeout(function () {\n            $scope.status.loading = false;\n        }, 4000);\n    };\n});\n\nangular.module('demoApp')\n.controller('buttonDisableCtrl', function ($scope, $timeout) {\n    $scope.status = {\n        loading: false,\n        disable: true\n    };\n\n    $scope.login = function () {\n        $scope.status.loading = true;\n\n        $timeout(function () {\n            $scope.status.loading = false;\n        }, 4000);\n    };//login()\n});\n\nangular.module('demoApp')\n.controller('buttonGroupExampleCtrl', function ($scope) {\n    $scope.status = 'off';\n});\n\nangular.module('demoApp')\n.controller('buttonSimpleCtrl', function ($scope, $timeout) {\n    $scope.isLoading = false;\n\n    $scope.login = function () {\n        $scope.isLoading = true;\n\n        $timeout(function () {\n            $scope.isLoading = false;\n        }, 4000);\n    };//login()\n});\n",
            "html": "<h2><rx-permalink>Basics</rx-permalink></h2>\n<p>\n  You can style most of your buttons using this <code>.button</code> class.\n  Exceptions can include <code>input type=\"button\"</code> or\n  <a href=\"#/elements/Buttons#rxButton\">rxButton</a> for dynamic loading indicators.\n</p>\n\n<h3><rx-permalink>Button Sizing</rx-permalink></h3>\n<p>\n  Buttons are sized using xl, lg, sm and xs classes. Not adding the additional\n  class defaults the size to medium.\n</p>\n<rx-example name=\"button.sizing\"></rx-example>\n\n<h3><rx-permalink>Types &amp; Colors</rx-permalink></h3>\n\n<h4><rx-permalink>Progression Button</rx-permalink></h4>\n<ul class=\"list\">\n  <li>\n    If the form you are submitting results in EDITING something or something\n    auxiliary like getting metadata from a different source, keep it blue.\n  </li>\n  <li>\n    If you are providing a button for the user to continue through a series\n    of modals (with no submit), use blue.\n  </li>\n</ul>\n<rx-example name=\"button.colors.progression\"></rx-example>\n\n<h4><rx-permalink>Submit Button</rx-permalink></h4>\n<ul class=\"list\">\n  <li>\n    If the form you are submitting results in CREATING or ADDING something,\n    use green.\n  </li>\n  <li>If the form you are submitting is within a modal, use green.</li>\n</ul>\n<rx-example name=\"button.colors.submit\"></rx-example>\n\n<h4><rx-permalink>Negative Button</rx-permalink></h4>\n<rx-example name=\"button.colors.negative\"></rx-example>\n\n<h4><rx-permalink>Cancel Button</rx-permalink></h4>\n<rx-example name=\"button.colors.cancel\"></rx-example>\n\n<h4><rx-permalink>Finish Button</rx-permalink></h4>\n<ul class=\"list\">\n  <li>\n    If you are providing a button for the user to exit a series of modals\n    where no other action is required by the user, use the \"Finish &amp; Close\"\n    button with a blue outline.\n  </li>\n</ul>\n<rx-example name=\"button.colors.finish\"></rx-example>\n\n<h4><rx-permalink>Disabled Button</rx-permalink></h4>\n<rx-example name=\"button.colors.disabled\"></rx-example>\n\n\n<h3><rx-permalink>Button with Animation</rx-permalink></h3>\n<p>\n  You can use the spinner style with buttons. Different spinner styles are\n  used when content is loading or being fetched (see Using Colors and Icons\n  With Links demo).\n</p>\n<p>\n  When a user takes an action with results that can't be immediately\n  displayed, a spinner is shown on a disabled button state until the call\n  completes or the results of the user's action can be displayed in the UI.\n  Text for your buttons with spinners should describe the action taken using\n  \"-ing\" verbs, so the user understands why the button appearance has\n  changed. The disabled state ensures the user can't submit the same data\n  multiple times while the initial action completes.\n</p>\n<rx-example name=\"button.animated\"></rx-example>\n\n<h3><rx-permalink>Button Groups</rx-permalink></h3>\n<p>\n  This control should NOT be used as a replacement for radio inputs. Instead,\n  it should be used to indicate state on a page. For example, the legend of a\n  time plot may allow the user to select a range of week, month, or year. In\n  this situation, there is no form being submitted, but there is an indication\n  of the graph's state that can be interacted with. Conversely, radio inputs\n  are the correct way to implement a form input where one of a few options can\n  be selected.\n</p>\n<p>\n  Also, this type of control should only be used with at most four segments.\n</p>\n<rx-example name=\"button.group\"></rx-example>\n\n\n<h3><rx-permalink>rxButton</rx-permalink></h4>\n<p>\n  <code>rxButton</code> is used to create buttons based on the dynamic state of the\n  application.\n</p>\n\n<h4><rx-permalink>Typical Usage</rx-permalink></h4>\n<rx-example name=\"button.simple\"></rx-example>\n\n<h4><rx-permalink>rxButton with <code>disable</code> attribute</rx-permalink></h4>\n<rx-example name=\"button.disable\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "Collapse",
        "stability": "stable",
        "description": "display and hide content on a page",
        "api": "directive:rxCollapse",
        "keywords": [
            "collapse",
            "rxCollapse"
        ],
        "name": "Collapse",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/elements/Collapse/scripts/rxCollapse.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/Collapse/templates/rxCollapse.html"
        ],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  To display and hide content, you can use rxCollapse. It can be set as\n  either expanded or collapsed on page load. A double chevron is used as\n  a toggle to show/hide the inner contents, while keeping the header and\n  border visible.\n</p>\n<rx-example name=\"collapse.box\"></rx-example>\n\n<h3>See More/See Less</h3>\n<p>\n  In areas where metadata needs to be available but space is limited, you\n  can use a \"See More\"/\"See Less\" link to expand and show additional\n  metadata. The most relevant lines of metadata should display on page\n  load with less relevant lines of metadata hidden behind \"See More\".\n</p>\n<ul class=\"list\">\n  <li>\n    This pattern is not very responsive friendly. The column wrap will\n    place your data out of context, making it difficult to read.\n  </li>\n  <li>\n    So you can design responsively, data hidden by rxCollapse should only\n    be used at the end of the page's final column.\n  </li>\n</ul>\n<rx-example name=\"collapse.moreless\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "Copy",
        "stability": "prototype",
        "description": "Element to aid in copying text to the system clipboard",
        "api": "directive:rxCopy",
        "keywords": [
            "clipboard",
            "copy",
            "rxCopy"
        ],
        "name": "Copy",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/elements/Copy/scripts/rxCopy.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/Copy/templates/rxCopy.html"
        ],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('copyAdvancedCtrl', function ($scope) {\n    $scope.loremIpsum = [\n        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit',\n        'amet elit ut metus semper tempor ac vitae nunc. Fusce cursus odio',\n        'eget maximus vulputate. Nullam hendrerit enim vitae augue vulputate,',\n        'eu consequat tellus imperdiet. Duis magna dolor, scelerisque non',\n        'magna ac, bibendum interdum turpis. Phasellus placerat placerat',\n        'nunc, in sodales neque. Proin at urna quis tellus congue feugiat.',\n        'Praesent dictum porttitor tristique. In tincidunt dignissim ultricies.',\n        'Maecenas in turpis a odio dictum molestie.'\n    ].join(' ');\n});\n\nangular.module('demoApp')\n.controller('copySimpleCtrl', function ($scope) {\n    $scope.shortValue = 'This is a short sentence.';\n\n    $scope.loremIpsum = [\n        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit',\n        'amet elit ut metus semper tempor ac vitae nunc. Fusce cursus odio',\n        'eget maximus vulputate. Nullam hendrerit enim vitae augue vulputate,',\n        'eu consequat tellus imperdiet. Duis magna dolor, scelerisque non',\n        'magna ac, bibendum interdum turpis. Phasellus placerat placerat',\n        'nunc, in sodales neque. Proin at urna quis tellus congue feugiat.',\n        'Praesent dictum porttitor tristique. In tincidunt dignissim ultricies.',\n        'Maecenas in turpis a odio dictum molestie.'\n    ].join(' ');\n});\n\nangular.module('demoApp')\n.controller('copyTableCtrl', function ($scope) {\n    $scope.loremIpsum = [\n        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit',\n        'amet elit ut metus semper tempor ac vitae nunc. Fusce cursus odio',\n        'eget maximus vulputate. Nullam hendrerit enim vitae augue vulputate,',\n        'eu consequat tellus imperdiet. Duis magna dolor, scelerisque non',\n        'magna ac, bibendum interdum turpis. Phasellus placerat placerat',\n        'nunc, in sodales neque. Proin at urna quis tellus congue feugiat.',\n        'Praesent dictum porttitor tristique. In tincidunt dignissim ultricies.',\n        'Maecenas in turpis a odio dictum molestie.'\n    ].join(' ');\n});\n",
            "html": "<rx-notification type=\"warning\">\n  Chrome 43+ and Firefox 41+ are required to take advantage of full functionality.\n  <br />\n  <em>Other browsers and older versions may have degraded or broken functionality.</em>\n</rx-notification>\n\n<rx-notification type=\"info\">\n  This Element is designed to copy <em>plain text</em> and will not preserve any HTML formatting.\n</rx-notification>\n\n<p>\n  Element to aid in copying plain text to the system clipboard.\n</p>\n\n<h3><rx-permalink>Simple Usage</rx-permalink></h3>\n<rx-example name=\"copy.simple\"></rx-example>\n\n\n<h3><rx-permalink>Advanced Usage</rx-permalink></h3>\n<p>\n  You can use the <code>compact</code> property along with the optional\n  <code>.bordered</code> CSS class to apply advanced styling to the Copy\n  Element.\n</p>\n<rx-example name=\"copy.advanced\"></rx-example>\n\n\n<h4><rx-permalink>Table Usage</rx-permalink></h4>\n<ul class=\"list\">\n  <li>\n    Use the <code>.rxCopyTable</code> CSS class on your table to use the Copy\n    Element within table cells. Without this, your table may grow wider than\n    expected.\n  </li>\n  <li>\n    <strong>NOTE:</strong> The <code>.rxCopyTable</code> will apply a fixed\n    table layout to your table, so there is a high liklihood that you will\n    see a change to your column widths after it is applied.\n  </li>\n</ul>\n<rx-example name=\"copy.tables\"></rx-example>\n\n<h4>Test Clipboard</h4>\n<div rx-form>\n  <rx-form-section controlled-width>\n    <rx-field>\n      <rx-field-content>\n        <rx-input>\n          <textarea rows=\"10\" id=\"test-textarea\"></textarea>\n        </rx-input>\n      </rx-field-content>\n    </rx-field>\n  </rx-form-section>\n</div>\n\n<section class=\"rxCopy-visual-regression\" layout=\"column\" layout-padding>\n  <h4>rxCopy Visual Styles</h4>\n  <section>\n    <div>\n      <h5>Short Text</h5>\n      <rx-copy>Fully Visible</rx-copy>\n    </div>\n    <div>\n      <h5>Long Text (Compact)</h5>\n      <rx-copy compact>Compact without borders, yada yada yada</rx-copy>\n    </div>\n    <div>\n      <h5>Long Text (Compact, Bordered)</h5>\n      <rx-copy compact class=\"bordered\">\n        Compact with borders, yada yada yada hiss boom bah\n      </rx-copy>\n    </div>\n  </section>\n\n  <h5>Basic Table</h5>\n  <section>\n    <table>\n      <colgroup>\n        <col width=\"200\"/>\n        <col />\n      </colgroup>\n      <thead>\n        <tr>\n          <th>Too Large for Cell</th>\n          <th>Fully Visible</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td>\n            <rx-copy>\n              Too large for cell width, this should wrap across multiple lines.\n            </rx-copy>\n          </td>\n          <td>\n            <rx-copy>Fully Visible</rx-copy>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </section>\n\n  <h5>Using <code>.rxCopyTable</code></h5>\n  <section>\n    <table class=\"rxCopyTable\">\n      <colgroup>\n        <col width=\"200\"/>\n        <col />\n      </colgroup>\n      <thead>\n        <tr>\n          <th>Too Large for Cell</th>\n          <th>Fully Visible</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td>\n            <rx-copy>\n              Too large for cell width, this should overflow.\n            </rx-copy>\n          </td>\n          <td>\n            <rx-copy>Fully Visible</rx-copy>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </section>\n</section>\n",
            "less": ""
        }
    },
    {
        "displayName": "Feedback",
        "stability": "stable",
        "description": "Gather and send user feedback",
        "api": "directive:rxFeedback",
        "keywords": [
            "rxFeedback",
            "feedback",
            "form",
            "modal"
        ],
        "name": "Feedback",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/elements/Feedback/scripts/rxFeedback.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/Feedback/templates/feedbackForm.html",
            "templates/Feedback/templates/rxFeedback.html"
        ],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('feedbackSimpleExampleCtrl', function ($scope, rxNotify) {\n    $scope.alwaysSucceed = function () {\n        rxNotify.add('Thanks for your feedback!', {\n            type: 'success',\n            timeout: 3\n        });\n    };\n\n    $scope.alwaysFail = function () {\n        rxNotify.add('Feedback not received!', {\n            type: 'error',\n            timeout: 3\n        });\n    };\n});\n",
            "html": "<p>\n  The rxFeedback component gathers and sends user feedback to a default or specifiable email list.\n</p>\n\n<rx-example name=\"feedback.simple\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "Flexbox Grid",
        "stability": "prototype",
        "description": "CSS class-based grid system using flexbox positioning.",
        "hasApi": false,
        "keywords": [
            "columns",
            "flexbox",
            "grid",
            "layout",
            "rows"
        ],
        "name": "FlexboxGrid",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "isCategory": false,
        "srcFiles": [],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<rx-notification type=\"warning\">\n  The grid system described below is based on CSS classes.\n  <br />\n  You can view the documentation for the attribute-based grid system\n  <a href=\"#/elements/deprecated/FlexboxGrid\">via this link</a>.\n</rx-notification>\n\n<rx-notification type=\"info\">\n  The visual styling of all examples on this page\n  are for demonstration purposes.\n  <br />\n  Rows and columns will not have any visual styling applied to them in the\n  consumed CSS.\n</rx-notification>\n\n<section>\n  <heading>\n    <h2>Overview</h2>\n  </heading>\n  <p>\n    The grid system described on this page makes use of\n    <a href=\"http://www.w3.org/TR/css3-flexbox/\" target=\"_blank\">flexbox</a>\n    CSS properties and is designed to be mobile first.\n  </p>\n</section>\n\n<section>\n  <heading>\n    <h2>Defining a Row</h2>\n  </heading>\n\n  <p>\n    Use the <code>.grid-row</code> CSS class to define a row nesting context.\n    This will automatically apply a row-based flexbox alignment to the\n    assigned element.\n  </p>\n\n  <ul class=\"list\">\n    <li>\n      Element children will automatically be aligned horizontally along the\n      X-axis, from left to right.\n    </li>\n    <li>\n      Element children will wrap if they cannot fit horizontally in the row.\n    </li>\n  </ul>\n\n  <div class=\"example-case do\">\n    <h4>Do</h4>\n    <ul class=\"list\">\n      <li>Place content in a column of the row.</li>\n    </ul>\n  </div>\n\n  <div class=\"example-case avoid\">\n    <h4>Don't</h4>\n    <ul class=\"list\">\n      <li>Do not place content directly within a row.</li>\n      <li>Do not change horizontal margins on a row.</li>\n      <li>Do not change horizontal padding on a row.</li>\n      <li>Do not add borders to a row.</li>\n    </ul>\n  </div>\n\n  <rx-example name=\"grid.row\"></rx-example>\n</section>\n\n<section>\n  <heading>\n    <h2>Define Columns</h2>\n  </heading>\n\n  <p>\n    Use the <code>.grid-col</code> class to define a column nesting context.\n    This will automatically apply a column-based flexbox alignment to the\n    assigned element.\n  </p>\n\n  <ul class=\"list\">\n    <li>\n      Children of a column will automatically align vertically along the Y-axis,\n      from top to bottom.\n    </li>\n    <li>\n      Children will share the row width equally, by default.\n      <br />\n      Useful for symmetrical layouts.\n    </li>\n  </ul>\n\n  <div class=\"example-case do\">\n    <h4>Do</h4>\n    <ul class=\"list\">\n      <li>\n        Apply a column span (described below) for specfic column widths.\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"example-case avoid\">\n    <h4>Don't</h4>\n    <ul class=\"list\">\n      <li>Do not change horizontal padding on a column.</li>\n      <li>Do not change horizontal margin on a column.</li>\n      <li>Do not add borders to a column.</li>\n    </ul>\n  </div>\n\n  <rx-example name=\"grid.col\"></rx-example>\n</section>\n\n<section>\n  <heading>\n    <h2>Define Column Spans</h2>\n  </heading>\n\n  <h3>Static Column Spans</h3>\n  <p>\n    Use the <code>.span-N</code> CSS class (where 1 &le; N &le; 12) to define\n    columns that are a predefined fraction of the row width.\n  </p>\n  <ul class=\"list\">\n    <li>\n      If the total column span exceeds a total of 12, the remaining columns\n      will wrap to the next line, but within the same row.\n    </li>\n    <li>\n      The <code>.span-N</code> class is not responsive and will apply to all\n      available breakpoints.\n    </li>\n  </ul>\n\n  <div class=\"example-case avoid\">\n    <h4>Don't</h4>\n    <ul class=\"list\">\n      <li>\n        Do not override <code>width</code> or <code>min-width</code>\n        properties of a column span.\n      </li>\n    </ul>\n  </div>\n  <rx-example name=\"grid.span\"></rx-example>\n\n  <h3>Responsive Column Spans</h3>\n  <p>\n    Breakpoints are based on <code>em</code> units instead of <code>px</code>\n    to retain proper responsiveness for varying window zoom levels.  If the\n    window zoom is increased, the page contents enlarge and less space is\n    available for content on the page.  As font-size increases, breakpoints\n    trend toward the mobile breakpoints to account for reduced space.\n  </p>\n  <ul class=\"list\">\n    <li>\n      The <code>.span-B-N</code> CSS class variants can be used for responsive\n      layouts.\n      <ul>\n        <li>\n          B is a breakpoint of <code>xs</code>, <code>sm</code>,\n          <code>md</code>, <code>lg</code>, to <code>xl</code> to match\n          the minimum breakpoint needed to achieve the desired column span.\n        </li>\n        <li>\n          N follows the same rules as static column spans defined above.\n        </li>\n      </ul>\n    </li>\n  </ul>\n  <table>\n    <thead>\n      <tr>\n        <th>CSS</th>\n        <th>Alias</th>\n        <th>EM Value</th>\n        <th>PX Value (approx.)</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>xs</td>\n        <td><em>wrist</em></td>\n        <td>0em</td>\n        <td>0px</td>\n      </tr>\n      <tr>\n        <td>sm</td>\n        <td><em>palm</em></td>\n        <td>40em</td>\n        <td>&asymp;640px</td>\n      </tr>\n      <tr>\n        <td>md</td>\n        <td><em>lap</em></td>\n        <td>64em</td>\n        <td>&asymp;1024px</td>\n      </tr>\n      <tr>\n        <td>lg</td>\n        <td><em>desk</em></td>\n        <td>75em</td>\n        <td>&asymp;1200px</td>\n      </tr>\n      <tr>\n        <td>xl</td>\n        <td><em>wall</em></td>\n        <td>90em</td>\n        <td>&asymp;1440px</td>\n      </tr>\n    </tbody>\n  </table>\n  <rx-example name=\"grid.responsive\"></rx-example>\n</section>\n\n<section>\n  <heading>\n    <h2>Nesting Rows and Columns</h2>\n  </heading>\n  <p>\n    You can nest rows can columns as deep as you wish. Gutters will automatically align properly.\n  </p>\n\n  <div class=\"example-case do\">\n    <h4>Do</h4>\n    <ul class=\"list\">\n      <li>Beginning with a row element, alternate between rows and columns as you nest.</li>\n    </ul>\n  </div>\n\n  <rx-example name=\"grid.nesting\"></rx-example>\n</section>\n\n<section>\n  <heading>\n    <h2>Offsetting Columns</h2>\n  </heading>\n\n  <p>\n    Use the <code>.offset-N</code> CSS class (where 1 &le; N &le; 11) to define\n    where the column span begins.\n  </p>\n\n  <ul class=\"list\">\n    <li>The <code>.offset-N</code> CSS class is not resposive.</li>\n    <li>\n      The <code>.offset-B-N</code> CSS class variants provide responsive\n      functionality.  The same rules apply as documented in responsive columns.\n    </li>\n  </ul>\n\n  <rx-example name=\"grid.offset\"></rx-example>\n</section>\n\n<section>\n  <heading>\n    <h2>Ordering Columns</h2>\n  </heading>\n\n  <p>\n    Use the <code>.order-N</code> CSS class (where 1 &le; N &le; 12) to redefine\n    column layout order.\n  </p>\n  <ul class=\"list\">\n    <li>The <code>.order-N</code> CSS class is not resposive.</li>\n    <li>\n      The <code>.order-B-N</code> CSS class variants provide responsive\n      functionality.  The same rules apply as documented in responsive columns.\n    </li>\n  </ul>\n\n  <h4>Example</h4>\n  <p>\n    The columns below were defined in the markup in the order of 2-4-1-3. By using\n    the proper classes, they've been reordered as 1-2-3-4.\n  </p>\n\n  <rx-example name=\"grid.order\"></rx-example>\n</section>\n\n<section>\n  <heading>\n    <h2>Going Gutterless</h2>\n  </heading>\n\n  <p>\n    There will be times where having gutters is undesirable for the layout of\n    elements on the page. For these cases, we have <code>.flex-*</code>\n    equivalents of <code>.grid-*</code> classes to provide 12-column\n    functionality without gutters.\n  </p>\n\n  <section>\n    <heading>\n      <h3>Defining a Gutterless Row</h3>\n    </heading>\n\n    <p>\n      Use the <code>.flex-row</code> CSS class to define a gutterless, row\n      nesting context. This will automatically apply a row-based flexbox\n      alignment to the assigned element.\n    </p>\n\n    <div class=\"example-case do\">\n      <h4>Do</h4>\n      <ul class=\"list\">\n        <li>You may add content within a <code>.flex-row</code>.\n      </ul>\n    </div>\n\n    <div class=\"example-case avoid\">\n      <h4>Don't</h4>\n      <ul class=\"list\">\n        <li>\n          Do not use <code>.grid-col</code> elements within a gutterless row.\n        </li>\n      </ul>\n    </div>\n\n    <rx-example name=\"flex.row\"></rx-example>\n  </section>\n\n  <section>\n    <h3>Defining a Gutterless Column</h3>\n    <p>\n      Use the <code>.flex-col</code> class to define a gutterless, column\n      nesting context. This will automatically apply a column-based flexbox\n      alignment to the assigned element.\n    </p>\n\n    <div class=\"example-case do\">\n      <h4>Do</h4>\n      <ul class=\"list\">\n        <li>You may apply custom padding to a gutterless column.</li>\n      </ul>\n    </div>\n\n    <div class=\"example-case avoid\">\n      <h4>Don't</h4>\n      <ul class=\"list\">\n        <li>\n          Do not use gutterless columns within <code>.grid-row</code> elements.\n        </li>\n      </ul>\n    </div>\n\n    <rx-example name=\"flex.col\"></rx-example>\n  </section>\n\n  <h3>Gutterless Column Spans</h3>\n\n  <h4>Static Gutterless Column Spans</h4>\n  <rx-example name=\"flex.span\"></rx-example>\n\n  <h4>Responsive Gutterless Column Spans</h4>\n  <rx-example name=\"flex.responsive\"></rx-example>\n\n  <h3>Gutterless Nesting</h3>\n  <rx-example name=\"flex.nesting\"></rx-example>\n\n  <h3>Gutterless Offset</h3>\n  <rx-example name=\"flex.offset\"></rx-example>\n\n  <h3>Gutterless Ordering</h3>\n  <rx-example name=\"flex.order\"></rx-example>\n</section>\n",
            "less": ""
        }
    },
    {
        "displayName": "Forms",
        "stability": "stable",
        "description": "Usage and examples of different Form usage patterns.",
        "hasApi": false,
        "keywords": [
            "area",
            "box",
            "character",
            "checkbox",
            "count",
            "date",
            "dropdown",
            "error",
            "field",
            "filter",
            "form",
            "help",
            "inline",
            "input",
            "label",
            "message",
            "multi select",
            "multiple",
            "name",
            "option",
            "picker",
            "radio",
            "rxSelect",
            "rxCharacterCount",
            "rxCheckbox",
            "rxDatePicker",
            "rxField",
            "rxFieldContent",
            "rxFieldName",
            "rxForm",
            "rxFormSection",
            "rxHelpText",
            "rxInfix",
            "rxInlineError",
            "rxMultiSelect",
            "rxOptionTable",
            "rxPrefix",
            "rxRadio",
            "rxSearchBox",
            "rxSuffix",
            "rxTimePicker",
            "rxToggleSwitch",
            "search",
            "select",
            "switch",
            "table",
            "text area",
            "text",
            "time",
            "toggle",
            "validation"
        ],
        "name": "Forms",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "isCategory": false,
        "srcFiles": [
            "src/elements/Forms/scripts/rxCharacterCount.js",
            "src/elements/Forms/scripts/rxCheckbox.js",
            "src/elements/Forms/scripts/rxDatePicker.js",
            "src/elements/Forms/scripts/rxField.js",
            "src/elements/Forms/scripts/rxFieldContent.js",
            "src/elements/Forms/scripts/rxFieldName.js",
            "src/elements/Forms/scripts/rxForm.js",
            "src/elements/Forms/scripts/rxFormSection.js",
            "src/elements/Forms/scripts/rxHelpText.js",
            "src/elements/Forms/scripts/rxInfix.js",
            "src/elements/Forms/scripts/rxInlineError.js",
            "src/elements/Forms/scripts/rxInput.js",
            "src/elements/Forms/scripts/rxMultiSelect.js",
            "src/elements/Forms/scripts/rxPrefix.js",
            "src/elements/Forms/scripts/rxRadio.js",
            "src/elements/Forms/scripts/rxSearchBox.js",
            "src/elements/Forms/scripts/rxSelect.js",
            "src/elements/Forms/scripts/rxSelectOption.js",
            "src/elements/Forms/scripts/rxSuffix.js",
            "src/elements/Forms/scripts/rxTimePicker.js",
            "src/elements/Forms/scripts/rxToggleSwitch.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/Forms/templates/rxDatePicker.html",
            "templates/Forms/templates/rxFieldName.html",
            "templates/Forms/templates/rxFormItem.html",
            "templates/Forms/templates/rxMultiSelect.html",
            "templates/Forms/templates/rxSearchBox.html",
            "templates/Forms/templates/rxSelectOption.html",
            "templates/Forms/templates/rxTimePicker.html",
            "templates/Forms/templates/rxToggleSwitch.html"
        ],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('characterCountDocsCtrl', function ($scope) {\n    $scope.data = {\n        comment1: '',\n        comment2: '',\n        comment3: '',\n        comment4: '',\n        comment5: 'I have an initial value',\n        comment6: ''\n    };\n});\n\nangular.module('demoApp')\n.controller('checkboxDocsCtrl', function ($scope) {\n    $scope.chkValidEnabledOne = true;\n    $scope.chkValidEnabledTwo = false;\n    $scope.chkValidDisabledOne = true;\n    $scope.chkValidDisabledTwo = false;\n    $scope.chkValidNgDisabledOne = true;\n    $scope.chkValidNgDisabledTwo = false;\n\n    $scope.chkInvalidEnabledOne = true;\n    $scope.chkInvalidEnabledTwo = false;\n    $scope.chkInvalidDisabledOne = true;\n    $scope.chkInvalidDisabledTwo = false;\n    $scope.chkInvalidNgDisabledOne = true;\n    $scope.chkInvalidNgDisabledTwo = false;\n});\n\nangular.module('demoApp')\n.controller('datePickerDocsCtrl', function ($scope) {\n    $scope.enabledValid = '2015-12-15';\n    $scope.disabledValid = '2015-12-15';\n\n    $scope.enabledInvalid = '2015-12-15';\n    $scope.disabledInvalid = '2015-12-15';\n});\n\nangular.module('demoApp')\n.controller('multiSelectDocsCtrl', function ($scope) {\n    $scope.classification = [];\n});\n\nangular.module('demoApp')\n.controller('radioDocsCtrl', function ($scope) {\n    $scope.validEnabled = 1;\n    $scope.validDisabled = 1;\n    $scope.validNgDisabled = 1;\n\n    $scope.invalidEnabled = 1;\n    $scope.invalidDisabled = 1;\n    $scope.invalidNgDisabled = 1;\n\n    $scope.plainHtmlRadio = 'isChecked';\n});\n\nangular.module('demoApp')\n.controller('selectDocsCtrl', function ($scope) {\n    $scope.validEnabled = 3;\n    $scope.validNgDisabled = 'na';\n    $scope.validDisabled = 'na';\n\n    $scope.invalidEnabled = 4;\n    $scope.invalidNgDisabled = 'na';\n    $scope.invalidDisabled = 'na';\n\n    $scope.htmlSelectAlternativeValue = 'second';\n});\n\nangular.module('demoApp')\n.controller('timePickerDocsCtrl', function ($scope) {\n    $scope.enabledValid = '06:00-06:00';\n    $scope.disabledValid = '20:00+08:00';\n\n    $scope.enabledInvalid = '17:45+05:00';\n    $scope.disabledInvalid = '05:15+00:00';\n});\n\nangular.module('demoApp')\n.controller('checkboxShowHideCtrl', function ($scope) {\n    $scope.amSure = false;\n    $scope.amReallySure = false;\n\n    $scope.$watch('amSure', function (newVal) {\n        if (newVal === false) {\n            $scope.amReallySure = false;\n        }\n    });\n});\n\nangular.module('demoApp')\n.controller('datePickerEmptyCtrl', function ($scope) {\n    $scope.emptyDate = '';\n\n    $scope.undefinedDate = undefined;\n});\n\nangular.module('demoApp')\n.controller('datePickerSimpleCtrl', function ($scope) {\n    $scope.dateModel = moment(new Date()).format('YYYY-MM-DD');\n});\n\nangular.module('demoApp')\n.controller('formAdvancedControlsDemoCtrl', function ($scope) {\n    $scope.radChoice = 'default';\n    $scope.inputEnabled = false;\n});\n\nangular.module('demoApp')\n.controller('formsAutoSaveExampleController', function ($scope, rxAutoSave) {\n    $scope.forms = { autosave: '' };\n    rxAutoSave($scope, 'forms');\n});\n\nangular.module('demoApp')\n.controller('formCheckboxOptionTableDemoCtrl', function ($scope) {\n\n    $scope.optionTableColumns = [\n        {\n            'label': 'Name',\n            'key': 'name',\n            'selectedLabel': '(Already saved data)'\n        }, {\n            'label': 'Static Content',\n            'key': 'Some <strong>Text &</strong> HTML'\n        }, {\n            'label': 'Expression 2',\n            'key': '{{ value * 100 | number:2 }}'\n        }, {\n            'label': 'Expression 3',\n            'key': '{{ obj.name | uppercase }}'\n        }, {\n            'label': 'Expression 4',\n            'key': '{{ value | currency }}'\n        }\n    ];\n\n    $scope.optionTableCheckboxData = [\n        {\n            'name': 'Item 1'\n        }, {\n            'name': 'Item 2',\n            'value': 'checked',\n            'falseValue': 'unchecked'\n        }\n    ];\n    // example with first checkbox automatically checked\n    $scope.table = {\n        checkbox: [true, 'unchecked']\n    };\n});\n\nangular.module('demoApp')\n.controller('formsDisabledExamplesCtrl', function ($scope) {\n    $scope.txtDisabled = 'Disabled Text Input';\n    $scope.selDisabled = 'disabled';\n    $scope.radDisabled = 1;\n    $scope.chkDisabledOne = true;\n    $scope.chkDisabledTwo = false;\n    $scope.togDisabledOn = true;\n    $scope.togDisabledOff = false;\n    $scope.txtAreaDisabled = 'Disabled Textarea';\n});\n\nangular.module('demoApp')\n.controller('formDropDownDemoCtrl', function ($scope) {\n    /* ========== DATA ========== */\n    $scope.volumeTypes = [\n        {\n            'value': 'SATA',\n            'label': 'SATA'\n        },\n        {\n            'value': 'SSD',\n            'label': 'SSD'\n        },\n        {\n            'value': 'CD',\n            'label': 'CD'\n        },\n        {\n            'value': 'DVD',\n            'label': 'DVD'\n        },\n        {\n            'value': 'BLURAY',\n            'label': 'BLURAY'\n        },\n        {\n            'value': 'TAPE',\n            'label': 'TAPE'\n        },\n        {\n            'value': 'FLOPPY',\n            'label': 'FLOPPY'\n        },\n        {\n            'value': 'LASERDISC',\n            'label': 'LASERDISC'\n        },\n        {\n            'value': 'JAZDRIVE',\n            'label': 'JAZDRIVE'\n        },\n        {\n            'value': 'PUNCHCARDS',\n            'label': 'PUNCHCARDS'\n        },\n        {\n            'value': 'RNA',\n            'label': 'RNA'\n        }\n    ];\n\n    $scope.services = [\n        {\n            'value': 'good',\n            'label': 'Good Service'\n        },\n        {\n            'value': 'cheap',\n            'label': 'Cheap Service'\n        },\n        {\n            'value': 'fast',\n            'label': 'Fast Service'\n        },\n        {\n            'value': 'custom',\n            'label': 'Custom Service'\n        }\n    ];\n    // select the first type by default\n    $scope.volumeType = _.head($scope.volumeTypes).value;\n    $scope.selectedServices = [];\n});\n\nangular.module('demoApp')\n.controller('formEmptyOptionTableDemoCtrl', function ($scope) {\n  \n    $scope.optionTableColumns = [\n        {\n            'label': 'Name',\n            'key': 'name',\n            'selectedLabel': '(Already saved data)'\n        }, {\n            'label': 'Static Content',\n            'key': 'Some <strong>Text &</strong> HTML'\n        }, {\n            'label': 'Expression 2',\n            'key': '{{ value * 100 | number:2 }}'\n        }, {\n            'label': 'Expression 3',\n            'key': '{{ obj.name | uppercase }}'\n        }, {\n            'label': 'Expression 4',\n            'key': '{{ value | currency }}'\n        }\n    ];\n\n    $scope.optionTableEmptyData = [];\n\n    $scope.table = {\n        empty: [true, 'unchecked']\n    };\n});\n\nangular.module('demoApp')\n.controller('formInputGroupsDemoCtrl', function ($scope) {\n    /* ========== DATA ========== */\n    $scope.beatles = [\n        'Paul McCartney',\n        'John Lennon',\n        'Ringo Starr',\n        'George Harrison'\n    ];\n\n    $scope.nevers = [\n        'Give you up',\n        'Let you down',\n        'Run around',\n        'Desert you',\n        'Make you cry',\n        'Say goodbye',\n        'Tell a lie',\n        'Hurt you'\n    ];\n\n    $scope.favoriteBeatle = 'all';\n    $scope.settings = {\n        first: true,\n        second: false,\n        third: true,\n        fourth: false\n    };\n\n});\n\nangular.module('demoApp')\n.controller('formIntermediateControlsDemoCtrl', function ($scope) {\n    $scope.userEmail = '';\n    $scope.isNameRequired = true;\n    $scope.volumeName = '';\n})\n.directive('foocheck', function () {\n    return {\n        require: 'ngModel',\n        link: function (scope, elm, attrs, ctrl) {\n            ctrl.$validators.foocheck = function (modelValue, viewValue) {\n                var value = modelValue || viewValue;\n                return _.includes(value, 'foo');\n            }\n        }\n    };\n});\n\nangular.module('demoApp')\n.controller('formsManualSaveExampleController', function ($scope, $timeout, rxNotify) {\n    $scope.saving = false;\n    $scope.save = function () {\n        $scope.saving = true;\n        rxNotify.clear('page');\n        $timeout(function () {\n            $scope.saving = false;\n            $scope.lastSaved = Date.now();\n            rxNotify.add('Data successfully saved!', {\n                type: 'success'\n            });\n        }, 1000);\n    };\n});\n\nangular.module('demoApp')\n.controller('formRadioOptionTableDemoCtrl', function ($scope) {\n    \n    $scope.optionTableData = [\n        {\n            'id': 'option1_id',\n            'name': 'Option #1',\n            'value': 0,\n            'obj': {\n                'name': 'Nested Name 1'\n            }\n        }, {\n            'id': 'option2_id',\n            'name': 'Option #2',\n            'value': 1,\n            'obj': {\n                'name': 'Nested Name 2'\n            }\n        }, {\n            'id': 'option3_id',\n            'name': 'Option #3',\n            'value': 2,\n            'obj': {\n                'name': 'Nested Name 3'\n            }\n        }, {\n            'id': 'option4_id',\n            'name': 'Option #4',\n            'value': 3,\n            'obj': {\n                'name': 'Nested Name 4'\n            }\n        }\n    ];\n\n    $scope.optionTableColumns = [\n        {\n            'label': 'Name',\n            'key': 'name',\n            'selectedLabel': '(Already saved data)'\n        }, {\n            'label': 'Static Content',\n            'key': 'Some <strong>Text &</strong> HTML'\n        }, {\n            'label': 'Expression 2',\n            'key': '{{ value * 100 | number:2 }}'\n        }, {\n            'label': 'Expression 3',\n            'key': '{{ obj.name | uppercase }}'\n        }, {\n            'label': 'Expression 4',\n            'key': '{{ value | currency }}'\n        }\n    ];\n    /* ========== FUNCTIONS ========== */\n    $scope.disableOption = function (tableId, fieldId, rowId) {\n        return rowId === 'option4_id';\n    };\n\n    $scope.table = {\n        radio: 0\n    };\n});\n\nangular.module('demoApp')\n.controller('formsInvalidExamplesCtrl', function ($scope) {\n    $scope.txtInvalid = 'Invalid text input';\n    $scope.selInvalid = 'invalid';\n    $scope.radInvalid = 1;\n    $scope.chkInvalidOne = true;\n    $scope.chkInvalidTwo = false;\n    $scope.togInvalidOn = true;\n    $scope.togInvalidOff = false;\n    $scope.txtAreaInvalid = 'Invalid Value';\n});\n\nangular.module('demoApp')\n.controller('multiSelectSimpleCtrl', function ($scope) {\n    $scope.classification = [];\n});\n\nangular.module('demoApp')\n.controller('radioDestroyCtrl', function ($scope) {\n    $scope.radCreateDestroy = 'destroyed';\n});\n\nangular.module('demoApp')\n.controller('searchBoxCustomCtrl', function ($scope) {\n    $scope.filterPlaceholder = 'Filter by any...';\n});\n\nangular.module('demoApp')\n.controller('selectDestroyCtrl', function ($scope) {\n    $scope.radCreateDestroy = 'destroyed';\n});\n\nangular.module('demoApp')\n.controller('timePickerSimpleCtrl', function ($scope) {\n    $scope.emptyValue = '';\n    $scope.predefinedValue = '22:10-10:00';\n});\n\nangular.module('demoApp')\n.controller('toggleSwitchAsyncCtrl', function ($scope, $timeout, rxNotify) {\n    $scope.toggle3 = true;\n    $scope.toggle5 = true;\n\n    $scope.attemptChange = function () {\n        $scope.loading = true;\n        rxNotify.clear('page');\n        rxNotify.add('Saving...', {\n            loading: true\n        });\n\n        // Simulate an API request\n        $timeout(function () {\n            $scope.loading = false;\n            rxNotify.clear('page');\n            rxNotify.add('Change saved', {\n                type: 'success'\n            });\n        }, 1000);\n    };\n\n    $scope.attemptFailedChange = function (value) {\n        $scope.loading5 = true;\n        rxNotify.clear('page');\n        rxNotify.add('Attempting to activate...', {\n            loading: true\n        });\n\n        // Simulate a failed API request\n        $timeout(function () {\n            $scope.loading5 = false;\n            rxNotify.clear('page');\n            rxNotify.add('Asynchronous operation failed', {\n                type: 'error',\n            });\n\n            // Reset toggle switch to original value to simulate failed async operation\n            $scope.toggle5 = !value;\n        }, 1000);\n    };\n});\n",
            "html": "<h2 class=\"clear\"><rx-permalink>Directives</rx-permalink></h2>\n<ul class=\"list\">\n  <li>\n    Many of the rxForm directives are designed for layout\n    and positioning. However, there are some that are for stylistic\n    purposes.\n  </li>\n</ul>\n\n<h3><rx-permalink>Label</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    An HTML label is used for accessibility.\n  </li>\n  <li>\n    You should use the <code>&lt;label for=\"formControlId\"&gt;</code>\n    format when defining your HTML labels.\n    <ul>\n      <li>\n        The <code>for</code> attribute connects the label to an\n        appropriate form control. When the label is clicked, wherever it\n        is placed in the DOM, it will focus or activate its\n        corresponding form control.\n      </li>\n    </ul>\n  </li>\n  <li>\n    Inline HTML label elements should only be used with radios,\n    checkboxes, and toggle switches.\n    <ul>\n      <li>\n        Place the label\n        <strong>immediately after the form control</strong>.\n        <ul>\n          <li>\n            This enables you to style the label based on the state\n            of the control.\n          </li>\n          <li>\n            See <a href=\"#/elements/Forms#checkboxes\">checkboxes</a>,\n            <a href=\"#/elements/Forms#radios\">Radio</a>,\n            and <a href=\"#/elements/Forms\">rxForm</a> for markup\n            examples.\n          </li>\n        </ul>\n      </li>\n    </ul>\n  </li>\n  <li>\n    <strong class=\"msg-warn\">\n      DO NOT wrap the control within a label element.\n    </strong>\n    <ul>\n      <li>\n        CSS does not have proper selectors to style label text based\n        on control state\n      </li>\n    </ul>\n  </li>\n  <li>\n    You should place an HTML label around text in an appropriate\n    rxFieldName element.\n  </li>\n</ul>\n\n<h3><rx-permalink>Inputs</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    rxFieldName is a descriptive design element for a particular\n    form field.\n  </li>\n  <li>\n    In contrast to its predecessor (rxFormItem), rxField and children\n    provides you the flexibility to create form field inputs that make\n    use of one or more controls.\n    <ul>\n      <li>See \"Advanced Controls\" in\n        <a href=\"#/elements/Forms\">rxForm</a> demo for examples.\n      </li>\n    </ul>\n  </li>\n</ul>\n\n<h3><rx-permalink>Error Messages</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    Inline Error messages should make use of the\n    <a href=\"ngdocs/index.html#/api/rxForm.directive:rxInlineError\">\n      rxInlineError\n    </a> directive.\n  </li>\n  <li>\n    This directive is styled with bold and red text. It is not\n    constrained by DOM hierarchy, so you may place it wherever it is\n    necessary.\n  </li>\n</ul>\n\n<h3><rx-permalink>Help Text</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    Help text should make use of the\n    <a href=\"ngdocs/index.html#/api/elements.directive:rxHelpText\">\n      rxHelpText\n    </a> directive.\n  </li>\n  <li>\n    This directive is styled in a slightly smaller, italicized font and\n    is not constrained by DOM hierarchy, so you can place it wherever it\n    is necessary.\n  </li>\n</ul>\n\n<h3><rx-permalink>Buttons</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    Reference the <a href=\"#/elements/Links\">links</a> and\n    <a href=\"#/elements/Buttons\">buttons</a> elements and the\n    <a href=\"#/layout/page/form\">Form Page</a> layout for details about how\n    to style and color buttons.\n    <ul>\n      <li>\n        Submit buttons should use the green <code>.submit</code> class unless\n        you are performing a destructive action, in which case, you should use\n        the <code>.negative</code> class.\n      </li>\n    </ul>\n  </li>\n  <li>\n    If you need to use a button in your form field for auxiliary purposes,\n    use the default blue.\n  </li>\n</ul>\n\n<h3>\n  <rx-permalink>Selects</rx-permalink>\n  <a class=\"button xs inline\" href=\"ngdocs/index.html#/api/elements.directive:rxSelect/\">View API</a>\n</h3>\n\n<ul class=\"list\">\n  <li>For single item selection, use the rxSelect directive.</li>\n  <li>For multi-item selection, use the rxMultiSelect directive.</li>\n</ul>\n\n<h3>With Validation</h3>\n<rx-example name=\"select.simple\"></rx-example>\n\n<h3>Show/Hide Select</h3>\n<rx-example name=\"select.showHide\"></rx-example>\n\n<h3>Destroy Select</h3>\n<p>Support for <code>$destroy</code> events.</p>\n<rx-example name=\"select.destroy\"></rx-example>\n\n<h3>Select States</h3>\n<table ng-controller=\"selectDocsCtrl\">\n  <thead>\n    <tr>\n      <th></th>\n      <th>Enabled</th>\n      <th>Disabled (ng-disabled)</th>\n      <th>Disabled (disabled)</th>\n    </tr>\n  </thead>\n  <tbody>\n    <!-- Valid -->\n    <tr>\n      <th>Valid</th>\n      <!-- Valid Enabled -->\n      <td>\n        <select rx-select\n          id=\"selValidEnabled\"\n          ng-model=\"validEnabled\">\n          <option value=\"1\">First</option>\n          <option value=\"2\">Second</option>\n          <option value=\"3\">Third</option>\n          <option value=\"4\">Fourth</option>\n        </select>\n      </td>\n      <!-- Valid Ng-Disabled -->\n      <td>\n        <select rx-select\n          id=\"selValidNgDisabled\"\n          ng-model=\"validNgDisabled\"\n          ng-disabled=\"true\">\n          <option value=\"na\">Disabled by 'ng-disabled' attribute</option>\n        </select>\n      </td>\n      <!-- Valid Disabled -->\n      <td>\n        <select rx-select\n          id=\"selValidDisabled\"\n          disabled\n          ng-model=\"validDisabled\">\n          <option value=\"na\">Disabled by 'disabled' attribute</option>\n        </select>\n      </td>\n    </tr>\n    <!-- Invalid -->\n    <tr>\n      <th>Invalid</th>\n      <!-- Invalid Enabled -->\n      <td>\n        <select rx-select\n          id=\"selInvalidEnabled\"\n          always-invalid\n          ng-model=\"invalidEnabled\">\n          <option value=\"1\">First</option>\n          <option value=\"2\">Second</option>\n          <option value=\"3\">Third</option>\n          <option value=\"4\">Fourth</option>\n        </select>\n      </td>\n      <!-- Invalid Ng-Disabled -->\n      <td>\n        <select rx-select\n          id=\"selInvalidNgDisabled\"\n          always-invalid\n          ng-model=\"invalidNgDisabled\"\n          ng-disabled=\"true\">\n          <option value=\"na\">Disabled by 'ng-disabled' attribute</option>\n        </select>\n      </td>\n      <!-- Invalid Disabled -->\n      <td>\n        <select rx-select\n          id=\"selInvalidDisabled\"\n          disabled\n          always-invalid\n          ng-model=\"invalidDisabled\">\n          <option value=\"na\">Disabled by 'disabled' attribute</option>\n        </select>\n      </td>\n    </tr>\n  </tbody>\n</table>\n\n<rx-debug>\n  <h3>Plain HTML Select Boxes (for comparison)</h3>\n  <p>\n    <select id=\"plainSelNormal\" ng-required=\"true\">\n      <option value=\"\">Plain HTML Select Option</option>\n      <option value=\"first\">First Option</option>\n      <option value=\"second\">Second Option</option>\n      <option value=\"third\">Third Option</option>\n      <option value=\"fourth\">Fourth Option</option>\n    </select>\n  </p>\n  <p>\n    <select id=\"plainSelDisabled\" disabled>\n      <option value=\"\">Disabled HTML Select Option</option>\n      <option value=\"first\">First Option</option>\n      <option value=\"second\">Second Option</option>\n      <option value=\"third\">Third Option</option>\n      <option value=\"fourth\">Fourth Option</option>\n    </select>\n  </p>\n  <p ng-controller=\"selectDocsCtrl\">\n    <select id=\"plainSelSecondSelected\"\n      ng-model=\"htmlSelectAlternativeValue\">\n      <option value=\"\">Starts on Second Option</option>\n      <option value=\"first\">First Option</option>\n      <option value=\"second\">Non Default Starting Option</option>\n      <option value=\"third\">Third Option</option>\n      <option value=\"fourth\">Fourth Option</option>\n    </select>\n  </p>\n  <p>\n    <select id=\"plainSelShowSelect\"\n      ng-model=\"plainHtmlSelect\">\n      <option value=\"hide\">Hide Next Select Box</option>\n      <option value=\"show\">Show Next Select Box</option>\n    </select>\n    <select id=\"plainSelRemoveable\"\n      value=\"hidden\"\n      ng-if=\"plainHtmlSelect !== 'hide'\">\n      <option value=\"\">Is Present</option>\n    </select>\n  </p>\n</rx-debug>\n\n<!-- BEGIN: multiselect -->\n<h3>\n  <rx-permalink>MultiSelect</rx-permalink>\n  <a class=\"button xs inline\" href=\"ngdocs/index.html#/api/elements.directive:rxMultiSelect/\">\n    View API\n  </a>\n  <!-- (NOTE) stability: 'READY' -->\n</h3>\n\n<h4>MultiSelect Input</h4>\n<rx-example name=\"multiSelect.simple\"></rx-example>\n\n<h4>MultiSelect States</h4>\n<p>\n  Below you'll find examples of how <code>rxMultiSelect</code> will appear in different states.\n</p>\n<div ng-controller=\"multiSelectDocsCtrl\">\n  <table>\n    <thead>\n      <tr>\n        <th></th>\n        <th>Enabled</th>\n        <th>Disabled</th>\n      </tr>\n    </thead>\n    <tbody>\n      <!-- Valid States -->\n      <tr>\n        <th>Valid</th>\n        <!-- Valid Enabled -->\n        <td>\n          <rx-multi-select\n            id=\"msValidEnabled\"\n            ng-model=\"validEnabled\">\n\n            <rx-select-option value=\"A\">Type A</rx-select-option>\n            <rx-select-option value=\"B\">Type B</rx-select-option>\n            <rx-select-option value=\"C\">Type C</rx-select-option>\n            <rx-select-option value=\"D\">Type D</rx-select-option>\n          </rx-multi-select>\n        </td>\n        <!-- Valid Disabled -->\n        <td>\n          <rx-multi-select\n            id=\"msValidDisabled\"\n            ng-model=\"validDisabled\"\n            ng-disabled=\"true\">\n\n            <rx-select-option value=\"Not allowed\">Not Allowed</rx-select-option>\n          </rx-multi-select>\n        </td>\n      </tr>\n      <!-- Invalid States -->\n      <tr>\n        <th>Invalid</th>\n        <!-- Invalid Enabled -->\n        <td>\n          <rx-multi-select\n            id=\"msInvalidEnabled\"\n            ng-model=\"invalidEnabled\"\n            always-invalid>\n\n            <rx-select-option value=\"A\">Type A</rx-select-option>\n            <rx-select-option value=\"B\">Type B</rx-select-option>\n            <rx-select-option value=\"C\">Type C</rx-select-option>\n            <rx-select-option value=\"D\">Type D</rx-select-option>\n          </rx-multi-select>\n        </td>\n\n        <!-- Invalid Disabled -->\n        <td>\n          <rx-multi-select\n            id=\"msInvalidDisabled\"\n            ng-model=\"invalidDisabled\"\n            always-invalid\n            ng-disabled=\"true\">\n\n            <rx-select-option value=\"Not allowed\">Not Allowed</rx-select-option>\n          </rx-multi-select>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n<!-- END: multiselect -->\n\n<!-- BEGIN: checkboxes -->\n<h3>\n  <rx-permalink>Checkboxes</rx-permalink>\n  <a class=\"button xs inline\" href=\"ngdocs/index.html#/api/elements.directive:rxCheckbox/\">View API</a>\n  <!-- (NOTE) stability: 'READY' -->\n</h3>\n<ul class=\"list\">\n  <li>Use the rxCheckbox directive for checkbox controls.</li>\n  <li>\n    If you intend to use a label element, place it <strong>immediately\n    after the rxCheckbox</strong> to style the label when the control\n    is disabled.\n  </li>\n  <li>\n    <strong class=\"msg-warn\">\n      DO NOT wrap rxCheckbox in a label element.\n    </strong>\n  </li>\n</ul>\n\n<h4>Show/Hide Input</h4>\n<rx-example name=\"checkbox.showHide\"></rx-example>\n\n<h4>Destroy Input</h4>\n<p>Support for <code>$destroy</code> events.</p>\n<rx-example name=\"checkbox.destroy\"></rx-example>\n\n<h4>Checkbox States</h3>\n<table ng-controller=\"checkboxDocsCtrl\">\n  <thead>\n    <tr>\n      <th></th>\n      <th>Enabled</th>\n      <th>Disabled (ng-disabled)</th>\n      <th>Disabled (disabled)</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>Valid</th>\n      <!-- Valid Enabled-->\n      <td>\n        <p>\n          <input rx-checkbox\n                 id=\"chkValidEnabledOne\"\n                 ng-model=\"chkValidEnabledOne\" />\n          <label for=\"chkValidEnabled\">Checked</label>\n        </p>\n        <p>\n          <input rx-checkbox\n                 id=\"chkValidEnabledTwo\"\n                 ng-model=\"chkValidEnabledTwo\" />\n          <label for=\"chkValidEnabledTwo\">Unchecked</label>\n        </p>\n      </td>\n\n      <!-- Valid NG-Disabled -->\n      <td>\n        <p>\n          <input rx-checkbox\n                 id=\"chkValidNgDisabledOne\"\n                 ng-disabled=\"true\"\n                 ng-model=\"chkValidNgDisabledOne\" />\n          <label for=\"chkValidNgDisabledOne\">Checked</label>\n        </p>\n        <p>\n          <input rx-checkbox\n                 id=\"chkValidNgDisabledTwo\"\n                 ng-disabled=\"true\"\n                 ng-model=\"chkValidNgDisabledTwo\" />\n          <label for=\"chkValidNgDisabledTwo\">Unchecked</label>\n        </p>\n      </td>\n\n      <!-- Valid Disabled -->\n      <td>\n        <p>\n          <input rx-checkbox\n                 id=\"chkValidDisabledOne\"\n                 disabled\n                 ng-model=\"chkValidDisabledOne\" />\n          <label for=\"chkValidDisabledOne\">Checked</label>\n        </p>\n        <p>\n          <input rx-checkbox\n                 id=\"chkValidDisabledTwo\"\n                 disabled\n                 ng-model=\"chkValidDisabledTwo\" />\n          <label for=\"chkValidDisabledTwo\">Unchecked</label>\n        </p>\n      </td>\n    </tr>\n    <tr>\n      <th>Invalid</th>\n      <!-- Invalid Enabled -->\n      <td>\n        <p>\n          <input rx-checkbox\n                 id=\"chkInvalidEnabledOne\"\n                 ng-model=\"chkInvalidEnabledOne\"\n                 always-invalid />\n          <label for=\"chkInvalidEnabledOne\">Checked</label>\n        </p>\n        <p>\n          <input rx-checkbox\n                 id=\"chkInvalidEnabledTwo\"\n                 ng-model=\"chkInvalidEnabledTwo\"\n                 always-invalid />\n          <label for=\"chkInvalidEnabledTwo\">Unchecked</label>\n        </p>\n      </td>\n\n      <!-- Invalid NG-Disabled -->\n      <td>\n        <p>\n          <input rx-checkbox\n                 id=\"chkInvalidNgDisabledOne\"\n                 ng-model=\"chkInvalidNgDisabledOne\"\n                 ng-disabled=\"true\"\n                 always-invalid />\n          <label for=\"chkInvalidNgDisabledOne\">Checked</label>\n        </p>\n        <p>\n          <input rx-checkbox\n                 id=\"chkInvalidNgDisabledTwo\"\n                 ng-model=\"chkInvalidNgDisabledTwo\"\n                 ng-disabled=\"true\"\n                 always-invalid />\n          <label for=\"chkInvalidNgDisabledTwo\">Unchecked</label>\n        </p>\n      </td>\n\n      <!-- Invalid Disabled -->\n      <td>\n        <p>\n          <input rx-checkbox\n                 id=\"chkInvalidDisabledOne\"\n                 ng-model=\"chkInvalidDisabledOne\"\n                 disabled\n                 always-invalid />\n          <label for=\"chkInvalidDisabledOne\">Checked</label>\n        </p>\n        <p>\n          <input rx-checkbox\n                 id=\"chkInvalidDisabledTwo\"\n                 ng-model=\"chkInvalidDisabledTwo\"\n                 disabled\n                 always-invalid />\n          <label for=\"chkInvalidDisabledTwo\">Unchecked</label>\n        </p>\n      </td>\n    </tr>\n  </tbody>\n</table>\n\n<rx-debug>\n  <h3>Plain HTML Checkboxes (for comparison)</h3>\n  <p>\n    <input type=\"checkbox\"\n           id=\"plainHtmlNormal\"\n           ng-required=\"true\" />\n    <label for=\"plainHtmlNormal\">A plain checkbox</label>\n  </p>\n  <p>\n    <input type=\"checkbox\"\n           id=\"plainHtmlDisabled\"\n           disabled />\n    <label for=\"plainHtmlDisabled\">A plain checkbox (disabled)</label>\n  </p>\n  <p>\n    <input type=\"checkbox\"\n           id=\"plainHtmlChecked\"\n           checked />\n    <label for=\"plainHtmlChecked\">A plain checkbox (checked)</label>\n  </p>\n  <p>\n    <input type=\"checkbox\"\n           id=\"plainChkRemoveCheckbox\"\n           ng-model=\"plainChkIsRemoved\" />\n    <label for=\"plainChkRemoveCheckbox\">Remove Following Checkbox:</label>\n\n    <input type=\"checkbox\"\n           checked\n           id=\"plainChkRemoveable\"\n           ng-if=\"!plainChkIsRemoved\" />\n  </p>\n</rx-debug>\n<!-- END: checkboxes -->\n\n<!-- BEGIN: Toggle Switches -->\n<h3>\n  <rx-permalink>Toggle Switches</rx-permalink>\n  <a class=\"button xs inline\" href=\"ngdocs/index.html#/api/elements.directive:rxToggleSwitch/\">View API</a>\n</h3>\n<ul class=\"list\">\n  <li>You can use the rxToggleSwitch directive for toggle switch controls.</li>\n  <li>\n    If you intend to use a label element, place it <strong> immediately\n    after the rxToggleSwitch</strong> to style the label when the\n    control is disabled.\n  </li>\n  <li>\n    <strong class=\"msg-warn\">\n      DO NOT wrap rxToggleSwitch in a label element.\n    </strong>\n  </li>\n  <li>\n    <strong class=\"msg-info\">NOTE:</strong>\n    An rxToggleSwitch does not toggle when clicking its label. However,\n    CSS styles are still applied if the control is disabled within an\n    rxForm.\n  </li>\n  <li>\n    For consistency, and future compatibility, assume that rxToggleSwitch\n    and label works as expected.\n  </li>\n</ul>\n\n<h3>Simple Toggle Switch</h3>\n<rx-example name=\"toggleSwitch.simple\"></rx-example>\n\n<h3>Custom Toggle Values</h3>\n<rx-example name=\"toggleSwitch.custom\"></rx-example>\n\n<h3>Toggling Asynchronous Functionality</h3>\n<rx-example name=\"toggleSwitch.async\"></rx-example>\n\n<h3>Disabled Toggle Switch</h3>\n<rx-example name=\"toggleSwitch.disabled\"></rx-example>\n<!-- END: Toggle Switches -->\n\n<!-- BEGIN: radio -->\n<h3>\n  <rx-permalink>Radios</rx-permalink>\n  <a class=\"button xs inline\" href=\"ngdocs/index.html#/api/elements.directive:rxRadio/\">View API</a>\n</h3>\n<ul class=\"list\">\n  <li>Use the rxRadio directive for radio controls.</li>\n  <li>\n    If you intend to use a label element, place it <strong>immediately\n    after the rxRadio</strong> so that CSS rules may style the label when\n    the control is disabled.\n  </li>\n  <li>\n    <strong class=\"msg-warn\">\n      DO NOT wrap rxRadio in a label element.\n    </strong>\n  </li>\n</ul>\n\n<rx-example name=\"forms.radios\"></rx-example>\n\n<h4>Show/Hide Input</h4>\n<rx-example name=\"radio.showHide\"></rx-example>\n\n<h4>Destroy Input</h4>\n<p>Support for <code>$destroy</code> events.</p>\n<rx-example name=\"radio.destroy\"></rx-example>\n\n<h4>Radio States</h3>\n<table ng-controller=\"radioDocsCtrl\">\n  <thead>\n    <tr>\n      <th></th>\n      <th>Enabled</th>\n      <th>Disabled (ng-disable)</th>\n      <th>Disabled (disabled)</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>Valid</th>\n\n      <!-- Valid Enabled -->\n      <td>\n        <p>\n          <input\n            rx-radio\n            id=\"radValidEnabledOne\"\n            value=\"1\"\n            ng-model=\"validEnabled\"/>\n          <label for=\"radValidEnabledOne\">Selected</label>\n        </p>\n        <p>\n          <input\n            rx-radio\n            id=\"radValidEnabledTwo\"\n            value=\"2\"\n            ng-model=\"validEnabled\"/>\n          <label for=\"radValidEnabledTwo\">Unselected</label>\n        </p>\n      </td>\n\n      <!-- Valid NG-Disabled -->\n      <td>\n        <p>\n          <input\n            rx-radio\n            id=\"radValidNgDisabledOne\"\n            value=\"1\"\n            ng-disabled=\"true\"\n            ng-model=\"validNgDisabled\"/>\n          <label for=\"radValidNgDisabledOne\">Selected</label>\n        </p>\n        <p>\n          <input\n            rx-radio\n            id=\"radValidNgDisabledTwo\"\n            value=\"2\"\n            ng-disabled=\"true\"\n            ng-model=\"validNgDisabled\"/>\n          <label for=\"radValidNgDisabledTwo\">Unselected</label>\n        </p>\n      </td>\n\n      <!-- Valid Disabled -->\n      <td>\n        <p>\n          <input\n            rx-radio\n            id=\"radValidDisabledOne\"\n            value=\"1\"\n            disabled\n            ng-model=\"validDisabled\"/>\n          <label for=\"radValidDisabledOne\">Selected</label>\n        </p>\n        <p>\n          <input\n            rx-radio\n            id=\"radValidDisabledTwo\"\n            value=\"2\"\n            disabled\n            ng-model=\"validDisabled\"/>\n          <label for=\"radValidDisabledTwo\">Unselected</label>\n        </p>\n      </td>\n    </tr>\n    <tr>\n      <th>Invalid</th>\n\n      <!-- Invalid Enabled -->\n      <td>\n        <p>\n          <input\n            rx-radio\n            id=\"radInvalidEnabledOne\"\n            value=\"1\"\n            ng-model=\"invalidEnabled\"\n            always-invalid/>\n          <label for=\"radInvalidEnabledOne\">Selected</label>\n        </p>\n        <p>\n          <input\n            rx-radio\n            id=\"radInvalidEnabledTwo\"\n            value=\"2\"\n            ng-model=\"invalidEnabled\"\n            always-invalid/>\n          <label for=\"radInvalidEnabledTwo\">Unselected</label>\n        </p>\n      </td>\n\n      <!-- Invalid NG-Disabled -->\n      <td>\n        <p>\n          <input\n            rx-radio\n            id=\"radInvalidNgDisabledOne\"\n            value=\"1\"\n            ng-disabled=\"true\"\n            ng-model=\"invalidNgDisabled\"\n            always-invalid/>\n          <label for=\"radInvalidNgDisabledOne\">Selected</label>\n        </p>\n        <p>\n          <input\n            rx-radio\n            id=\"radInvalidNgDisabledTwo\"\n            value=\"2\"\n            ng-disabled=\"true\"\n            ng-model=\"invalidNgDisabled\"\n            always-invalid/>\n          <label for=\"radInvalidNgDisabledTwo\">Unselected</label>\n        </p>\n      </td>\n\n      <!-- Invalid Disabled -->\n      <td>\n        <p>\n          <input\n            rx-radio\n            id=\"radInvalidDisabledOne\"\n            value=\"1\"\n            disabled\n            ng-model=\"invalidDisabled\"\n            always-invalid/>\n          <label for=\"radInvalidDisabledOne\">Selected</label>\n        </p>\n        <p>\n          <input\n            rx-radio\n            id=\"radInvalidDisabledTwo\"\n            value=\"2\"\n            disabled\n            ng-model=\"invalidDisabled\"\n            always-invalid/>\n          <label for=\"radInvalidDisabledTwo\">Unselected</label>\n        </p>\n      </td>\n    </tr>\n  </tbody>\n</table>\n\n<rx-debug>\n  <h3>Plain HTML Radios (for comparison)</h3>\n  <p>\n    <input\n      type=\"radio\"\n      id=\"plainRadNormal\"\n      ng-model=\"plainHtmlRadio\"\n      value=\"plain\"\n      ng-required=\"true\"/>\n    <label for=\"plainRadNormal\">A plain radio</label>\n  </p>\n  <p>\n    <input\n      type=\"radio\"\n      id=\"plainRadDisabled\"\n      value=\"disabled\"\n      ng-model=\"plainHtmlRadio\"\n      disabled/>\n    <label for=\"plainRadDisabled\">A plain radio (disabled)</label>\n  </p>\n  <p>\n    <input\n      type=\"radio\"\n      id=\"plainRadChecked\"\n      value=\"isChecked\"\n      ng-model=\"plainHtmlRadio\"/>\n    <label for=\"plainRadChecked\">A plain radio (checked)</label>\n  </p>\n  <p>\n    <input\n      type=\"radio\"\n      id=\"plainRadRemoveRadio\"\n      value=\"shows\"\n      ng-model=\"plainHtmlRadio\"/>\n    <label for=\"plainRadRemoveRadio\">Add Following Radio:</label>\n\n    <input\n      type=\"radio\"\n      id=\"plainRadRemoveable\"\n      value=\"hidden\"\n      ng-if=\"plainHtmlRadio === 'shows'\"/>\n  </p>\n</rx-debug>\n<!-- END: radio -->\n\n<!-- BEGIN: rxCharacterCount -->\n<h3>\n  <rx-permalink>Using a Character Counter</rx-permalink>\n  <a class=\"button xs inline\" href=\"ngdocs/index.html#/api/elements.directive:rxCharacterCount/\">View API</a>\n  <!-- (NOTE) stability: 'experimental' -->\n</h3>\n<ul class=\"list\">\n  <li>\n    Character counters provide color feedback to the user in addition to\n    numeric feedback. As a user approaches the character limit, the\n    numeric value turns from gray to yellow, then yellow to red.\n  </li>\n  <li>\n    The character counter is already styled and has the correct width\n    needed to be positioned next to a textarea. If you need to change the\n    textarea width, a custom wrapper class and textarea width can be set.\n  </li>\n  <li>\n    If you intend to use a counter on text inputs, instead of the more\n    commonly used text area, be aware the framework does not support\n    these fields. You may experience unexpected results. Make sure to\n    test your code.\n  </li>\n  <li>\n    Please see the example below for implementing a character counter on a\n    textarea or text input field.\n  </li>\n  <li>\n    For more options regarding rxCharacterCount functionality, see API docs.\n  </li>\n</ul>\n\n<rx-example name=\"characterCount.simple\"></rx-example>\n\n<rx-debug>\n  <div ng-controller=\"characterCountDocsCtrl\">\n    <h4>Character Count: Default Values</h4>\n    <div>\n      <textarea\n        ng-model=\"data.comment1\"\n        ng-model-options=\"{ debounce: 100 }\"\n        rows=\"10\" cols=\"50\"\n        rx-character-count\n        class=\"demo-default-char-count-values\">\n      </textarea>\n    </div>\n\n    <h4>Character Count: Custom <code>max-characters=\"25\"</code></h4>\n    <div>\n      <textarea\n        ng-model=\"data.comment2\"\n        ng-model-options=\"{ debounce: 100 }\"\n        rows=\"10\" cols=\"50\"\n        rx-character-count\n        max-characters=\"25\"\n        class=\"demo-custom-max-characters\">\n      </textarea>\n    </div>\n\n    <h4>Character Count: Custom <code>low-boundary=\"250\"</code></h4>\n    <div>\n      <textarea\n        ng-model=\"data.comment3\"\n        ng-model-options=\"{ debounce: 100 }\"\n        rows=\"10\" cols=\"50\"\n        rx-character-count\n        low-boundary=\"250\"\n        class=\"demo-custom-low-boundary\">\n      </textarea>\n    </div>\n\n    <h4>Character Count: Count leading and trailing spaces</h4>\n    <div>\n      <textarea\n        ng-model=\"data.comment4\"\n        ng-model-options=\"{ debounce: 100 }\"\n        rows=\"10\" cols=\"50\"\n        rx-character-count\n        ng-trim=\"false\"\n        class=\"demo-custom-do-not-trim\">\n      </textarea>\n    </div>\n\n    <h4>Character Count: Accounts for initial values</h4>\n    <div>\n      <textarea\n        ng-model=\"data.comment5\"\n        ng-model-options=\"{ debounce: 100 }\"\n        rows=\"10\" cols=\"50\"\n        rx-character-count\n        class=\"demo-initial-value\">\n      </textarea>\n    </div>\n\n    <h4>Character Count: With highlighting</h4>\n    <div>\n      <textarea\n        ng-model=\"data.comment6\"\n        ng-model-options=\"{ debounce: 100 }\"\n        rows=\"10\" cols=\"50\"\n        rx-character-count\n        highlight=\"true\"\n        max-characters=\"10\"\n        class=\"demo-highlighting\">\n      </textarea>\n    </div>\n  </div>\n</rx-debug>\n<!-- END: rxCharacterCount -->\n\n<h3><rx-permalink>Disabled State</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    When an input is disabled, styles are automatically applied to\n    gray out the field with a \"not-allowed\" pointer style.\n  </li>\n  <li>\n    When label rules (seen above) are applied correctly to a radio,\n    checkbox, or toggle switch, the label will also be styled.\n  </li>\n</ul>\n<rx-example name=\"forms.disabled\"></rx-example>\n\n<!-- BEGIN: rxDatePicker -->\n<h3>\n  <rx-permalink>Date Picker</rx-permalink>\n  <a class=\"button xs inline\" href=\"ngdocs/index.html#/api/elements.directive:rxDatePicker/\">View API</a>\n  <!-- (NOTE) stability: 'PROTOTYPE' -->\n</h3>\n<rx-notification type=\"info\">\n  <p>\n    This element is designed to be used in conjunction with other picker\n    elements to compose a valid ISO 8601 DateTime string in the format of\n    <code>YYYY-MM-DDTHH:mmZ</code>.\n  </p>\n</rx-notification>\n\n<ul class=\"list\">\n  <li>\n    This element will generate a <strong>String</strong> in the format of\n    <code>YYYY-MM-DD</code> to be used as the date portion of the ISO 8601\n    standard DateTime string mentioned above.\n  </li>\n  <li>\n    This element will never generate anything other than a String.\n  </li>\n</ul>\n\n<h4>Simple Example</h4>\n<p>\n  Sometimes, a form may need to prepopulate a value for Date Picker. The\n  example below shows how the element behaves when its model is defaulted\n  to today's date.  When a different date is selected, a gray circle around\n  the current date provides additional context to users as they find their\n  selection in the date picker.\n</p>\n<rx-example name=\"datePicker.simple\"></rx-example>\n\n<h4>Behavior with Empty Model</h4>\n<p>\n  A typical use case is to use rxDatePicker without a default value set. The\n  example below shows how it will behave if you have a blank (empty string) or\n  undefined value for your model.\n</p>\n<rx-example name=\"datePicker.empty\"></rx-example>\n\n<h4>Date Picker States</h4>\n<p>\n  Below you'll find examples of how <code>Date Picker</code> will appear in\n  different states.\n</p>\n<table ng-controller=\"datePickerDocsCtrl\">\n  <thead>\n    <th></th>\n    <th>Enabled</th>\n    <th>Disabled</th>\n  </thead>\n  <tbody>\n    <tr>\n      <th>Valid</th>\n      <td>\n        <rx-date-picker\n          id=\"dpEnabledValid\"\n          ng-model=\"enabledValid\">\n        </rx-date-picker>\n      </td>\n      <td>\n        <rx-date-picker\n          id=\"dpDisabledValid\"\n          ng-disabled=\"true\"\n          ng-model=\"disabledValid\">\n        </rx-date-picker>\n      </td>\n    </tr>\n    <tr>\n      <th>Invalid</th>\n      <td>\n        <rx-date-picker\n          id=\"dpEnabledInvalid\"\n          always-invalid\n          ng-model=\"enabledInvalid\">\n        </rx-date-picker>\n      </td>\n      <td>\n        <rx-date-picker\n          id=\"dpDisabledInvalid\"\n          ng-disabled=\"true\"\n          always-invalid\n          ng-model=\"disabledInvalid\">\n        </rx-date-picker>\n      </td>\n    </tr>\n  </tbody>\n</table>\n<!-- END: rxDatePicker -->\n\n<!-- BEGIN: rxTimePicker -->\n<h3>\n  <rx-permalink>Time Picker</rx-permalink>\n  <a class=\"button xs inline\" href=\"ngdocs/index.html#/api/elements.directive:rxTimePicker/\">View API</a>\n  <!-- (NOTE) stability: 'PROTOTYPE' -->\n</h3>\n<rx-notification type=\"info\">\n  <p>\n    This element is designed to be used in conjunction with other picker\n    elements to compose a valid ISO 8601 DateTime string in the format of\n    <code>YYYY-MM-DDTHH:mmZ</code>.\n  </p>\n</rx-notification>\n\n<ul class=\"list\">\n  <li>\n    This element will generate a <strong>String</strong> in the format of\n    <code>HH:mmZ</code> to be used as the time portion of the ISO 8601\n    standard DateTime string mentioned above.\n    <ul>\n      <li><code>HH</code> is the 24-hour format from 00 to 23</li>\n      <li><code>mm</code> is the minutes from 00 to 59</li>\n      <li><code>Z</code> is the UTC offset that matches <code>[-+]\\d{2}:\\d{2}</code></li>\n    </ul>\n  </li>\n  <li>\n    This element will never generate anything other than a String.\n  </li>\n</ul>\n\n<h4>Simple Example</h4>\n<rx-example name=\"timePicker.simple\"></rx-example>\n\n<h4>Time Picker States</h4>\n<p>\n  Below you'll find examples of how <code>Time Picker</code> will appear in\n  different states.\n</p>\n<table ng-controller=\"timePickerDocsCtrl\">\n  <thead>\n    <th></th>\n    <th>Enabled</th>\n    <th>Disabled</th>\n  </thead>\n  <tbody>\n    <tr>\n      <th>Valid</th>\n      <td>\n        <rx-time-picker\n          id=\"tpEnabledValid\"\n          ng-disabled=\"false\"\n          ng-model=\"enabledValid\">\n        </rx-time-picker>\n      </td>\n      <td>\n        <rx-time-picker\n          id=\"tpDisabledValid\"\n          ng-disabled=\"true\"\n          ng-model=\"disabledValid\">\n        </rx-time-picker>\n      </td>\n    </tr>\n    <tr>\n      <th>Invalid</th>\n      <td>\n        <rx-time-picker\n          id=\"tpEnabledInvalid\"\n          always-invalid\n          ng-disabled=\"false\"\n          ng-model=\"enabledInvalid\">\n        </rx-time-picker>\n      </td>\n      <td>\n        <rx-time-picker\n          id=\"tpDisabledInvalid\"\n          ng-disabled=\"true\"\n          always-invalid\n          ng-model=\"disabledInvalid\">\n        </rx-time-picker>\n      </td>\n    </tr>\n  </tbody>\n</table>\n<!-- END: rxTimePicker -->\n\n<h3><rx-permalink>Simple Controls</rx-permalink></h3>\n\n<h4><rx-permalink>Text Inputs</rx-permalink></h4>\n<p>\n  Three <code>rx-field</code> elements each consume between 250px and 1/3 of the width.\n</p>\n<rx-example name=\"forms.simple\"></rx-example>\n\n<h4><rx-permalink>Text Area</rx-permalink></h4>\n<ul class=\"list\">\n  <li>\n    Please see the example below for implementing a textarea input.\n  </li>\n  <li>\n    <code>rows</code> attribute can used to set the default number of rows in textarea,\n    if input limit exceeds it will apply auto-scroll feature.\n  </li>\n  <li>\n    One <code>rx-field</code> element consumes the full width.\n  </li>\n</ul>\n<rx-example name=\"forms.textarea\"></rx-example>\n\n<h3><rx-permalink>Intermediate Controls</rx-permalink></h3>\n<p>\n  Two <code>rx-field</code> elements each consume between 250px and 1/2 of the width.\n</p>\n<rx-example name=\"forms.intermediatecontrols\"></rx-example>\n\n<h4><rx-permalink>Drop-Down Selection</rx-permalink></h4>\n<p>\n  For drop-down selections, two options are available: a drop-down\n  that only permits a single selection, or a drop-down that allows\n  the user to make multiple selections.\n</p>\n<rx-example name=\"forms.dropdown\"></rx-example>\n\n<h4><rx-permalink>Input Groups</rx-permalink></h4>\n<rx-example name=\"forms.inputgroups\"></rx-example>\n\n<h3><rx-permalink>Option Tables</rx-permalink></h3>\n<p>\n  The rxOptionTable component provides functionality to create a series\n  of radio or checkbox inputs within a table.\n</p>\n\n<h4><rx-permalink>Radio Option Tables</rx-permalink></h4>\n<rx-example name=\"forms.radioOptionTable\"></rx-example>\n\n<h4><rx-permalink>Checkbox Option Tables</rx-permalink></h4>\n<rx-example name=\"forms.checkboxOptionTable\"></rx-example>\n\n<h4><rx-permalink>Empty Option Tables</rx-permalink></h4>\n<rx-example name=\"forms.emptyOptionTable\"></rx-example>\n\n<h3><rx-permalink>Advanced Controls</rx-permalink></h3>\n<rx-example name=\"forms.advancedcontrols\"></rx-example>\n\n<h4><rx-permalink>Advanced Text Area</rx-permalink></h4>\n<p>\n  Text areas can utilize multiple features simultaneously. In the following\n  example, the text area is a required field, has a character counter\n  applied, and shows help text.\n</p>\n<rx-example name=\"forms.advancedtextarea\"></rx-example>\n\n<h3><rx-permalink>Form Actions</rx-permalink></h3>\n<p>\n  At the end of each form, the user should be presented with a cancel button and a submit button. The\n  submit button should appear on the left, the cancel button to the right.\n  Submit button text should be as specific as possible to reinforce for the user\n  what change they are about to make. For example, \"Update Server\" is better than a general \"Submit\".\n</p>\n<rx-example name=\"forms.formactions\"></rx-example>\n\n<h2><rx-permalink>Saving Form Data</rx-permalink></h2>\n\n<h3><rx-permalink>Saving In-Progress Form State</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    Saving a form state can help with user experience. You can use rxAutoSave\n    to activate this feature.\n  </li>\n  <li>\n    rxAutoSave interacts exclusively with your model layer. Your UI/template\n    code will be unaware that its state is being saved.\n  </li>\n  <li>\n    See <a href=\"#/utilities/rxAutoSave\">rxAutoSave</a> for further details.\n  </li>\n</ul>\n<rx-example name=\"forms.autoSave\"></rx-example>\n\n<h3><rx-permalink>Manual Form Saving</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    If you require form data to be completed before submitting, or require\n    interactive form experiences, a conditional save button and notification\n    is used.\n  </li>\n  <li>\n    The notification should only be shown after a change has been made to the\n    form, not on page load.\n  </li>\n  <li>\n    The subtitle of the page should indicate when the form was last saved and\n    contain the save button.\n  </li>\n</ul>\n<rx-example name=\"forms.manualSave\"></rx-example>\n\n<h3>\n  <rx-permalink>Search Box</rx-permalink>\n  <a class=\"button xs inline\" href=\"ngdocs/index.html#/api/elements.directive:rxSearchBox/\">View API</a>\n</h3>\n<p>The rxSearchBox directive provides functionality around creating a search input box.</p>\n\n<h3>Simple Search Box</h3>\n<rx-example name=\"searchBox.simple\"></rx-example>\n\n<h3>Custom Placeholder</h3>\n<p>\n  You can use the <code>rx-placeholder</code> attribute to customize the placeholder text.\n</p>\n<rx-example name=\"searchBox.custom\"></rx-example>\n\n<h3>Disabled Search Box</h3>\n<rx-example name=\"searchBox.disabled\"></rx-example>\n\n<h2><rx-permalink>Design Patterns within Encore</rx-permalink></h2>\n<ul class=\"list\">\n  <li>\n    Forms can be used on their own page. You can see this in Encore when\n    you create a new object such as a Cloud Server or a Database under\n    Encore Cloud.\n  </li>\n  <li>\n    Forms are also used within modals. You can see this when modifying\n    content that requires form fields such as actions performed on a Cloud\n    Server instance.\n  </li>\n  <li>\n    You can use <a href=\"#/layout/wells\">Wells</a> to create additional\n    context for the form.\n  </li>\n</ul>\n\n<h2><rx-permalink>UI Roadmap / Possible Future-work</rx-permalink></h2>\n<ul class=\"list\">\n  <li>\n    Fleshing out a design pattern for edit states.\n    <ul>\n      <li>\n        Up until now, the editing of content has been relegated to using\n        modals to edit individual line items. As a result, different\n        products have handled the concept of an edit state differently.\n      </li>\n      <li>\n        There should be conformity for this, but we have not designed a\n        user pattern yet.\n      </li>\n    </ul>\n  </li>\n</ul>\n",
            "less": ""
        }
    },
    {
        "displayName": "Info Panel",
        "stability": "stable",
        "description": "This is a generic info panel for use at the top of pages",
        "api": "directive:rxInfoPanel",
        "keywords": [
            "info",
            "panel",
            "rxInfoPanel"
        ],
        "name": "InfoPanel",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/elements/InfoPanel/scripts/rxInfoPanel.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/InfoPanel/templates/rxInfoPanel.html"
        ],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  This is a generic info panel intended for use at the top of pages.\n</p>\n\n<rx-example name=\"infopanel.simple\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "Links",
        "stability": "stable",
        "description": "Usage and examples of different link and status message patterns.",
        "hasApi": false,
        "keywords": [
            "action link",
            "create link",
            "delete link",
            "destroy link",
            "edit link",
            "link",
            "page action",
            "pending link",
            "reserved",
            "spinner link",
            "update link"
        ],
        "name": "Links",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "isCategory": false,
        "srcFiles": [],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<h2><rx-permalink>Link Types</rx-permalink></h2>\n<h3 class=\"clear\"><rx-permalink>Action Link Icons</rx-permalink></h3>\n<p>\n  To visualize and distinguish actionable items, you can use the included\n  <a href=\"https://fortawesome.github.io/Font-Awesome/\" target=\"_blank\">\n    Font Awesome\n  </a>\n  library. Iconography with action links remains unique to one action (with\n  the exception of \"create\", \"delete\", \"change\", \"edit\", and \"go to\" actions,\n  which use the same icons in many places regardless of context). However, in\n  the case of two opposite actions that you can take on a single unit (for\n  example, choosing to enable connection throttling on a load balancer when\n  throttling is disabled, or disabling throttling when throttling is enabled),\n  then the same icon and color can be used. In the case of opposite actions,\n  only one action should display at a time, depending on the state. Any\n  \"enable\" or \"disable\" actions should be yellow in color, as they're causing\n  changes to something rather than creating something new (green) or\n  destroying something (red).\n</p>\n<p>\n  For the majority of Encore, actionable links are used in two places &mdash;\n  in the upper right hand section of a details page, flushed right with the\n  page-actions and actions-area classes, or in the rxActionMenu directive.\n</p>\n<p>\n  The following icons have been used throughout Encore, as well as the actions\n  associated with the icons. Use this as a reference for which icons are\n  already in use and should not be duplicated.\n</p>\n<p>\n  <strong>HEADS UP:</strong> Most icons have been chosen based on the verb (Add ,Edit, Delete,\n  Restart, etc) but there are a couple of icons chosen on the noun (consoles,\n  tachometers for throttling). This is a design pattern discrepancy that will\n  need to be resolved in a future iteration.\n</p>\n\n<rx-example name=\"link.icons.reserved\"></rx-example>\n\n<h3><rx-permalink>Types &amp; Colors</rx-permalink></h3>\n<p>\n  Status Classes are used to provide a clearer status regarding a simple\n  message. Within the context of Encore, the following colors are used\n  to convey action links:\n</p>\n<h4><rx-permalink>Create/Add Actions</rx-permalink></h4>\n<p>\n  Green (<code>.msg-action</code>) is for create/add actions.\n  When part of a list, they appear at the top.\n</p>\n<rx-example name=\"link.colors.create\"></rx-example>\n<h4><rx-permalink>Download Actions</rx-permalink></h4>\n<p>\n  Blue (<code>.msg-info-blue</code>) is for download actions.\n  When part of a list, they appear second.\n</p>\n<rx-example name=\"link.colors.download\"></rx-example>\n<h4><rx-permalink>Edit/Modify Actions</rx-permalink></h4>\n<p>\n  Orange (<code>.msg-info</code>) is for edit/modify actions.\n  When part of a list, they appear third.\n</p>\n<rx-example name=\"link.colors.modify\"></rx-example>\n<h4><rx-permalink>Destructive Actions</rx-permalink></h4>\n<p>\n  Red (<code>.msg-warn</code>) is for destructive actions.\n  When part of a list, they appear last.\n</p>\n<rx-example name=\"link.colors.destructive\"></rx-example>\n\n<h3><rx-permalink>Links with Spinners</rx-permalink></h3>\n<p>\n  You can use a spinner style for action links. Different spinner styles are\n  available when a user takes action by clicking a button\n  (see <a href=\"#/elements/Buttons\">Buttons Demo Page</a>).\n</p>\n<p>\n  When an action link must first fetch data or determine state before the user\n  can click it, a spinner is shown to the right of the action link, and both\n  spinner and link have a disabled gray color and are not clickable.\n</p>\n<p>\n  <strong>HEADS UP:</strong> The spinner with action link is being styled on a per-project\n  basis currently, since the current implementation of <code>rxSpinner</code> needs to be\n  updated to support this use case more easily.\n</p>\n<rx-example name=\"link.spinner\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "Lists",
        "stability": "stable",
        "description": "Usage and examples of different List patterns.",
        "hasApi": false,
        "keywords": [
            "bulleted",
            "list",
            "numbered",
            "ordered",
            "unordered"
        ],
        "name": "Lists",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "isCategory": false,
        "srcFiles": [],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<h2><rx-permalink>List Types</rx-permalink></h2>\n<ul class=\"list\">\n  <li>\n    Lists by default do not have styles. You can add\n    bullets/decimals to lists with the <code>.list</code> class.\n    It is also possible to build non-semantic lists using the\n    additional <code>.item</code> class.\n  </li>\n  <li>\n    <span class=\"msg-info\">ENCORE-SPECIFIC:</span>\n    Use this in conjunction with icons, colors and helper classes\n    such as <code>.flush-right</code> to build out action menus.\n    Look at the detail pages in Cloud Servers and view-source\n    for additional context.\n  </li>\n</ul>\n<rx-example name=\"typography.lists\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "Metadata",
        "stability": "stable",
        "description": "Metadata contains directives to provide consistent styling for the display of metadata information",
        "hasApi": false,
        "keywords": [
            "description",
            "metadata",
            "rxMeta",
            "rxMetadata"
        ],
        "name": "Metadata",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "isCategory": false,
        "srcFiles": [
            "src/elements/Metadata/scripts/rxMeta.js",
            "src/elements/Metadata/scripts/rxMetadata.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/Metadata/templates/rxMeta.html"
        ],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('metadataSimpleExampleCtrl', function ($scope) {\n    $scope.someDate = new Date('January 6 1989');\n    $scope.someAmount = 192.68;\n});\n",
            "html": "<p>\n  Metadata contains directives to provide consistent styling for the display of\n  metadata information.\n</p>\n\n<rx-example name=\"metadata.simple\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "Modals",
        "stability": "stable",
        "description": "",
        "api": "directive:rxModalAction",
        "keywords": [
            "form",
            "modal",
            "rxModalAction",
            "window"
        ],
        "name": "Modals",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/elements/Modals/scripts/rxModalAction.js",
            "src/elements/Modals/scripts/rxModalFooter.js",
            "src/elements/Modals/scripts/rxModalForm.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/Modals/templates/rxModalAction.html",
            "templates/Modals/templates/rxModalActionForm.html",
            "templates/Modals/templates/rxModalFooters.html"
        ],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('modalMultiViewCtrl', function ($scope, $modalInstance, $timeout, rxNotify) {\n    var complete = function () {\n        $scope.loaded = true;\n        $scope.setState('complete');\n        rxNotify.add('Operation Success!', {\n            stack: 'modal',\n            type: 'success'\n        });\n    };\n\n    $scope.submit = function () {\n        $scope.setState('confirm');\n    };\n\n    $scope.confirm = function () {\n        $scope.loaded = false;\n        $scope.setState('pending');\n        rxNotify.add('Performing Operation...', {\n            stack: 'modal',\n            loading: true,\n            dismiss: [$scope, 'loaded']\n        });\n        $timeout(complete, 2000);\n    };\n\n    $scope.cancel = function () {\n        rxNotify.clear('modal');\n\n        /*\n         * You may place custom dismiss logic here,\n         * if you do not wish to use a `dismiss-hook` function.\n         **/\n\n        // This must be called to dismiss the modal.\n        $modalInstance.dismiss();\n    };\n});\n\nangular.module('demoApp')\n.controller('modalRegularCtrl', function ($scope, rxNotify) {\n    $scope.password = 'guest';\n\n    $scope.populate = function (modalScope) {\n        modalScope.user = 'hey_dude';\n    };\n\n    $scope.changePass = function (fields) {\n        $scope.password = fields.password;\n        rxNotify.add('Password Updated!', {\n            type: 'success'\n        });\n    };\n\n    $scope.notifyDismissal = function () {\n        rxNotify.add('Password Unchanged', {\n            type: 'info'\n        });\n    };\n});\n",
            "html": "<p>\n  The Modal component provides a hook to open and perform operations on a modal window.\n</p>\n\n<h3><rx-permalink>Regular Modals</rx-permalink></h3>\n<p>\n  Use modals whenever a user needs to take an action that needs their\n  attention, or you want to interrupt a user's current task to redirect a\n  user's full attention to something more important.\n</p>\n<rx-example name=\"modals.regular\"></rx-example>\n\n<h3><rx-permalink>Multi-View Modals</rx-permalink></h3>\n<p>\n  A multi-view modal breaks apart complex interactions so modal content\n  isn't too long. Multi-view modals also work well when the user must\n  complete multiple sequential steps.\n</p>\n<p>\n  It works for cases when removing or deleting something needing a\n  confirmation click, such as \"Are You Sure you want to Remove this?\"\n</p>\n<rx-example name=\"modals.multiView\"></rx-example>\n\n<h3><rx-permalink>Disabled Modal</rx-permalink></h3>\n<rx-example name=\"modals.disabled\"></rx-example>\n\n<h3><rx-permalink>Delete Modal</rx-permalink></h3>\n<h4>Design Patterns within Encore</h4>\n<ul class=\"list\">\n  <li>\n    When should you use modals instead of a new page?\n    <ul class=\"list\">\n      <li>\n        According to Bootstrap, \"Modals are streamlined, but flexible,\n        dialog prompts with the minimum required functionality and smart\n        defaults.\"\n      </li>\n      <li>\n        In Encore, you should use modals for confirmation messaging. For\n        notifications you will use rxNotification, which is the static\n        subdirective of rxNotify. See the example below which uses\n        <code>type=\"error\"</code>. <code>type=\"error\"</code> can be\n        replaced with the appropriate message response style.\n      </li>\n      <li>\n        You also can use modals to edit content in lieu of having an edit\n        view. This design pattern is not ideal. An Edit View will need to\n        be considered as a pattern in future iterations.\n      </li>\n    </ul>\n  </li>\n  <li>\n    Using the rxModalForm subdirective will automatically provide you with\n    a title, subtitle, submit and cancel text. You can use rxForm elements\n    within rxModalForm.\n  </li>\n  <li>\n    For real world examples, take a look at the\n    <a href=\"https://github.com/rackerlabs/encore-cloud-ui/blob/master/app/views/servers/templates/server-actions.html\">\n      ng-template blocks triggered from server action links\n    </a>\n    under Encore Cloud.\n  </li>\n  <li>\n    If you need to deviate from the title / footer pattern at all, you'll\n    need to take a look at the\n    <a href=\"https://github.com/rackerlabs/encore-ui/blob/master/src/elements/Modals/templates/rxModalActionForm.html\">\n      rxModalForm directive template markup\n    </a>\n    and build upon that.\n  </li>\n</ul>\n<rx-example name=\"modals.delete\"></rx-example>\n\n<div class=\"example-case do\">\n  <h4>DO</h4>\n  <ul class=\"list\">\n    <li>Do use modals to perform actions requiring the users full attention.</li>\n  </ul>\n</div>\n\n<div class=\"example-case avoid\">\n  <h4>DON'T</h4>\n  <ul class=\"list\">\n    <li>\n      Don't display a modal without an action button, or a way to close the modal by closing the modal via X or pressing the Cancel button.\n    </li>\n    <li>Don't use modals as pop-ups, having them appear without the user clicking something</li>\n    <li>Don't use modals referring to information on the originating page</li>\n    <li>Don't use a modal to display a set of info or metadata without any direct actions</li>\n  </ul>\n</div>\n",
            "less": ""
        }
    },
    {
        "displayName": "Notifications",
        "stability": "stable",
        "description": "Manages page messages for an application.",
        "hasApi": false,
        "keywords": [
            "error",
            "feedback",
            "help",
            "notification",
            "rxNotifications",
            "rxNotification",
            "rxNotify"
        ],
        "name": "Notifications",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "isCategory": false,
        "srcFiles": [
            "src/elements/Notifications/scripts/rxNotification.js",
            "src/elements/Notifications/scripts/rxNotifications.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/Notifications/templates/rxNotification.html",
            "templates/Notifications/templates/rxNotifications.html"
        ],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('notificationsRouteCtrl', function ($rootScope, $scope, rxNotify) {\n\n    $scope.routeChange = function (stack) {\n        $rootScope.$broadcast('$routeChangeStart', {});\n        $rootScope.$broadcast('$routeChangeSuccess', {});\n\n        rxNotify.add('Route Changed', {\n            stack: stack\n        });\n    };\n\n});\n\nangular.module('demoApp')\n.controller('notificationsStackCtrl', function ($rootScope, $scope, $window, rxNotify) {\n    $scope.message = 'My message';\n\n    $scope.types = [ 'info', 'success', 'warning', 'error' ];\n\n    $scope.options = {\n        type: 'info',\n        timeout: -1,\n        show: 'immediate',\n        repeat: true\n    };\n\n    $scope.ondismiss = {\n        should: false,\n        method: function (msg) {\n            $window.alert('We are dismissing the message: ' + msg.text);\n        }\n    };\n\n    $scope.add = function (stack) {\n        var messageOptions = _.clone($scope.options);\n\n        if ($scope.ondismiss.should) {\n            messageOptions.ondismiss = $scope.ondismiss.method;\n        }\n\n        messageOptions.stack = stack;\n\n        rxNotify.add($scope.message, messageOptions);\n    };\n\n    // add a default messages (to custom stack so they don't show on the main page)\n    rxNotify.add('Helpful Information', {\n        stack: 'demo'\n    });\n    rxNotify.add('Loading', {\n        loading: true,\n        stack: 'demo'\n    });\n    rxNotify.add('You did it!', {\n        type: 'success',\n        stack: 'demo'\n    });\n    rxNotify.add('Careful now...', {\n        type: 'warning',\n        stack: 'demo'\n    });\n    rxNotify.add('Under Attack by Aliens', {\n        type: 'error',\n        stack: 'custom'\n    });\n\n});\n",
            "html": "<p>\n  The Notifications component provides status message notifications on a page.\n</p>\n\n<h2><rx-permalink>Simple Notifications</rx-permalink></h2>\n<rx-example name=\"notifications.simple\"></rx-example>\n\n<h2><rx-permalink>Custom Stack Notifications</rx-permalink></h2>\n<rx-example name=\"notifications.customStack\"></rx-example>\n\n<h2><rx-permalink>Stack Notifications</rx-permalink></h2>\n<rx-example name=\"notifications.stack\"></rx-example>\n\n<h2><rx-permalink>Route Notifications</rx-permalink></h2>\n<rx-example name=\"notifications.route\"></rx-example>\n\n<h2><rx-permalink>Promise Notifications</rx-permalink></h2>\n<p>Please see <a href=\"#/utilities/rxPromiseNotifications\">rxPromiseNotifications</a> demo.</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "Progress Bars",
        "stability": "prototype",
        "description": "Provides feedback on the progress of a workflow or action",
        "api": "directive:rxProgressbar",
        "keywords": [
            "bar",
            "load",
            "loading",
            "progress",
            "progressbar",
            "rxProgressbar"
        ],
        "name": "Progressbar",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/elements/Progressbar/scripts/rxProgressbar.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/Progressbar/templates/rxProgressbar.html"
        ],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n    .controller('progressbarDynamicCtrl', function ($scope) {\n        $scope.value = 22;\n        $scope.max = 100;\n    });\n",
            "html": "<p>\n  Element used to provide feedback on the progress of a workflow or action.\n</p>\n\n\n<h3>Static Progressbars</h3>\n<ul class=\"list\">\n  <li>\n    There are two states for progress bars:\n    <ul>\n      <li>Active progress bars have animated stripes.</li>\n      <li>Full progress bars are solid and static in appearance.</li>\n    </ul>\n  </li>\n  <li>\n    Several options for displaying text with a progress bar are\n    available:\n    <ul>\n      <li>No Text</li>\n      <li>Percentage (not italicized)</li>\n      <li>Detailed Text (italicized)</li>\n    </ul>\n  </li>\n  <li>\n    Always try to show a percentage. Your focus should be to enter specific\n    text, since it reveals both numeric progress and provides context for\n    what progress is being tracked.\n    See demo below.\n  </li>\n</ul>\n<rx-example name=\"progressbar.simple\"></rx-example>\n\n\n<h3>Dynamic Progressbars</h3>\n<p>\n  Progressbars can also be controlled dynamically via model values.\n</p>\n<rx-example name=\"progressbar.dynamic\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "Spinners",
        "stability": "stable",
        "description": "Adds a spinner icon to any element",
        "api": "directive:rxSpinner",
        "keywords": [
            "button",
            "label",
            "loading",
            "progress",
            "pending",
            "rxSpinner",
            "spinner"
        ],
        "name": "Spinner",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/elements/Spinner/scripts/rxSpinner.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('spinnerSimpleCtrl', function ($scope) {\n    $scope.loading = true;\n});\n",
            "html": "<p>\n  A component adds a spinner icon to any element\n</p>\n\n<rx-example name=\"spinner.simple\"></rx-example>",
            "less": ""
        }
    },
    {
        "displayName": "Tables",
        "stability": "stable",
        "description": "Usage and examples of different Table patterns.",
        "hasApi": false,
        "keywords": [
            "actions",
            "bulk",
            "checkbox",
            "column",
            "dropdown",
            "filter",
            "filtering",
            "floating",
            "floating header",
            "form",
            "header",
            "input",
            "nested",
            "nested content",
            "nested metadata",
            "nested table",
            "null data",
            "option table",
            "paginate",
            "paginated",
            "pagination",
            "row",
            "rxBulkSelect",
            "rxFloatingHeader",
            "rxLoadingOverlay",
            "rxPaginate",
            "rxSelectFilter",
            "rxSortableColumn",
            "rxStatusColumn",
            "search",
            "select",
            "sort",
            "sortable",
            "sorting",
            "status",
            "status column",
            "striped",
            "table"
        ],
        "name": "Tables",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "isCategory": false,
        "srcFiles": [
            "src/elements/Tables/scripts/rxBatchActions.js",
            "src/elements/Tables/scripts/rxBulkSelect.js",
            "src/elements/Tables/scripts/rxBulkSelectHeaderCheck.js",
            "src/elements/Tables/scripts/rxBulkSelectMessage.js",
            "src/elements/Tables/scripts/rxBulkSelectRow.js",
            "src/elements/Tables/scripts/rxBulkSelectValidate.js",
            "src/elements/Tables/scripts/rxFloatingHeader.js",
            "src/elements/Tables/scripts/rxLoadingOverlay.js",
            "src/elements/Tables/scripts/rxPaginate.js",
            "src/elements/Tables/scripts/rxSelectFilter.js",
            "src/elements/Tables/scripts/rxSortableColumn.js",
            "src/elements/Tables/scripts/rxStatusColumn.js",
            "src/elements/Tables/scripts/rxStatusHeader.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/Tables/templates/rxBatchActions.html",
            "templates/Tables/templates/rxBulkSelectMessage.html",
            "templates/Tables/templates/rxPaginate.html",
            "templates/Tables/templates/rxSelectFilter.html",
            "templates/Tables/templates/rxSortableColumn.html",
            "templates/Tables/templates/rxStatusColumn.html"
        ],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('bulkSelectAdvancedCtrl', function ($scope) {\n\n    $scope.datacenters = [\n        { name: 'ORD1', city: 'Chicago' },\n        { name: 'DFW1', city: 'Grapevine' },\n        { name: 'DFW2', city: 'Richardson' },\n        { name: 'IAD2', city: 'Ashburn' },\n        { name: 'IAD3', city: 'Ashburn' },\n        { name: 'LON1', city: 'West Drayton' },\n        { name: 'LON3', city: 'Berkshire' },\n        { name: 'LON5', city: 'Crawley' },\n        { name: 'HKG1', city: 'Hong Kong' },\n        { name: 'SYD2', city: 'Sydney' }\n    ];\n\n    // cloned to avoid interference with first demo table\n    $scope.validateDatacenters = _.cloneDeep($scope.datacenters);\n\n    $scope.filter = { keyword: '' };\n\n    $scope.getSelectedDatacenters = function () {\n        return _.cloneDeep(_.filter($scope.datacenters, { rowIsSelected: true }));\n    };\n\n})\n.controller('shutDownDatacentersCtrl', function ($scope, $modalInstance, $timeout, rxSortUtil, rxPageTracker) {\n    $scope.sort = rxSortUtil.getDefault('name');\n    $scope.sortCol = function (predicate) {\n        return rxSortUtil.sortCol($scope, predicate);\n    };\n\n    var itemsPerPage = 8;\n    $scope.pager = rxPageTracker.createInstance({ itemsPerPage: itemsPerPage });\n    $scope.showPagination = itemsPerPage < $scope.selectedDatacenters.length;\n\n    $scope.removeDatacenter = function (dc) {\n        _.remove($scope.selectedDatacenters, dc);\n    };\n\n    $scope.submit = function () {\n        $scope.setState('working');\n\n        $scope.numCompleted = 0;\n\n        var delay = 1000;\n        $scope.selectedDatacenters.forEach(function (dc, i) {\n            $timeout(function () {\n                dc.status = 'pending';\n            }, i * delay);\n            $timeout(function () {\n                dc.status = i % 4 === 0 ? 'failure' : 'success';\n                $scope.numCompleted++;\n            }, ++i * delay);\n        });\n        $timeout(function () {\n            $scope.setState('complete');\n            $scope.errorsPresent = _.some($scope.selectedDatacenters, { status: 'failure' });\n        }, $scope.selectedDatacenters.length * delay);\n    };\n\n    $scope.cancel = $modalInstance.dismiss;\n});\n\nangular.module('demoApp')\n.controller('bulkSelectValidateCtrl', function ($scope) {\n\n    $scope.datacenters = [\n        { name: 'ORD1', city: 'Chicago' },\n        { name: 'DFW1', city: 'Grapevine' },\n        { name: 'DFW2', city: 'Richardson' },\n        { name: 'IAD2', city: 'Ashburn' },\n        { name: 'IAD3', city: 'Ashburn' },\n        { name: 'LON1', city: 'West Drayton' },\n        { name: 'LON3', city: 'Berkshire' },\n        { name: 'LON5', city: 'Crawley' },\n        { name: 'HKG1', city: 'Honk Kong' },\n        { name: 'SYD2', city: 'Sydney' }\n    ];\n\n    // cloned to avoid interference with first demo table\n    $scope.validateDatacenters = _.cloneDeep($scope.datacenters);\n\n    $scope.filter = { keyword: '' };\n\n    $scope.getSelectedDatacenters = function () {\n        return _.cloneDeep(_.where($scope.datacenters, { rowIsSelected: true }));\n    };\n\n})\n.controller('shutDownDatacentersCtrl', function ($scope, $modalInstance, $timeout, rxSortUtil, rxPageTracker) {\n    $scope.sort = rxSortUtil.getDefault('name');\n    $scope.sortCol = function (predicate) {\n        return rxSortUtil.sortCol($scope, predicate);\n    };\n\n    var itemsPerPage = 8;\n    $scope.pager = rxPageTracker.createInstance({ itemsPerPage: itemsPerPage });\n    $scope.showPagination = itemsPerPage < $scope.selectedDatacenters.length;\n\n    $scope.removeDatacenter = function (dc) {\n        _.remove($scope.selectedDatacenters, dc);\n    };\n\n    $scope.submit = function () {\n        $scope.setState('working');\n\n        $scope.numCompleted = 0;\n\n        var delay = 1000;\n        $scope.selectedDatacenters.forEach(function (dc, i) {\n            $timeout(function () {\n                dc.status = 'pending';\n            }, i * delay);\n            $timeout(function () {\n                dc.status = i % 4 === 0 ? 'failure' : 'success';\n                $scope.numCompleted++;\n            }, ++i * delay);\n        });\n        $timeout(function () {\n            $scope.setState('complete');\n            $scope.errorsPresent = _.some($scope.selectedDatacenters, { status: 'failure' });\n        }, $scope.selectedDatacenters.length * delay);\n    };\n\n    $scope.cancel = $modalInstance.dismiss;\n});\n\nangular.module('demoApp')\n.controller('selectFilterSimpleCtrl', function ($scope, rxSelectFilter) {\n    $scope.filter = rxSelectFilter.create({\n        properties: ['account', 'status'],\n        selected: {\n            account: ['A']\n        }\n    });\n\n    $scope.tickets = [\n        { account: 'A', status: 'NEW', description: 'A new ticket' },\n        { account: 'A', status: 'IN_PROGRESS', description: 'Fix all the bugs' },\n        { account: 'B', status: 'TRANSFERRED', description: 'Don\\'t stop believing' },\n        { account: 'B', status: 'VENDOR', description: 'Hold on to that feeling' },\n        { account: 'A', status: 'TRANSFERRED', description: 'qwertyuiop' }\n    ];\n});\n\nangular.module('demoApp')\n.controller('sortableColumnSimpleCtrl', function ($scope, rxSortUtil) {\n    $scope.sort = rxSortUtil.getDefault('name', false);\n\n    $scope.sortCol = function (predicate) {\n        return rxSortUtil.sortCol($scope, predicate);\n    };\n\n    $scope.talentPool = [\n        {\n            name: 'Andrew Yurisich',\n            jobTitle: 'Mailroom Associate IV'\n        },\n        {\n            name: 'Patrick Deuley',\n            jobTitle: 'Design Chaplain'\n        },\n        {\n            name: null,\n            jobTitle: 'Chief Mastermind'\n        },\n        {\n            jobTitle: 'Assistant Chief Mastermind'\n        },\n        {\n            name: 'Hussam Dawood',\n            jobTitle: 'Evangelist of Roger Enriquez'\n        },\n        {\n            name: 'Kerry Bowley',\n            jobTitle: 'Dev Mom'\n        },\n    ];\n});\n\nangular.module('demoApp')\n.controller('tableApiPaginationCtrl', function ($scope, $q, $timeout, $filter, rxPageTracker,\n                rxSortUtil, rxSelectFilter) {\n\n    var os = ['Ubuntu 12.04', 'Red Hat Enterprise Linux 6.4', 'CentOS 6.4', 'Ubuntu 13.04'];\n    var makeServers = function (serverCount) {\n        var servers = [];\n        for (var i = 1; i < serverCount + 1; i++) {\n            var server = {\n                id: i,\n                name: 'Server ' + i,\n                os: os[i % os.length]\n            };\n            servers.push(server);\n        }\n        return servers;\n    };\n\n    var allLazyServers = makeServers(701);\n\n    var serverInterface = {\n        getItems: function (pageNumber, itemsPerPage, params) {\n            var deferred = $q.defer();\n            var filterText = params.filterText;\n            var sortColumn = params.sortColumn;\n            var sortDirection = params.sortDirection;\n\n            if (sortColumn === 'name') {\n                sortColumn = 'id';\n            }\n\n            if (sortDirection === 'DESCENDING') {\n                sortColumn = '-' + sortColumn;\n            }\n\n            $timeout(function () {\n                var first = pageNumber * itemsPerPage;\n                var added = first + itemsPerPage;\n                var last = (added > allLazyServers.length) ? allLazyServers.length : added;\n\n                var filteredServers = $filter('filter')(allLazyServers, filterText);\n                filteredServers = $scope.osFilter.applyTo(filteredServers);\n                filteredServers = $filter('orderBy')(filteredServers, sortColumn);\n\n                // Return 100 items more than the user's `itemsPerPage`. i.e. if the\n                // user is asking for 25 items per page, return 125 in total\n                var lazyServers = filteredServers.slice(first, last + 100);\n\n                var response = {\n                    items: lazyServers,\n                    pageNumber: pageNumber,\n                    totalNumberOfItems: filteredServers.length\n                };\n\n                if (filterText === 'error') {\n                    deferred.reject();\n                } else {\n                    deferred.resolve(response);\n                }\n            }, 300);\n            return deferred.promise;\n        }\n    };\n\n    $scope.sort = rxSortUtil.getDefault('name', false);\n    $scope.sortCol = function (predicate) {\n        return rxSortUtil.sortCol($scope, predicate);\n    };\n    $scope.data = { searchText: '' };\n    $scope.clearFilter = function () {\n        $scope.data.searchText = '';\n    };\n    $scope.osFilter = rxSelectFilter.create({\n        properties: ['os'],\n        available: {\n            os: os\n        }\n    });\n    $scope.serverInterface = serverInterface;\n    $scope.pagedServers = rxPageTracker.createInstance({ itemsPerPage: 25 });\n});\n\nangular.module('demoApp')\n.controller('tableFilteringExampleCtrl', function ($scope) {\n    $scope.people = [\n        { name: 'Patrick Deuley', occupation: 'Design Chaplain' },\n        { name: 'Hussam Dawood', occupation: 'Cat Lover' },\n        { name: 'Kevin Lamping', occupation: 'Framework Father' },\n        { name: 'Glynnis Ritchie', occupation: 'Serif Sheriff' },\n        { name: 'Freddy Knuth', occupation: 'Venezuelan Hurricane' },\n        { name: 'Chris Cantu', occupation: 'Texan Tornado' },\n    ];\n});\n\nangular.module('demoApp')\n.controller('tableFilteringCollapsibleExampleCtrl', function ($scope) {\n    $scope.filter = { region: '' };\n\n    $scope.regions = [\n        { name: 'DFW', city: 'Dallas-Fort Worth' }, { name: 'ORD', city: 'Chicago' },\n        { name: 'IAD', city: 'Northern Virginia' }, { name: 'LON', city: 'London' },\n        { name: 'HKG', city: 'Hong Kong' }, { name: 'SYD', city: 'Sydney' }\n    ];\n\n    $scope.servers = [\n        { name: 'General1-1', ram: '1 GB', cpu: 1, disk: '20GB SSD', region: 'DFW' },\n        { name: 'General1-2', ram: '2 GB', cpu: 2, disk: '40GB SSD', region: 'ORD' },\n        { name: 'General1-4', ram: '4 GB', cpu: 4, disk: '80GB SSD', region: 'IAD' },\n        { name: 'General1-8', ram: '8 GB', cpu: 8, disk: '160GB SSD', region: 'LON' },\n        { name: 'I/O1-15', ram: '15 GB', cpu: 4, disk: '40GB SSD', region: 'HKG' },\n        { name: 'I/O1-30', ram: '30 GB', cpu: 8, disk: '40GB SSD', region: 'SYD' }\n    ];\n});\n\nangular.module('demoApp')\n.controller('tableFloatingHeaderCtrl', function ($scope) {\n    $scope.data = [\n        { name: 'First', value: 1 },\n        { name: 'A', value: 2 },\n        { name: 'B', value: 3 },\n        { name: 'C', value: 4 },\n        { name: 'D', value: 5 },\n        { name: 'E', value: 1 },\n        { name: 'F', value: 1 },\n        { name: 'F', value: 1 },\n        { name: 'F', value: 1 },\n        { name: 'F', value: 1 },\n        { name: 'F', value: 1 },\n        { name: 'Middle', value: 1 },\n        { name: 'F', value: 1 },\n        { name: 'F', value: 1 },\n        { name: 'F', value: 1 },\n        { name: 'F', value: 1 },\n        { name: 'G', value: 2 },\n        { name: 'H', value: 3 },\n        { name: 'I', value: 4 },\n        { name: 'J', value: 5 },\n        { name: 'K', value: 1 },\n        { name: 'Last', value: 2 }\n    ];\n});\n\nangular.module('demoApp')\n.controller('tableNestedMetadataExampleCtrl', function ($scope) {\n    $scope.people = [\n        {\n            name: 'Patrick Deuley',\n            occupation: 'Design Chaplain',\n            pet: {\n                name: 'Shelly',\n                animal: 'Turtle',\n                age: 1\n            }\n        },\n        {\n            name: 'Hussam Dawood',\n            occupation: 'Cat Lover',\n            pet: {\n                name: 'Sassy',\n                animal: 'Cat',\n                age: 6\n            }\n        }\n    ];\n});\n\nangular.module('demoApp')\n.controller('tableNestedTableExampleCtrl', function ($scope) {\n    $scope.people = [\n        {\n            name: 'Patrick Deuley',\n            occupation: 'Design Chaplain',\n            pets: [\n                {\n                    name: 'Shelly',\n                    animal: 'Turtle',\n                    age: 1\n                },\n                {\n                    name: 'Spike',\n                    animal: 'Porcupine',\n                    age: 10\n                }\n            ]\n        },\n        {\n            name: 'Hussam Dawood',\n            occupation: 'Cat Lover',\n            pets: [\n                {\n                    name: 'Sassy',\n                    animal: 'Cat',\n                    age: 6\n                }\n            ]\n        }\n    ];\n});\n\nangular.module('demoApp')\n.controller('tableStatusColumnCtrl', function ($scope, rxStatusMappings, rxSortUtil) {\n    $scope.servers = [\n        { status: 'ACTIVE', title: 'ACTIVE status' },\n        { status: 'ERROR', title: 'ERROR status' },\n        { status: 'DISABLED', title: 'DISABLED status' },\n        { status: 'DELETED', title: 'DELETED status mapped to ERROR' },\n        { status: 'UNKNOWN', title: 'UNKNOWN status mapped to ERROR' },\n        { status: 'RESCUE', title: 'RESCUE status mapped to INFO' },\n        { status: 'SUSPENDED', title: 'SUSPENDED status mapped to WARNING' },\n        { status: 'REBUILD', title: 'REBUILD status mapped to PENDING' },\n        { status: 'RESIZE', title: 'RESIZE status mapped to PENDING' },\n        { status: 'MIGRATING', title: 'MIGRATING status mapped to PENDING' },\n        { status: 'DELETING', title: 'DELETING status mapped to PENDING, using `fooApi` mapping', api: 'fooApi' }\n    ];\n\n    // We have a few different ways of adding mappings. We've tried to show them all here\n    rxStatusMappings.addGlobal({\n        'DELETING': 'PENDING'\n    });\n    rxStatusMappings.mapToInfo('RESCUE');\n    rxStatusMappings.mapToWarning('SUSPENDED');\n    rxStatusMappings.mapToPending(['REBUILD','RESIZE','MIGRATING']);\n    rxStatusMappings.mapToError(['DELETED', 'UNKNOWN']);\n    rxStatusMappings.addAPI('fooApi', { 'DELETING': 'PENDING' });\n    rxStatusMappings.mapToPending('SomeApiSpecificStatus', 'fooApi');\n    $scope.sortCol = function (predicate) {\n        return rxSortUtil.sortCol($scope, predicate);\n    };\n    $scope.sort = rxSortUtil.getDefault('status');\n});\n\nangular.module('demoApp')\n.controller('tableUiPaginationCtrl', function ($scope, rxPageTracker) {\n    $scope.pager = rxPageTracker.createInstance({ itemsPerPage: 3 });\n\n    var os = ['Ubuntu 12.04', 'Red Hat Enterprise Linux 6.4', 'CentOS 6.4', 'Ubuntu 13.04'];\n    var makeServers = function (serverCount) {\n        var servers = [];\n        for (var i = 1; i < serverCount + 1; i++) {\n            var server = {\n                id: i,\n                name: 'Server ' + i,\n                os: os[i % os.length]\n            };\n            servers.push(server);\n        }\n        return servers;\n    };\n\n    $scope.servers = makeServers(21);\n\n    $scope.removeServers = function () {\n        if ($scope.servers.length > 2) {\n            $scope.servers = $scope.servers.splice(2);\n        }\n    };\n\n    $scope.addServers = function () {\n        $scope.servers = $scope.servers.concat(makeServers(2));\n    };\n});\n",
            "html": "<h2>\n  <rx-permalink>Bulk Select</rx-permalink>\n  <a class=\"button xs inline\" href=\"ngdocs/index.html#/api/elements.directive:rxBulkSelect/\">View API</a>\n</h2>\n<p>\n  The rxBulkSelect directive is used to perform actions on multiple items\n  in a table.There are no directives provided for the modal, but it should\n  follow a few design conventions:\n</p>\n<ul class=\"list\">\n  <li>\n    The first view has a warning at the top, and a table listing the selected\n    items. The table should be paginated with 8 items per page, and items may\n    be removed via an \"X\" icon (see the Delete \"X\" action).\n  </li>\n  <li>\n    In the second view, the table has a status column with text describing\n    the state of each item, and another column with an icon to indicate\n    the state. A progressbar should be included as well as a link that\n    opens the current page in a new tab.\n  </li>\n  <li>\n    Once the process is complete a \"Return to [x]\" button should appear\n    in the footer, and the progressbar should be replaced with some text\n    indicating the process is complete.\n  </li>\n</ul>\n<rx-example name=\"bulkSelect.advanced\"></rx-example>\n\n<h3>Bulk Selection Validation</h3>\n<p>\n  To validate bulk selection in a form, use the rxBulkSelectValidate directive.\n</p>\n<rx-example name=\"bulkSelect.validate\"></rx-example>\n\n<h2>\n  <rx-permalink>Status Column</rx-permalink>\n  <a class=\"button xs inline\" href=\"ngdocs/index.html#/api/elements.directive:rxStatusColumn/\">View API</a>\n</h2>\n<p>\n  To add status columns to table rows, use the rxStatusColumn directive.\n</p>\n<rx-example name=\"table.statusColumn\"></rx-example>\n\n<h2><rx-permalink>Basic Tables</rx-permalink></h2>\n<ul class=\"list\">\n  <li>\n    Tables have default styles: regular rows have white backgrounds, while\n    headers use white text with a gray background. An additional\n    <code>.table-striped</code> class is available for alternate row striping.\n  </li>\n  <li>\n    <span class=\"msg-info\">ENCORE-SPECIFIC:</span> You can use tables to show\n    data-table related details, such as listing of objects.\n  </li>\n  <li>\n    If you need to show summary-style important pieces of metadata that aren't\n    necessarily related to each other, consider using an\n    <a href=\"#/components/rxMetadata\">rxMetadata</a> component.\n  </li>\n  <li>\n    In Support Services, some exceptions exist where it is appropriate to use\n    different table styling. See the\n    <a href=\"#/elements/tables#non-data-tables\">Non-Data based Tables</a>\n    section for more information.\n  </li>\n</ul>\n<rx-example name=\"table.basic\"></rx-example>\n\n<h2><rx-permalink>Floating Header</rx-permalink></h2>\n<ul class=\"list\">\n  <li>\n    The rxFloatingHeader directive maintains the visibility of column titles in a table\n    as a user scrolls down the page.\n  </li>\n  <li>\n    A common pattern is to include a filter with tables.\n    You can have that as part of the floating header by setting\n    it in a separate <code>&lt;tr&gt;</code> element.\n  </li>\n</ul>\n<rx-example name=\"table.floatingHeader\"></rx-example>\n\n<rx-debug>\n  <h2>Non-filtered floating header</h2>\n  <table rx-floating-header class=\"e2e-no-filter\">\n    <thead>\n      <tr>\n        <th>Column One Header</th>\n        <th>Column Two Header</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr class=\"first-row\">\n        <td>table1 data1</td>\n        <td>table1 data1</td>\n      </tr>\n      <tr>\n        <td>table1 data2</td>\n        <td>table1 data2</td>\n      </tr>\n      <tr>\n        <td>table1 data3</td>\n        <td>table1 data3</td>\n      </tr>\n      <tr class=\"middle-row\">\n        <td>table1 data4</td>\n        <td>table1 data4</td>\n      </tr>\n      <tr>\n        <td>table1 data5</td>\n        <td>table1 data5</td>\n      </tr>\n      <tr class=\"last-row\">\n        <td>table1 data6</td>\n        <td>table1 data6</td>\n      </tr>\n    </tbody>\n  </table>\n</rx-debug>\n\n<h2><rx-permalink>Directives</rx-permalink></h2>\n\n<h3><rx-permalink>Cog Menus via rxActionMenu</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    For implementation and examples, see the\n    <a href=\"#/components/rxActionMenu\">rxActionMenu</a> directive.\n  </li>\n  <li>\n    <span class=\"msg-info\">ENCORE-SPECIFIC:</span> If you need to show\n    actionable items for every row, cogs are helpful. For example: most main\n    table listings show cog menus with actionable items, such as Cloud Server\n    pages showing FirstGen/NextGen actions or Cloud Block Storage Volumes.\n  </li>\n  <li>\n    To help you choose which icons and colors to use, read more about\n    <a href=\"#/styles/links\">icons and colors here</a>.\n  </li>\n  <li>\n    There may be cases where an action is not available on a particular row.\n    In this scenario, you can disable those links using the\n    <code>.disabled</code> class.\n  </li>\n  <li>\n    The <code>.actions</code> class is used on a column header\n    (<code>th</code> tag) to add a 15px width for action cogs in the\n    table body.\n  </li>\n  <li>\n    Are you using LBaaS connection nodes or Support Service user tables?\n    There is a design exception to these tables described in the\n    <a href=\"#/elements/tables#delete-x-action\">Delete \"X\" actions</a> section.\n  </li>\n</ul>\n<rx-example name=\"table.actionMenu\"></rx-example>\n\n<h2>\n  <rx-permalink>Table Pagination</rx-permalink>\n  <a class=\"button xs inline\" href=\"ngdocs/index.html#/api/elements.directive:rxPaginate/\">View API</a>\n</h2>\n<ul class=\"list\">\n  <li>\n    <span class=\"msg-info\">ENCORE-SPECIFIC:</span> To show how mark-up will be\n    implemented, pagination is visible in this example. The pagination\n    directive doesn't display if there is only one page of data available. It\n    is hidden using AngularJS.\n  </li>\n  <li>\n    It's a known issue that the footer wraps into a second line, if the table\n    is 50% of the screen. Use the <code>display:none</code> CSS property to\n    hide all elements not directly related to pagination. See the CSS example\n    below. This has not been implemented in EncoreUI.\n  </li>\n</ul>\n<pre>\n  .my-custom-class-name .pagination {\n      &amp; > li.nth-child(1) { display: none; }\n      &amp; > li.nth-child(2) { display: none; }\n      .pagination-per-page { display: none; }\n  }\n</pre>\n\n<h3><rx-permalink>UI-Based Pagination</rx-permalink></h3>\n\n<ul class=\"list\">\n  <li>\n    UI-based pagination, where all items are retrieved at once, and paginated in the UI\n  </li>\n</ul>\n<rx-example name=\"table.uiPagination\"></rx-example>\n\n<rx-debug>\n  <div ng-controller=\"tableUiPaginationCtrl\">\n    <h3>Non-displayed pagination</h3>\n    <rx-paginate\n      id=\"rx-paginate-hidden\"\n      page-tracking=\"pager\"\n      ng-hide=\"true\">\n    </rx-paginate>\n  </div>\n</rx-debug>\n\n<h3><rx-permalink>API-Based Pagination</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    Server-side pagination, where the pagination directive works with a paginated API\n  </li>\n  <li>\n      <p>\n        The API used by this demo is returning 100 items more than the user's selected <code>itemsPerPage</code>. If the\n        user's <code>itemsPerPage</code> is 25, then the API will return 125 items on each request. This means with the\n        default <code>itemsPerPage</code> of 25, five pages of results are coming back at a time. You should be able to\n        click through pages 1-5 without a loading message, and then the loading message will appear for page 6.\n      </p>\n\n      <p>\n        Click the \"Refresh\" button to see how the current page can be reloaded without the user interacting with the\n        <code>&lt;rx-paginate&gt;</code> buttons.\n      </p>\n\n      <p>Enter a search string of \"error\" to see the default error handling.</p>\n  </li>\n</ul>\n<rx-example name=\"table.apiPagination\"></rx-example>\n\n<h2><rx-permalink>Design Patterns</rx-permalink></h2>\n\n<h3><rx-permalink>Null Pattern</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    <span class=\"msg-info\">ENCORE-SPECIFIC:</span> If you have no table data,\n    choose a default message to inform your user. Encore shows data table\n    headers to communicate this.\n  </li>\n</ul>\n<rx-example name=\"table.zeroData\"></rx-example>\n\n<h3><rx-permalink>Delete \"X\" Action</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    <span class=\"msg-info\">ENCORE-SPECIFIC:</span> For data tables involving\n    objects that only require deleting (tables related to LBaaS connection\n    nodes and Support Service user tables) there's a design pattern that\n    replaces the cog with an X.\n  </li>\n  <li>\n    Add the <code>.delete-x</code> class to the icon element to automatically\n    apply the red hover style.  This should always be done when using this\n    design pattern.\n  </li>\n  <li>\n    For some examples, view\n    <a href=\"https://github.com/rackerlabs/supportservice-ui/search?utf8=%E2%9C%93&q=times\">\n      these set of tables used in Support Services\n    </a>.\n  </li>\n</ul>\n<rx-example name=\"table.delete\"></rx-example>\n\n<h4><rx-permalink>Other Single Action</rx-permalink></h4>\n<ul class=\"list\">\n  <li>\n    A button link is used for tables where each row has a single\n    action that is not a deletion.\n  </li>\n  <li>\n    If the action is unavailable for a row, the link should be\n    disabled and have a tooltip indicating why.\n  </li>\n</ul>\n<rx-example name=\"table.singleAction\"></rx-example>\n\n<h3><rx-permalink>Status Columns</rx-permalink></h3>\n<ul class=\"list\">\n  <li>\n    <span class=\"msg-info\">ENCORE-SPECIFIC:</span> You can add consistency and\n    color code your status columns using the <code>.rx-status-column</code>\n    class. Ticket Queues have their own styling that predates this. Your new\n    project should use\n    <a href=\"#/components/rxStatusColumn\">rxStatusColumn</a>. However, if\n    rxStatusColumn classes are not suitable, please send feedback through the\n    \"Submit Feedback\" link.\n  </li>\n</ul>\n\n<h2><rx-permalink>Filters</rx-permalink></h2>\n<ul class=\"list\">\n  <li>\n    <span class=\"msg-info\">ENCORE-SPECIFIC:</span> Tables have also been used\n    for filtering. In the past there was no common design pattern for this,\n    and different products implemented it on their own:\n    <ul class=\"list\">\n      <li>\n        Data-based filters, seen in Encore Cloud (Servers, Volumes, Images,\n        Database, Load Balancers)\n      </li>\n      <li>Ticket Queues (Filtering by ticket queues and status)</li>\n      <li>Billing (Filtering by billing data and transactional status)</li>\n    </ul>\n  </li>\n  <li>\n    You now have a standard way of adding table filters using\n    <a href=\"#/components/rxFloatingHeader\">rxFloatingHeader</a>.\n    You can add a new <code>&lt;tr&gt;</code> into the\n    <code>&lt;thead&gt;</code> of the table.\n    The <code>.rx-floating-header</code> class will add appropriate\n    styling.\n  </li>\n</ul>\n<rx-example name=\"table.filtering\"></rx-example>\n\n<h3><rx-permalink>Collapsible Component for Table Filters</rx-permalink></h3>\n<ul class=\"list\">\n  <li>You can add filters inside of a collapsible element.</li>\n  <li>The initial display can be expanded or collapsed.</li>\n  <li>\n    To show and hide the inner contents while keeping the header and\n    border visible, you can use a chevron.\n  </li>\n</ul>\n<rx-example name=\"table.filteringCollapsible\"></rx-example>\n\n<h3><rx-permalink>Multi-Select Filters</rx-permalink></h3>\n<p>\n  The rxSelectFilter component that provides a multi-select dropdown interface intended for table filtering.\n</p>\n<rx-example name=\"selectFilter.simple\"></rx-example>\n\n<h2><rx-permalink>Nested Content</rx-permalink></h2>\n<ul class=\"list\">\n  <li>\n    When a dataset includes a parent-child relationship, the nested\n    tables style should be used to optionally show the related content.\n  </li>\n  <li>\n    <span class=\"msg-info\">ENCORE-SPECIFIC:</span> Use the double chevron in\n    the right most column as the toggle switch for the hidden content.\n  </li>\n</ul>\n\n<h3><rx-permalink>Nested Table</rx-permalink></h3>\n<rx-example name=\"table.nestedTable\"></rx-example>\n\n<h3><rx-permalink>Nested Metadata</rx-permalink></h3>\n<rx-example name=\"table.nestedMetadata\"></rx-example>\n\n<h3>\n  <rx-permalink>Sortable Column</rx-permalink>\n  <a class=\"button xs inline\" href=\"ngdocs/index.html#/api/elements.directive:rxSortableColumn/\">View API</a>\n</h3>\n<ul class=\"list\">\n  <li>\n    The rxSortableColumn component provides functionality to sort a table on a single property value.\n  </li>\n  <li>\n    <p>\n      Note: The demo table is also using <code>rx-floating-header</code>, which is not required.\n      We've only done this to illustrate that <code>rxSortableColumn</code> works properly with\n      <code>rxFloatingHeader</code>. The table is also using <code>rxSortEmptyTop</code>.\n    </p>\n  </li>\n</ul>\n<rx-example name=\"sortableColumn.simple\"></rx-example>\n\n<rx-debug>\n  <h3>Testing table for protractor tests.</h3>\n  <table\n     id=\"sortable-column-testing-table-errors\"\n     rx-floating-header\n     class=\"sortable-column-table\">\n    <thead>\n      <tr>\n        <th scope=\"col\">\n          <rx-sortable-column\n             sort-method=\"sortCol\"\n             sort-property=\"none\"\n             predicate=\"sort.predicate\"\n             reverse=\"sort.reverse\">\n            Testing Sort Errors (see Protractor Tab)\n          </rx-sortable-column>\n        </th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr ng-repeat=\"resource in talentPool | rxSortEmptyTop:sort.predicate:sort.reverse\">\n        <th scope=\"row\" class=\"talent-name\">\n          {{resource.name}}\n        </th>\n        <td class=\"talent-job\">\n          {{resource.jobTitle}}\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</rx-debug>\n\n<h2>UI Roadmap / Possible Future-work</h2><!-- TODO: Do we keep? -->\n<ul class=\"list\">\n  <li>\n    Checkboxes for table rows with design patterns related to\n    \"Select/Unselect All\" behavior\n  </li>\n  <li>Loading Styles for Tables</li>\n  <li>Submit actions for Server-Side Filtering</li>\n</ul>\n",
            "less": ""
        }
    },
    {
        "displayName": "Tabs",
        "stability": "stable",
        "description": "Styling for ngBootstrap Tabs plugin",
        "hasApi": false,
        "keywords": [
            "tabs"
        ],
        "name": "Tabs",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "isCategory": false,
        "srcFiles": [],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  This component provides styles and a demo for the\n  <a href=\"http://angular-ui.github.io/bootstrap/#/tabs\">the Angular-UI Bootstrap Tabs plugin</a>,\n  which is included as a dependency for EncoreUI. Usage is the exact same as\n  demoed on the Angular-UI Bootstrap documentation.\n</p>\n\n<h3>Disclaimer</h3>\n<ul class=\"list\">\n  <li>Only the default horizontal tabs are supported by these styles.</li>\n  <li>\n    <code>vertical</code>, <code>pills</code>, and <code>justified</code>\n    tabs are currently unsupported.\n  </li>\n</ul>\n\n<rx-example name=\"tabs.simple\"></rx-example>\n\n<div class=\"example-case do\">\n  <h4>DO</h4>\n  <ul class=\"list\">\n    <li>\n      Do use tabs for complex forms that use option tables. Tabs are a good way\n      to display \"either/or\" choices to the user.\n    </li>\n    <li>\n      Do use tabs to show closely related information cleanly.\n    </li>\n  </ul>\n  <br />\n\n  <tabset>\n    <tab>\n      <tab-heading>Rackspace Images (3)</tab-heading>\n      <table class=\"table-striped\">\n        <thead>\n          <tr>\n            <th>Name</th>\n            <th>Min Ram</th>\n            <th>Min Disk</th>\n            <th>Created On</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>Arch 2015.7</td>\n            <td>512 MB</td>\n            <td>20 GB</td>\n            <td>Mar 2, 2016 @ 15:40 (UTC-0600)</td>\n          </tr>\n          <tr>\n            <td>Debian 7 (Wheezy)</td>\n            <td>512 MB</td>\n            <td>20 GB</td>\n            <td>Mar 2, 2016 @ 15:40 (UTC-0600)</td>\n          </tr>\n          <tr>\n            <td>Ubuntu 14.04 LTS (Trusty Tahr)</td>\n            <td>512 MB</td>\n            <td>20 GB</td>\n            <td>Mar 2, 2016 @ 15:40 (UTC-0600)</td>\n          </tr>\n        </tbody>\n      </table>\n    </tab>\n    <tab>\n      <tab-heading>Saved Images (3)</tab-heading>\n      <table class=\"table-striped\">\n        <thead>\n          <tr>\n            <th>Name</th>\n            <th>Min Ram</th>\n            <th>Min Disk</th>\n            <th>Created On</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>TestImageOne</td>\n            <td>512 MB</td>\n            <td>20 GB</td>\n            <td>Mar 2, 2016 @ 15:40 (UTC-0600)</td>\n          </tr>\n          <tr>\n            <td>Woof Meow</td>\n            <td>512 MB</td>\n            <td>20 GB</td>\n            <td>Mar 2, 2016 @ 15:40 (UTC-0600)</td>\n          </tr>\n          <tr>\n            <td>GoldenTicket</td>\n            <td>512 MB</td>\n            <td>20 GB</td>\n            <td>Mar 2, 2016 @ 15:40 (UTC-0600)</td>\n          </tr>\n        </tbody>\n      </table>\n    </tab>\n  </tabset>\n</div>\n\n<div class=\"example-case avoid\">\n  <h4>DON'T</h4>\n  <ul class=\"list\">\n    <li>\n      Don't use non-standard tab patterns, like the accordion example below.\n    </li>\n    <li>\n      Don't use more than 5 tabs. If more than 5 tabs are required, then\n      consider whether tabs are the right pattern.\n    </li>\n    <li>\n      Don't use tabs with a total width of more than 500px. If the width is\n      more than 500px, consider shorter tab labels.\n    </li>\n    <li>\n      Don't use tabs as navigation with entire pages inside. Rather than putting\n      extensive or lengthy content in a tabbed area, create a new page with an\n      additional link in the left hand nav.\n    </li>\n  </ul>\n  <br />\n  <img src=\"images/tabs_avoid.png\" />\n</div>\n",
            "less": ""
        }
    },
    {
        "displayName": "Tags",
        "stability": "stable",
        "description": "apply predetermined descriptions to an entity",
        "api": "directive:rxTags",
        "keywords": [
            "cloud",
            "rxTags",
            "tag",
            "tags"
        ],
        "name": "Tags",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/elements/Tags/scripts/rxTags.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/Tags/templates/rxTags.html"
        ],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('tagsSimpleExampleCtrl', function ($scope) {\n    $scope.tagOptions = [\n        { text: 'apple', category: 'fruit' },\n        { text: 'orange', category: 'fruit' },\n        { text: 'banana', category: 'fruit' },\n        { text: 'squash', category: 'vegetable' }\n    ];\n    $scope.tags = ['apple'];\n});\n",
            "html": "<p>\n  A component used to apply predetermined descriptions to an entity.\n</p>\n\n<rx-example name=\"tags.simple\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "Tooltips",
        "stability": "stable",
        "description": "provides styles to raw HTML elements and custom directive templates",
        "keywords": [
            "message",
            "popover",
            "popup",
            "tooltip"
        ],
        "name": "Tooltips",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('tooltipsSimpleExampleCtrl', function ($scope) {\n    $scope.dynamicTooltip = 'I was defined in the controller!';\n    $scope.htmlTooltip = '<span class=\"tooltip-header\">A Tooltip Title</span><p>You can use HTML</p>';\n});\n",
            "html": "<p>\n  The tooltips component provides styles to raw HTML elements and custom directive templates.\n</p>\n\n<rx-example name=\"tooltips.simple\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "Typeahead",
        "stability": "stable",
        "description": "",
        "api": "directive:typeahead",
        "keywords": [
            "auto",
            "fill",
            "predict",
            "typeahead"
        ],
        "name": "Typeahead",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/elements/Typeahead/scripts/typeahead.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('typeadheadShowOnFocusCtrl', function ($scope) {\n    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',\n        'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',\n        'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',\n        'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',\n        'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Republic of Dawood',\n        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',\n        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];\n});\n\nangular.module('demoApp')\n.controller('typeaheadSimpleCtrl', function ($scope) {\n    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',\n        'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',\n        'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',\n        'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',\n        'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Republic of Dawood',\n        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',\n        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];\n});\n",
            "html": "<p>\n  This component provides styles and a demo for the Angular UI Bootstrap \n  <a href=\"http://angular-ui.github.io/bootstrap/versioned-docs/0.14.3/#/typeahead\">Typeahead</a>\n  directive (which is included as a dependency for EncoreUI).\n</p>\n\n<h3><rx-permalink>Standard Use</rx-permalink></h3>\n<rx-example name=\"typeahead.simple\"></rx-example>\n\n<h3><rx-permalink>Show List on Focus</rx-permalink></h3>\n<rx-example name=\"typeahead.showOnFocus\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "Wells",
        "stability": "stable",
        "description": "Provides usage of wells in different context.",
        "hasApi": false,
        "keywords": [
            "well"
        ],
        "name": "Wells",
        "moduleName": "'encore.ui.elements'",
        "category": "elements",
        "isLegacy": false,
        "isCategory": false,
        "srcFiles": [],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<h3 class=\"clear\">Page Wells</h3>\n<p>\n   To create a well-effect, you can use the <code>.well</code>\n   class &mdash; a box with significant padding and light gray background.\n   You might use Page wells to communicate why data is not present for the\n   user, usually if data can only be seen with permissions the user has not\n   been granted. In cases where a user is able to add data without a\n   permissions change, a button can be displayed to prompt the user\n   to add data.\n</p>\n<rx-example name=\"wells.permissions\"></rx-example>\n\n<h3>Modal Wells</h3>\n<p>\n   Typically you can use Modal wells in the context of modals, to provide a\n   summary of data entered or decisions made by the user in a form, to provide\n   a clearer picture to the user of the changes they are about to submit.\n</p>\n<rx-example name=\"wells.modal\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "Identity",
        "stability": "stable",
        "description": "This is a component designed to aid interaction with Rackspace's Identity API.",
        "api": "service:Identity",
        "keywords": [],
        "name": "Identity",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/Identity/scripts/Identity.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  This is a component designed to aid interaction with Rackspace's Identity API.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "PaginatedItemsSummary",
        "stability": "stable",
        "description": "Provides a formatted string with the current range of items in total items.",
        "api": "filter:PaginatedItemsSummary",
        "keywords": [],
        "name": "PaginatedItemsSummary",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/PaginatedItemsSummary/scripts/PaginatedItemsSummary.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Provides a formatted string with the current range of items in total items, for example \"26-50 of 500 items\".\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "Permission",
        "stability": "stable",
        "description": "Simple service for accessing roles and permissions for a user.",
        "api": "service:Permission",
        "keywords": [],
        "name": "Permission",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/Permission/scripts/Permission.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Simple service for accessing roles and permissions for a user.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "Session",
        "stability": "stable",
        "description": "Manages user session",
        "api": "service:Session",
        "keywords": [],
        "name": "Session",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/Session/scripts/Session.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('SessionSimpleCtrl', function ($scope, $window, Session) {\n    $scope.isAuthenticated = function () {\n        $window.alert(Session.isAuthenticated());\n    };\n});\n",
            "html": "<p>\n  Manages a user session.\n</p>\n\n<rx-example name=\"Session.simple\"></rx-example>",
            "less": ""
        }
    },
    {
        "displayName": "StatusUtil",
        "stability": "stable",
        "description": "Manipulates required references to $scope input for proper notification functionality.",
        "api": "service:StatusUtil",
        "keywords": [],
        "name": "StatusUtil",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/StatusUtil/scripts/StatusUtil.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Manipulates required references to <code>$scope</code> input for proper notification functionality.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "encoreRoutes",
        "stability": "deprecated",
        "description": "Allows apps to make updates to the navigation.",
        "api": "service:encoreRoutes",
        "keywords": [],
        "name": "encoreRoutes",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/encoreRoutes/scripts/encoreRoutes.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Allows apps to make updates to the navigation.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "Helper Classes",
        "stability": "stable",
        "description": "",
        "hasApi": false,
        "keywords": [
            "css",
            "class",
            "helper",
            "names"
        ],
        "name": "helperClasses",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "isCategory": false,
        "srcFiles": [],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<ul class=\"list\">\n  <li>\n    To make text less prominent, change its color using the <code>.subdued</code> class.\n    This change will still persist if the class is within a link.\n  </li>\n  <li>\n    You can mark content as full width. For example, styling a full width\n    button by using the <code>.full-width</code> class. This class requires 'display'\n    to be styled as inline-block or block.\n  </li>\n  <li>\n    Hidden content\n    <ul class=\"list\">\n      <li>\n        To hide an element but not remove it from the page spacing, use the <code>.hidden\n        </code> class.\n      </li>\n      <li>\n        You can hide content visually and from the page spacing\n        <a href=\"http://developer.yahoo.com/blogs/ydn/clip-hidden-content-better-accessibility-53456.html\" \n        target=\"_blank\">\n          (but can still be read by screen readers)\n        </a> using the <code>.visually-hidden</code> class.\n      </li>\n    </ul>\n  </li>\n  <li>\n    Clearing floats\n    <ul class=\"list\">\n      <li>\n        To clear child elements using clearfix, you can use the <code>.clear</code> class.\n        <a href=\"http://nicolasgallagher.com/micro-clearfix-hack/\" target=\"_blank\">Learn more about the hack.</a>\n      </li>\n      <li>\n        To clear previous sibling floats, you can use the <code>.clear-left</code>\n        and <code>.clear-right</code> classes\n      </li>\n    </ul>\n  </li>\n</ul>\n<rx-example name=\"helperClasses.simple\"></rx-example>",
            "less": ""
        }
    },
    {
        "displayName": "hotkeys",
        "stability": "stable",
        "description": "",
        "api": "service:hotkeys",
        "keywords": [],
        "name": "hotkeys",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/hotkeys/scripts/hotkeys.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('hotkeysVolumeCtrl', function ($scope, hotkeys) {\n    $scope.volume = 5;\n\n    // Remove combos so we don't add them multiple times\n    hotkeys.del('ctrl+up');\n    hotkeys.del('ctrl+down');\n\n    // Add desired combos\n    hotkeys.add({\n        combo: 'ctrl+up',\n        description: 'Turn up the volume!',\n        callback: function () {\n            $scope.volume += 1;\n        }\n    });\n\n    hotkeys.add({\n        combo: 'ctrl+down',\n        description: 'Turn it down!',\n        callback: function () {\n            $scope.volume -= 1;\n        }\n    });\n});\n",
            "html": "<p>\n  This is simply a reference guide to using\n  <a href=\"http://chieffancypants.github.io/angular-hotkeys/\">the angular-hotkeys plugin</a>\n  from within EncoreUI.\n</p>\n\n<rx-example name=\"hotkeys.volume\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "routesCdnPath",
        "stability": "stable",
        "description": "",
        "api": "service:routesCdnPath",
        "keywords": [],
        "name": "routesCdnPath",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/routesCdnPath/scripts/routesCdnPath.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Provides the CDN locations from which to load the nav JSON.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxAge",
        "stability": "stable",
        "description": "Filters to parse dates",
        "api": "filter:rxAge",
        "keywords": [],
        "name": "rxAge",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxAge/scripts/rxAge.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxAgeCtrl', function ($scope) {\n    var day = 1000 * 60 * 60 * 24;\n    $scope.ageHours = new Date((Date.now() - (day / 2.3))).toString();\n    $scope.ageDays = new Date((Date.now() - (day * 1.5))).toString();\n    $scope.ageMonths = new Date((Date.now() - (day * 40.2))).toString();\n    $scope.ageYears = new Date((Date.now() - (day * 380.1))).toString();\n});\n",
            "html": "<p>\n  <code>rxAge</code> provides several filters to parse dates.\n</p>\n\n<rx-example name=\"rxAge.demo\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxAppRoutes",
        "stability": "deprecated",
        "description": "Manage application routes and states of routes.",
        "api": "service:rxAppRoutes",
        "keywords": [],
        "name": "rxAppRoutes",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxAppRoutes/scripts/rxAppRoutes.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Mmanages app routes and states of routes.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxApply",
        "stability": "stable",
        "description": "Used to apply an instance of rxSelectFilter to an array.",
        "api": "filter:rxApply",
        "keywords": [
            "Apply"
        ],
        "name": "rxApply",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxApply/scripts/rxApply.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxApplySimpleCtrl', function ($scope, rxSelectFilter) {\n    $scope.filter = rxSelectFilter.create({\n        properties: ['account', 'status'],\n        selected: {\n            account: ['A']\n        }\n    });\n\n    $scope.tickets = [\n        { account: 'A', status: 'NEW', description: 'Open a new service ticket.' },\n        { account: 'A', status: 'IN_PROGRESS', description: 'Updating server status.' },\n        { account: 'B', status: 'TRANSFERRED', description: 'Transferred account to ORD region.' },\n        { account: 'B', status: 'VENDOR', description: 'Added new third-party vendor service.' },\n        { account: 'A', status: 'TRANSFERRED', description: 'Transferred account to IAD region.' }\n    ];\n});\n",
            "html": "<p>\n  Used to apply an instance of <code><a href=\"#/utilities/rxSelectFilter\">rxSelectFilter</a></code> to an array.\n</p>\n\n<rx-example name=\"rxApply.simple\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxAttributes",
        "stability": "stable",
        "description": "used to add attributes based on scope values.",
        "api": "directive:rxAttributes",
        "keywords": [
            "attributes",
            "compile",
            "rxAttributes"
        ],
        "name": "rxAttributes",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxAttributes/scripts/rxAttributes.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxAttributesCtrl', function ($scope) {\n    $scope.customStyles = 'color: red; font-weight: bold;';\n    $scope.customContent = '\"Custom Content\"';\n});\n",
            "html": "<p>\n  <code>rxAttributes</code> allows to add attributes based on a value in scope being defined or not.\n</p>\n\n<rx-example name=\"rxAttributes.demo\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxAuth",
        "stability": "stable",
        "description": "Provides logic for authenticating, validating permissions, and managing sessions.",
        "api": "service:rxAuth",
        "keywords": [
            "Auth"
        ],
        "name": "rxAuth",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxAuth/scripts/rxAuth.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxAuthSimpleCtrl', function ($scope, $window, rxAuth) {\n    $scope.hasRole = function () {\n        $window.alert('Has \"superhero\" Role? : ' + rxAuth.hasRole('superhero'));\n    };\n\n    $scope.isAuthenticated = function () {\n        $window.alert('Is Authenticated? : ' + rxAuth.isAuthenticated());\n    };\n});\n",
            "html": "<p>\n  Provides logic for authenticating, validating permissions, and managing sessions.\n</p>\n\n<rx-example name=\"rxAuth.simple\"></rx-example>",
            "less": ""
        }
    },
    {
        "displayName": "rxAutoSave",
        "stability": "stable",
        "description": "Service to help automatically save/load form data.",
        "api": "service:rxAutoSave",
        "keywords": [],
        "name": "rxAutoSave",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxAutoSave/scripts/rxAutoSave.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxAutoSaveSimpleCtrl', function ($scope, $timeout, $q, rxNotify, rxAutoSave) {\n    $scope.formData = {\n        checkbox: false,\n        name: '',\n        description: '',\n        sensitive: ''\n    };\n\n    var autosave = rxAutoSave($scope, 'formData', {\n        exclude: ['sensitive'],\n        ttl: 86400000\n    });\n\n    $scope.status = {\n        loading: false,\n        disable: false,\n        deferredLoading: false,\n        deferredDisable: false\n    };\n\n    var clearMsg = [\n        'rxAutoSave data has been cleared!',\n        'Navigate away and return, and the form will not be auto-populated'\n    ].join(' ');\n\n    // Clear with an explicit autosave.clear() call\n    $scope.clearStorage = function () {\n        $scope.status.loading = true;\n        $timeout(function () {\n            $scope.status.loading = false;\n            autosave.clear();\n            rxNotify.add(clearMsg, { type: 'success' });\n        }, 1000);\n    };\n\n    // Clear by resolving the associated promise\n    $scope.deferredClear = function () {\n        var deferred = $q.defer();\n\n        autosave.clearOnSuccess(deferred.promise);\n        $scope.status.deferredLoading = true;\n\n        $timeout(function () {\n            $scope.status.deferredLoading = false;\n            deferred.resolve();\n            rxNotify.add(clearMsg, { type: 'success' });\n        }, 1000);\n    };\n});\n",
            "html": "<p>\n  Provides a way to store values in a form for later use.\n</p>\n<h3>Form with automatically saved state</h3>\n<p>\n  Try entering some data into this form, and then navigating away to a different page. When you return here,\n  the form data will automatically be populated with what you had previously entered.\n</p>\n<p>\n  Once you've tried that, you can clear the stored data with either of the \"Clear\" buttons below. Clicking those\n  will <em>not</em> erase the form, but will erase the rxAutoSave stored data. If you navigate away after clicking\n  one of the buttons, and then return here, the form will not be auto-populated, because rxAutoSave will have no data for it!\n</p>\n\n<p>\n  Finally, we have set a Time-To-Live of 24 hours for this form, and explicitly told it not to save the \"Sensitive data\" field\n  into storage. If you enter data here, and come back &gt;24 hours later, the form will not be auto-populated, as the data will\n  have expired.\n</p>\n\n<rx-example name=\"rxAutoSave.simple\"></rx-example>",
            "less": ""
        }
    },
    {
        "displayName": "rxBreadcrumbsSvc",
        "stability": "stable",
        "description": "",
        "api": "service:rxBreadcrumbsSvc",
        "keywords": [],
        "name": "rxBreadcrumbsSvc",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxBreadcrumbsSvc/scripts/rxBreadcrumbsSvc.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Angular service that provides various methods to manipulate breadcrumbs.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxBulkSelectController",
        "stability": "prototype",
        "description": "Provides controller logic for rxBulkSelect",
        "api": "controller:rxBulkSelectController",
        "keywords": [],
        "name": "rxBulkSelectController",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxBulkSelectController/scripts/rxBulkSelectController.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Provides controller logic for <a href=\"#/components/rxBulkSelect\">rxBulkSelect</a>.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxBulkSelectUtils",
        "stability": "prototype",
        "description": "Selects or deselects all visible rows.  Support function for rxBulkSelect.",
        "api": "service:rxBulkSelectUtils",
        "keywords": [],
        "name": "rxBulkSelectUtils",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxBulkSelectUtils/scripts/rxBulkSelectUtils.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Selects or deselects all visible rows.  Support function for\n  <a href=\"#/components/rxBulkSelect\">rxBulkSelect</a>.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxBytesConvert",
        "stability": "stable",
        "description": "Converts raw byte disk size into a more readable format",
        "api": "filter:rxBytesConvert",
        "keywords": [],
        "name": "rxBytesConvert",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxBytesConvert/scripts/rxBytesConvert.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxBytesConvertCtrl', function ($scope) {\n    $scope.sizeGB = 42e10; // 420 GB\n    $scope.sizeTB = 125e12; // 125 TB\n    $scope.sizePB = 17134e13; // 171.34 PB\n});\n",
            "html": "<p>\n  Converts byte disk size into a more readable format (e.g. GBs, TBs, PBs)\n</p>\n\n<rx-example name=\"rxBytesConvert.demo\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxCapitalize",
        "stability": "stable",
        "description": "Capitalizes the first word in a string",
        "api": "filter:rxCapitalize",
        "keywords": [],
        "name": "rxCapitalize",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxCapitalize/scripts/rxCapitalize.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxCapitalizeCtrl', function ($scope) {\n    $scope.hello = 'hello world this is my text.';\n});\n",
            "html": "<p>\n  Capitalizes the first word in a string.\n</p>\n\n<rx-example name=\"rxCapitalize.demo\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxCompile",
        "stability": "stable",
        "description": "Allows compilation of expressions inside of other expressions.",
        "api": "directive:rxCompile",
        "keywords": [
            "compile",
            "rxCompile"
        ],
        "name": "rxCompile",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxCompile/scripts/rxCompile.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxCompileDemoCtrl', function ($scope) {\n    $scope.world = 'wrrrld';\n    $scope.myExpression = 'Hello {{world}}';\n});\n",
            "html": "<p>\n  Allows compilation of expressions inside of other expressions.\n</p>\n<rx-example name=\"rxCompile.demo\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxCopyUtil",
        "stability": "prototype",
        "description": "Utilities for rxCopy element",
        "api": "service:rxCopyUtil",
        "keywords": [],
        "name": "rxCopyUtil",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxCopyUtil/scripts/rxCopyUtil.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Utility service used by <a href=\"#/elements/Copy\">rxCopy</a>.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxDOMHelper",
        "stability": "stable",
        "description": "A small set of useful DOM-related functions.",
        "api": "service:rxDOMHelper",
        "keywords": [],
        "name": "rxDOMHelper",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxDOMHelper/scripts/rxDOMHelper.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  A small set of useful DOM-related functions.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxDate",
        "stability": "stable",
        "description": "Filter to convert a date string to an accepted standard Date format",
        "api": "utilities.filter:rxDate",
        "keywords": [
            "date",
            "filter",
            "format",
            "moment",
            "rxDate"
        ],
        "name": "rxDate",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxDate/scripts/rxDate.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxDateDemoCtrl', function ($scope) {\n    $scope.dateString = '2015-09-17T19:37:17Z';\n});\n",
            "html": "<p>\n  Filter to convert a date string to an accepted standard Date format\n</p>\n\n<rx-example name=\"rxDate.demo\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxDateTime",
        "stability": "stable",
        "description": "Filter to convert a date string to an accepted standard DateTime format",
        "api": "utilities.filter:rxDateTime",
        "keywords": [
            "date",
            "filter",
            "format",
            "moment",
            "rxDateTime",
            "time"
        ],
        "name": "rxDateTime",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxDateTime/scripts/rxDateTime.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxDateTimeDemoCtrl', function ($scope) {\n    $scope.dateString = '2015-09-17T19:37:17Z';\n});\n",
            "html": "<p>\n  Filter to convert a date string to an accepted standard DateTime format\n</p>\n\n<rx-example name=\"rxDateTime.demo\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxDevicePaths",
        "stability": "stable",
        "description": "Device Paths configuration",
        "api": "value:rxDevicePaths",
        "keywords": [
            "devicePaths"
        ],
        "name": "rxDevicePaths",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxDevicePaths/scripts/rxDevicePaths.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Provides configuration for device paths.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxDiskSize",
        "stability": "stable",
        "description": "Converts raw GB disk size into a more readable format",
        "api": "filter:rxDiskSize",
        "keywords": [],
        "name": "rxDiskSize",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxDiskSize/scripts/rxDiskSize.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxDiskSizeCtrl', function ($scope) {\n    $scope.sizeGB = 420;\n    $scope.sizeTB = 125000;\n    $scope.sizePB = 171337000;\n});\n",
            "html": "<p>\n  Converts GB disk size into a more readable format (e.g. GBs, TBs, PBs)\n</p>\n\n<rx-example name=\"rxDiskSize.demo\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxEnvironment",
        "stability": "stable",
        "description": "Allows environments to be defined, and retrieving the current environment based on location.",
        "api": "service:rxEnvironment",
        "keywords": [
            "Environment"
        ],
        "name": "rxEnvironment",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxEnvironment/scripts/rxEnvironment.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxEnvironmentSimpleCtrl', function ($scope, rxEnvironment) {\n    var environment = rxEnvironment.get();\n    $scope.url = environment.url;\n    $scope.name = environment.name;\n});\n",
            "html": "<p>\n  Allows environments to be defined, and retrieving the current environment based on location.\n</p>\n\n<rx-example name=\"rxEnvironment.simple\"></rx-example>",
            "less": ""
        }
    },
    {
        "displayName": "rxEnvironmentMatch",
        "stability": "stable",
        "description": "Checks if current environment matches target environment",
        "api": "filter:rxEnvironmentMatch",
        "keywords": [],
        "name": "rxEnvironmentMatch",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxEnvironmentMatch/scripts/rxEnvironmentMatch.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Checks if current environment matches target environment.\n</p>\n\n<rx-example name=\"rxEnvironmentMatch.simple\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxEnvironmentUrl",
        "stability": "stable",
        "description": "Builds a URL based on current environment.",
        "api": "filter:rxEnvironmentUrl",
        "keywords": [],
        "name": "rxEnvironmentUrl",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxEnvironmentUrl/scripts/rxEnvironmentUrl.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Builds a URL based on current environment.\n</p>\n\n<rx-example name=\"rxEnvironmentUrl.simple\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxErrorFormatter",
        "stability": "stable",
        "description": "Provides a helper method to parse and format error objects.",
        "api": "service:rxErrorFormatter",
        "keywords": [
            "ErrorFormatter"
        ],
        "name": "rxErrorFormatter",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxErrorFormatter/scripts/rxErrorFormatter.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxErrorFormatterSimpleCtrl', function ($scope, rxErrorFormatter) {\n    $scope.setErrorMsg = function (msg) {\n        var error = { message: msg };\n        $scope.errorMsg = rxErrorFormatter.buildErrorMsg('Error: ${message}', error);\n    };\n});\n",
            "html": "<p>\n  Provides a helper method to parse and format error objects.\n</p> \n\n<rx-example name=\"rxErrorFormatter.simple\"></rx-example>",
            "less": ""
        }
    },
    {
        "displayName": "rxFavicon",
        "stability": "stable",
        "description": "Allows custom favicons between local, staging and production environments.",
        "api": "directive:rxFavicon",
        "keywords": [
            "favicon",
            "favorite",
            "icon",
            "rxFavicon"
        ],
        "name": "rxFavicon",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxFavicon/scripts/rxFavicon.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Allows custom favicons between local, staging and production environments.\n</p>\n<p>See favicon of this site for an example of this. \n   On <a href=\"http://rackerlabs.github.io/encore-ui/\">the live site</a>, the favicon will be a dark blue book. \n   On <a href=\"http://localhost:9001\">the local site</a>, it will be a light blue book.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxFeedbackApi",
        "stability": "stable",
        "description": "Provides the feedback URL.",
        "api": "constant:rxFeedbackApi",
        "keywords": [
            "feedbackApi"
        ],
        "name": "rxFeedbackApi",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxFeedbackApi/scripts/rxFeedbackApi.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Provides the feedback URL.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxFeedbackController",
        "stability": "stable",
        "description": "Allows the customization of the feedback modal.",
        "api": "controller:rxFeedbackController",
        "keywords": [],
        "name": "rxFeedbackController",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxFeedbackController/scripts/rxFeedbackController.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Allows the customization of the feedback modal.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxFeedbackSvc",
        "stability": "stable",
        "description": "Service that supports the customization of user feedback endpoints.",
        "api": "service:rxFeedbackSvc",
        "keywords": [],
        "name": "rxFeedbackSvc",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxFeedbackSvc/scripts/rxFeedbackSvc.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Service that supports the customization of user feedback endpoints.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxFeedbackTypes",
        "stability": "stable",
        "description": "Provides default feedback types with placeholder text.",
        "api": "value:rxFeedbackTypes",
        "keywords": [
            "feedbackTypes"
        ],
        "name": "rxFeedbackTypes",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxFeedbackTypes/scripts/rxFeedbackTypes.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Provides default feedback types.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxFormUtils",
        "stability": "stable",
        "description": "Set of utility functions used by rxForm to access form data",
        "api": "service:rxFormUtils",
        "keywords": [],
        "name": "rxFormUtils",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxFormUtils/scripts/rxFormUtils.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Set of utility functions used by rxForm to access form data.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxIfEnvironment",
        "stability": "stable",
        "description": "",
        "api": "directive:rxIfEnvironment",
        "keywords": [
            "detect",
            "environment",
            "rxIfEnvironment"
        ],
        "name": "rxIfEnvironment",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxIfEnvironment/scripts/rxIfEnvironment.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Utility built to detect and provide the current environment (e.g. dev, staging, prod)\n</p>\n\n<h3><rx-permalink>rxIfEnvironment</rx-permalink></h3>\n<rx-example name=\"rxIfEnvironment.simple\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxLocalStorage",
        "stability": "stable",
        "description": "Simple wrapper for interacting with local storage in the browser.",
        "api": "service:rxLocalStorage",
        "keywords": [],
        "name": "rxLocalStorage",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxLocalStorage/scripts/rxLocalStorage.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxLocalStorageSimpleCtrl', function ($scope, $window, rxLocalStorage) {\n    $scope.setSideKick = function () {\n        rxLocalStorage.setObject('joker', { name: 'Harley Quinn' });\n    };\n\n    $scope.getSideKick = function () {\n        var sidekick = rxLocalStorage.getObject('joker');\n        $window.alert(sidekick.name);\n    };\n});\n",
            "html": "<p>\n  Simple wrapper for interacting with local storage in the browser.\n</p>\n<h3>Simple Example</h3>\n<p>Select <code>Store Answer</code>, then <code>Answer?</code> to first store the answer in the \n   browser's <code>localStorage</code> object and later retrieve the stored content.\n</p>\n\n<rx-example name=\"rxLocalStorage.simple\"></rx-example>",
            "less": ""
        }
    },
    {
        "displayName": "rxModalCtrl",
        "stability": "stable",
        "description": "Provides a controller for rxModalAction to use.",
        "api": "controller:rxModalCtrl",
        "keywords": [],
        "name": "rxModalCtrl",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxModalCtrl/scripts/rxModalCtrl.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Provides a controller for <a href=\"#/components/rxModalAction\">rxModalAction</a> to use.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxModalFooterTemplates",
        "stability": "stable",
        "description": "A cache for storing the modal footer templates.",
        "api": "service:rxModalFooterTemplates",
        "keywords": [],
        "name": "rxModalFooterTemplates",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxModalFooterTemplates/scripts/rxModalFooterTemplates.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  A cache for storing the modal footer templates.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxMomentFormats",
        "stability": "stable",
        "description": "Formatting masks that are compliant with approved Date/Time formats",
        "hasApi": false,
        "keywords": [
            "date",
            "datetime",
            "format",
            "moment",
            "month",
            "time"
        ],
        "name": "rxMomentFormats",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxMomentFormats/scripts/rxMomentFormats.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Angular value containing definitions for all documented date and time formats.\n  See <a href=\"/#/styles/formatting\">Date/Time Formatting</a>\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxMonth",
        "stability": "stable",
        "description": "Filter to convert a date string to an accepted standard Month format",
        "api": "utilities.filter:rxMonth",
        "keywords": [
            "filter",
            "format",
            "moment",
            "month",
            "rxMonth"
        ],
        "name": "rxMonth",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxMonth/scripts/rxMonth.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxMonthDemoCtrl', function ($scope) {\n    $scope.dateString = '2015-09-17T19:37:17Z';\n});\n",
            "html": "<p>\n  Filter to convert a date string to an accepted standard Month format\n</p>\n\n<rx-example name=\"rxMonth.demo\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxNestedElement",
        "stability": "stable",
        "description": "Helper function to aid in the creation of boilerplate DDO definitions",
        "api": "service:rxNestedElement",
        "keywords": [],
        "name": "rxNestedElement",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxNestedElement/scripts/rxNestedElement.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Helper function to aid in the creation of boilerplate Directive Definition Object definitions \n  required to validate nested custom elements.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxNotify",
        "stability": "stable",
        "description": "Manages page messages for an application.",
        "api": "service:rxNotify",
        "keywords": [],
        "name": "rxNotify",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxNotify/scripts/rxNotify.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Manages page messages for an application.\n  See <a href=\"#/elements/Notifications\">Notifications demo</a> for examples.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxNotifyProperties",
        "stability": "prototype",
        "description": "Provides a registration service for directive, controller, or other service notification updates.",
        "api": "service:rxNotifyProperties",
        "keywords": [
            "NotifyProperties"
        ],
        "name": "rxNotifyProperties",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxNotifyProperties/scripts/rxNotifyProperties.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Provides a registration service that allows directives, controllers, or other services to watch for\n  external property changes.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxPageTitle",
        "stability": "stable",
        "description": "Provides a service that manages page titles.",
        "api": "service:rxPageTitle",
        "keywords": [],
        "name": "rxPageTitle",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxPageTitle/scripts/rxPageTitle.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxPageTitleSimpleCtrl', function ($scope, rxPageTitle) {\n    $scope.changeTitle = function () {\n        rxPageTitle.setTitle($scope.newTitle);\n    };\n\n    $scope.refreshTitle = function () {\n        $scope.pageTitle = rxPageTitle.getTitle();\n    };\n\n    $scope.refreshTitle();\n});\n",
            "html": "<p>\n  Provides a service that manages page titles.\n</p>\n\n<rx-example name=\"rxPageTitle.simple\"></rx-example>",
            "less": ""
        }
    },
    {
        "displayName": "rxPageTracker",
        "stability": "stable",
        "description": "Used with pagination objects to store/control page display of data tables and other items.",
        "api": "service:rxPageTracker",
        "keywords": [
            "PageTracking"
        ],
        "name": "rxPageTracker",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxPageTracker/scripts/rxPageTracker.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Used with pagination objects to store/control page display of data tables and other items.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxPager",
        "stability": "stable",
        "description": "Pagination filter that is used to limit the number of pages shown.",
        "api": "filter:rxPager",
        "keywords": [
            "Page"
        ],
        "name": "rxPager",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxPager/scripts/rxPager.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Pagination filter that is used to limit the number of pages shown.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxPaginate",
        "stability": "stable",
        "description": "Pagination filter that is used to calculate the division in the items list for the paging.",
        "api": "filter:rxPaginate",
        "keywords": [
            "Paginate"
        ],
        "name": "rxPaginate",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxPaginate/scripts/rxPaginate.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Pagination filter that is used to calculate the division in the items list for the paging.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxPaginateUtils",
        "stability": "stable",
        "description": "A few utilities to calculate first, last, and number of items.",
        "api": "service:rxPaginateUtils",
        "keywords": [],
        "name": "rxPaginateUtils",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxPaginateUtils/scripts/rxPaginateUtils.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  A few utilities to calculate first, last, and number of items.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxPermission",
        "stability": "stable",
        "description": "",
        "api": "directive:rxPermission",
        "keywords": [
            "permission",
            "rxPermission"
        ],
        "name": "rxPermission",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxPermission/scripts/rxPermission.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxPermission/templates/rxPermission.html"
        ],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxPermissionSimpleCtrl', function ($scope, rxAuth, rxNotify) {\n    rxNotify.add('Respect My Authority!!', {\n        stack: 'permission',\n        type: 'warning'\n    });\n\n    $scope.storeToken = function () {\n        rxAuth.storeToken({\n            access: {\n                user: {\n                    roles: [{ name: 'test' }]\n                }\n            }\n        });\n    };\n\n    $scope.clearToken = function () {\n        rxAuth.logout();\n    };\n});\n",
            "html": "<p>\n  The rxPermission utility provides functionality to perform checks against existing user permissions in EncoreUI.\n</p>\n\n<h3><rx-permalink>rxPermission</rx-permalink></h3>\n<rx-example name=\"rxPermission.simple\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxProgressbarUtil",
        "stability": "prototype",
        "description": "Utilities for rxProgressbar element",
        "api": "service:rxProgressbarUtil",
        "keywords": [],
        "name": "rxProgressbarUtil",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxProgressbarUtil/scripts/rxProgressbarUtil.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Utility service used by <a href=\"#/elements/progressbar\">rxProgressbar</a>.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxPromiseNotifications",
        "stability": "stable",
        "description": "Manages displaying messages for a notification promise.",
        "api": "service:rxPromiseNotifications",
        "keywords": [],
        "name": "rxPromiseNotifications",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxPromiseNotifications/scripts/rxPromiseNotifications.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxPromiseNotificationsSimpleCtrl', function ($scope, rxNotify, rxPromiseNotifications, $q) {\n\n    $scope.add = function (stack) {\n        var messageOptions = _.clone($scope.options);\n\n        if ($scope.ondismiss.should) {\n            messageOptions.ondismiss = _.clone($scope.ondismiss.method);\n        }\n\n        messageOptions.stack = stack;\n\n        rxNotify.add($scope.message, messageOptions);\n    };\n\n    rxNotify.add('Helpful Information', {\n        stack: 'demo'\n    });\n    rxNotify.add('Additional Helpful Information', {\n        stack: 'demo'\n    });\n\n    $scope.addPromise = function () {\n        $scope.deferred = $q.defer();\n\n        rxPromiseNotifications.add($scope.deferred.promise, {\n            loading: 'Loading Service',\n            success: 'Service Succesfully Loaded',\n            error: 'Error Loading Service'\n        }, 'demo');\n    };\n});\n",
            "html": "<p>\n  Manages the displaying of notification success and failure messages.\n</p>\n<h3>Simple Example</h3>\n<p>Select <code>Create Promise</code> to simulate creating a service, then select\n   <code>Resolve Promise</code> or <code>Reject Promise</code> to simulate success or failure.\n</p>\n\n<rx-example name=\"rxPromiseNotifications.simple\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxScreenshotSvc",
        "stability": "stable",
        "description": "Captures a screenshot for rxFeedback submission form.",
        "api": "service:rxScreenshotSvc",
        "keywords": [],
        "name": "rxScreenshotSvc",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxScreenshotSvc/scripts/rxScreenshotSvc.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Captures a screenshot for <code>rxFeedback</code> submission form.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxSelectFilter",
        "stability": "prototype",
        "description": "A prototype for creating objects that can be used for filtering arrays.",
        "api": "service:rxSelectFilter",
        "keywords": [
            "SelectFilter"
        ],
        "name": "rxSelectFilter",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxSelectFilter/scripts/rxSelectFilter.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  A prototype for creating objects that can be used for filtering arrays.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxSessionStorage",
        "stability": "stable",
        "description": "",
        "keywords": [
            "SessionStorage"
        ],
        "name": "rxSessionStorage",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxSessionStorage/scripts/rxSessionStorage.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxSessionStorageSimpleCtrl', function ($scope, $window, rxSessionStorage) {\n    $scope.setSideKick = function () {\n        rxSessionStorage.setItem('Batman', 'Robin');\n    };\n\n    $scope.getSideKick = function () {\n        $window.alert(rxSessionStorage.getItem('Batman'));\n    };\n});\n",
            "html": "<p>\n  A component that provides a simple wrapper around the global\n  <code>sessionStorage</code> object for interacting with session storage.\n</p>\n\n<rx-example name=\"rxSessionStorage.simple\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxSortEmptyTop",
        "stability": "stable",
        "description": "Moves rows with an empty predicate in ascending and descending order.",
        "api": "filter:rxSortEmptyTop",
        "keywords": [],
        "name": "rxSortEmptyTop",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxSortEmptyTop/scripts/rxSortEmptyTop.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxSortEmptyTopSimpleCtrl', function ($scope, rxPageTracker, rxSortUtil) {\n    $scope.sort = rxSortUtil.getDefault('name');\n    $scope.sort = rxSortUtil.getDefault('name', false);\n    $scope.pager = rxPageTracker.createInstance();\n\n    $scope.sortCol = function (predicate) {\n        return rxSortUtil.sortCol($scope, predicate);\n    };\n\n    $scope.serverVolumes = [\n        {\n            name: 'Monitor Agent 4',\n            volumeId: 'a44079a5-040b-495f-be22-35994ea03cc5'\n        },\n        {\n            name: 'Stress Volume 33',\n            volumeId: '65d89e82-9363-482e-92d1-f3f7d4f135a7'\n        },\n        {\n            name: null,\n            volumeId: '0a87a764-45f0-4a1e-8dbf-20d76291022d'\n        },\n        {\n            name: 'Stress Volume 24',\n            volumeId: ''\n        },\n        {\n            name: null,\n            volumeId: 'be827f83-8d4c-4d4c-afc3-4c9bf0fdfe00'\n        },\n    ];\n});\n",
            "html": "<p>\n  Moves rows with an empty predicate to the top of the column in\n  ascending order, and to the bottom in descending order.\n</p>\n\n<rx-example name='rxSortEmptyTop.simple'></rx-example>",
            "less": ""
        }
    },
    {
        "displayName": "rxSortUtil",
        "stability": "stable",
        "description": "Service which provides utility methods for sorting collections.",
        "api": "service:rxSortUtil",
        "keywords": [],
        "name": "rxSortUtil",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxSortUtil/scripts/rxSortUtil.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Service which provides utility methods for sorting collections.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxStatus",
        "stability": "stable",
        "description": "Manages notifications for rxNotify",
        "api": "service:rxStatus",
        "keywords": [
            "Status"
        ],
        "name": "rxStatus",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxStatus/scripts/rxStatus.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxStatusSimpleCtrl', function ($scope, $rootScope, rxStatus) {\n    rxStatus.setScope($scope);\n\n    $scope.triggerRouteChangeSuccess = function () {\n        $rootScope.$broadcast('$routeChangeSuccess');\n    };\n\n    $scope.clear = function () {\n        rxStatus.clear();\n        $scope.notify = undefined;\n    };\n\n    $scope.setLoading = function (msg) {\n        rxStatus.clear();\n        $scope.notify = rxStatus.setLoading(msg);\n    };\n\n    $scope.setSuccess = function (msg) {\n        rxStatus.clear();\n        $scope.notify = rxStatus.setSuccess(msg);\n    };\n\n    $scope.setSuccessNext = function (msg) {\n        rxStatus.clear();\n        $scope.notify = rxStatus.setSuccessNext(msg);\n    };\n\n    $scope.setSuccessImmediate = function (msg) {\n        rxStatus.clear();\n        $scope.notify = rxStatus.setSuccessImmediate(msg);\n    };\n\n    $scope.setWarning = function (msg) {\n        rxStatus.clear();\n        $scope.notify = rxStatus.setWarning(msg);\n    };\n\n    $scope.setInfo = function (msg) {\n        rxStatus.clear();\n        $scope.notify = rxStatus.setInfo(msg);\n    };\n\n    $scope.setError = function (msg) {\n        rxStatus.clear();\n        $scope.notify = rxStatus.setError(msg);\n    };\n\n    $scope.dismiss = function () {\n        $scope.notify && rxStatus.dismiss($scope.notify);\n        $scope.notify = undefined;\n    };\n});\n",
            "html": "<p>\n  Manages notifications for <a href=\"#/components/rxNotify\">rxNotify</a>.\n</p>\n\n<rx-example name=\"rxStatus.simple\"></rx-example>",
            "less": ""
        }
    },
    {
        "displayName": "rxStatusColumnIcons",
        "stability": "prototype",
        "description": "Mapping of internal statuses to FontAwesome icons.",
        "api": "object:rxStatusColumnIcons",
        "keywords": [],
        "name": "rxStatusColumnIcons",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxStatusColumnIcons/scripts/rxStatusColumnIcons.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Maps internal statuses to <a href=\"http://fontawesome.io/\">FontAwesome icons</a>.  Examples of their usage\n  are available on the <a href=\"#/components/rxStatusColumn\">rxStatusColumn demo page</a>.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxStatusMappings",
        "stability": "prototype",
        "description": "A set of methods for creating mappings to status identifiers used in EncoreUI",
        "api": "service:rxStatusMappings",
        "keywords": [],
        "name": "rxStatusMappings",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxStatusMappings/scripts/rxStatusMappings.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxStatusMappingsSimpleCtrl', function ($scope, rxStatusMappings) {\n    $scope.servers = [\n        { status: 'ACTIVE', title: 'ACTIVE status' },\n        { status: 'ERROR', title: 'ERROR status' },\n        { status: 'DISABLED', title: 'DISABLED status' },\n        { status: 'DELETED', title: 'DELETED status mapped to ERROR' },\n        { status: 'UNKNOWN', title: 'UNKNOWN status mapped to ERROR' },\n        { status: 'RESCUE', title: 'RESCUE status mapped to INFO' },\n        { status: 'SUSPENDED', title: 'SUSPENDED status mapped to WARNING' },\n        { status: 'REBUILD', title: 'REBUILD status mapped to PENDING' },\n        { status: 'RESIZE', title: 'RESIZE status mapped to PENDING' },\n        { status: 'MIGRATING', title: 'MIGRATING status mapped to PENDING' },\n        { status: 'DELETING', title: 'DELETING status mapped to PENDING, using `fooApi` mapping', api: 'fooApi' }\n    ];\n\n    // We have a few different ways of adding mappings. We've tried to show them all here\n    rxStatusMappings.addGlobal({\n        'DELETING': 'PENDING'\n    });\n    rxStatusMappings.mapToInfo('RESCUE');\n    rxStatusMappings.mapToWarning('SUSPENDED');\n    rxStatusMappings.mapToPending(['REBUILD','RESIZE','MIGRATING']);\n    rxStatusMappings.mapToError(['DELETED', 'UNKNOWN']);\n    rxStatusMappings.addAPI('fooApi', { 'DELETING': 'PENDING' });\n    rxStatusMappings.mapToPending('SomeApiSpecificStatus', 'fooApi');\n});\n",
            "html": "<p>\n  A set of methods for creating mappings to status identifiers used in EncoreUI.\n</p>\n\n<rx-example name=\"rxStatusMappings.simple\"></rx-example>",
            "less": ""
        }
    },
    {
        "displayName": "rxStatusTags",
        "stability": "stable",
        "description": "Primarily used for applications to specify custom status tags.",
        "api": "service:rxStatusTags",
        "keywords": [],
        "name": "rxStatusTags",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxStatusTags/scripts/rxStatusTags.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Primarily used for applications to specify custom status tags.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxTime",
        "stability": "stable",
        "description": "Filter to convert a date string to an accepted standard Time format",
        "api": "utilities.filter:rxTime",
        "keywords": [
            "filter",
            "format",
            "moment",
            "rxTime",
            "time"
        ],
        "name": "rxTime",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxTime/scripts/rxTime.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxTimeDemoCtrl', function ($scope) {\n    $scope.dateString = '2015-09-17T19:37:17Z';\n});\n",
            "html": "<p>\n  Filter to convert a date string to an accepted standard Time format\n</p>\n\n<rx-example name=\"rxTime.demo\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxTimePickerUtil",
        "stability": "prototype",
        "description": "Utilities for rxTimePicker element",
        "api": "service:rxTimePickerUtil",
        "keywords": [],
        "name": "rxTimePickerUtil",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxTimePickerUtil/scripts/rxTimePickerUtil.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Utility service used by <a href=\"#/elements/Forms#time-picker\">rxTimePicker</a>.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxTitleize",
        "stability": "stable",
        "description": "Convert a string to title case, stripping out underscores and all uppercase words.",
        "api": "filter:rxTitleize",
        "keywords": [
            "titleize"
        ],
        "name": "rxTitleize",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxTitleize/scripts/rxTitleize.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxTitleizeSimpleCtrl', function ($scope) {\n    $scope.sample = 'HELLO_welcome TO ENCore FRamework!';\n});\n",
            "html": "<p>\n  Convert a string to title case, stripping out underscores and all uppercase words.\n</p>\n\n<rx-example name=\"rxTitleize.simple\"></rx-example>\n\n",
            "less": ""
        }
    },
    {
        "displayName": "rxToggle",
        "stability": "stable",
        "description": "",
        "api": "directive:rxToggle",
        "keywords": [
            "rxToggle",
            "toggle"
        ],
        "name": "rxToggle",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxToggle/scripts/rxToggle.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  This component provides an attribute directive to handle\n  toggling a boolean scopeproperty for show/hide purposes\n  (normally used in conjunction with ng-show to toggle hidden content).\n</p>\n\n<rx-example name=\"rxToggle.simple\"></rx-example>",
            "less": ""
        }
    },
    {
        "displayName": "rxTokenInterceptor",
        "stability": "stable",
        "description": "Adds an authorization token to all HTTP requests, which allows access to system services.",
        "api": "service:rxTokenInterceptor",
        "keywords": [
            "TokenInterceptor"
        ],
        "name": "rxTokenInterceptor",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxTokenInterceptor/scripts/rxTokenInterceptor.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Adds an authorization token to all HTTP requests.  This allows access to system services for\n  authenticated users.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxUnauthorizedInterceptor",
        "stability": "stable",
        "description": "Redirects users to the login page, when user authentication fails during a system service request.",
        "api": "service:rxUnauthorizedInterceptor",
        "keywords": [
            "UnauthorizedInterceptor"
        ],
        "name": "rxUnauthorizedInterceptor",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxUnauthorizedInterceptor/scripts/rxUnauthorizedInterceptor.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Redirects users to the login page, when user authentication fails during a system service request.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxUnsafeRemoveHTML",
        "stability": "stable",
        "description": "Removes all HTML tags from a string.",
        "api": "filter:rxUnsafeRemoveHTML",
        "keywords": [],
        "name": "rxUnsafeRemoveHTML",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxUnsafeRemoveHTML/scripts/rxUnsafeRemoveHTML.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "angular.module('demoApp')\n.controller('rxUnsafeRemoveHTMLSimpleCtrl', function ($scope) {\n    $scope.sample = 'Sample string <strong>without</strong> <span>HTML tags</span>.';\n});\n",
            "html": "<p>\n  Removes all HTML tags from a given string, using the browser's own parsing engine.  Any content inside of tags will be kept.\n</p>\n\n<rx-example name=\"rxUnsafeRemoveHTML.simple\"></rx-example>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxUrlUtils",
        "stability": "stable",
        "description": "Set of utility functions to break apart/compare URLs.",
        "api": "service:rxUrlUtils",
        "keywords": [
            "urlUtils"
        ],
        "name": "rxUrlUtils",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxUrlUtils/scripts/rxUrlUtils.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Set of utility functions to break apart/compare URLs.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxUtcOffsets",
        "stability": "prototype",
        "description": "List of known UTC offset values",
        "api": "constant:rxUtcOffsets",
        "keywords": [
            "UtcOffsets"
        ],
        "name": "rxUtcOffsets",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxUtcOffsets/scripts/rxUtcOffsets.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  List of known UTC Offset Values as found at\n  <a href=\"https://en.wikipedia.org/wiki/List_of_UTC_time_offsets\"\n    target=\"_blank\">\n    https://en.wikipedia.org/wiki/List_of_UTC_time_offsets\n  </a>.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxVisibility",
        "stability": "deprecated",
        "description": "Provides an interface for adding new visibility methods for nav menus.",
        "api": "service:rxVisibility",
        "keywords": [],
        "name": "rxVisibility",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxVisibility/scripts/rxVisibility.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Provides an interface for adding new <code>visibility</code> methods for nav menus.\n</p>",
            "less": ""
        }
    },
    {
        "displayName": "rxVisibilityPathParams",
        "stability": "deprecated",
        "description": "Returns an object with name and method params that can be passed to rxVisibility.addMethod().",
        "api": "service:rxVisibilityPathParams",
        "keywords": [],
        "name": "rxVisibilityPathParams",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxVisibilityPathParams/scripts/rxVisibilityPathParams.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>\n  Returns an object with name and method params that can be passed to <a href=\"#/utilities/rxVisibility\">rxVisibility</a>.\n</p>\n",
            "less": ""
        }
    },
    {
        "displayName": "rxXor",
        "stability": "prototype",
        "description": "rxXor filter",
        "api": "filter:rxXor",
        "keywords": [
            "xor"
        ],
        "name": "rxXor",
        "moduleName": "'encore.ui.utilities'",
        "category": "utilities",
        "isLegacy": false,
        "hasApi": true,
        "isCategory": false,
        "srcFiles": [
            "src/utilities/rxXor/scripts/rxXor.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "docs": {
            "md": "",
            "js": "",
            "html": "<p>rxXor filter</p>\n",
            "less": ""
        }
    }
]);
