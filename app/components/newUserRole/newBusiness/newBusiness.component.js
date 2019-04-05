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
var business_service_1 = require("../../../services/business/business.service");
var router_1 = require("@angular/router");
var Shift = /** @class */ (function () {
    function Shift(name, workersAmount) {
        this.name = name;
        this.workersAmount = workersAmount || 1;
    }
    return Shift;
}());
var Business = /** @class */ (function () {
    function Business(name, address, shifts) {
        this.name = name;
        this.address = address;
        this.shifts = shifts;
    }
    return Business;
}());
exports.Business = Business;
var NewBusinessComponent = /** @class */ (function () {
    function NewBusinessComponent(businessService, router) {
        this.businessService = businessService;
        this.router = router;
        this.business = new Business();
        this.business.shifts = [new Shift()];
    }
    NewBusinessComponent.prototype.addShift = function () {
        this.business.shifts.push(new Shift());
        setTimeout(function () {
            $("#shifts-container")[0].scrollTop = $("#shifts-container")[0].scrollHeight;
        }, 0);
    };
    NewBusinessComponent.prototype.removeShift = function (index) {
        this.business.shifts.splice(index, 1);
    };
    NewBusinessComponent.prototype.isShiftsValid = function () {
        var error;
        var shifts = this.business.shifts;
        for (var i = 0; i < shifts.length; i++) {
            var shift = shifts[i];
            if (!shift.name) {
                error = "יש לוודא שלכל משמרת יש שם!";
            }
            else if (shift.workersAmount < 1) {
                error = "מספר העובדים באחת מהמשמרות לא תקין!";
            }
            if (error) {
                Swal.fire({
                    type: 'error',
                    title: 'בעייה בנתונים',
                    text: error
                });
                return false;
            }
        }
        return true;
    };
    NewBusinessComponent.prototype.isBusinessValid = function () {
        var isValid = true;
        var error;
        if (!this.business.name) {
            isValid = false;
            error = "יש להזין את שם העסק!";
        }
        else if (!this.business.address) {
            isValid = false;
            error = "יש להזין את כתובת העסק!";
        }
        else if (!this.isShiftsValid()) {
            isValid = false;
        }
        if (error) {
            Swal.fire({
                type: 'error',
                title: 'בעייה בנתונים',
                text: error
            });
        }
        return isValid;
    };
    NewBusinessComponent.prototype.addBusiness = function () {
        var _this = this;
        this.isBusinessValid() && this.businessService.AddBusiness(this.business).then(function (result) {
            if (result) {
                Swal.fire({
                    type: 'success',
                    title: 'העסק נוסף בהצלחה',
                    text: 'קוד בית העסק - ' + result.businessCode
                });
                _this.router.navigateByUrl('/');
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
    NewBusinessComponent = __decorate([
        core_1.Component({
            selector: 'newBusiness',
            templateUrl: './newBusiness.html',
            providers: [business_service_1.BusinessService],
            styleUrls: ['./newBusiness.css']
        }),
        __metadata("design:paramtypes", [business_service_1.BusinessService,
            router_1.Router])
    ], NewBusinessComponent);
    return NewBusinessComponent;
}());
exports.NewBusinessComponent = NewBusinessComponent;
//# sourceMappingURL=newBusiness.component.js.map