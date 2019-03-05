import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {registrationService} from '../../services/registration/registration.service';

declare let Swal: any;

@Component({
    selector: 'registration',
    templateUrl: './registration.html',
    providers: [registrationService],
    styleUrls: ['./registration.css']
})

export class RegistrationComponent {
    registerForm: FormGroup;
    submitted = false;
    user: any = {};

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private regService: registrationService,
    ) {}

    onSubmit(regForm: NgForm) {
        this.submitted = true;
        if (regForm.valid) {
            this.user.email = regForm.value.email;
            this.user.firstName = regForm.value.firstName;
            this.user.lastName = regForm.value.lastName;
            this.user.password = regForm.value.password;
            this.regService.register(this.user).then((result: any) => {
                    if (result) {
                        this.router.navigateByUrl('/');
                    }
                    else if (result == false) {
                        Swal.fire({
                            type: 'error',
                            title: 'שגיאה בהרשמה',
                            text: 'משתמש קיים'
                        })
                    }
                    else {
                        Swal.fire({
                            type: 'error',
                            title: 'שגיאה בהרשמה',
                            text: 'אופס... משהו השתבש'
                        })

                    }
                }
            );
        }
    }
}
