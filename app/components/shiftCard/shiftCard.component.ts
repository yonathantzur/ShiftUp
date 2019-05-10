import { Component, OnDestroy } from '@angular/core';

import { ShiftService } from '../../services/shifts/shifts.service';
import { UsersService } from '../../services/users/users.service';
import { EventService } from '../../services/event/event.service';

@Component({
    selector: 'shiftCard',
    templateUrl: './shiftCard.html',
    providers: [ShiftService, UsersService],
    styleUrls: ['./shiftCard.css']
})

export class ShiftCardComponent implements OnDestroy {
    shiftsData: Array<any>;
    shiftsDataCache: Object = {};
    event: any;
    isUserManager: boolean;
    eventDate: string;

    eventsIds: Array<string> = [];

    constructor(private shiftService: ShiftService,
        private usersService: UsersService,
        private eventService: EventService) {
        let self = this;

        self.usersService.isLoginUserManager().then(result => {
            self.isUserManager = result;
        });

        self.eventService.Register("renderCalendar", () => {
            self.shiftsDataCache = {};
        });

        // Load shift data to show on card when event is clicked.
        self.eventService.Register("calanderEventClick", (event: any) => {
            self.event = event;

            self.eventDate = self.formatEventDate(event.start._d);

            let shiftsDataFromCache = self.shiftsDataCache[event.id];

            // In case the shift data is in cache.
            if (shiftsDataFromCache) {
                self.shiftsData = shiftsDataFromCache;
            }
            else {
                // Get shifts data with workers objects from DB.
                self.shiftService.GetShiftsWorkers(event.shiftsData).then((shiftsData: Array<any>) => {
                    self.shiftsData = shiftsData
                    self.shiftsDataCache[event.id] = shiftsData;
                });
            }
        }, self.eventsIds);

        // Remove shift data.
        self.eventService.Register("calanderEventUnClick", () => {
            self.event = null;
            self.shiftsData = null;
        }, self.eventsIds);

        // Remove shiftsData when calendar dates range is changed.
        self.eventService.Register("calanderViewRender", () => {
            self.shiftsData = null;
        }, self.eventsIds);
    }

    ngOnDestroy() {
        this.eventService.UnsubscribeEvents(this.eventsIds);
    }

    edit() {
        this.eventService.Emit("openEditShiftCard", this.event);
    }

    formatEventDate(date: Date) {
        let day: any = date.getDate();
        let month: any = date.getMonth() + 1;
        let year: any = date.getFullYear();

        if (day < 10) {
            day = "0" + day;
        }

        if (month < 10) {
            month = "0" + month;
        }

        return (day + "/" + month + "/" + year);
    }
}