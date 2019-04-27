import { Component, OnInit, OnDestroy } from '@angular/core';

import { ShiftService } from '../../services/shifts/shifts.service';
import { EventService } from '../../services/event/event.service';

import { SHIFTS_FILTER } from '../../enums/enums'

declare let $: any;

@Component({
    selector: 'calendar',
    templateUrl: './calendar.html',
    providers: [ShiftService],
    styleUrls: ['./calendar.css']
})

export class CalendarComponent implements OnInit, OnDestroy {
    calendar: any;
    markedEvent: any;
    eventsCache: Object = {};
    viewState: SHIFTS_FILTER = SHIFTS_FILTER.ALL;

    // Event edit properties.
    eventEditObject: any;

    eventsIds: Array<string> = [];

    constructor(private shiftService: ShiftService,
        private eventService: EventService) {
        let self = this;

        self.eventService.Register("closeShiftEdit", () => {
            self.eventEditObject = null;
        });

        self.eventService.Register("changeFilter", (filter: SHIFTS_FILTER) => {
            self.eventService.Emit("calanderViewRender");
            self.viewState = filter;
            self.eventsCache = {};
            let dateRange = $('#calendar').fullCalendar('getDate')._i;
            let year: number = dateRange[0];
            let month: number = dateRange[1] + 1;

            let reqQuery;

            if (filter == SHIFTS_FILTER.ALL) {
                reqQuery = self.shiftService.GetShiftsForBusiness(year, month);
            }
            else if (filter == SHIFTS_FILTER.ME) {
                reqQuery = self.shiftService.GetMyShiftsForBusiness(year, month);
            }

            reqQuery.then((shifts: Array<any>) => {
                shifts && self.handleShiftsResult(shifts, year, month);
            });

        }, self.eventsIds);
    }

    ngOnInit() {
        let self = this;

        self.calendar = $('#calendar').fullCalendar({
            height: "parent",
            editable: true,
            eventRender: function (event: any, element: any) {
                element.bind('dblclick', () => {
                    self.eventEditObject = self.createEventObjectToEdit(event);
                });
            },
            viewRender: function (element: any) {
                self.eventService.Emit("calanderViewRender");
                let dateRange = $('#calendar').fullCalendar('getDate')._i;
                let year: number = dateRange[0];
                let month: number = dateRange[1] + 1;

                let eventsFromCache = self.eventsCache[year + "-" + month];

                if (eventsFromCache) {
                    self.loadShifts(eventsFromCache);
                }
                else {
                    let reqQuery;

                    if (self.viewState == SHIFTS_FILTER.ALL) {
                        reqQuery = self.shiftService.GetShiftsForBusiness(year, month);
                    }
                    else if (self.viewState == SHIFTS_FILTER.ME) {
                        reqQuery = self.shiftService.GetMyShiftsForBusiness(year, month);
                    }

                    reqQuery.then((shifts: Array<any>) => {
                        shifts && self.handleShiftsResult(shifts, year, month);
                    });
                }
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

    ngOnDestroy() {
        this.eventService.UnsubscribeEvents(this.eventsIds);
    }

    handleShiftsResult(shifts: Array<any>, year: number, month: number) {
        let events: Array<any> = [];

        shifts.forEach((shift: any) => {
            events.push({
                id: shift._id,
                title: "שיבוץ",
                start: shift.date,
                shiftsData: shift.shiftsData
            });
        });

        this.eventsCache[year + "-" + month] = events;
        this.loadShifts(events);
    }

    loadShifts(shifts: Array<any>) {
        this.calendar.fullCalendar('removeEvents');
        this.calendar.fullCalendar('renderEvents', shifts);
    }

    createEventObjectToEdit(event: any) {
        let eventObj = {
            "id": event.id,
            "shiftsData": event.shiftsData
        };

        return eventObj;
    }
}