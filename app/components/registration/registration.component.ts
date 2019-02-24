import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';

import { registrationService } from '../../services/registration/registration.service';
import {LoginService} from "../../services/login/login.service";

@Component({
    selector: 'registration',
    templateUrl: './registration.html',
    providers: [registrationService, LoginService],
    styleUrls: ['./registration.css']
})

export class RegistrationComponent {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    user: any = {};

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private regService: registrationService,
        private loginService: LoginService
    ) {
        // redirect to home if already logged in
        if (this.loginService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit(regForm: NgForm) {
        this.submitted = true;

        // stop here if form is invalid
        if (regForm.invalid) {
            return;
        }
        this.user.email = regForm.value.email;
        this.user.firstName = regForm.value.firstName;
        this.user.lastName = regForm.value.lastName;
        this.user.password = regForm.value.password;
        this.loading = true;
        this.regService.register(this.user).then((result: any) => {
            if (result) {
                alert("ברוך הבא" + this.user.firstName + ", נרשמת בהצלחה!");
                this.router.navigate(['/']);
            }
            else {
                window.alert("שגיאה בהרשמה");
            }
        });
    }
}
