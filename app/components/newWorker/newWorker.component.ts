import { Component, Output, EventEmitter } from '@angular/core';
import { Worker } from '../workerCard/workerCard.component';

@Component({
    selector: 'newWorker',
    templateUrl: './newWorker.html',
    providers: [],
    styleUrls: ['./newWorker.css']
})

export class NewWorkerComponent {
    newWorker: Worker = { name: "", id: 0, age: 0, hourSalery: 0, job: "waiter" };
    @Output() onClose: EventEmitter<Worker> = new EventEmitter<Worker>();

    onCancel = () => {
        this.onClose.emit(this.newWorker);
    }

    onSubmit = () => {
        this.onClose.emit(this.newWorker);
    }

    onChange = (event: any) => {
        const fieldName: string = event.target.name;
        let fieldValue: string | number = event.target.value;

        if (event.target.type == "number") {
            fieldValue = parseInt(fieldValue.toString());
        }

        this.newWorker[fieldName] = fieldValue;
    }

    // blurClicked = () => {
    //     if (confirm("האם אתה בטוח שברצונך לצאת?")) {
    //         this.onClose();
    //     }
    // }
}