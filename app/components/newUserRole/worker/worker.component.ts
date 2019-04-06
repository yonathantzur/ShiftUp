import { Component } from '@angular/core';
import { WorkerService } from '../../../services/worker/worker.service';
import { Router } from '@angular/router';

declare let Swal: any;

@Component({
    selector: 'worker',
    templateUrl: './worker.html',
    providers: [WorkerService],
    styleUrls: ['./worker.css']
})

export class WorkerComponent {
    businessId: number;
    business: any;

    constructor(private workerService: WorkerService,
        private router: Router) { }

    SearchForBusiness() {
        this.business = null;
        this.businessId && this.workerService.GetBusinessByCode(this.businessId).then(result => {
            if (result == false) {
                Swal.fire({
                    type: 'error',
                    title: 'אופס...',
                    text: 'נראה כי הקוד שהוזן לא שייך לאף בית עסק'
                });
            }
            else if (result == null) {
                Swal.fire({
                    type: 'error',
                    title: 'שגיאה',
                    text: 'אופס... משהו השתבש'
                });
            }
            else {
                this.business = result
            }
        });
    }

    back() {
        this.router.navigateByUrl('/role');
    }

    SendWorkerRequest() {
        this.workerService.SendWorkerRequest(this.business._id, this.business.manager._id).then(result => {
            if (result) {
                this.router.navigateByUrl('/workerWait');
            }
            else {
                Swal.fire({
                    type: 'error',
                    title: 'שגיאה',
                    text: 'אופס... משהו השתבש'
                });
            }
        });
    }
}