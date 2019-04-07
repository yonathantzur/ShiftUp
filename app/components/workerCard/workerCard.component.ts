import { Component, Output, EventEmitter } from '@angular/core';

import { UsersService } from '../../services/users/users.service';

@Component({
    selector: 'workerCard',
    templateUrl: './workerCard.html',
    providers: [UsersService],
    styleUrls: ['./workerCard.css'],
    inputs: ['worker: worker']
})

export class WorkerCardComponent {
    worker: any;
    @Output() onClose: EventEmitter<Worker> = new EventEmitter<Worker>();
    workerUserData: any = {};

    constructor(private usersService: UsersService) {
    }

    ngOnInit() {
        this.usersService.GetUserById(this.worker.userId)
            .then((userData: any) => this.workerUserData = userData);
    }

    calcWorkerSalery = () => {
        console.log("handle calculate worker salary " + this.worker.userId);
    }
    
    deleteWorker = () => {
        this.onClose.emit();
    }
}