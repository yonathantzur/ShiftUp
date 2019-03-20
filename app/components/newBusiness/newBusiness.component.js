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
var business_service_1 = require("../../services/business/business.service");
var Shift = /** @class */ (function () {
    function Shift(name, workersAmount) {
        this.name = name;
        this.workersAmount = workersAmount;
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
    function NewBusinessComponent(businessService) {
        this.businessService = businessService;
        this.business = new Business();
    }
    NewBusinessComponent.prototype.AddBusiness = function () {
        this.businessService.AddBusiness(this.business).then(function (result) {
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
    NewBusinessComponent = __decorate([
        core_1.Component({
            selector: 'newBusiness',
            templateUrl: './newBusiness.html',
            providers: [business_service_1.BusinessService],
            styleUrls: ['./newBusiness.css']
        }),
        __metadata("design:paramtypes", [business_service_1.BusinessService])
    ], NewBusinessComponent);
    return NewBusinessComponent;
}());
exports.NewBusinessComponent = NewBusinessComponent;
//# sourceMappingURL=newBusiness.component.js.map