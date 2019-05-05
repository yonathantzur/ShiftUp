import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { BusinessesService } from '../../services/businesses/businesses.service';
import { WorkersService } from '../../services/workers/workers.service';

declare let Swal: any;

@Component({
    selector: 'workersRequests',
    templateUrl: './workersRequests.html',
    providers: [UsersService, BusinessesService, WorkersService],
    styleUrls: ['./workersRequests.css']
})

export class WorkersRequestsComponent {
    requestUsers: Array<any>;
    business: any;
    salaries: Array<number>;

    constructor(
        private usersService: UsersService,
        private businessesService: BusinessesService,
        private workersService: WorkersService,
        private router: Router
    ) { }

    ngOnInit() {
        this.usersService.GetUsersRequestedToBusiness().then((usersRequests: Array<any>) => {
            if (usersRequests.length == 0) {
                this.router.navigateByUrl('/workers');
            } else {
                this.requestUsers = usersRequests;
                this.requestUsers.forEach((reqUser, i) => {
                    this.requestUsers[i].fullName = this.requestUsers[i].firstName + ' ' + this.requestUsers[i].lastName;
                    this.requestUsers[i].age = this.calcAge(this.requestUsers[i].birthDate);
                    this.requestUsers[i].salary = 20;
                    this.salaries.push(20);
                });
            }
        });

        this.businessesService.GetLoggedInBusiness().then((business: any) => {
            this.business = business;
        });
    }

    backToWorkersHandler = () => {
        this.router.navigateByUrl('/workers');
    }

    calcAge = (birthDate: Date) => {
        if (birthDate) {
            return new Date(Date.now() - new Date(birthDate).valueOf()).getFullYear() - 1970;
        } else {
            return 0;
        }
    }

    onSalaryChange = (newSalary: number, index: number) => {
        this.requestUsers[index].salary = newSalary;
    }

    acceptRequestHandler = (requestUser: any) => {
        if (requestUser.salary < 20 || requestUser.salary > 100) {
            Swal.fire({
                title: "שגיאה!",
                text: "שכר לשעה לא בטווח המותר: 20 עד 100",
                type: "error",
                confirmButtonText: "אישור"
            });
        } else {
            this.workersService.AddWorkerToBusiness(requestUser.userId, requestUser.salary)
            .then(() => {
                this.removeRequest(requestUser._id);
                Swal.fire({
                    title: "הפעולה הצליחה",
                    text: "העובד " + requestUser.firstName + ' ' + requestUser.lastName + " נוסף בהצלחה לעסק",
                    type: "success",
                    showConfirmButton: false,
                    timer: 1000
                });
            })
            .catch((err: any) => {
                Swal.fire({
                    title: "שגיאה!",
                    text: 'פעולת אישור העובד ' + requestUser.firstName + ' ' + requestUser.lastName + ' נכשלה',
                    type: "error",
                    confirmButtonText: "אישור"
                });
                return;
            });
        }
    }

    denyRequestHandler = (requestUser: any) => {
        this.workersService.DenyWorkerRequest(requestUser._id)
        .then((result) => {
            this.removeRequest(requestUser._id);
            Swal.fire({
                title: "הפעולה הצליחה",
                text: "בקשת העובד " + requestUser.firstName + ' ' + requestUser.lastName + " נדחתה בהצלחה",
                type: "success",
                showConfirmButton: false,
                timer: 1000
            });
        })
        .catch((err: any) => {
            Swal.fire({
                type: 'error',
                title: 'שגיאה!',
                text: 'דחיית הבקשה נכשלה'
            });
        })
    }

    removeRequest = (requestUser_id: string) => {
        this.requestUsers = this.requestUsers.filter(request => request._id !== requestUser_id);
    }
}