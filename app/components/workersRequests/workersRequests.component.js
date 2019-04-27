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
var users_service_1 = require("../../services/users/users.service");
var businesses_service_1 = require("../../services/businesses/businesses.service");
var WorkersRequestsComponent = /** @class */ (function () {
    function WorkersRequestsComponent(usersService, businessesService, router) {
        var _this = this;
        this.usersService = usersService;
        this.businessesService = businessesService;
        this.router = router;
        this.requestUsers = [];
        this.business = {};
        this.salaries = [];
        this.salariesErrorMessages = [];
        this.onSalaryChange = function (newSalary, index) {
            _this.salariesErrorMessages[index] = "";
            if (newSalary < 20 || newSalary > 100) {
                _this.salariesErrorMessages[index] = "שכר לשעה לא בטווח המותר";
            }
            else {
                _this.requestUsers[index].salary = newSalary;
            }
            // this.strSalaryErrorMessage = "";
            // if (newSalary < 20 || newSalary > 100) {
            //     this.strSalaryErrorMessage = "שכר לשעה לא בטווח המותר";
            // } else {
            //     this.newWorker.salary = newSalary;
            // }
        };
        this.calcAge = function (strBirthDate) {
            var birthDate = new Date(strBirthDate).valueOf();
            return new Date(Date.now() - birthDate).getFullYear() - 1970;
        };
        this.backToWorkersHandler = function () {
            _this.router.navigateByUrl('/workers');
        };
    }
    WorkersRequestsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.usersService.GetUsersRequestedToBusiness().then(function (usersRequests) {
            _this.requestUsers = usersRequests;
            _this.requestUsers.forEach(function (reqUser, i) {
                _this.requestUsers[i].salary = 20;
                _this.salaries.push(20);
                _this.salariesErrorMessages.push("");
            });
        });
        this.businessesService.GetLoggedInBusiness().then(function (business) {
            _this.business = business;
        });
    };
    WorkersRequestsComponent = __decorate([
        core_1.Component({
            selector: 'workersRequests',
            templateUrl: './workersRequests.html',
            providers: [users_service_1.UsersService, businesses_service_1.BusinessesService],
            styleUrls: ['./workersRequests.css']
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService,
            businesses_service_1.BusinessesService,
            router_1.Router])
    ], WorkersRequestsComponent);
    return WorkersRequestsComponent;
}());
exports.WorkersRequestsComponent = WorkersRequestsComponent;
//# sourceMappingURL=workersRequests.component.js.map