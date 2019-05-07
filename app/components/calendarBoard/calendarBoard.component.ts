import { Component } from '@angular/core';

import { EventService } from '../../services/event/event.service';
import { CalendarBoardService } from '../../services/calendarBoard/calendarBoard.service';

declare let $: any;

@Component({
    selector: 'calendarBoard',
    templateUrl: './calendarBoard.html',
    providers: [CalendarBoardService],
    styleUrls: ['./calendarBoard.css']
})

export class CalendarBoardComponent {
    monthName: string;

    constructor(private calendarBoardService: CalendarBoardService,
        private eventService: EventService) { }

    Schedule() {
        let year = $('#calendar').fullCalendar('getDate')._d.getFullYear();
        let month = $('#calendar').fullCalendar('getDate')._d.getMonth() + 1;

        this.eventService.Emit("startLoader");

        this.calendarBoardService.GetShiftsSchedule(year, month).then(shifts => {
            if (shifts) {
                this.eventService.Emit("renderCalendar");
            }
        });
    }
}