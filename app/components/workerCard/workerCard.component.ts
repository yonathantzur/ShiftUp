import { Component } from '@angular/core';


@Component({
    selector: 'workerCard',
    templateUrl: './workerCard.html',
    providers: [],
    styleUrls: ['./workerCard.css'],
    inputs: ['worker: worker']
})

export class WorkerCardComponent {
    worker: Worker;

    calcWorkerSalery = (worker: Worker) => {
        console.log("handle calculate worker salery " + worker.id);
    }
    
    deleteWorker = (worker: Worker) => {
        console.log("hadnle delete worker " + worker.id);
    }
}

export interface Worker {
    id: number;
    name: string;
    job: string;
    age: number;
    hourSalery: number;
}