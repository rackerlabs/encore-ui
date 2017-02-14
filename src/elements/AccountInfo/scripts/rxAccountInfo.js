angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxAccountInfo
 * @restrict E
 * @scope
 * @requires $interpolate
 * @description
 * This element is used to draw an account info box at the top of each page,
 * directly underneath the breadcrumbs. `rxPage` (through `rxApp`) integrates it
 * directly into its template, and you activate it by passing `account-number="..."`
 * to `<rx-page>`.
 *
 * While you could theoretically use this element elsewhere, its design and style
 * were done with the intention of sitting underneath the breadcrumbs.
 *
 * When placed on a page that has `:user` in its route parameters, this element
 * will also draw a drop-down user selector, to allow the Racker to change which
 * user they're looking at for the given account. At this time, this user-selection
 * is *only* available for products under Cloud. If you need it for additional products,
 * please let us know.
 *
 * This directive requires that `SupportAccount`, `Encore`, `AccountStatusGroup`,
 * and `Teams` services are available. These are not provided by this project,
 * but are available in an internal Rackspace repository.
 *
 * There are two different styles of account info box supported. The "old" one, which appears
 * wherever you want it to be, and a new one that is intended to be placed underneath the breadcrumbs.
 * To use the new one, pass `account-info-banner="true"` to this directive
 *
 * @param {String} accountNumber The account number to load and retrieve data for
 * @param {String=} teamId Team ID, used for loading team badges
 * @param {String=} [notifyStack='page'] Notifications stack to put errors on.
 * @param {String=} accountInfoBanner Set to "true" to use the new under-the-breadcrumbs style
 */
.directive('rxAccountInfo', function (Teams, SupportAccount, Encore, rxNotify, encoreRoutes,
    AccountStatusGroup, $interpolate) {
    return {
        templateUrl: function (elem, attr) {
            if (attr.accountInfoBanner === 'true') {
                return 'templates/rxAccountInfoBanner.html';
            }
            return 'templates/rxAccountInfo.html';
        },
        restrict: 'E',
        transclude: true,
        scope: {
            accountNumber: '@',
            teamId: '@',
            notifyStack: '@'
        },
        link: function (scope) {
            var notifyStack = scope.notifyStack || 'page';
            scope.badges = [];
            scope.tooltipHtml = function (badge) {
                return ['<span class="tooltip-header">', badge.name,
                        '</span><p>', badge.description, '</p>'].join('');
            };

            // Currently, the only time we should show the `Current User` area is
            // if the Racker is on the Cloud page
            encoreRoutes.isActiveByKey('cloud').then(function (isCloud) {
                scope.showCurrentUser = isCloud;
            });

            scope.accountPageUrl = $interpolate('/accounts/{{accountNumber}}')(scope);

            SupportAccount.getBadges({ accountNumber: scope.accountNumber }, function (badges) {
                scope.badges = scope.badges.concat(badges);
            }, function () {
                rxNotify.add('Error retrieving badges for this account', {
                    type: 'error',
                    stack: notifyStack
                });
            });

            var fetchTeamBadges = function (teamId) {
                Teams.badges({ id: teamId }).$promise.then(function (badges) {
                    scope.badges = scope.badges.concat(badges);
                }, function () {
                    rxNotify.add('Error retrieving badges for this team', {
                        type: 'error',
                        stack: notifyStack
                    });
                });
            };

            if (!_.isEmpty(scope.teamId) && (_.isNumber(_.parseInt(scope.teamId)))) {
                fetchTeamBadges(scope.teamId);
            }

            Encore.getAccount({ id: scope.accountNumber }, function (account) {
                // Only attempt if no teamId is passed to directive
                if (_.isEmpty(scope.teamId)) {
                    var primaryTeam = _.find(account.teams, function (team) {
                        return _.includes(team.flags, 'primary');
                    });

                    if (primaryTeam) {
                        fetchTeamBadges(primaryTeam.id);
                    }
                }

                scope.accountName = account.name;
                scope.accountStatus = account.status;
                scope.accountAccessPolicy = account.accessPolicy;
                scope.statusClass = '';
                var statusClass = AccountStatusGroup(account.status);
                if (statusClass === 'warning') {
                    scope.statusClass = 'msg-warn';
                } else if (statusClass === 'info') {
                    scope.statusClass = 'msg-info';
                }
            }, function () {
                rxNotify.add('Error retrieving account name', {
                    type: 'error',
                    stack: notifyStack
                });
            });
        }
    };
});
