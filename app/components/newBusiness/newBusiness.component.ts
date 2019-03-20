import { Component } from '@angular/core';
import { BusinessService } from '../../services/business/business.service';

declare let Swal: any;

class Shift {
    name: string;
    workersAmount: number;

    constructor(name: string, workersAmount: number) {
        this.name = name;
        this.workersAmount = workersAmount;
    }
}

export class Business {
    name: string;
    address: string;
    shifts: Shift[];

    constructor();
    constructor(name: string, address: string, shifts: Shift[])
    constructor(name?: string, address?: string, shifts?: Shift[]) {
        this.name = name;
        this.address = address;
        this.shifts = shifts;
    }
}

@Component({
    selector: 'newBusiness',
    templateUrl: './newBusiness.html',
    providers: [BusinessService],
    styleUrls: ['./newBusiness.css']
})

export class NewBusinessComponent {
    business: Business = new Business();

    constructor(private businessService: BusinessService) { }

    AddBusiness() {        
        this.businessService.AddBusiness(this.business).then(result => {
            if (result) {

            }
            else {
                Swal.fire({
                    type: 'error',
                    title: 'שגיאה',
                    text: 'אופס... משהו השתבש'
                })
            }
        });
    }
}