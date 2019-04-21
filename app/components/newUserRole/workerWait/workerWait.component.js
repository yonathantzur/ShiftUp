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
var workers_service_1 = require("../../../services/workers/workers.service");
var router_1 = require("@angular/router");
var login_service_1 = require("../../../services/login/login.service");
var WorkerWaitComponent = /** @class */ (function () {
    function WorkerWaitComponent(workerService, router, loginService) {
        this.workerService = workerService;
        this.router = router;
        this.loginService = loginService;
    }
    WorkerWaitComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.workerService.GetWaitBusinessDetails().then(function (result) {
            _this.business = result;
        });
    };
    WorkerWaitComponent.prototype.logout = function () {
        var _this = this;
        this.loginService.logout().then(function () {
            _this.router.navigateByUrl('/login');
        });
    };
    WorkerWaitComponent.prototype.cancelRequest = function () {
    };
    WorkerWaitComponent = __decorate([
        core_1.Component({
            selector: 'workerWait',
            templateUrl: './workerWait.html',
            providers: [workers_service_1.WorkersService],
            styleUrls: ['./workerWait.css']
        }),
        __metadata("design:paramtypes", [workers_service_1.WorkersService,
            router_1.Router,
            login_service_1.LoginService])
    ], WorkerWaitComponent);
    return WorkerWaitComponent;
}());
exports.WorkerWaitComponent = WorkerWaitComponent;
//# sourceMappingURL=workerWait.component.js.map