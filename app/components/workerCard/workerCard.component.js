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
var WorkerCardComponent = /** @class */ (function () {
    function WorkerCardComponent(usersService) {
        var _this = this;
        this.usersService = usersService;
        this.onClose = new core_1.EventEmitter();
        this.workerUserData = {};
        this.calcAge = function (strBirthDate) {
            var birthDate = new Date(strBirthDate).valueOf();
            return new Date(Date.now() - birthDate).getFullYear() - 1970;
        };
        this.calcWorkerSalery = function () {
            Swal.fire({
                title: "עדיין בפיתוח! עובדים על זה",
                text: "חישוב שכר עבור עובד " + _this.worker.userId,
                type: "warning",
                confirmButtonText: "אישור"
            });
        };
        this.deleteWorker = function () {
            _this.onClose.emit();
        };
    }
    WorkerCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.usersService.GetUserById(this.worker.userId)
            .then(function (userData) { return _this.workerUserData = userData; });
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WorkerCardComponent.prototype, "onClose", void 0);
    WorkerCardComponent = __decorate([
        core_1.Component({
            selector: 'workerCard',
            templateUrl: './workerCard.html',
            providers: [users_service_1.UsersService],
            styleUrls: ['./workerCard.css'],
            inputs: ['worker: worker']
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService])
    ], WorkerCardComponent);
    return WorkerCardComponent;
}());
exports.WorkerCardComponent = WorkerCardComponent;
//# sourceMappingURL=workerCard.component.js.map