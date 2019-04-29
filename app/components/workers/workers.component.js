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
        this.workers = [];
        this.isNewWorkerComponentActive = false;
        this.btnHover = null;
        this.activateNewWorkerComponent = function () {
            _this.btnHover = null;
            _this.isNewWorkerComponentActive = true;
        };
        this.showRequests = function () {
            _this.router.navigateByUrl('/workers/requests');
        };
        this.addNewWorkerHandler = function (newWorker) {
            if (newWorker) {
                _this.workersService.AddWorkerToBusiness(newWorker.userId, newWorker.salary)
                    .then(function () {
                    _this.workers.push(newWorker);
                    Swal.fire({
                        title: "הפעולה הצליחה",
                        text: "העובד " + newWorker.firstName + ' ' + newWorker.lastName + " נוסף בהצלחה לעסק",
                        type: "success",
                        confirmButtonText: "אישור"
                    });
                })
                    .catch(function (err) {
                    Swal.fire({
                        title: "שגיאה!",
                        text: "הפעולה נכשלה",
                        type: "error",
                        confirmButtonText: "אישור"
                    });
                    return;
                });
            }
            _this.isNewWorkerComponentActive = false;
        };
        this.deleteWorkerHandler = function (worker) {
            Swal.fire({
                title: "האם אתה בטוח?",
                text: "העובד " + worker.firstName + ' ' + worker.lastName + " יימחק",
                type: "warning",
                showCancelButton: true,
                cancelButtonColor: "#d33",
                confirmButtonText: "אישור",
                cancelButtonText: "ביטול"
            }).then(function (result) {
                if (result.value) {
                    _this.workersService.RemoveWorkerFromBusiness(worker.userId)
                        .then(function () {
                        _this.workers = _this.workers.filter(function (worker) { return worker.userId !== worker.userId; });
                        Swal.fire({
                            title: "הפעולה הצליחה!",
                            text: "העובד נמחק בהצלחה",
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
                            showConfirmButton: false,
                            timer: 1000
                        });
                    });
                }
            });
        };
    }
    WorkersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.businessesService.GetLoggedInBusiness().then(function (business) {
            _this.business = business;
        });
        this.businessesService.GetWorkersForBusiness().then(function (workers) {
            _this.workers = workers;
        });
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