import { Component } from '@angular/core';
import { WorkerCardComponent, Worker } from '../workerCard/workerCard.component';

@Component({
    selector: 'workers',
    templateUrl: './workers.html',
    providers: [WorkerCardComponent],
    styleUrls: ['./workers.css']
})

export class WorkersComponent {
    workers: Array<Worker> = [
        { id: 323345120, name: "נופר ישראלי", job: "מארחת", age: 22, hourSalery: 28 },
        { id: 323545551, name: "יונתן צור", job: "טבח", age: 23, hourSalery: 40 },
        { id: 315856716, name: "ניב הוכברג", job: "מלצר", age: 23, hourSalery: 31 },
        { id: 201215100, name: "אבי רון", job: "שוטף כלים", age: 21, hourSalery: 22 },
        { id: 345852156, name: "ברי צקלה", job: "מלצר", age: 20, hourSalery: 30 },
        { id: 158815313, name: "גלעד שליט", job: "אחראי משמרת", age: 28, hourSalery: 42 },
    ];

    isNewWorkerDialogOpen: boolean = false;

    openNewWorkerDialog = () => {
        this.isNewWorkerDialogOpen = true;
    }

    onNewWorkerClose = (newWorker: Worker) => {
        this.isNewWorkerDialogOpen = false;
        this.workers.push(newWorker);
    }

    onDeleteWorker = (workerId: number) => {
        this.workers = this.workers.filter(worker => worker.id !== workerId);
    }
}