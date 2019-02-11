import { Component, OnInit } from '@angular/core';

import { ShiftService } from '../../services/shifts/shifts.service';
import { EventService } from '../../services/event/event.service';

declare var $: any;

@Component({
    selector: 'calendar',
    templateUrl: './calendar.html',
    providers: [ShiftService],
    styleUrls: ['./calendar.css']
})

export class CalendarComponent implements OnInit {
    calendar: any;
    markedEvent: any;

    constructor(private shiftService: ShiftService,
        private eventService: EventService) { }

    ngOnInit() {
        var self = this;

        self.calendar = $('#calendar').fullCalendar({
            height: "parent",
            viewRender: function (element: any) {
                self.eventService.Emit("calanderViewRender");
                let dateRange = $('#calendar').fullCalendar('getDate')._i;
                let year: number = dateRange[0];
                let month: number = dateRange[1] + 1;

                self.shiftService.GetShiftsForBusiness(year, month).then((shifts: Array<any>) => {
                    if (shifts) {
                        let events: Array<any> = [];

                        shifts.forEach((shift: any) => {
                            events.push({
                                id: shift._id,
                                title: "שיבוץ",
                                start: shift.date,
                                shiftsData: shift.shiftsData
                            });
                        });

                        self.loadShifts(events);
                    }
                });
            },
            eventClick: function (event: any) {
                // Mark selected event.
                self.markedEvent && $(self.markedEvent).css('border-color', '');
                $(this).css('border-color', '#dc3545');
                self.markedEvent = this;

                self.eventService.Emit("calanderEventClick", event);
            }
        });
    }

    loadShifts(shifts: Array<any>) {
        this.calendar.fullCalendar('renderEvents', shifts);
    }
}