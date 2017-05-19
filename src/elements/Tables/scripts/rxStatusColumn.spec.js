describe('rxStatusColumn', function () {
    describe('directive:rxStatusColumn', function () {
        var scope, compile, el, rxstatusMappings;

        beforeEach(function () {
            // load module
            module('encore.ui.elements');

            // load templates
            module('templates/rxStatusColumn.html');
            module('templates/rxTooltip-popup.html');

            // Inject in angular constructs
            inject(function ($location, $rootScope, $compile, rxStatusMappings) {
                scope = $rootScope.$new();
                compile = $compile;
                rxstatusMappings = rxStatusMappings;
            });

            scope.status = 'MyInfoStatus';

            rxstatusMappings.mapToActive('SUCCESS');
            rxstatusMappings.mapToDisabled('MyDisabledStatus');
            rxstatusMappings.mapToInfo('MyInfoStatus');
            rxstatusMappings.mapToWarning('MyWarningStatus');
            rxstatusMappings.mapToError('MyErrorStatus');
            rxstatusMappings.mapToPending('InProgress');

            rxstatusMappings.mapToActive('ApiSuccess', 'myApi');
        });

        it('shall set the right style for ACTIVE', function () {
            var validTemplate = '<td rx-status-column status="ACTIVE"></td>';
            el = helpers.createDirective(validTemplate, compile, scope);
            expect(el.hasClass('status-ACTIVE')).to.be.true;
        });

        it('shall set the right style for DISABLED', function () {
            var validTemplate = '<td rx-status-column status="DISABLED"></td>';
            el = helpers.createDirective(validTemplate, compile, scope);
            expect(el.hasClass('status-DISABLED')).to.be.true;
        });

        it('shall set the right style for ERROR', function () {
            var validTemplate = '<td rx-status-column status="ERROR"></td>';
            el = helpers.createDirective(validTemplate, compile, scope);
            expect(el.hasClass('status-ERROR')).to.be.true;
            expect(el.find('i').hasClass('fa-ban')).to.be.true;
        });

        it('shall set the right style for WARNING', function () {
            var validTemplate = '<td rx-status-column status="WARNING"></td>';
            el = helpers.createDirective(validTemplate, compile, scope);
            expect(el.hasClass('status-WARNING')).to.be.true;
            expect(el.find('i').hasClass('fa-exclamation-triangle')).to.be.true;
        });

        it('shall set the right style for INFO', function () {
            var validTemplate = '<td rx-status-column status="INFO"></td>';
            el = helpers.createDirective(validTemplate, compile, scope);
            expect(el.hasClass('status-INFO')).to.be.true;
            expect(el.find('i').hasClass('fa-info-circle')).to.be.true;
        });

        it('shall correctly map to INFO', function () {
            var validTemplate = '<td rx-status-column status="MyInfoStatus"></td>';
            el = helpers.createDirective(validTemplate, compile, scope);
            expect(el.hasClass('status-INFO')).to.be.true;
        });

        it('shall correctly map to DISABLED', function () {
            var validTemplate = '<td rx-status-column status="MyDisabledStatus"></td>';
            el = helpers.createDirective(validTemplate, compile, scope);
            expect(el.hasClass('status-DISABLED')).to.be.true;
        });

        it('shall correctly map to WARNING', function () {
            var validTemplate = '<td rx-status-column status="MyWarningStatus"></td>';
            el = helpers.createDirective(validTemplate, compile, scope);
            expect(el.hasClass('status-WARNING')).to.be.true;
        });

        it('shall correctly map to ERROR', function () {
            var validTemplate = '<td rx-status-column status="MyErrorStatus"></td>';
            el = helpers.createDirective(validTemplate, compile, scope);
            expect(el.hasClass('status-ERROR')).to.be.true;
        });

        it('shall correctly map to PENDING', function () {
            var validTemplate = '<td rx-status-column status="InProgress"></td>';
            el = helpers.createDirective(validTemplate, compile, scope);
            expect(el.hasClass('status-PENDING')).to.be.true;
        });

        it('shall fallback to global mapping if api mapping cannot be found', function () {
            var validTemplate = '<td rx-status-column status="MyErrorStatus" api="myApi"></td>';
            el = helpers.createDirective(validTemplate, compile, scope);
            expect(el.hasClass('status-ERROR')).to.be.true;
        });

        it('shall use the api mapping if present', function () {
            var validTemplate = '<td rx-status-column status="ApiSuccess" api="myApi"></td>';
            el = helpers.createDirective(validTemplate, compile, scope);
            expect(el.hasClass('status-ACTIVE')).to.be.true;
        });

        it('shall use the passed in status as the tooltip text', function () {
            var validTemplate = '<td rx-status-column status="MyErrorStatus"></td>';
            el = helpers.createDirective(validTemplate, compile, scope);
            expect(el.find('span').attr('rx-tooltip')).to.equal('MyErrorStatus');
        });

        it('shall use tooltipContent if passed in', function () {
            var validTemplate = '<td rx-status-column status="MyErrorStatus" tooltip-content="mytooltip"></td>';
            el = helpers.createDirective(validTemplate, compile, scope);
            expect(el.find('span').attr('rx-tooltip')).to.equal('mytooltip');
        });

        it('shall update the status column when status changes', function () {
            var validTemplate = '<td rx-status-column status="{{ status }}"></td>';
            el = helpers.createDirective(validTemplate, compile, scope);
            expect(el.hasClass('status-INFO')).to.be.true;

            scope.status = 'MyErrorStatus';
            scope.$digest();
            expect(el.hasClass('status-ERROR')).to.be.true;
            expect(el.hasClass('status-INFO')).to.be.false;
        });

        it('shall update the tooltip when the tooltip changes', function () {
            scope.tooltipTest = 'My Tooltip';
            var validTemplate = '<td rx-status-column status="MyErrorStatus" tooltip-content="{{ tooltipTest }}"></td>';
            el = helpers.createDirective(validTemplate, compile, scope);
            expect(el.find('span').attr('rx-tooltip')).to.equal('My Tooltip');

            scope.tooltipTest = 'Another Tooltip';
            scope.$digest();
            expect(el.find('span').attr('rx-tooltip')).to.equal('Another Tooltip');
        });
    });
});
