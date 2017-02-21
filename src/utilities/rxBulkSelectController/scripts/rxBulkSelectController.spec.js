describe('utilities:rxBulkSelectController', function () {
    var scope, rootScope, timeout;

    var servers = [
        { name: 'server1', rowIsSelected: false },
        { name: 'server2', rowIsSelected: false },
        { name: 'server3', rowIsSelected: false }
    ];

    var rxBulkSelectUtils = {
        setAllVisibleRows: function (val, tableElement, key) {
            _.each(servers, function (server) {
                server[key] = val;
            });
        }
    };

    beforeEach(function () {
        module('encore.ui.utilities');
        module('encore.ui.elements', function ($provide) {
            $provide.value('rxBulkSelectUtils', rxBulkSelectUtils);
        });
        module('templates/rxBulkSelectMessage.html');
        module('templates/rxBatchActions.html');

        inject(function ($rootScope, $timeout) {
            rootScope = $rootScope;
            scope = rootScope.$new();
            timeout = $timeout;
        });

        scope.servers = servers;
        scope.$digest();
    });

    describe('controller:rxBulkSelectController', function () {
        var ctrl, ctrlScope, numSelected;

        beforeEach(function () {
            ctrlScope = rootScope.$new();
            ctrlScope.tableElement = {};
            ctrlScope._rxFloatingHeaderCtrl = { reapply: _.noop };
            ctrlScope.selectedKey = 'rowIsSelected';
            ctrlScope.bulkSource = scope.servers;

            inject(function ($controller) {
                ctrl = $controller('rxBulkSelectController', {
                    $scope: ctrlScope
                });
            });

            var update = function (newVal) {
                numSelected = newVal;
            };

            ctrl.registerForNumSelected(update);
        });

        it('should allow for numSelected registrations',  function () {
            // In the actual directives, the call to `ctrl.increment()`
            // happens automatically when `rowIsSelected` goes true. It's
            // only in the tests that I have to set them separately like this
            scope.servers[0].rowIsSelected = true;
            ctrl.increment();
            timeout.flush();
            expect(numSelected).to.equal(1);

            scope.servers[1].rowIsSelected = true;
            ctrl.increment();
            timeout.flush();
            expect(numSelected).to.equal(2);

            scope.servers[1].rowIsSelected = false;
            ctrl.decrement();
            timeout.flush();
            expect(numSelected).to.equal(1);
        });

        it('should return the row key', function () {
            expect(ctrl.key()).to.equal('rowIsSelected');
        });

        it('should select all visible rows', function () {
            ctrl.selectAllVisibleRows();
            timeout.flush();
            expect(numSelected).to.equal(3);
        });

        it('should deselect all visible rows', function () {
            ctrl.deselectAllVisibleRows();
            timeout.flush();
            expect(numSelected).to.equal(0);
        });

        it('should select all rows', function () {
            ctrl.selectEverything();
            timeout.flush();
            expect(numSelected).to.equal(3);
        });

        it('should deselect all rows', function () {
            ctrl.deselectEverything();
            timeout.flush();
            expect(numSelected).to.equal(0);
        });
    });//controller:rxBulkSelectController
});//utilities:rxBulkSelectController
