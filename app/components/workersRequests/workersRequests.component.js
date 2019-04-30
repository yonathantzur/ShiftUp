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
var workers_service_1 = require("../../services/workers/workers.service");
var WorkersRequestsComponent = /** @class */ (function () {
    function WorkersRequestsComponent(usersService, businessesService, workersService, router) {
        var _this = this;
        this.usersService = usersService;
        this.businessesService = businessesService;
        this.workersService = workersService;
        this.router = router;
        this.requestUsers = [];
        this.business = {};
        this.salaries = [];
        this.backToWorkersHandler = function () {
            _this.router.navigateByUrl('/workers');
        };
        this.calcAge = function (birthDate) {
            if (birthDate) {
                return new Date(Date.now() - new Date(birthDate).valueOf()).getFullYear() - 1970;
            }
            else {
                return 0;
            }
        };
        this.onSalaryChange = function (newSalary, index) {
            _this.requestUsers[index].salary = newSalary;
        };
        this.acceptRequestHandler = function (requestUser) {
            if (requestUser.salary < 20 || requestUser.salary > 100) {
                Swal.fire({
                    title: "שגיאה!",
                    text: "שכר לשעה לא בטווח המותר: 20 עד 100",
                    type: "error",
                    confirmButtonText: "אישור"
                });
            }
            else {
                _this.workersService.AddWorkerToBusiness(requestUser.userId, requestUser.salary)
                    .then(function () {
                    _this.removeRequest(requestUser._id);
                    Swal.fire({
                        title: "הפעולה הצליחה",
                        text: "העובד " + requestUser.firstName + ' ' + requestUser.lastName + " נוסף בהצלחה לעסק",
                        type: "success",
                        showConfirmButton: false,
                        timer: 1000
                    });
                })
                    .catch(function (err) {
                    Swal.fire({
                        title: "שגיאה!",
                        text: 'פעולת אישור העובד ' + requestUser.firstName + ' ' + requestUser.lastName + ' נכשלה',
                        type: "error",
                        confirmButtonText: "אישור"
                    });
                    return;
                });
            }
        };
        this.denyRequestHandler = function (requestUser) {
            _this.workersService.DenyWorkerRequest(requestUser._id)
                .then(function (result) {
                _this.removeRequest(requestUser._id);
                Swal.fire({
                    title: "הפעולה הצליחה",
                    text: "בקשת העובד " + requestUser.firstName + ' ' + requestUser.lastName + " נדחתה בהצלחה",
                    type: "success",
                    showConfirmButton: false,
                    timer: 1000
                });
            })
                .catch(function (err) {
                Swal.fire({
                    type: 'error',
                    title: 'שגיאה!',
                    text: 'דחיית הבקשה נכשלה'
                });
            });
        };
        this.removeRequest = function (requestUser_id) {
            _this.requestUsers = _this.requestUsers.filter(function (request) { return request._id !== requestUser_id; });
        };
    }
    WorkersRequestsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.usersService.GetUsersRequestedToBusiness().then(function (usersRequests) {
            _this.requestUsers = usersRequests;
            _this.requestUsers.forEach(function (reqUser, i) {
                _this.requestUsers[i].salary = 20;
                _this.salaries.push(20);
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
            providers: [users_service_1.UsersService, businesses_service_1.BusinessesService, workers_service_1.WorkersService],
            styleUrls: ['./workersRequests.css']
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService,
            businesses_service_1.BusinessesService,
            workers_service_1.WorkersService,
            router_1.Router])
    ], WorkersRequestsComponent);
    return WorkersRequestsComponent;
}());
exports.WorkersRequestsComponent = WorkersRequestsComponent;
//# sourceMappingURL=workersRequests.component.js.map