import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare let Swal: any;

@Component({
    selector: 'login',
    templateUrl: './login.html',
    providers: [LoginService],
    styleUrls: ['./login.css']
})

export class LoginComponent implements OnInit {
    user: any = {};
    submitted = false;

    constructor(private loginService: LoginService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() {
        this.logout();
    }

    onSubmit(loginForm: NgForm) {
        this.submitted = true;

        if (loginForm.valid) {
            this.user.email = loginForm.value.email;
            this.user.password = loginForm.value.password;

            this.loginService.UserLogin(this.user).then((result: any) => {
                if (result) {
                    this.router.navigateByUrl('/');
                }
                else if (result == false) {
                    Swal.fire({
                        type: 'error',
                        title: 'שגיאה בהתחברות',
                        text: 'שם המשתמש או הסיסמה אינם נכונים'
                    })
                }
                else {
                    Swal.fire({
                        type: 'error',
                        title: 'שגיאה בהתחברות',
                        text: 'אופס... משהו השתבש'
                    })
                }
            });
        }
    }

    logout() {
        this.router.navigateByUrl('/login');
        this.loginService.logout();
    }
}