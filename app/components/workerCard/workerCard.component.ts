import { Component, Output, EventEmitter } from '@angular/core';

import { UsersService } from '../../services/users/users.service';

declare let Swal: any;

@Component({
    selector: 'workerCard',
    templateUrl: './workerCard.html',
    providers: [UsersService],
    styleUrls: ['./workerCard.css'],
    inputs: ['worker: worker']
})

export class WorkerCardComponent {
    worker: any;
    @Output() onDelete: EventEmitter<Worker> = new EventEmitter<Worker>();
    workerUserData: any = {};

    constructor(private usersService: UsersService) {
    }

    ngOnInit() {
        this.usersService.GetUserByUserId(this.worker.userId)
            .then((userData: any) => this.workerUserData = userData);
    }

    calcAge = (strBirthDate: string) => {
        const birthDate = new Date(strBirthDate).valueOf();
        return new Date(Date.now() - birthDate).getFullYear() - 1970;
    }

    calcWorkerSalery = () => {
        Swal.fire({
            title: "עדיין בפיתוח! עובדים על זה",
            text: "חישוב שכר עבור עובד " + this.worker.userId,
            type: "warning",
            confirmButtonText: "אישור"
        });
    }
    
    deleteWorker = () => {
        this.onDelete.emit();
    }
}