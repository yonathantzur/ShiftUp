import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    isNewWorkerComponentActive: boolean = false;
    btnHover: number = null;

    constructor(
        private businessesService: BusinessesService,
        private workersService: WorkersService,
        private router: Router) { }

    ngOnInit() {
        this.businessesService.GetLoggedInBusiness().then((business: any) => {
            this.business = business;
        });

        this.businessesService.GetWorkersForBusiness().then((workers: any) => {
            this.workers = workers.filter((worker: any) => !worker.isManager);
        });
    }

    activateNewWorkerComponent = () => {
        this.btnHover = null;
        this.isNewWorkerComponentActive = true;
    }

    showRequests = () => {
        this.router.navigateByUrl('/workers/requests');
    }

    addNewWorkerHandler = (newWorker: any) => {
        if (newWorker) {
            this.workersService.AddWorkerToBusiness(newWorker.userId, newWorker.salary)
            .then(() => {
                this.workers.push(newWorker);
                Swal.fire({
                    title: "הפעולה הצליחה",
                    text: "העובד " + newWorker.firstName + ' ' + newWorker.lastName + " נוסף בהצלחה לעסק",
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
        this.isNewWorkerComponentActive = false;
    }

    deleteWorkerHandler = (worker: any) => {
        Swal.fire({
            title: "האם אתה בטוח?",
            text: "העובד " + worker.firstName + ' ' + worker.lastName + " יימחק",
            type: "warning",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "אישור",
            cancelButtonText: "ביטול"
        }).then((result: any) => {
            if (result.value) {
                this.workersService.RemoveWorkerFromBusiness(worker.userId)
                .then(() => {
                    this.workers = this.workers.filter(worker => worker.userId !== worker.userId);
                    Swal.fire({
                        title: "הפעולה הצליחה!",
                        text: "העובד נמחק בהצלחה",
                        type: "success",
                        showConfirmButton: false,
                        timer: 1000
                    });
                })
                .catch((err: any) => {
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

    deleteAllWorkersHandler = () => {
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