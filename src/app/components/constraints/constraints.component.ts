import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global/global.service';
import { ConstraintsService } from '../../services/constraints/constraints.service';
import { STATUS_CODE } from '../../enums/enums';
import { STATUS_CODE_NUMBER } from '../../enums/enums';
import { UsersService } from "../../services/users/users.service";
import { EventService } from '../../services/event/event.service';

declare let Swal: any;

@Component({
    selector: 'constraints',
    templateUrl: './constraints.html',
    providers: [ConstraintsService, UsersService],
    styleUrls: ['./constraints.css']
})

export class ConstraintsComponent implements OnInit {
    constraints: Array<any>;
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

    constructor(
        private globalService: GlobalService,
        private constraintsService: ConstraintsService,
        private EventService: EventService) { }

    ngOnInit() {
        this.userSortCol = this.statusColName;
        this.userSortDirection = this.downSort;
        this.InitiateConstraints();

        let self = this;

        self.globalService.socket.on("UpdateConstraintServer", () => {
            self.InitiateConstraints();
        });

    }

    ApproveConstraint(conObj: any) {
        this.constraintsService.ApproveConstraint(conObj._id).then((isApprove: any) => {
            if (isApprove) {
                conObj.status[0].statusName = STATUS_CODE.CONFIRMED;
                conObj.status[0].statusId = isApprove.statusId;
                this.globalService.socket.emit("UpdateConstraintStatusClient", conObj.userObjId);
            } else {
                Swal.fire({
                    type: 'error',
                    title: 'שגיאה באישור אילוץ',
                    text: 'אופס... משהו השתבש'
                })
            }
        })
    }

    RefuseConstraint(conObj: any) {
        this.constraintsService.RefuseConstraint(conObj._id).then((isCanceled: any) => {
            if (isCanceled) {
                conObj.status[0].statusName = STATUS_CODE.REFUSED;
                conObj.status[0].statusId = isCanceled.statusId;
                this.globalService.socket.emit("UpdateConstraintStatusClient", conObj.userObjId);
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
            this.constraints = data;

            // Calculate waiting constraints requests.
            let waitingConstraintsAmount = data.filter((constraint: any) => {
                return (constraint.statusId == 0);
            }).length;

            this.EventService.Emit("setConstraintRequestAmount", waitingConstraintsAmount);
        });
    }

    filterItem() {
        if (this.searchWord || this.startDateFilter || this.endDateFilter) {
            this.constraints = this.constraints.filter(item => {
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
        }
    }

    getStatusLightColor(statusId: number) {
        switch (statusId) {
            case (STATUS_CODE_NUMBER.CONFIRMED):
                return "rgb(76, 175, 80)";
            case (STATUS_CODE_NUMBER.REFUSED):
                return "rgb(244, 67, 54)";
            case (STATUS_CODE_NUMBER.WAITING):
                return "rgb(255, 193, 7)";
        }
    }
}