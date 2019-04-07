import { Component, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../../services/users/users.service';

@Component({
    selector: 'newWorker',
    templateUrl: './newWorker.html',
    providers: [UsersService],
    styleUrls: ['./newWorker.css'],
    inputs: ['business: business']
})

export class NewWorkerComponent {
    business: any;
    newWorker: any = { userId: "", salary: 20 };
    @Output() onClose: EventEmitter<Worker> = new EventEmitter<Worker>();
    strErrorMessage: string = "";
    isUserIdValid: boolean = false;

    constructor(private usersService: UsersService) {
    }

    blurClicked = () => {
        this.onClose.emit();
    }

    onCancel = () => {
        this.onClose.emit();
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
            this.strErrorMessage = "";
            this.newWorker["userId"] = newUserId;
            if (newUserId.length == 9) {
                this.usersService.IsUserAvailableForBusiness(newUserId).then(isAvailable => {
                    if (isAvailable) {
                        this.isUserIdValid = true;
                    } else {
                        this.isUserIdValid = false;
                    }
                });
            }
        } else {
            this.strErrorMessage = "מספר תעודת זהות לא תקין";
            if (newUserId.length == 9) {
                this.isUserIdValid = false;
            }
        }
    }

    onSubmit = () => {
        if (this.validatedWorker(this.newWorker)){
            this.onClose.emit(this.newWorker);
        }
    }

    validatedWorker = (worker: any) => {
        this.strErrorMessage = "";
        if (parseInt(worker.userId) < 0) {
            this.strErrorMessage = "מספר תעודת זהות לא תקין";
            return false;
        } else if (worker.userId.length != 9) {
            this.strErrorMessage = "מספר תעודת זהות חייב להכיל 9 ספרות";
            return false;
        }

        return true;
    }
}