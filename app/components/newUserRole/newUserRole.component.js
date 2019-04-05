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
var NewUserRoleComponent = /** @class */ (function () {
    function NewUserRoleComponent(router) {
        this.router = router;
    }
    NewUserRoleComponent.prototype.businessSettings = function () {
        this.router.navigateByUrl('/role/business');
    };
    NewUserRoleComponent.prototype.workerSettings = function () {
        this.router.navigateByUrl('/role/worker');
    };
    NewUserRoleComponent = __decorate([
        core_1.Component({
            selector: 'newUser',
            templateUrl: './newUser.html',
            providers: [],
            styleUrls: ['./newUser.css']
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], NewUserRoleComponent);
    return NewUserRoleComponent;
}());
exports.NewUserRoleComponent = NewUserRoleComponent;
//# sourceMappingURL=newUserRole.component.js.map