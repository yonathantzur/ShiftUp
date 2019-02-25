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
var ShiftService = /** @class */ (function (_super) {
    __extends(ShiftService, _super);
    function ShiftService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "/shifts";
        return _this;
    }
    ShiftService.prototype.GetShiftsForBusiness = function (year, month) {
        return _super.prototype.get.call(this, this.prefix + '/getShiftsForBusiness?year=' + year + '&month=' + month)
            .toPromise()
            .then(function (result) {
            return result;
        })
            .catch(function (e) {
            return null;
        });
    };
    ShiftService.prototype.GetShiftsWorkers = function (shiftsData) {
        var data = { shiftsData: shiftsData };
        return _super.prototype.post.call(this, this.prefix + '/getShiftsWorkers', data)
            .toPromise()
            .then(function (result) {
            return result;
        })
            .catch(function (e) {
            return null;
        });
    };
    return ShiftService;
}(basic_service_1.BasicService));
exports.ShiftService = ShiftService;
//# sourceMappingURL=shifts.service.js.map