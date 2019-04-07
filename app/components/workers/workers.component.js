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
var users_service_1 = require("../../services/users/users.service");
var businesses_service_1 = require("../../services/businesses/businesses.service");
var workers_service_1 = require("../../services/workers/workers.service");
var WorkersComponent = /** @class */ (function () {
    function WorkersComponent(usersService, businessesService, workersService) {
        var _this = this;
        this.usersService = usersService;
        this.businessesService = businessesService;
        this.workersService = workersService;
        this.business = {};
        this.workers = [
        // { userId: '315856716', salary: 28 },
        // { userId: '208203430', salary: 40 },
        // { userId: '316579614', salary: 31 },
        ];
        this.isNewWorkerDialogOpen = false;
        this.openNewWorkerDialog = function () {
            _this.isNewWorkerDialogOpen = true;
        };
        this.onNewWorkerClose = function (newWorker) {
            if (newWorker) {
                if (_this.workers.find(function (currWorker) { return currWorker.userId == newWorker.userId; })) {
                    Swal.fire({
                        title: "שגיאה!",
                        text: "קיים עובד עם מספר תעודת זהות זהה.",
                        type: "error",
                        confirmButtonText: "אישור"
                    });
                    return;
                }
                else {
                    _this.workersService.AddWorkerToBusiness(newWorker.userId, newWorker.salary)
                        .then(function () {
                        _this.workers.push(newWorker);
                        Swal.fire({
                            title: "הפעולה הצליחה",
                            text: "העובד " + newWorker.userId + " נוסף בהצלחה לעסק",
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
            }
            _this.isNewWorkerDialogOpen = false;
        };
        this.onDeleteWorker = function (workerUserId) {
            Swal.fire({
                title: "האם אתה בטוח?",
                text: "העובד " + workerUserId + " יימחק.",
                type: "warning",
                showCancelButton: true,
                cancelButtonColor: "#d33",
                confirmButtonText: "אישור",
                cancelButtonText: "ביטול"
            }).then(function (result) {
                if (result.value) {
                    _this.workersService.RemoveWorkerFromBusiness(workerUserId)
                        .then(function () {
                        _this.workers = _this.workers.filter(function (worker) { return worker.userId !== workerUserId; });
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
        this.onDeleteAllWorkers = function () {
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
                    _this.workers = [];
                    Swal.fire({
                        title: "הפעולה הצליחה!",
                        text: "כל העובדים נמחקו בהצלחה.",
                        type: "success",
                        showConfirmButton: false,
                        timer: 1500
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
            providers: [users_service_1.UsersService, businesses_service_1.BusinessesService, workers_service_1.WorkersService],
            styleUrls: ['./workers.css']
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService,
            businesses_service_1.BusinessesService,
            workers_service_1.WorkersService])
    ], WorkersComponent);
    return WorkersComponent;
}());
exports.WorkersComponent = WorkersComponent;
//# sourceMappingURL=workers.component.js.map