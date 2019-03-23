import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
    selector: 'workerCard',
    templateUrl: './workerCard.html',
    providers: [],
    styleUrls: ['./workerCard.css'],
    inputs: ['worker: worker']
})

export class WorkerCardComponent {
    worker: Worker;
    @Output() onClose: EventEmitter<Worker> = new EventEmitter<Worker>();

    getWorkerJobDisplayText(job: string) {
        switch (job) {
            case "waiter": return "מלצר/ית";
            case "shiftManager": return "אחראי/ת משמרת";
            case "shef": return "טבח/ית";
            case "host": return "מארח/ת";
            case "dishWasher": return "שוטפ/ת כלים";
            default: return "לא נמצא תפקיד";
        }
    }

    calcWorkerSalery = () => {
        console.log("handle calculate worker salery " + this.worker.id);
    }
    
    deleteWorker = () => {
        this.onClose.emit();
    }
}

export interface Worker {
    id: number;
    name: string;
    job: string;
    age: number;
    hourSalery: number;
}