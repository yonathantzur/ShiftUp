import { Component } from '@angular/core';
import { BusinessService } from '../../services/business/business.service';

declare let Swal: any;

class Shift {
    name: string;
    workersAmount: number;

    constructor();
    constructor(name: string, workersAmount: number)
    constructor(name?: string, workersAmount?: number) {
        this.name = name;
        this.workersAmount = workersAmount || 3;
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
    business: Business;

    constructor(private businessService: BusinessService) {
        this.business = new Business();
        this.business.shifts = [new Shift()];
    }

    addBusiness() {
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

    addShift() {
        this.business.shifts.push(new Shift());
        setTimeout(() => {
            $("#shifts-container")[0].scrollTop = $("#shifts-container")[0].scrollHeight;
        }, 0);
    }
}