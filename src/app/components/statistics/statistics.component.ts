import { Component } from '@angular/core';

import { UsersService } from '../../services/users/users.service';
import { BusinessesService } from '../../services/businesses/businesses.service';
import { WorkersService } from '../../services/workers/workers.service';
import { ConstraintsService } from '../../services/constraints/constraints.service';
import { ShiftService } from '../../services/shifts/shifts.service';

@Component({
    selector: 'statistics',
    templateUrl: './statistics.html',
    providers: [
        UsersService,
        BusinessesService,
        WorkersService,
        ConstraintsService,
        ShiftService
    ],
    styleUrls: ['./statistics.css']
})

export class StatisticsComponent {
    user: any;
    business: any;
    manager: any;
    workers: Array<any>;
    shifts: Array<any>;
    constraints: Array<any>;
    loadingRequests: number = 3;
    averageAges: number;

    constructor(private businessesService: BusinessesService,
        private constraintsService: ConstraintsService) {

        this.loadingRequests = 3;
    }

    ngOnInit() {
        this.businessesService.GetLoggedInBusiness().then((business: any) => {
            this.business = business;

            this.loadingRequests--;
        });

        this.businessesService.GetWorkersForBusiness().then((workers: any) => {
            this.manager = workers.filter((worker: any) => worker.isManager)[0];
            this.workers = workers.filter((worker: any) => !worker.isManager);

            this.loadingRequests--;
        });

        this.constraintsService.getAllConstraints(null, null).then((constraints: any) => {
            this.constraints = constraints;

            this.loadingRequests--;
        });
    }
}