import { Component, OnInit, inject, Input } from '@angular/core';

declare var $: any;

@Component({
    selector: 'calendar',
    templateUrl: './calendar.html',
    providers: [],
    styleUrls: ['./calendar.css']
})

export class CalendarComponent implements OnInit {
    calendar: any;
    @Input()
    events: Array<any>;

    ngOnInit() {        
        this.calendar = $('#calendar').fullCalendar({
            height: "parent"
        });

        this.calendar.fullCalendar('renderEvents', this.events);      
    }
}