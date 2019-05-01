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
    selectedWorker: any;

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

    SelectWorker(worker: any) {
        let isWorkerSelected = worker.isSelected;
        this.selectedWorker = null;

        this.event.businessWorkers.forEach((worker: any) => {
            worker.isSelected = false;
        });

        if (!isWorkerSelected) {
            worker.isSelected = true
            this.selectedWorker = worker;
        }
    }

    AddWorkerToShift(shift: any) {
        this.RemoveWorkerFromShift(shift, this.selectedWorker._id);
        this.selectedWorker.isSelected = false;
        shift.workers.push(this.selectedWorker);
        this.selectedWorker = null;
        setTimeout(() => {
            $("#shift-workers-container").animate({ scrollTop: $(document).height() }, 0);
        }, 0);
    }

    RemoveWorkerFromShift(shift: any, workerId: string) {
        shift.workers = shift.workers.filter((worker: any) => {
            return (worker._id != workerId);
        });
    }

    UpdateEventShifts() {
        this.shiftService.UpdateEventShifts(this.event.id, this.event.shiftsData).then(result => {
            if (result) {
                this.eventService.Emit("renderCalendar");
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