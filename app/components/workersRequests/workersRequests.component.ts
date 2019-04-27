import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { BusinessesService } from '../../services/businesses/businesses.service';

@Component({
    selector: 'workersRequests',
    templateUrl: './workersRequests.html',
    providers: [UsersService, BusinessesService],
    styleUrls: ['./workersRequests.css']
})

export class WorkersRequestsComponent {
    requestUsers: Array<any> = [];
    business: any = {};
    salaries: Array<number> = [];
    salariesErrorMessages: Array<string> = [];

    constructor(
        private usersService: UsersService,
        private businessesService: BusinessesService,
        private router: Router
    ) { }

    ngOnInit() {
        this.usersService.GetUsersRequestedToBusiness().then((usersRequests: any) => {
            this.requestUsers = usersRequests;
            this.requestUsers.forEach((reqUser, i) => {
                this.requestUsers[i].salary = 20;
                this.salaries.push(20);
                this.salariesErrorMessages.push("");
            });
        });

        this.businessesService.GetLoggedInBusiness().then((business: any) => {
            this.business = business;
        });
    }

    onSalaryChange = (newSalary: number, index: number) => {
        this.salariesErrorMessages[index] = "";
        if (newSalary < 20 || newSalary > 100) {
            this.salariesErrorMessages[index] = "שכר לשעה לא בטווח המותר";
        } else {
            this.requestUsers[index].salary = newSalary;
        }

        // this.strSalaryErrorMessage = "";
        // if (newSalary < 20 || newSalary > 100) {
        //     this.strSalaryErrorMessage = "שכר לשעה לא בטווח המותר";
        // } else {
        //     this.newWorker.salary = newSalary;
        // }
    }

    calcAge = (strBirthDate: string) => {
        const birthDate = new Date(strBirthDate).valueOf();
        return new Date(Date.now() - birthDate).getFullYear() - 1970;
    }

    backToWorkersHandler = () => {
        this.router.navigateByUrl('/workers');
    }
}