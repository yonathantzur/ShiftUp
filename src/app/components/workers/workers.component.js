"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var businesses_service_1 = require("../../services/businesses/businesses.service");
var workers_service_1 = require("../../services/workers/workers.service");
var WorkersComponent = /** @class */ (function () {
    function WorkersComponent(businessesService, workersService, router) {
        var _this = this;
        this.businessesService = businessesService;
        this.workersService = workersService;
        this.router = router;
        this.business = {};
        this.workerSearchText = "";
        this.showRequests = function () {
            _this.router.navigateByUrl('/workers/requests');
        };
        this.deleteWorkerHandler = function (workerToDelete) {
            Swal.fire({
                title: "האם אתה בטוח?",
                text: "העובד " + workerToDelete.firstName + ' ' + workerToDelete.lastName + " יימחק",
                type: "warning",
                showCancelButton: true,
                cancelButtonColor: "#d33",
                confirmButtonText: "אישור",
                cancelButtonText: "ביטול"
            }).then(function (result) {
                if (result.value) {
                    _this.workersService.RemoveWorkerFromBusiness(workerToDelete.userId)
                        .then(function () {
                        _this.allWorkers = _this.allWorkers.filter(function (worker) { return worker.userId !== workerToDelete.userId; });
                        _this.SearchWorkerHandler();
                        Swal.fire({
                            title: "הפעולה הצליחה!",
                            text: "העובד " + workerToDelete.firstName + " " + workerToDelete.lastName + " נמחק בהצלחה",
                            type: "success",
                            showConfirmButton: false,
                            timer: 1000
                        });
                    })
                        .catch(function (err) {
                        Swal.fire({
                            title: "שגיאה",
                            text: "הפעולה נכשלה!",
                            type: "error",
                            confirmButtonText: "אישור"
                        });
                    });
                }
            });
        };
        this.deleteAllWorkersHandler = function () {
            Swal.fire({
                title: "האם אתה בטוח?",
                text: "כל העובדים יימחקו.",
                type: "warning",
                showCancelButton: true,
                cancelButtonColor: "#d33",
                confirmButtonText: "אישור",
                cancelButtonText: "ביטול"
            }).then(function (result) {
                if (result.value) {
                    _this.workersService.RemoveAllWorkersFromBusiness()
                        .then(function () {
                        _this.allWorkers = [];
                        _this.filteredWorkers = [];
                        Swal.fire({
                            title: "הפעולה הצליחה!",
                            text: "כל העובדים נמחקו בהצלחה.",
                            type: "success",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
                        .catch(function (err) {
                        Swal.fire({
                            title: "שגיאה",
                            text: "הפעולה נכשלה!",
                            type: "error",
                            confirmButtonText: "אישור"
                        });
                    });
                }
            });
        };
        this.SearchWorkerHandler = function () {
            if (_this.workerSearchText) {
                _this.filteredWorkers = _this.allWorkers.filter(function (worker) {
                    var currWorkerFullName = worker.firstName + ' ' + worker.lastName;
                    var currWorkerFullNameReversed = worker.lastName + ' ' + worker.firstName;
                    return currWorkerFullName.indexOf(_this.workerSearchText) == 0 ||
                        currWorkerFullNameReversed.indexOf(_this.workerSearchText) == 0 ||
                        worker.userId.indexOf(_this.workerSearchText) == 0;
                });
            }
            else {
                _this.filteredWorkers = _this.allWorkers;
            }
        };
        this.ResetSearchWorkerHandler = function () {
            _this.workerSearchText = "";
            _this.filteredWorkers = _this.allWorkers;
        };
    }
    WorkersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.businessesService.GetLoggedInBusiness().then(function (business) {
            _this.business = business;
        });
        this.businessesService.GetWorkersForBusiness().then(function (workers) {
            _this.manager = workers.filter(function (worker) { return worker.isManager; })[0];
            _this.allWorkers = workers.filter(function (worker) { return !worker.isManager; });
            _this.filteredWorkers = _this.allWorkers;
        });
    };
    // Calculate padding to center the cards.
    WorkersComponent.prototype.calcCardsContainerPadding = function () {
        var containerWidth = $("#cards-container").innerWidth();
        var cardWidth = $(".workerCard").innerWidth();
        var cardsInLine = Math.min(5, Math.floor(containerWidth / cardWidth));
        var cardsMargin = 30 * cardsInLine;
        var finalWidth = containerWidth - (cardsInLine * cardWidth) - cardsMargin;
        return "0 " + Math.min((finalWidth / 2), cardWidth) + "px";
    };
    WorkersComponent = __decorate([
        core_1.Component({
            selector: 'workers',
            templateUrl: './workers.html',
            providers: [businesses_service_1.BusinessesService, workers_service_1.WorkersService],
            styleUrls: ['./workers.css']
        }),
        __metadata("design:paramtypes", [businesses_service_1.BusinessesService,
            workers_service_1.WorkersService,
            router_1.Router])
    ], WorkersComponent);
    return WorkersComponent;
}());
exports.WorkersComponent = WorkersComponent;
//# sourceMappingURL=workers.component.js.map