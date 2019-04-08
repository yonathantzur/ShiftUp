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
var constraints_service_1 = require("../../services/constraints/constraints.service");
var users_service_1 = require("../../services/users/users.service");
var router_1 = require("@angular/router");
var ConstraintsComponent = /** @class */ (function () {
    function ConstraintsComponent(constraintsService, usersService, route, router) {
        this.constraintsService = constraintsService;
        this.usersService = usersService;
        this.route = route;
        this.router = router;
        this.constraints = [];
        this.usernames = {};
    }
    ConstraintsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.constraintsService.getAllConstraints().then(function (data) {
            _this.constraints = data;
        });
        this.InitiateAllUsernames();
    };
    ConstraintsComponent.prototype.InitiateAllUsernames = function () {
        var _this = this;
        if (this.constraints) {
            for (var con in this.constraints) {
                this.usersService.GetUserById(this.constraints[con].userId).then(function (data) {
                    _this.usernames.firstName.push(data.firstName);
                    _this.usernames.lastName.push(data.lastName);
                });
            }
        }
    };
    ConstraintsComponent = __decorate([
        core_1.Component({
            selector: 'constraints',
            templateUrl: './constraints.html',
            providers: [constraints_service_1.ConstraintsService, users_service_1.UsersService],
            styleUrls: ['./constraints.css']
        }),
        __metadata("design:paramtypes", [constraints_service_1.ConstraintsService,
            users_service_1.UsersService,
            router_1.ActivatedRoute,
            router_1.Router])
    ], ConstraintsComponent);
    return ConstraintsComponent;
}());
exports.ConstraintsComponent = ConstraintsComponent;
//# sourceMappingURL=constraints.component.js.map