import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare let Swal: any;

@Component({
    selector: 'login',
    templateUrl: './login.html',
    providers: [LoginService],
    styleUrls: ['./login.css']
})

export class LoginComponent implements OnInit {
    constructor(private loginService: LoginService,
        private router: Router) { }

    ngOnInit() {
        this.logout();
    }

    onSubmit(loginForm: NgForm) {
        if (loginForm.valid) {
            this.loginService.UserLogin(loginForm.value).then((result: any) => {
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