import { Component, Input } from '@angular/core';

import { ShiftService } from '../../services/shifts/shifts.service';
import { EventService } from '../../services/event/event.service';

@Component({
    selector: 'shiftEdit',
    templateUrl: './shiftEdit.html',
    providers: [ShiftService],
    styleUrls: ['./shiftEdit.css']
})

export class ShiftEditComponent {
    @Input()
    event: any;

    constructor(private shiftService: ShiftService,
        private eventService: EventService) { }

    CloseWindow() {
        this.eventService.Emit("closeShiftEdit");
    }
}