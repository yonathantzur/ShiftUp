"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_component_1 = require("../components/home/home.component");
var login_component_1 = require("../components/login/login.component");
var routes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: '**', redirectTo: 'page-not-found' }
];
var Routing = /** @class */ (function () {
    function Routing() {
    }
    Routing = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], Routing);
    return Routing;
}());
exports.Routing = Routing;
//# sourceMappingURL=app.routing.js.map