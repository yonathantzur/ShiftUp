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
var event_service_1 = require("../../services/event/event.service");
var schedule_service_1 = require("../../services/schedule/schedule.service");
var ScheduleComponent = /** @class */ (function () {
    function ScheduleComponent(scheduleService, eventService) {
        var _this = this;
        this.scheduleService = scheduleService;
        this.eventService = eventService;
        this.isScheduleAllow = true;
        this.eventService.Register("calanderViewRender", function () {
            var calendarDate = $('#calendar').fullCalendar('getDate')._d;
            var currDate = new Date();
            var calendarYear = calendarDate.getFullYear();
            var calendarMonth = calendarDate.getMonth();
            var currYear = currDate.getFullYear();
            var currMonth = currDate.getMonth();
            _this.calendarTitle = $('#calendar').fullCalendar('getView').title;
            if (calendarYear < currYear ||
                (calendarMonth < currMonth && calendarYear == currYear)) {
                _this.isScheduleAllow = false;
            }
            else {
                _this.isScheduleAllow = true;
            }
        });
    }
    ScheduleComponent.prototype.Schedule = function () {
        var _this = this;
        var year = $('#calendar').fullCalendar('getDate')._d.getFullYear();
        var month = $('#calendar').fullCalendar('getDate')._d.getMonth() + 1;
        this.eventService.Emit("startLoader");
        this.isLoading = true;
        this.scheduleService.GetShiftsSchedule(year, month).then(function (shifts) {
            _this.isLoading = false;
            if (shifts) {
                _this.eventService.Emit("renderCalendar", shifts);
            }
            else {
                Swal.fire({
                    type: 'error',
                    title: 'שגיאה בשיבוץ',
                    text: 'אופס... משהו השתבש'
                });
            }
        });
    };
    ScheduleComponent = __decorate([
        core_1.Component({
            selector: 'schedule',
            templateUrl: './schedule.html',
            providers: [schedule_service_1.ScheduleService],
            styleUrls: ['./schedule.css']
        }),
        __metadata("design:paramtypes", [schedule_service_1.ScheduleService,
            event_service_1.EventService])
    ], ScheduleComponent);
    return ScheduleComponent;
}());
exports.ScheduleComponent = ScheduleComponent;
//# sourceMappingURL=schedule.component.js.map