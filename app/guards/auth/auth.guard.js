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
var rxjs_1 = require("rxjs");
var login_service_1 = require("../../services/login/login.service");
var AuthGuard = /** @class */ (function () {
    function AuthGuard(router, loginService, route) {
        this.router = router;
        this.loginService = loginService;
        this.route = route;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.loginService.isUserLogin().then(function (result) {
                if (result) {
                    observer.next(true);
                }
                else {
                    _this.router.navigateByUrl('/login');
                    observer.next(false);
                }
            });
        });
    };
    AuthGuard = __decorate([
        core_1.Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [router_1.Router,
            login_service_1.LoginService,
            router_1.ActivatedRoute])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map