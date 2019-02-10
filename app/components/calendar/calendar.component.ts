import { Component, OnInit } from '@angular/core';

import { ShiftService } from '../../services/shifts/shifts.service';

declare var $: any;

@Component({
    selector: 'calendar',
    templateUrl: './calendar.html',
    providers: [ShiftService],
    styleUrls: ['./calendar.css']
})

export class CalendarComponent implements OnInit {
    calendar: any;

    constructor(private shiftService: ShiftService) { }

    ngOnInit() {
        var self = this;

        self.calendar = $('#calendar').fullCalendar({
            height: "parent",
            viewRender: function (element: any) {
                let dateRange = $('#calendar').fullCalendar('getDate')._i;
                let year: number = dateRange[0];
                let month: number = dateRange[1] + 1;

                self.shiftService.GetAllShiftsForBusiness(year, month).then(shifts => {
                    if (shifts) {
                        let events: Array<any> = [];

                        shifts.forEach((shift: any) => {
                            events.push({
                                id: shift._id,
                                title: "שיבוץ",
                                start: shift.date
                            });
                        });

                        self.loadShifts(events);
                    }
                });
            }
        });
    }

    loadShifts(shifts: Array<any>) {
        this.calendar.fullCalendar('renderEvents', shifts);
    }
}