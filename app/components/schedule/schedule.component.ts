import { Component } from '@angular/core';

import { EventService } from '../../services/event/event.service';
import { ScheduleService } from '../../services/schedule/schedule.service';

declare let $: any;
declare let Swal: any;

@Component({
    selector: 'schedule',
    templateUrl: './schedule.html',
    providers: [ScheduleService],
    styleUrls: ['./schedule.css']
})

export class ScheduleComponent {
    monthName: string;
    isLoading: boolean;
    isScheduleAllow: boolean = true;
    calendarTitle: string;

    constructor(private scheduleService: ScheduleService,
        private eventService: EventService) {
        this.eventService.Register("calanderViewRender", () => {
            let calendarDate = $('#calendar').fullCalendar('getDate')._d;
            let currDate = new Date();
            let calendarYear = calendarDate.getFullYear();
            let calendarMonth = calendarDate.getMonth();
            let currYear = currDate.getFullYear();
            let currMonth = currDate.getMonth();
            this.calendarTitle = $('#calendar').fullCalendar('getView').title;

            if (calendarYear < currYear ||
                (calendarMonth < currMonth && calendarYear == currYear)) {
                this.isScheduleAllow = false;
            }
            else {
                this.isScheduleAllow = true;
            }

        });
    }

    Schedule() {
        let year = $('#calendar').fullCalendar('getDate')._d.getFullYear();
        let month = $('#calendar').fullCalendar('getDate')._d.getMonth() + 1;

        this.eventService.Emit("startLoader");
        this.isLoading = true;

        this.scheduleService.GetShiftsSchedule(year, month).then(shifts => {
            this.isLoading = false;

            if (shifts) {
                this.eventService.Emit("renderCalendar", shifts);
            }
            else {
                Swal.fire({
                    type: 'error',
                    title: 'שגיאה בשיבוץ',
                    text: 'אופס... משהו השתבש'
                })
            }
        });
    }
}