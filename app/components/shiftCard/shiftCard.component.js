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
var users_service_1 = require("../../services/users/users.service");
var event_service_1 = require("../../services/event/event.service");
var ShiftCardComponent = /** @class */ (function () {
    function ShiftCardComponent(shiftService, usersService, eventService) {
        this.shiftService = shiftService;
        this.usersService = usersService;
        this.eventService = eventService;
        this.shiftsDataCache = {};
        this.eventsIds = [];
        var self = this;
        self.usersService.isLoginUserManager().then(function (result) {
            self.isUserManager = result;
        });
        self.eventService.Register("renderCalendar", function () {
            self.shiftsDataCache = {};
        });
        // Load shift data to show on card when event is clicked.
        self.eventService.Register("calanderEventClick", function (event) {
            self.event = event;
            var shiftsDataFromCache = self.shiftsDataCache[event.id];
            // In case the shift data is in cache.
            if (shiftsDataFromCache) {
                self.shiftsData = shiftsDataFromCache;
            }
            else {
                // Get shifts data with workers objects from DB.
                self.shiftService.GetShiftsWorkers(event.shiftsData).then(function (shiftsData) {
                    self.shiftsData = shiftsData;
                    self.shiftsDataCache[event.id] = shiftsData;
                });
            }
        }, self.eventsIds);
        // Remove shift data.
        self.eventService.Register("calanderEventUnClick", function () {
            self.event = null;
            self.shiftsData = null;
        }, self.eventsIds);
        // Remove shiftsData when calendar dates range is changed.
        self.eventService.Register("calanderViewRender", function () {
            self.shiftsData = null;
        }, self.eventsIds);
    }
    ShiftCardComponent.prototype.ngOnDestroy = function () {
        this.eventService.UnsubscribeEvents(this.eventsIds);
    };
    ShiftCardComponent.prototype.edit = function () {
        this.eventService.Emit("openEditShiftCard", this.event);
    };
    ShiftCardComponent = __decorate([
        core_1.Component({
            selector: 'shiftCard',
            templateUrl: './shiftCard.html',
            providers: [shifts_service_1.ShiftService, users_service_1.UsersService],
            styleUrls: ['./shiftCard.css']
        }),
        __metadata("design:paramtypes", [shifts_service_1.ShiftService,
            users_service_1.UsersService,
            event_service_1.EventService])
    ], ShiftCardComponent);
    return ShiftCardComponent;
}());
exports.ShiftCardComponent = ShiftCardComponent;
//# sourceMappingURL=shiftCard.component.js.map