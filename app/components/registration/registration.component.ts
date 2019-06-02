import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { registrationService } from '../../services/registration/registration.service';

declare let Swal: any;

@Component({
    selector: 'registration',
    templateUrl: './registration.html',
    providers: [registrationService],
    styleUrls: ['./registration.css']
})

export class RegistrationComponent {
    constructor(private router: Router,
        private regService: registrationService) { }

    onSubmit(regForm: NgForm) {
        if (regForm.valid) {
            this.regService.register(regForm.value).then((result: any) => {
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
