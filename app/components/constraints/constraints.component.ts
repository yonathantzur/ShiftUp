import {Component, OnInit} from '@angular/core';
import {ConstraintsService} from '../../services/constraints/constraints.service';
import {UsersService} from "../../services/users/users.service";
import {ActivatedRoute, Router} from "@angular/router";

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
    keys: Array<any> = ['userId', 'firstName', 'lastName', 'description', 'status[0].statusName'];

    constructor(private constraintsService: ConstraintsService,
                private usersService: UsersService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.InitiateConstraints();
    }

    DeleteConstraint(conObjId: string) {
        this.constraintsService.DeleteConstraint(conObjId).then((isDeleted: any) => {
            if (isDeleted) {
                this.InitiateConstraints();
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
                this.InitiateConstraints();
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
                this.InitiateConstraints();
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
        this.constraintsService.getAllConstraints().then((data: any) => {
            this.sourceConstraints = data;
            this.constraints = this.sourceConstraints;
        });
    }

    filterItem() {
        if (this.searchWord != "") {
            this.constraints = this.sourceConstraints.filter(item => {
                    return (item.userId.includes(this.searchWord)) ||
                        (`${item.user[0].firstName} ${item.user[0].lastName}`.includes(this.searchWord)) ||
                        (item.description.includes(this.searchWord)) ||
                        (item.status[0].statusName.includes(this.searchWord));
                }
            );
        } else {
            this.constraints = this.sourceConstraints;
        }
    }

}