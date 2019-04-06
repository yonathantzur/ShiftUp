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
var worker_service_1 = require("../../../services/worker/worker.service");
var router_1 = require("@angular/router");
var WorkerComponent = /** @class */ (function () {
    function WorkerComponent(workerService, router) {
        this.workerService = workerService;
        this.router = router;
    }
    WorkerComponent.prototype.SearchForBusiness = function () {
        var _this = this;
        this.business = null;
        this.businessId && this.workerService.GetBusinessByCode(this.businessId).then(function (result) {
            if (result == false) {
                Swal.fire({
                    type: 'error',
                    title: 'אופס...',
                    text: 'נראה כי הקוד שהוזן לא שייך לאף בית עסק'
                });
            }
            else if (result == null) {
                Swal.fire({
                    type: 'error',
                    title: 'שגיאה',
                    text: 'אופס... משהו השתבש'
                });
            }
            else {
                _this.business = result;
            }
        });
    };
    WorkerComponent.prototype.back = function () {
        this.router.navigateByUrl('/role');
    };
    WorkerComponent.prototype.SendWorkerRequest = function () {
        this.workerService.SendWorkerRequest(this.business._id, this.business.manager._id).then(function (result) {
            if (result) {
            }
            else {
                Swal.fire({
                    type: 'error',
                    title: 'שגיאה',
                    text: 'אופס... משהו השתבש'
                });
            }
        });
    };
    WorkerComponent = __decorate([
        core_1.Component({
            selector: 'worker',
            templateUrl: './worker.html',
            providers: [worker_service_1.WorkerService],
            styleUrls: ['./worker.css']
        }),
        __metadata("design:paramtypes", [worker_service_1.WorkerService,
            router_1.Router])
    ], WorkerComponent);
    return WorkerComponent;
}());
exports.WorkerComponent = WorkerComponent;
//# sourceMappingURL=worker.component.js.map