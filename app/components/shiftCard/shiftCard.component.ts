import { Component } from '@angular/core';

import { ShiftService } from '../../services/shifts/shifts.service';
import { EventService } from '../../services/event/event.service';

@Component({
    selector: 'shiftCard',
    templateUrl: './shiftCard.html',
    providers: [ShiftService],
    styleUrls: ['./shiftCard.css']
})

export class ShiftCardComponent {
    shiftsData: Array<any>;

    constructor(private shiftService: ShiftService,
        private eventService: EventService) {
        var self = this;

        this.eventService.Register("calanderEventClick", (event: any) => {
            // Get shifts data with workers objects.
            self.shiftService.GetShiftsWorkers(event.shiftsData).then((shiftsData: Array<any>) => {
                self.shiftsData = shiftsData
            });
        });

        this.eventService.Register("calanderViewRender", () => {
            self.shiftsData = null;
        });
    }

}