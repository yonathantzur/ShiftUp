import { Component } from '@angular/core';

import { BusinessesService } from '../../services/businesses/businesses.service';
import { WorkersService } from '../../services/workers/workers.service';

declare let Swal: any;

@Component({
    selector: 'workers',
    templateUrl: './workers.html',
    providers: [BusinessesService, WorkersService],
    styleUrls: ['./workers.css']
})

export class WorkersComponent {
    business: any = {};
    workers: Array<any> = [];
    isNewWorkerDialogOpen: boolean = false;

    constructor(
        private businessesService: BusinessesService,
        private workersService: WorkersService
    ) {}
    
    ngOnInit() {
        this.businessesService.GetLoggedInBusiness().then((business: any) => {
            this.business = business;
        });
        
        this.businessesService.GetWorkersForBusiness().then((workers: any) => {
            this.workers = workers;
        });
    }

    openNewWorkerDialog = () => {
        this.isNewWorkerDialogOpen = true;
    }

    onNewWorkerClose = (newWorker: any) => {
        if (newWorker) {
            if (this.workers.find(currWorker => currWorker.userId == newWorker.userId)) {
                Swal.fire({
                    title: "שגיאה!",
                    text: "קיים עובד עם מספר תעודת זהות זהה.",
                    type: "error",
                    confirmButtonText: "אישור"
                  });
                return;
            } else {
                this.workersService.AddWorkerToBusiness(newWorker.userId, newWorker.salary)
                    .then(() => {
                        this.workers.push(newWorker);
                        Swal.fire({
                            title: "הפעולה הצליחה",
                            text: "העובד " + newWorker.userId + " נוסף בהצלחה לעסק",
                            type: "success",
                            confirmButtonText: "אישור"
                        });
                    })
                    .catch((err: any) => {
                        Swal.fire({
                            title: "שגיאה!",
                            text: "הפעולה נכשלה",
                            type: "error",
                            confirmButtonText: "אישור"
                        });
                        return;
                    });
            }
        }
        this.isNewWorkerDialogOpen = false;
    }

    onDeleteWorker = (workerUserId: string) => {
        Swal.fire({
            title: "האם אתה בטוח?",
            text: "העובד " + workerUserId + " יימחק.",
            type: "warning",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "אישור",
            cancelButtonText: "ביטול"
        }).then((result: any) => {
            if (result.value) {
                this.workersService.RemoveWorkerFromBusiness(workerUserId)
                    .then(() => {
                        this.workers = this.workers.filter(worker => worker.userId !== workerUserId);
                        Swal.fire({
                            title: "הפעולה הצליחה!",
                            text: "העובד נמחק בהצלחה",
                            type: "success",
                            showConfirmButton: false,
                            timer: 1000
                        });
                    })
                    .catch(err => {
                        Swal.fire({
                            title: "שגיאה",
                            text: "הפעולה נכשלה!",
                            type: "error",
                            showConfirmButton: false,
                            timer: 1000
                        });
                    })
                
            }
        });
    }

    onDeleteAllWorkers = () => {
        Swal.fire({
            title: "האם אתה בטוח?",
            text: "כל העובדים יימחקו.",
            type: "warning",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "אישור",
            cancelButtonText: "ביטול"
        }).then((result: any) => {
            if (result.value) {
                this.workers = [];
                Swal.fire({
                    title: "הפעולה הצליחה!",
                    text: "כל העובדים נמחקו בהצלחה.",
                    type: "success",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    }
}