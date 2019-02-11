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
var Event = /** @class */ (function () {
    function Event(id, func) {
        this.id = id;
        this.func = func;
    }
    return Event;
}());
var EventService = /** @class */ (function () {
    function EventService() {
        this.events = {};
        this.emitQueue = [];
    }
    EventService.prototype.Register = function (name, func, eventsIds) {
        var id = this.GenerateId();
        var event = new Event(id, func);
        if (!this.events[name]) {
            this.events[name] = [event];
        }
        else {
            this.events[name].push(event);
        }
        eventsIds && eventsIds.push(id);
    };
    EventService.prototype.Emit = function (name, data) {
        var self = this;
        // Emit the event after view rendering.
        setTimeout(function () {
            var events = self.events[name];
            events && events.forEach(function (event) {
                event.func(data);
            });
        }, 0);
    };
    EventService.prototype.UnsubscribeEvents = function (eventsIds) {
        var self = this;
        Object.keys(self.events).forEach(function (name) {
            self.events[name] = self.events[name].filter(function (event) {
                return (eventsIds.indexOf(event.id) == -1);
            });
            if (self.events[name].length == 0) {
                delete self.events[name];
            }
        });
    };
    EventService.prototype.GenerateId = function () {
        var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    };
    EventService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], EventService);
    return EventService;
}());
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map