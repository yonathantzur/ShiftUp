import { Component } from '@angular/core';
import { WorkerService } from '../../../services/worker/worker.service';

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

    constructor(private workerService: WorkerService) { }

    SearchForBusiness() {
        this.business = null;
        this.workerService.GetBusinessByCode(this.businessId).then(result => {
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
}