import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service'

@Component({
    selector: 'newUserRole',
    templateUrl: './newUserRole.html',
    providers: [LoginService],
    styleUrls: ['./newUserRole.css']
})

export class NewUserRoleComponent {
    constructor(private router: Router,
        private loginService: LoginService) { }

    businessSettings() {
        this.router.navigateByUrl('/role/business');
    }

    workerSettings() {
        this.router.navigateByUrl('/role/worker');
    }

    logout() {
        this.loginService.logout().then(() => {
            this.router.navigateByUrl('/login');
        });
    }
}