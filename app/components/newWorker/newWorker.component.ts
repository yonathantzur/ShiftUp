import { Component, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
    selector: 'newWorker',
    templateUrl: './newWorker.html',
    providers: [UsersService],
    styleUrls: ['./newWorker.css']
})

export class NewWorkerComponent {
    newWorker: any = { userId: "", salary: 20 };
    @Output() onSubmit: EventEmitter<Worker> = new EventEmitter<Worker>();
    strUserIdErrorMessage: string = "";
    strSalaryErrorMessage: string = "";
    isUserIdValid: boolean = false;

    constructor(private usersService: UsersService) {
    }

    onCancel = () => {
        this.onSubmit.emit();
    }

    onChange = (event: any) => {
        const fieldName: string = event.target.name;
        let fieldValue: string | number | boolean = event.target.value;

        if (event.target.type == "number" || event.target.type == "range") {
            fieldValue = (fieldValue == "") ? 0 : parseInt(fieldValue.toString());
        }

        this.newWorker[fieldName] = fieldValue;
    }

    onUserIdChange = (newUserId: string) => {
        if (newUserId.match("^[0-9]{0,9}$")) {
            this.strUserIdErrorMessage = "";
            this.strSalaryErrorMessage = "";
            this.newWorker["userId"] = newUserId;
            if (newUserId.length == 9) {
                this.usersService.IsUserAvailableForBusiness(newUserId).then(isAvailable => {
                    if (isAvailable) {
                        this.isUserIdValid = true;
                    } else {
                        this.isUserIdValid = false;
                    }
                });
            } else {
                this.isUserIdValid = false;
                this.strUserIdErrorMessage = "מספר תעודת זהות חייב להכיל 9 ספרות";
            }
        } else {
            this.strUserIdErrorMessage = "מספר תעודת זהות לא תקין";
            if (newUserId.length == 9) {
                this.isUserIdValid = false;
            }
        }
    }

    submitHandler = (addNewWorkerForm: NgForm) => {
        console.log(addNewWorkerForm);
        if (this.validatedWorker(this.newWorker)){
            this.onSubmit.emit(this.newWorker);
        }
    }

    validatedWorker = (worker: any) => {
        this.strUserIdErrorMessage = "";
        if (parseInt(worker.userId) < 0) {
            this.strUserIdErrorMessage = "מספר תעודת זהות לא תקין";
            return false;
        } else if (worker.userId.length != 9) {
            this.strUserIdErrorMessage = "מספר תעודת זהות חייב להכיל 9 ספרות";
            return false;
        } else if (worker.salary < 20 || worker.salary > 100) {
            this.strSalaryErrorMessage = "שכר לשעה לא בטווח המותר";
            return false;
        }
        return this.usersService.IsUserAvailableForBusiness(worker.userId).then(isAvailable => {
            if (isAvailable) {
                this.strUserIdErrorMessage = "";
                return true;
            } else {
                this.strUserIdErrorMessage = "מספר תעודת זהות לא ביקש להצטרף לעסק";
                return false;
            }
        }).catch(() => {
            this.strUserIdErrorMessage = "קרתה שגיאה";
            return false;
        });
    }
}