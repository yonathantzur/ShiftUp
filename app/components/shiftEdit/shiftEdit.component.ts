import { Component, Input, OnInit } from '@angular/core';

import { ShiftService } from '../../services/shifts/shifts.service';
import { EventService } from '../../services/event/event.service';

declare let Swal: any;

@Component({
    selector: 'shiftEdit',
    templateUrl: './shiftEdit.html',
    providers: [ShiftService],
    styleUrls: ['./shiftEdit.css']
})

export class ShiftEditComponent implements OnInit {
    @Input()
    event: any;
    isLoading: boolean;

    constructor(private shiftService: ShiftService,
        private eventService: EventService) { }

    ngOnInit() {
        this.isLoading = true;

        this.shiftService.GetEventDetails(this.event).then(fullEvent => {
            this.isLoading = false;

            if (fullEvent) {
                this.event = fullEvent;
            }
            else {
                Swal.fire({
                    type: 'error',
                    title: 'שגיאה בטעינת הנתונים',
                    text: 'אופס... משהו השתבש'
                })
            }
        });
    }

    CloseWindow() {
        this.eventService.Emit("closeShiftEdit");
    }

    UpdateEventShifts() {
        this.shiftService.UpdateEventShifts(this.event.id, this.event.shiftsData).then(result => {
            if (result) {
                this.CloseWindow();
            }
            else {
                Swal.fire({
                    type: 'error',
                    title: 'שגיאה בעדכון המשמרות',
                    text: 'אופס... משהו השתבש'
                })
            }
        });
    }
}