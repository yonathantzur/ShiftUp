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
var constraints_service_1 = require("../../services/constraints/constraints.service");
var event_service_1 = require("../../services/event/event.service");
var enums_1 = require("../../enums/enums");
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(shiftService, constraintsService, eventService) {
        var _this = this;
        this.shiftService = shiftService;
        this.constraintsService = constraintsService;
        this.eventService = eventService;
        this.eventsCache = {};
        this.eventsIds = [];
        var self = this;
        self.eventService.Register("startLoader", function (event) {
            self.isLoading = true;
        });
        self.eventService.Register("stopLoader", function (event) {
            self.isLoading = false;
        });
        self.eventService.Register("openEditShiftCard", function (event) {
            self.eventEditObject = self.createEventObjectToEdit(event);
        });
        self.eventService.Register("renderCalendar", function (shifts) {
            _this.viewState = enums_1.SHIFTS_FILTER.ALL;
            $("#filter-select").val(0);
            _this.removeShiftsFromAllCahce();
            self.renderCalendar(shifts);
        });
        self.eventService.Register("closeShiftEdit", function () {
            self.eventEditObject = null;
        });
        self.eventService.Register("changeFilter", function (filter) {
            self.eventService.Emit("calanderViewRender");
            self.viewState = filter;
            var dateRange = $('#calendar').fullCalendar('getDate')._i;
            var year = dateRange[0];
            var month = dateRange[1] + 1;
            _this.removeShiftsFromAllCahce();
            var reqQuery;
            if (filter == enums_1.SHIFTS_FILTER.ALL) {
                reqQuery = self.shiftService.GetShiftsForBusiness(year, month);
            }
            else if (filter == enums_1.SHIFTS_FILTER.ME) {
                reqQuery = self.shiftService.GetMyShiftsForBusiness(year, month);
            }
            self.isLoading = true;
            reqQuery.then(function (shifts) {
                self.isLoading = false;
                var shiftsResult = self.handleShiftsResult(shifts);
                var constraints = _this.eventsCache[year + "-" + month].constraints;
                _this.loadEvents(shiftsResult, constraints, year, month);
            });
        }, self.eventsIds);
    }
    CalendarComponent.prototype.ngOnInit = function () {
        this.viewState = this.isUserManager ? enums_1.SHIFTS_FILTER.ALL : enums_1.SHIFTS_FILTER.ME;
        var self = this;
        self.calendar = $('#calendar').fullCalendar({
            height: "parent",
            editable: false,
            customButtons: {
                export: {
                    click: function () {
                        self.exportData();
                    }
                }
            },
            header: {
                left: 'next,prev today export',
                right: 'dayGridMonth,timeGridWeek,timeGridDay, title'
            },
            eventRender: function (event, element) {
                if (self.isUserManager && event.shiftsData != null) {
                    element.bind('dblclick', function () {
                        self.eventEditObject = self.createEventObjectToEdit(event);
                    });
                }
            },
            viewRender: function (element) {
                $(".fc-export-button").html('<i class="far fa-file-excel"></i>').prop('title', 'ייצוא לאקסל');
                self.renderCalendar();
            },
            eventClick: function (event) {
                if (self.markedEvent == this) {
                    self.eventService.Emit("calanderEventUnClick");
                    $(self.markedEvent).css('border-color', '');
                    self.markedEvent = null;
                }
                else if (event.shiftsData != null) {
                    // Mark selected event.
                    self.markedEvent && $(self.markedEvent).css('border-color', '');
                    $(this).css('border-color', '#dc3545');
                    self.markedEvent = this;
                    self.eventService.Emit("calanderEventClick", event);
                }
            }
        });
    };
    CalendarComponent.prototype.ngOnDestroy = function () {
        this.eventService.UnsubscribeEvents(this.eventsIds);
    };
    CalendarComponent.prototype.exportData = function () {
        var _this = this;
        if (this.isLoading) {
            return;
        }
        else {
            this.isLoading = true;
        }
        var dateRange = $('#calendar').fullCalendar('getDate')._i;
        var year = dateRange[0];
        var month = dateRange[1] + 1;
        this.shiftService.GetMonthlyShiftsForExport(year, month).then(function (dataSource) {
            _this.isLoading = false;
            _this.eventService.Emit("excel", dataSource);
        });
    };
    CalendarComponent.prototype.renderCalendar = function (shifts) {
        var _this = this;
        this.eventService.Emit("calanderViewRender");
        var dateRange = $('#calendar').fullCalendar('getDate')._i;
        var year = dateRange[0];
        var month = dateRange[1] + 1;
        var eventsFromCache = this.eventsCache[year + "-" + month];
        if (shifts) {
            this.isLoading = false;
            var newShifts = this.handleShiftsResult(shifts);
            this.loadEvents(newShifts, eventsFromCache.constraints, year, month);
        }
        else if (eventsFromCache &&
            eventsFromCache.shifts &&
            eventsFromCache.constraints) {
            this.loadEvents(eventsFromCache.shifts, eventsFromCache.constraints, year, month);
        }
        else {
            var reqQuery = void 0;
            if (this.viewState == enums_1.SHIFTS_FILTER.ALL) {
                reqQuery = this.shiftService.GetShiftsForBusiness(year, month);
            }
            else if (this.viewState == enums_1.SHIFTS_FILTER.ME) {
                reqQuery = this.shiftService.GetMyShiftsForBusiness(year, month);
            }
            this.isLoading = true;
            Promise.all([reqQuery, this.constraintsService.GetUserConstraints(year, month)]).then(function (results) {
                var shiftsResult = _this.handleShiftsResult(results[0]);
                var constraintsResult = _this.handleConstraintsResult(results[1]);
                _this.isLoading = false;
                _this.loadEvents(shiftsResult, constraintsResult, year, month);
            });
        }
    };
    CalendarComponent.prototype.handleShiftsResult = function (shifts) {
        var events = [];
        shifts && shifts.forEach(function (shift) {
            events.push({
                id: shift._id,
                title: "שיבוץ",
                start: shift.date,
                color: "#3788d8",
                allDay: true,
                shiftsData: shift.shiftsData
            });
        });
        return events;
    };
    CalendarComponent.prototype.handleConstraintsResult = function (constraints) {
        var _this = this;
        var self = this;
        var events = [];
        constraints.forEach(function (constraint) {
            events.push({
                id: constraint._id,
                title: self.calcConstraintName(constraint),
                start: _this.formatToEventDate(constraint.startDate),
                end: _this.formatToEventDate(constraint.endDate, true),
                color: '#28a745',
                allDay: true
            });
        });
        return events;
    };
    CalendarComponent.prototype.calcConstraintName = function (constraint) {
        var constraintName = "אילוץ";
        var checkedShifts = constraint.shifts.filter(function (shift) {
            return shift.isChecked;
        }).map(function (shift) {
            return shift.name;
        });
        if (checkedShifts.length == constraint.shifts.length) {
            return constraintName;
        }
        for (var i = 0; i < checkedShifts.length; i++) {
            constraintName += ((i == 0) ? " - " : "/") + checkedShifts[i];
        }
        return constraintName;
    };
    CalendarComponent.prototype.loadEvents = function (shifts, constraints, year, month) {
        this.insetToCache(shifts, constraints, year, month);
        this.calendar.fullCalendar('removeEvents');
        this.calendar.fullCalendar('renderEvents', constraints);
        this.calendar.fullCalendar('renderEvents', shifts);
    };
    CalendarComponent.prototype.createEventObjectToEdit = function (event) {
        var eventObj = {
            "id": event.id,
            "shiftsData": event.shiftsData,
            "date": this.formatEventDate(event.start._i)
        };
        return eventObj;
    };
    CalendarComponent.prototype.formatEventDate = function (dateStr) {
        var date = new Date(dateStr);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }
        return (day + "/" + month + "/" + year);
    };
    CalendarComponent.prototype.formatToEventDate = function (dateStr, isCheckEnd) {
        var date = new Date(dateStr);
        if (isCheckEnd) {
            date.setDate(date.getDate() + 1);
        }
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }
        return (year + "-" + month + "-" + day);
    };
    CalendarComponent.prototype.insetToCache = function (shifts, constraints, year, month) {
        this.eventsCache[year + "-" + month] = {
            shifts: shifts,
            constraints: constraints
        };
    };
    CalendarComponent.prototype.removeShiftsFromAllCahce = function () {
        var cacheObj = this.eventsCache;
        // Remove all shifts from cache.
        Object.keys(cacheObj).forEach(function (key) {
            delete cacheObj[key]["shifts"];
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CalendarComponent.prototype, "isUserManager", void 0);
    CalendarComponent = __decorate([
        core_1.Component({
            selector: 'calendar',
            templateUrl: './calendar.html',
            providers: [shifts_service_1.ShiftService, constraints_service_1.ConstraintsService],
            styleUrls: ['./calendar.css']
        }),
        __metadata("design:paramtypes", [shifts_service_1.ShiftService,
            constraints_service_1.ConstraintsService,
            event_service_1.EventService])
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
//# sourceMappingURL=calendar.component.js.map