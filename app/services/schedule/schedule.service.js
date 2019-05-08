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
var ScheduleService = /** @class */ (function (_super) {
    __extends(ScheduleService, _super);
    function ScheduleService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "/api/schedule";
        return _this;
    }
    ScheduleService.prototype.GetShiftsSchedule = function (year, month) {
        return _super.prototype.get.call(this, this.prefix + '/getShiftsSchedule?year=' + year + '&month=' + month)
            .toPromise()
            .then(function (result) {
            return result;
        })
            .catch(function (e) {
            return null;
        });
    };
    return ScheduleService;
}(basic_service_1.BasicService));
exports.ScheduleService = ScheduleService;
//# sourceMappingURL=schedule.service.js.map