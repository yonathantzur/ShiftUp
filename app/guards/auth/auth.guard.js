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
var users_service_1 = require("../../services/users/users.service");
var AuthGuard = /** @class */ (function () {
    function AuthGuard(router, loginService) {
        this.router = router;
        this.loginService = loginService;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.loginService.isUserLogin().then(function (result) {
                if (result) {
                    observer.next(true);
                }
                else {
                    _this.router.navigateByUrl('/role');
                    observer.next(false);
                }
            });
        });
    };
    AuthGuard = __decorate([
        core_1.Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [router_1.Router,
            login_service_1.LoginService])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
var LoginGuard = /** @class */ (function () {
    function LoginGuard(router, loginService) {
        this.router = router;
        this.loginService = loginService;
    }
    LoginGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.loginService.isUserLogin().then(function (result) {
                if (result) {
                    _this.router.navigateByUrl('/');
                    observer.next(false);
                }
                else {
                    observer.next(true);
                }
            });
        });
    };
    LoginGuard = __decorate([
        core_1.Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [router_1.Router,
            login_service_1.LoginService])
    ], LoginGuard);
    return LoginGuard;
}());
exports.LoginGuard = LoginGuard;
var WorkerGuard = /** @class */ (function () {
    function WorkerGuard(router, userService) {
        this.router = router;
        this.userService = userService;
    }
    WorkerGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.userService.isLoginUserManager().then(function (isManager) {
                if (isManager) {
                    _this.router.navigateByUrl('/');
                    observer.next(false);
                }
                else {
                    observer.next(true);
                }
            });
        });
    };
    WorkerGuard = __decorate([
        core_1.Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [router_1.Router,
            users_service_1.UsersService])
    ], WorkerGuard);
    return WorkerGuard;
}());
exports.WorkerGuard = WorkerGuard;
var ManagerGuard = /** @class */ (function () {
    function ManagerGuard(router, userService) {
        this.router = router;
        this.userService = userService;
    }
    ManagerGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.userService.isLoginUserManager().then(function (isManager) {
                if (!isManager) {
                    _this.router.navigateByUrl('/');
                    observer.next(false);
                }
                else {
                    observer.next(true);
                }
            });
        });
    };
    ManagerGuard = __decorate([
        core_1.Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [router_1.Router,
            users_service_1.UsersService])
    ], ManagerGuard);
    return ManagerGuard;
}());
exports.ManagerGuard = ManagerGuard;
//# sourceMappingURL=auth.guard.js.map