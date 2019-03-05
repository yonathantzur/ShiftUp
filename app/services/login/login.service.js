"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var basic_service_1 = require("../basic/basic.service");
var LoginService = /** @class */ (function (_super) {
    __extends(LoginService, _super);
    function LoginService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "/login";
        return _this;
    }
    LoginService.prototype.UserLogin = function (user) {
        return _super.prototype.post.call(this, this.prefix + "/api/userLogin", user)
            .toPromise()
            .then(function (result) {
            return result;
        })
            .catch(function (e) {
            return null;
        });
    };
    LoginService.prototype.logout = function () {
        return _super.prototype.get.call(this, this.prefix + "/api/logout")
            .toPromise()
            .then(function (result) {
            return result;
        })
            .catch(function (e) {
            return null;
        });
    };
    LoginService.prototype.isUserLogin = function () {
        return _super.prototype.get.call(this, this.prefix + "/api/isUserLogin")
            .toPromise()
            .then(function (result) {
            return result;
        })
            .catch(function (e) {
            return null;
        });
    };
    LoginService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], LoginService);
    return LoginService;
}(basic_service_1.BasicService));
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map