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
var BusinessesService = /** @class */ (function (_super) {
    __extends(BusinessesService, _super);
    function BusinessesService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "/api/businesses";
        return _this;
    }
    BusinessesService.prototype.GetLoggedInBusiness = function () {
        return _super.prototype.get.call(this, this.prefix + '/getLoggedInBusiness')
            .toPromise()
            .then(function (result) { return result; })
            .catch(function (err) { return null; });
    };
    BusinessesService.prototype.GetWorkersForBusiness = function () {
        return _super.prototype.get.call(this, this.prefix + '/getWorkersForBusiness')
            .toPromise()
            .then(function (result) { return result; })
            .catch(function (err) { return null; });
    };
    BusinessesService.prototype.AddBusiness = function (business) {
        return _super.prototype.post.call(this, this.prefix + '/addBusiness', business)
            .toPromise()
            .then(function (result) {
            return result;
        })
            .catch(function (e) {
            return null;
        });
    };
    return BusinessesService;
}(basic_service_1.BasicService));
exports.BusinessesService = BusinessesService;
//# sourceMappingURL=businesses.service.js.map