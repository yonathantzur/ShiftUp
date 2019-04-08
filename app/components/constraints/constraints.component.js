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
var router_1 = require("@angular/router");
var ConstraintsComponent = /** @class */ (function () {
    function ConstraintsComponent(ConstraintsService, route, router) {
        this.ConstraintsService = ConstraintsService;
        this.route = route;
        this.router = router;
        this.constraints = {};
    }
    ConstraintsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ConstraintsService.getAllConstraints().then(function (data) {
            _this.constraints = data;
        });
    };
    ConstraintsComponent = __decorate([
        core_1.Component({
            selector: 'constraints',
            templateUrl: './constraints.html',
            providers: [constraints_service_1.ConstraintsService],
            styleUrls: ['./constraints.css']
        }),
        __metadata("design:paramtypes", [constraints_service_1.ConstraintsService,
            router_1.ActivatedRoute,
            router_1.Router])
    ], ConstraintsComponent);
    return ConstraintsComponent;
}());
exports.ConstraintsComponent = ConstraintsComponent;
//# sourceMappingURL=constraints.component.js.map