'use strict';

describe("PatientDashboardTreatmentController", function () {

    beforeEach(module('bahmni.clinical'));

    var scope, ngDialog;
    var stateParams;
    var _clinicalAppConfigService;
    var _retrospectiveEntryService;

    var treatmentConfigParams = {
        title: "Treatments",
        name: "treatment",
        dashboardParams: {
            title: null,
            showChart: false,
            showTable: true,
            numberOfVisits: 2,
            showOtherActive: true,
            showCommentsExpanded: false
        },
        summaryPageParams: {
            title: null,
            showChart: false,
            showTable: true,
            numberOfVisits: 1,
            showOtherActive: true,
            showCommentsExpanded: false
        }
    };

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        scope.patient = {
            uuid: "patient uuid"
        };

        ngDialog = jasmine.createSpyObj('ngDialog', ['open']);

        _clinicalAppConfigService = jasmine.createSpyObj('clinicalAppConfigService', ['getPatientDashBoardSectionByName']);
        _clinicalAppConfigService.getPatientDashBoardSectionByName.and.returnValue(treatmentConfigParams);

        var retrospectiveEntry = Bahmni.Common.Domain.RetrospectiveEntry.createFrom(Date.now());
        _retrospectiveEntryService = jasmine.createSpyObj('retrospectiveEntryService', ['getRetrospectiveEntry']);
        _retrospectiveEntryService.getRetrospectiveEntry.and.returnValue(retrospectiveEntry);

        $controller('PatientDashboardTreatmentController', {
            $scope: scope,
            ngDialog: ngDialog,
            clinicalAppConfigService: _clinicalAppConfigService,
            retrospectiveEntryService: _retrospectiveEntryService

        });
    }));

    describe("The controller is loaded", function () {
        it("should setup the scope", function () {
            expect(scope.patient.uuid).toBe("patient uuid");
        });
    });

    describe("Should fetch configuration", function () {
        it("should fetch dashboard params", function () {
            var expected = {};
            _.extend(expected, treatmentConfigParams.dashboardParams || {}, {patientUuid: "patient uuid"});
            expect(expected).toEqual(scope.dashboardParams);
        });

        it("should fetch summary page params", function () {
            var expected = {};
            _.extend(expected, treatmentConfigParams.summaryPageParams || {}, {patientUuid: "patient uuid"});
            expect(expected).toEqual(scope.summaryPageParams);
        });
    });
});