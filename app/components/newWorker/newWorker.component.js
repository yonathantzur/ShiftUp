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
var NewWorkerComponent = /** @class */ (function () {
    function NewWorkerComponent(usersService) {
        var _this = this;
        this.usersService = usersService;
        this.newWorker = { userId: "", salary: 20 };
        this.onSubmit = new core_1.EventEmitter();
        this.strUserIdErrorMessage = "";
        this.strSalaryErrorMessage = "";
        this.isUserIdValid = false;
        this.onCancel = function () {
            _this.onSubmit.emit();
        };
        this.onUserIdChange = function (newUserId) {
            if (newUserId.match("^[0-9]{0,9}$")) {
                _this.strUserIdErrorMessage = "";
                _this.strSalaryErrorMessage = "";
                _this.newWorker["userId"] = newUserId;
                if (newUserId.length == 9) {
                    _this.usersService.IsUserAvailableForBusiness(newUserId).then(function (isAvailable) {
                        if (isAvailable) {
                            _this.isUserIdValid = true;
                            _this.strUserIdErrorMessage = "";
                            _this.newWorker.userId = newUserId;
                        }
                        else {
                            _this.isUserIdValid = false;
                            _this.strUserIdErrorMessage = "מספר תעודת זהות לא ביקש להצטרף לעסק";
                        }
                    });
                }
                else {
                    _this.isUserIdValid = false;
                    _this.strUserIdErrorMessage = "מספר תעודת זהות חייב להכיל 9 ספרות";
                }
            }
            else {
                _this.strUserIdErrorMessage = "מספר תעודת זהות לא תקין";
                if (newUserId.length == 9) {
                    _this.isUserIdValid = false;
                }
            }
        };
        this.onSalaryChange = function (newSalary) {
            _this.strSalaryErrorMessage = "";
            if (newSalary < 20 || newSalary > 100) {
                _this.strSalaryErrorMessage = "שכר לשעה לא בטווח המותר";
            }
            else {
                _this.newWorker.salary = newSalary;
            }
        };
        this.submitHandler = function (addNewWorkerForm) {
            if (_this.validatedWorker(_this.newWorker)) {
                _this.onSubmit.emit(_this.newWorker);
            }
        };
        this.validatedWorker = function (worker) {
            _this.strUserIdErrorMessage = "";
            _this.strSalaryErrorMessage = "";
            if (parseInt(worker.userId) < 0) {
                _this.strUserIdErrorMessage = "מספר תעודת זהות לא תקין";
                return false;
            }
            else if (worker.userId.length != 9) {
                _this.strUserIdErrorMessage = "מספר תעודת זהות חייב להכיל 9 ספרות";
                return false;
            }
            else if (worker.salary < 20 || worker.salary > 100) {
                _this.strSalaryErrorMessage = "שכר לשעה לא בטווח המותר";
                return false;
            }
            return _this.usersService.IsUserAvailableForBusiness(worker.userId).then(function (isAvailable) {
                if (isAvailable) {
                    _this.strUserIdErrorMessage = "";
                    return true;
                }
                else {
                    _this.strUserIdErrorMessage = "מספר תעודת זהות לא ביקש להצטרף לעסק";
                    return false;
                }
            }).catch(function () {
                _this.strUserIdErrorMessage = "קרתה שגיאה";
                return false;
            });
        };
    }
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], NewWorkerComponent.prototype, "onSubmit", void 0);
    NewWorkerComponent = __decorate([
        core_1.Component({
            selector: 'newWorker',
            templateUrl: './newWorker.html',
            providers: [users_service_1.UsersService],
            styleUrls: ['./newWorker.css']
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService])
    ], NewWorkerComponent);
    return NewWorkerComponent;
}());
exports.NewWorkerComponent = NewWorkerComponent;
//# sourceMappingURL=newWorker.component.js.map