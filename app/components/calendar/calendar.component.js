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
var shifts_service_1 = require("../../services/shifts/shifts.service");
var event_service_1 = require("../../services/event/event.service");
var enums_1 = require("../../enums/enums");
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(shiftService, eventService) {
        this.shiftService = shiftService;
        this.eventService = eventService;
        this.eventsCache = {};
        this.viewState = enums_1.SHIFTS_FILTER.ALL;
        this.eventsIds = [];
        var self = this;
        self.eventService.Register("closeShiftEdit", function () {
            self.eventEditObject = null;
        });
        self.eventService.Register("changeFilter", function (filter) {
            self.eventService.Emit("calanderViewRender");
            self.viewState = filter;
            self.eventsCache = {};
            var dateRange = $('#calendar').fullCalendar('getDate')._i;
            var year = dateRange[0];
            var month = dateRange[1] + 1;
            var reqQuery;
            if (filter == enums_1.SHIFTS_FILTER.ALL) {
                reqQuery = self.shiftService.GetShiftsForBusiness(year, month);
            }
            else if (filter == enums_1.SHIFTS_FILTER.ME) {
                reqQuery = self.shiftService.GetMyShiftsForBusiness(year, month);
            }
            reqQuery.then(function (shifts) {
                shifts && self.handleShiftsResult(shifts, year, month);
            });
        }, self.eventsIds);
    }
    CalendarComponent.prototype.ngOnInit = function () {
        var self = this;
        self.calendar = $('#calendar').fullCalendar({
            height: "parent",
            editable: true,
            eventRender: function (event, element) {
                element.bind('dblclick', function () {
                    self.eventEditObject = self.createEventObjectToEdit(event);
                });
            },
            viewRender: function (element) {
                self.eventService.Emit("calanderViewRender");
                var dateRange = $('#calendar').fullCalendar('getDate')._i;
                var year = dateRange[0];
                var month = dateRange[1] + 1;
                var eventsFromCache = self.eventsCache[year + "-" + month];
                if (eventsFromCache) {
                    self.loadShifts(eventsFromCache);
                }
                else {
                    var reqQuery = void 0;
                    if (self.viewState == enums_1.SHIFTS_FILTER.ALL) {
                        reqQuery = self.shiftService.GetShiftsForBusiness(year, month);
                    }
                    else if (self.viewState == enums_1.SHIFTS_FILTER.ME) {
                        reqQuery = self.shiftService.GetMyShiftsForBusiness(year, month);
                    }
                    reqQuery.then(function (shifts) {
                        shifts && self.handleShiftsResult(shifts, year, month);
                    });
                }
            },
            eventClick: function (event) {
                // Mark selected event.
                self.markedEvent && $(self.markedEvent).css('border-color', '');
                $(this).css('border-color', '#dc3545');
                self.markedEvent = this;
                self.eventService.Emit("calanderEventClick", event);
            }
        });
    };
    CalendarComponent.prototype.ngOnDestroy = function () {
        this.eventService.UnsubscribeEvents(this.eventsIds);
    };
    CalendarComponent.prototype.handleShiftsResult = function (shifts, year, month) {
        var events = [];
        shifts.forEach(function (shift) {
            events.push({
                id: shift._id,
                title: "שיבוץ",
                start: shift.date,
                shiftsData: shift.shiftsData
            });
        });
        this.eventsCache[year + "-" + month] = events;
        this.loadShifts(events);
    };
    CalendarComponent.prototype.loadShifts = function (shifts) {
        this.calendar.fullCalendar('removeEvents');
        this.calendar.fullCalendar('renderEvents', shifts);
    };
    CalendarComponent.prototype.createEventObjectToEdit = function (event) {
        var eventObj = {
            "id": event.id,
            "shiftsData": event.shiftsData
        };
        return eventObj;
    };
    CalendarComponent = __decorate([
        core_1.Component({
            selector: 'calendar',
            templateUrl: './calendar.html',
            providers: [shifts_service_1.ShiftService],
            styleUrls: ['./calendar.css']
        }),
        __metadata("design:paramtypes", [shifts_service_1.ShiftService,
            event_service_1.EventService])
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
//# sourceMappingURL=calendar.component.js.map