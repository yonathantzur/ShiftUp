import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoginService} from '../../services/login/login.service';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'login',
    templateUrl: './login.html',
    providers: [LoginService],
    styleUrls: ['./login.css']
})

export class LoginComponent {
    user: any = {};

    constructor(private loginService: LoginService) {}

    onSubmit(loginForm: NgForm) {
        console.log(loginForm.value);
        console.log(loginForm.valid);

        if (loginForm.valid) {
            this.user.email = loginForm.value.email;
            this.user.password = loginForm.value.password;

            this.loginService.UserLogin(this.user).then(result => {
                if (result) {
                    console.log(result);
                }
                else {
                    console.log('error');
                }
            });

        }
        else {
            window.alert("invalid details!");
        }
    }
}