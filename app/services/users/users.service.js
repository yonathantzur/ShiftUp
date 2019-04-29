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
Object.defineProperty(exports, "__esModule", { value: true });
var basic_service_1 = require("../basic/basic.service");
var UsersService = /** @class */ (function (_super) {
    __extends(UsersService, _super);
    function UsersService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "/api/users";
        return _this;
    }
    UsersService.prototype.GetAllUsers = function () {
        return _super.prototype.get.call(this, this.prefix + '/getAllUsers')
            .toPromise()
            .then(function (result) { return result; })
            .catch(function (err) { return null; });
    };
    UsersService.prototype.GetUserById = function (userObjId) {
        return _super.prototype.get.call(this, this.prefix + '/getUserById?userObjId=' + userObjId)
            .toPromise()
            .then(function (result) { return result; })
            .catch(function (err) { return null; });
    };
    UsersService.prototype.GetUserByUserId = function (userId) {
        return _super.prototype.get.call(this, this.prefix + '/GetUserByUserId?userId=' + userId)
            .toPromise()
            .then(function (result) { return result; })
            .catch(function (err) { return null; });
    };
    UsersService.prototype.IsUserAvailableForBusiness = function (userId) {
        return _super.prototype.get.call(this, this.prefix + '/isUserAvailableForBusiness?userId=' + userId)
            .toPromise()
            .then(function (result) { return result; })
            .catch(function (err) { return null; });
    };
    return UsersService;
}(basic_service_1.BasicService));
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map