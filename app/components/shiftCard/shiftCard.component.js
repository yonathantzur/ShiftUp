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
var ShiftCardComponent = /** @class */ (function () {
    function ShiftCardComponent(shiftService, eventService) {
        this.shiftService = shiftService;
        this.eventService = eventService;
        var self = this;
        this.eventService.Register("calanderEventClick", function (event) {
            // Get shifts data with workers objects.
            self.shiftService.GetShiftsWorkers(event.shiftsData).then(function (shiftsData) {
                self.shiftsData = shiftsData;
            });
        });
        this.eventService.Register("calanderViewRender", function () {
            self.shiftsData = null;
        });
    }
    ShiftCardComponent = __decorate([
        core_1.Component({
            selector: 'shiftCard',
            templateUrl: './shiftCard.html',
            providers: [shifts_service_1.ShiftService],
            styleUrls: ['./shiftCard.css']
        }),
        __metadata("design:paramtypes", [shifts_service_1.ShiftService,
            event_service_1.EventService])
    ], ShiftCardComponent);
    return ShiftCardComponent;
}());
exports.ShiftCardComponent = ShiftCardComponent;
//# sourceMappingURL=shiftCard.component.js.map