import { Component } from '@angular/core';

import { EventService } from '../../services/event/event.service';

@Component({
    selector: 'shiftEdit',
    templateUrl: './shiftEdit.html',
    providers: [],
    styleUrls: ['./shiftEdit.css']
})

export class ShiftEditComponent {
    constructor(private eventService: EventService) {

    }

    CloseWindow() {
        this.eventService.Emit("closeShiftEdit");
    }
}