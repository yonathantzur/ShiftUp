import { Component, Output, EventEmitter, Input } from '@angular/core';

import { UsersService } from '../../services/users/users.service';

declare let Swal: any;

@Component({
    selector: 'workerCard',
    templateUrl: './workerCard.html',
    providers: [UsersService],
    styleUrls: ['./workerCard.css']
})

export class WorkerCardComponent {
    @Input() worker: any;
    @Output() onDelete: EventEmitter<Worker> = new EventEmitter<Worker>();

    constructor(private usersService: UsersService) {
    }

    calcAge = (birthDate: Date) => {
        if (birthDate) {
            return new Date(Date.now() - new Date(birthDate).valueOf()).getFullYear() - 1970;
        } else {
            return 0;
        }
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