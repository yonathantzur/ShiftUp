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
var registrationService = /** @class */ (function (_super) {
    __extends(registrationService, _super);
    function registrationService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "/api/registration";
        return _this;
    }
    registrationService.prototype.register = function (user) {
        return _super.prototype.post.call(this, this.prefix + "/register", user)
            .toPromise()
            .then(function (result) {
            return result;
        })
            .catch(function (e) {
            return null;
        });
    };
    registrationService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], registrationService);
    return registrationService;
}(basic_service_1.BasicService));
exports.registrationService = registrationService;
//# sourceMappingURL=registration.service.js.map