import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { ShiftService } from '../../services/shifts/shifts.service';
import { ConstraintsService } from '../../services/constraints/constraints.service';
import { EventService } from '../../services/event/event.service';

import { SHIFTS_FILTER } from '../../enums/enums'

declare let $: any;

@Component({
    selector: 'calendar',
    templateUrl: './calendar.html',
    providers: [ShiftService, ConstraintsService],
    styleUrls: ['./calendar.css']
})

export class CalendarComponent implements OnInit, OnDestroy {
    @Input()
    isUserManager: boolean;
    @Input()
    userId: string;
    calendar: any;
    markedEvent: any;
    eventsCache: Object = {};
    viewState: SHIFTS_FILTER;
    isLoading: boolean;

    // Event edit properties.
    eventEditObject: any;

    eventsIds: Array<string> = [];

    constructor(private shiftService: ShiftService,
        private constraintsService: ConstraintsService,
        private eventService: EventService) {
        let self = this;

        self.eventService.Register("startLoader", (event: any) => {
            self.isLoading = true;
        });

        self.eventService.Register("stopLoader", (event: any) => {
            self.isLoading = false;
        });

        self.eventService.Register("openEditShiftCard", (event: any) => {
            self.eventEditObject = self.createEventObjectToEdit(event);
        });

        self.eventService.Register("renderCalendar", (shifts: Array<any>) => {
            this.viewState = SHIFTS_FILTER.ALL;
            $("#filter-select").val(0);
            this.removeShiftsFromAllCahce();
            self.renderCalendar(shifts);
        });

        self.eventService.Register("closeShiftEdit", () => {
            self.eventEditObject = null;
        });

        self.eventService.Register("changeFilter", (filter: SHIFTS_FILTER) => {
            self.eventService.Emit("calanderViewRender");
            self.viewState = filter;

            let dateRange = $('#calendar').fullCalendar('getDate')._i;
            let year: number = dateRange[0];
            let month: number = dateRange[1] + 1;

            this.removeShiftsFromAllCahce();

            let reqQuery;

            if (filter == SHIFTS_FILTER.ALL) {
                reqQuery = self.shiftService.GetShiftsForBusiness(year, month);
            }
            else if (filter == SHIFTS_FILTER.ME) {
                reqQuery = self.shiftService.GetMyShiftsForBusiness(year, month);
            }

            self.isLoading = true;

            reqQuery.then((shifts: Array<any>) => {
                self.isLoading = false;
                let shiftsResult = self.handleShiftsResult(shifts);
                let constraints = this.eventsCache[year + "-" + month].constraints;
                this.loadEvents(shiftsResult, constraints, year, month);
            });

        }, self.eventsIds);
    }

    ngOnInit() {
        this.viewState = this.isUserManager ? SHIFTS_FILTER.ALL : SHIFTS_FILTER.ME;

        let self = this;

        self.calendar = $('#calendar').fullCalendar({
            height: "parent",
            editable: false,
            customButtons: {
                export: {
                    click: function () {
                        self.exportData();
                    }
                }
            },
            header: {
                left: 'next,prev today export',
                right: 'dayGridMonth,timeGridWeek,timeGridDay, title'
            },
            eventRender: function (event: any, element: any) {
                if (self.isUserManager && event.shiftsData != null) {
                    element.bind('dblclick', () => {
                        self.eventEditObject = self.createEventObjectToEdit(event);
                    });
                }
            },
            viewRender: function () {
                $(".fc-export-button")
                    .html('<i style="color:#28a745" class="far fa-file-excel"></i>').prop('title', 'ייצוא לאקסל');
                self.renderCalendar();
            },
            eventClick: function (event: any) {
                if (self.markedEvent == this) {
                    self.eventService.Emit("calanderEventUnClick");
                    $(self.markedEvent).css('border-color', '');
                    self.markedEvent = null;
                }
                else if (event.shiftsData != null) {
                    // Mark selected event.
                    self.markedEvent && $(self.markedEvent).css('border-color', '');
                    $(this).css('border-color', '#dc3545');
                    self.markedEvent = this;

                    self.eventService.Emit("calanderEventClick", event);
                }
            }
        });
    }

    ngOnDestroy() {
        this.eventService.UnsubscribeEvents(this.eventsIds);
    }

    exportData() {
        if (this.isLoading) {
            return;
        }
        else {
            this.isLoading = true;
        }

        let dateRange = $('#calendar').fullCalendar('getDate')._i;
        let year: number = dateRange[0];
        let month: number = dateRange[1] + 1;

        this.shiftService.GetMonthlyShiftsForExport(year, month, this.viewState).then((dataSource: any) => {
            this.isLoading = false;
            let exportInfo = { dataSource };
            let exportDateTitle = $('#calendar').fullCalendar('getView').title;

            if (this.viewState == SHIFTS_FILTER.ME) {
                exportInfo["fileName"] = "המשמרות שלי - " + exportDateTitle;
            }
            else {
                exportInfo["fileName"] = "משמרות - " + exportDateTitle;
            }

            this.eventService.Emit("excel", exportInfo);
        });
    }

    renderCalendar(shifts?: Array<any>) {
        this.eventService.Emit("calanderViewRender");
        let dateRange = $('#calendar').fullCalendar('getDate')._i;
        let year: number = dateRange[0];
        let month: number = dateRange[1] + 1;

        let eventsFromCache = this.eventsCache[year + "-" + month];

        if (shifts) {
            this.isLoading = false;
            let newShifts = this.handleShiftsResult(shifts);
            this.loadEvents(newShifts, eventsFromCache.constraints, year, month);
        }
        else if (eventsFromCache &&
            eventsFromCache.shifts &&
            eventsFromCache.constraints) {
            this.loadEvents(eventsFromCache.shifts, eventsFromCache.constraints, year, month);
        }
        else {
            let reqQuery;

            if (this.viewState == SHIFTS_FILTER.ALL) {
                reqQuery = this.shiftService.GetShiftsForBusiness(year, month);
            }
            else if (this.viewState == SHIFTS_FILTER.ME) {
                reqQuery = this.shiftService.GetMyShiftsForBusiness(year, month);
            }

            this.isLoading = true;

            Promise.all([reqQuery, this.constraintsService.GetUserConstraints(year, month)]).then(results => {
                let shiftsResult = this.handleShiftsResult(results[0]);
                let constraintsResult = this.handleConstraintsResult(results[1]);
                this.isLoading = false;
                this.loadEvents(shiftsResult, constraintsResult, year, month);
            });
        }
    }

    handleShiftsResult(shifts: Array<any>) {
        let self = this;
        let events: Array<any> = [];

        shifts && shifts.forEach((shift: any) => {
            events.push({
                id: shift._id,
                title: self.calcShiftName(shift),
                start: shift.date,
                color: "#49ae9c",
                allDay: true,
                shiftsData: shift.shiftsData
            });
        });

        return events;
    }

    calcShiftName(shift: any) {
        let shiftCalcName = "שיבוץ";

        // In case the view is for all shifts events.
        if (this.viewState == SHIFTS_FILTER.ME) {
            let workerShifts: Array<string> = [];

            shift.shiftsData.forEach((shiftData: any) => {
                if (shiftData.workers.indexOf(this.userId) != -1) {
                    workerShifts.push(shiftData.name);
                }
            });

            if (workerShifts.length > 0) {
                shiftCalcName = "";
                workerShifts.forEach((shiftName: string, index: number) => {
                    shiftCalcName += shiftName + ((index != workerShifts.length - 1) ? ", " : "");
                });
            }
        }

        return shiftCalcName;
    }

    handleConstraintsResult(constraints: Array<any>) {
        let self = this;
        let events: Array<any> = [];

        constraints.forEach((constraint: any) => {
            events.push({
                id: constraint._id,
                title: self.calcConstraintName(constraint),
                start: this.formatToEventDate(constraint.startDate),
                end: this.formatToEventDate(constraint.endDate, true),
                color: '#ffce26c4',
                allDay: true
            });
        });

        return events;
    }

    calcConstraintName(constraint: any) {
        let constraintName = "אילוץ";

        let checkedShifts = constraint.shifts.filter((shift: any) => {
            return shift.isChecked;
        }).map((shift: any) => {
            return shift.name;
        });

        if (checkedShifts.length == constraint.shifts.length) {
            return constraintName;
        }

        for (let i = 0; i < checkedShifts.length; i++) {
            constraintName += ((i == 0) ? " - " : "/") + checkedShifts[i];
        }

        return constraintName;
    }

    loadEvents(shifts: Array<any>, constraints: Array<any>, year: number, month: number) {
        this.insetToCache(shifts, constraints, year, month);
        this.calendar.fullCalendar('removeEvents');
        this.calendar.fullCalendar('renderEvents', constraints);
        this.calendar.fullCalendar('renderEvents', shifts);
    }

    createEventObjectToEdit(event: any) {
        let eventObj = {
            "id": event.id,
            "shiftsData": event.shiftsData,
            "date": this.formatEventDate(event.start._i)
        };

        return eventObj;
    }

    formatEventDate(dateStr: string) {
        let date = new Date(dateStr);

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

    formatToEventDate(dateStr: string, isCheckEnd?: boolean) {
        let date = new Date(dateStr);

        if (isCheckEnd) {
            date.setDate(date.getDate() + 1);
        }

        let day: any = date.getDate();
        let month: any = date.getMonth() + 1;
        let year: any = date.getFullYear();

        if (day < 10) {
            day = "0" + day;
        }

        if (month < 10) {
            month = "0" + month;
        }

        return (year + "-" + month + "-" + day);
    }

    insetToCache(shifts: Array<any>, constraints: Array<any>, year: number, month: number) {
        this.eventsCache[year + "-" + month] = {
            shifts,
            constraints
        };
    }

    removeShiftsFromAllCahce() {
        let cacheObj = this.eventsCache;

        // Remove all shifts from cache.
        Object.keys(cacheObj).forEach(key => {
            delete cacheObj[key]["shifts"];
        });
    }
}