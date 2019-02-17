import {NgForm} from '@angular/forms';
import {LoginService} from '../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {HttpClient} from '@angular/common/http';
import {debug} from "util";

@Component({
    selector: 'login',
    templateUrl: './login.html',
    providers: [LoginService],
    styleUrls: ['./login.css']
})

export class LoginComponent implements OnInit{
    user: any = {};
    registerForm: FormGroup;
    submitted = false;

    constructor(private loginService: LoginService) {}

    ngOnInit() {
        console.error(this);
    }

    onSubmit(loginForm: NgForm) {
        console.log(loginForm.value);
        console.log(loginForm.valid);

        if (loginForm.valid) {
            this.user.email = loginForm.value.email;
            this.user.password = loginForm.value.password;

            this.loginService.UserLogin(this.user).then((result:any) => {
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