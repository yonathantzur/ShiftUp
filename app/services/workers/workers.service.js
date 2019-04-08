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
var WorkersService = /** @class */ (function (_super) {
    __extends(WorkersService, _super);
    function WorkersService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "/api/workers";
        return _this;
    }
    WorkersService.prototype.AddWorkerToBusiness = function (userId, salary) {
        var data = { userId: userId, salary: salary };
        return _super.prototype.post.call(this, this.prefix + '/addWorkerToBusiness', data)
            .toPromise()
            .then(function (result) { return result; })
            .catch(function (err) { return null; });
    };
    WorkersService.prototype.RemoveWorkerFromBusiness = function (userId) {
        var data = { userId: userId };
        return _super.prototype.post.call(this, this.prefix + '/removeWorkerFromBusiness', data)
            .toPromise()
            .then(function (result) { return result; })
            .catch(function (err) { return null; });
    };
    WorkersService.prototype.GetBusinessByCode = function (businessCode) {
        return _super.prototype.get.call(this, this.prefix + '/getBusinessByCode?businessCode=' + businessCode)
            .toPromise()
            .then(function (result) {
            return result;
        })
            .catch(function (e) {
            return null;
        });
    };
    WorkersService.prototype.SendWorkerRequest = function (businessId, managerId) {
        return _super.prototype.post.call(this, this.prefix + '/sendWorkerRequest', { businessId: businessId, managerId: managerId })
            .toPromise()
            .then(function (result) {
            return result;
        })
            .catch(function (e) {
            return null;
        });
    };
    WorkersService.prototype.GetWaitBusinessDetails = function () {
        return _super.prototype.get.call(this, this.prefix + '/getWaitBusinessDetails')
            .toPromise()
            .then(function (result) {
            return result;
        })
            .catch(function (e) {
            return null;
        });
    };
    return WorkersService;
}(basic_service_1.BasicService));
exports.WorkersService = WorkersService;
//# sourceMappingURL=workers.service.js.map