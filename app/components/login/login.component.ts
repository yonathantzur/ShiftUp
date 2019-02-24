import {NgForm} from '@angular/forms';
import {LoginService} from '../../services/login/login.service';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import {RegistrationComponent} from "../registration/registration.component";

@Component({
    selector: 'login',
    templateUrl: './login.html',
    providers: [LoginService],
    styleUrls: ['./login.css']
})

export class LoginComponent implements OnInit{
    user: any = {};
    loginForm: FormGroup;
    returnUrl: string;
    submitted = false;

    constructor(private loginService: LoginService,
                // private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router) {}

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onSubmit(loginForm: NgForm) {
        this.submitted = true;
        if (loginForm.valid) {
            this.user.email = loginForm.value.email;
            this.user.password = loginForm.value.password;

            this.loginService.UserLogin(this.user).then((result: any) => {
                if (result) {
                    this.router.navigate([this.returnUrl]);
                }
                else {
                    window.alert("שם משתמש או סיסמה לא נכונים");
                }
            });

        }
        else {
            window.alert("נא הכנס אימייל תקין וסיסמה");
        }
    }
}