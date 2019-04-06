import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../../../services/worker/worker.service';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login/login.service'

declare let Swal: any;

@Component({
    selector: 'workerWait',
    templateUrl: './workerWait.html',
    providers: [WorkerService],
    styleUrls: ['./workerWait.css']
})

export class WorkerWaitComponent implements OnInit {
    business: any;

    constructor(private workerService: WorkerService,
        private router: Router,
        private loginService: LoginService) { }

    ngOnInit() {
        this.workerService.GetWaitBusinessDetails().then(result => {
            this.business = result;
        });
    }

    logout() {
        this.loginService.logout().then(() => {
            this.router.navigateByUrl('/login');
        });
    }

    cancelRequest() {

    }
}