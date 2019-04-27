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
var ShiftEditComponent = /** @class */ (function () {
    function ShiftEditComponent(shiftService, eventService) {
        this.shiftService = shiftService;
        this.eventService = eventService;
    }
    ShiftEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.shiftService.GetEventDetails(this.event).then(function (fullEvent) {
            _this.isLoading = false;
            if (fullEvent) {
                _this.event = fullEvent;
            }
            else {
                Swal.fire({
                    type: 'error',
                    title: 'שגיאה בטעינת הנתונים',
                    text: 'אופס... משהו השתבש'
                });
            }
        });
    };
    ShiftEditComponent.prototype.CloseWindow = function () {
        this.eventService.Emit("closeShiftEdit");
    };
    ShiftEditComponent.prototype.UpdateEventShifts = function () {
        var _this = this;
        this.shiftService.UpdateEventShifts(this.event.id, this.event.shiftsData).then(function (result) {
            if (result) {
                _this.CloseWindow();
            }
            else {
                Swal.fire({
                    type: 'error',
                    title: 'שגיאה בעדכון המשמרות',
                    text: 'אופס... משהו השתבש'
                });
            }
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ShiftEditComponent.prototype, "event", void 0);
    ShiftEditComponent = __decorate([
        core_1.Component({
            selector: 'shiftEdit',
            templateUrl: './shiftEdit.html',
            providers: [shifts_service_1.ShiftService],
            styleUrls: ['./shiftEdit.css']
        }),
        __metadata("design:paramtypes", [shifts_service_1.ShiftService,
            event_service_1.EventService])
    ], ShiftEditComponent);
    return ShiftEditComponent;
}());
exports.ShiftEditComponent = ShiftEditComponent;
//# sourceMappingURL=shiftEdit.component.js.map