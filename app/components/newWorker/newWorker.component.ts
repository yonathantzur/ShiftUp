import { Component, Output, EventEmitter } from '@angular/core';
import { Worker } from '../workerCard/workerCard.component';

@Component({
    selector: 'newWorker',
    templateUrl: './newWorker.html',
    providers: [],
    styleUrls: ['./newWorker.css']
})

export class NewWorkerComponent {
    newWorker: Worker = { name: "", id: 0, age: 0, hourSalery: 0, job: "" };
    @Output() onClose: EventEmitter<Worker> = new EventEmitter<Worker>();
    strErrorMessage: string = "";

    blurClicked = () => {
        this.onClose.emit();
    }

    onCancel = () => {
        this.onClose.emit();
    }

    onChange = (event: any) => {
        const fieldName: string = event.target.name;
        let fieldValue: string | number = event.target.value;

        if (event.target.type == "number") {
            fieldValue = parseInt(fieldValue.toString());
        }

        this.newWorker[fieldName] = fieldValue;
    }

    onSubmit = () => {
        if (this.validatedWorker(this.newWorker)){
            this.onClose.emit(this.newWorker);
        }
    }

    validatedWorker = (worker: Worker) => {
        this.strErrorMessage = "";
        if (!worker.name.match("[א-ת]{2,} {1}[א-ת]{2,}")) {
            this.strErrorMessage = "שם חייב להכיל שם פרטי ומשפחה בעלי 2 תווים לפחות";
            return false;
        } else if (worker.id.toString().length != 9) {
            this.strErrorMessage = "מספר תעודת זהות חייב להכיל 9 ספרות";
            return false;
        } else if (worker.age < 18) {
            this.strErrorMessage = "גיל חייב להיות לפחות 18";
            return false;
        } else if (worker.age > 60) {
            this.strErrorMessage = "גיל חייב להיות לכל היותר 60";
            return false;
        } else if (worker.hourSalery < 20) {
            this.strErrorMessage = "שכר לשעה חייב להיות לפחות 20";
            return false;
        } else if (worker.hourSalery > 100) {
            this.strErrorMessage = "שכר לשעה חייב להיות לכל היותר 100";
            return false;
        } else if (worker.job == "") {
            this.strErrorMessage = "לא נבחרה משרה";
            return false;
        }

        return true;
    }
}