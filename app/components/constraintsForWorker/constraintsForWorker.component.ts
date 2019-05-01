import {Component, OnInit} from '@angular/core';
import {ConstraintsService} from '../../services/constraints/constraints.service';
import {UsersService} from "../../services/users/users.service";
import {ActivatedRoute, Router} from "@angular/router";

declare let Swal: any;

@Component({
    selector: 'constraintsForWorker',
    templateUrl: './constraintsForWorker.html',
    providers: [ConstraintsService, UsersService],
    styleUrls: ['./constraintsForWorker.css']
})

export class constraintsForWorkerComponent implements OnInit {
    sourceConstraints: Array<any> = [];
    constraints: Array<any> = [];
    searchWord: string;
    startDateFilter: Date;
    endDateFilter: Date;

    constructor(private constraintsService: ConstraintsService,
                private usersService: UsersService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.InitiateConstraints();
    }

       InitiateConstraints() {
        this.constraintsService.getAllConstraints().then((data: any) => {
            this.sourceConstraints = data;
            this.constraints = this.sourceConstraints;
        });
    }

    filterItem() {
        if (this.searchWord  || this.startDateFilter || this.endDateFilter) {
            this.constraints = this.sourceConstraints.filter(item => {
                let bool = true;
                if (this.searchWord) {
                    bool = (this.searchWord && (item.userId.includes(this.searchWord)) ||
                        (`${item.user[0].firstName} ${item.user[0].lastName}`.includes(this.searchWord)) ||
                        (item.description.includes(this.searchWord)) ||
                        (item.status[0].statusName.includes(this.searchWord)));
                }
                if (bool && this.startDateFilter) {
                    bool = new Date(item.startDate) >= new Date(this.startDateFilter);
                }
                if (bool && this.endDateFilter) {
                    bool = new Date(item.endDate) <= new Date(this.endDateFilter);
                }
                return bool;
            });
        } else {
            this.constraints = this.sourceConstraints;
        }
    }
}