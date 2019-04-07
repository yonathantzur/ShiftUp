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
        this.onClose = new core_1.EventEmitter();
        this.strErrorMessage = "";
        this.isUserIdValid = false;
        this.blurClicked = function () {
            _this.onClose.emit();
        };
        this.onCancel = function () {
            _this.onClose.emit();
        };
        this.onChange = function (event) {
            var fieldName = event.target.name;
            var fieldValue = event.target.value;
            if (event.target.type == "number" || event.target.type == "range") {
                fieldValue = (fieldValue == "") ? 0 : parseInt(fieldValue.toString());
            }
            _this.newWorker[fieldName] = fieldValue;
        };
        this.onUserIdChange = function (newUserId) {
            if (newUserId.match("^[0-9]{0,9}$")) {
                _this.strErrorMessage = "";
                _this.newWorker["userId"] = newUserId;
                if (newUserId.length == 9) {
                    _this.usersService.IsUserAvailableForBusiness(newUserId).then(function (isAvailable) {
                        if (isAvailable) {
                            _this.isUserIdValid = true;
                        }
                        else {
                            _this.isUserIdValid = false;
                        }
                    });
                }
            }
            else {
                _this.strErrorMessage = "מספר תעודת זהות לא תקין";
                if (newUserId.length == 9) {
                    _this.isUserIdValid = false;
                }
            }
        };
        this.onSubmit = function () {
            if (_this.validatedWorker(_this.newWorker)) {
                _this.onClose.emit(_this.newWorker);
            }
        };
        this.validatedWorker = function (worker) {
            _this.strErrorMessage = "";
            if (parseInt(worker.userId) < 0) {
                _this.strErrorMessage = "מספר תעודת זהות לא תקין";
                return false;
            }
            else if (worker.userId.length != 9) {
                _this.strErrorMessage = "מספר תעודת זהות חייב להכיל 9 ספרות";
                return false;
            }
            return true;
        };
    }
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], NewWorkerComponent.prototype, "onClose", void 0);
    NewWorkerComponent = __decorate([
        core_1.Component({
            selector: 'newWorker',
            templateUrl: './newWorker.html',
            providers: [users_service_1.UsersService],
            styleUrls: ['./newWorker.css'],
            inputs: ['business: business']
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService])
    ], NewWorkerComponent);
    return NewWorkerComponent;
}());
exports.NewWorkerComponent = NewWorkerComponent;
//# sourceMappingURL=newWorker.component.js.map