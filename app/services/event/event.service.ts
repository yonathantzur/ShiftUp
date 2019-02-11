import { Injectable } from '@angular/core';

class Event {
    public id: string;
    public func: Function;

    constructor(id: string, func: Function) {
        this.id = id;
        this.func = func;
    }
}

@Injectable()
export class EventService {
    private events: Object;
    private emitQueue: Array<string>;

    constructor() {
        this.events = {};
        this.emitQueue = [];
    }

    Register(name: string, func: Function, eventsIds?: Array<string>) {
        var id: string = this.GenerateId();
        var event: Event = new Event(id, func);

        if (!this.events[name]) {
            this.events[name] = [event];
        }
        else {
            this.events[name].push(event);
        }

        eventsIds && eventsIds.push(id);
    }

    Emit(name: string, data?: any) {
        var self = this;

        // Emit the event after view rendering.
        setTimeout(() => {
            var events: Array<Event> = self.events[name];

            events && events.forEach((event: Event) => {
                event.func(data);
            });
        }, 0);
    }

    UnsubscribeEvents(eventsIds: Array<string>) {
        var self = this;

        Object.keys(self.events).forEach((name: string) => {
            self.events[name] = self.events[name].filter((event: Event) => {
                return (eventsIds.indexOf(event.id) == -1);
            });

            if (self.events[name].length == 0) {
                delete self.events[name];
            }
        });
    }

    private GenerateId() {
        var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    }
}