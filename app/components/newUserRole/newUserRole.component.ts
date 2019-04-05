import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'newUser',
    templateUrl: './newUser.html',
    providers: [],
    styleUrls: ['./newUser.css']
})

export class NewUserRoleComponent {

    constructor(private router: Router) { }

    businessSettings() {
        this.router.navigateByUrl('/role/business');
    }

    workerSettings() {
        this.router.navigateByUrl('/role/worker');
    }

}