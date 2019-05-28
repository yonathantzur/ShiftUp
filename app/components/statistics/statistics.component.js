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
var constraints_service_1 = require("../../services/constraints/constraints.service");
var shifts_service_1 = require("../../services/shifts/shifts.service");
var StatisticsComponent = /** @class */ (function () {
    function StatisticsComponent(usersService, businessesService, workersService, constraintsService, shiftService) {
        this.usersService = usersService;
        this.businessesService = businessesService;
        this.workersService = workersService;
        this.constraintsService = constraintsService;
        this.shiftService = shiftService;
        this.loadingRequets = 3;
        this.loadingRequets = 3;
    }
    StatisticsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.businessesService.GetLoggedInBusiness().then(function (business) {
            _this.business = business;
            _this.loadingRequets--;
        });
        this.businessesService.GetWorkersForBusiness().then(function (workers) {
            _this.manager = workers.filter(function (worker) { return worker.isManager; })[0];
            _this.workers = workers.filter(function (worker) { return !worker.isManager; });
            _this.loadingRequets--;
        });
        this.constraintsService.getAllConstraints().then(function (constraints) {
            _this.constraints = constraints;
            _this.loadingRequets--;
        });
    };
    StatisticsComponent = __decorate([
        core_1.Component({
            selector: 'statistics',
            templateUrl: './statistics.html',
            providers: [
                users_service_1.UsersService,
                businesses_service_1.BusinessesService,
                workers_service_1.WorkersService,
                constraints_service_1.ConstraintsService,
                shifts_service_1.ShiftService
            ],
            styleUrls: ['./statistics.css']
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService,
            businesses_service_1.BusinessesService,
            workers_service_1.WorkersService,
            constraints_service_1.ConstraintsService,
            shifts_service_1.ShiftService])
    ], StatisticsComponent);
    return StatisticsComponent;
}());
exports.StatisticsComponent = StatisticsComponent;
//# sourceMappingURL=statistics.component.js.map