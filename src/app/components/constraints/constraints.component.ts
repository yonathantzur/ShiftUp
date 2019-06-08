import { Component, OnInit } from '@angular/core';
import { ConstraintsService } from '../../services/constraints/constraints.service';
import { STATUS_CODE } from '../../enums/enums'
import { UsersService } from "../../services/users/users.service";
import { ActivatedRoute, Router } from "@angular/router";
import { EventService } from '../../services/event/event.service';

declare let Swal: any;

@Component({
    selector: 'constraints',
    templateUrl: './constraints.html',
    providers: [ConstraintsService, UsersService],
    styleUrls: ['./constraints.css']
})

export class ConstraintsComponent implements OnInit {
    sourceConstraints: Array<any> = [];
    constraints: Array<any> = [];
    searchWord: string;
    startDateFilter: Date;
    endDateFilter: Date;

    // sort variable
    statusColName: string = 'statusId';
    startDateColName: string = 'startDate';
    downSort: number = 1;
    upSort: number = -1;
    userSortCol: string;
    userSortDirection: number;

    constructor(private constraintsService: ConstraintsService,
        private usersService: UsersService,
        private EventService: EventService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() {
        this.userSortCol = this.statusColName;
        this.userSortDirection = this.downSort;
        this.InitiateConstraints();
    }

    DeleteConstraint(conObjId: string) {
        this.constraintsService.DeleteConstraint(conObjId).then((isDeleted: any) => {
            if (isDeleted) {
                for (let i in this.constraints) {
                    if (this.constraints[i]._id == conObjId) {
                        this.constraints.splice(Number(i), 1);
                        break;
                    }
                }
            } else {
                Swal.fire({
                    type: 'error',
                    title: 'שגיאה במחיקה',
                    text: 'אופס... משהו השתבש'
                })
            }
        })
    }

    ApproveConstraint(conObjId: string) {
        this.constraintsService.ApproveConstraint(conObjId).then((isApprove: any) => {
            if (isApprove) {
                for (let i in this.constraints) {
                    if (this.constraints[i]._id == conObjId) {
                        this.constraints[i].status[0].statusName = STATUS_CODE.CONFIRMED;
                        this.constraints[i].status[0].statusId = isApprove.statusId;
                    }
                }
            } else {
                Swal.fire({
                    type: 'error',
                    title: 'שגיאה באישור אילוץ',
                    text: 'אופס... משהו השתבש'
                })
            }
        })
    }

    RefuseConstraint(conObjId: string) {
        this.constraintsService.RefuseConstraint(conObjId).then((isCanceled: any) => {
            if (isCanceled) {
                for (let i in this.constraints) {
                    if (this.constraints[i]._id == conObjId) {
                        this.constraints[i].status[0].statusName = STATUS_CODE.REFUSED;
                        this.constraints[i].status[0].statusId = isCanceled.statusId;
                    }
                }
            } else {
                Swal.fire({
                    type: 'error',
                    title: 'שגיאה בדחיית אילוץ',
                    text: 'אופס... משהו השתבש'
                })
            }
        })
    }

    InitiateConstraints() {
        this.constraintsService.getAllConstraints(this.userSortCol, this.userSortDirection).then((data: any) => {
            this.sourceConstraints = data;
            this.constraints = this.sourceConstraints;

            // Calculate waiting constraints requests.
            let waitingConstraintsAmount = data.filter((constraint: any) => {
                return (constraint.statusId == 0);
            }).length;

            this.EventService.Emit("setConstraintRequestAmount", waitingConstraintsAmount);
        });
    }

    filterItem() {
        if (this.searchWord || this.startDateFilter || this.endDateFilter) {
            this.constraints = this.sourceConstraints.filter(item => {
                let bool = true;
                if (this.searchWord) {
                    bool = (this.searchWord && (item.user[0].userId.includes(this.searchWord)) ||
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