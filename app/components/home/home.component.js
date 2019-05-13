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
var users_service_1 = require("../../services/users/users.service");
var enums_1 = require("../../enums/enums");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(eventService, usersService) {
        var _this = this;
        this.eventService = eventService;
        this.usersService = usersService;
        this.shiftsFilter = enums_1.SHIFTS_FILTER;
        this.usersService.isLoginUserManager().then(function (result) {
            _this.isUserManager = result;
        });
    }
    HomeComponent.prototype.Filter = function (value) {
        this.eventService.Emit('changeFilter', value);
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: './home.html',
            providers: [users_service_1.UsersService],
            styleUrls: ['./home.css']
        }),
        __metadata("design:paramtypes", [event_service_1.EventService,
            users_service_1.UsersService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map