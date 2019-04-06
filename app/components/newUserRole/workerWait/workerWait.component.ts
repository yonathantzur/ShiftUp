import { Component } from '@angular/core';
import { WorkerService } from '../../../services/worker/worker.service';
import { Router } from '@angular/router';

declare let Swal: any;

@Component({
    selector: 'workerWait',
    templateUrl: './workerWait.html',
    providers: [WorkerService],
    styleUrls: ['./workerWait.css']
})

export class WorkerWaitComponent {
    constructor(private workerService: WorkerService,
        private router: Router) { }


}