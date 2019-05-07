import {Component, OnInit} from '@angular/core';
import {ConstraintsService} from '../../services/constraints/constraints.service';
import {BusinessesService} from "../../services/businesses/businesses.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";

declare let Swal: any;

@Component({
    selector: 'constraintsForWorker',
    templateUrl: './constraintsForWorker.html',
    providers: [ConstraintsService, BusinessesService],
    styleUrls: ['./constraintsForWorker.css']
})

export class ConstraintsForWorkerComponent implements OnInit {
    sourceConstraints: Array<any> = [];
    constraints: Array<any> = [];
    constraintsReasons: Array<any> = [];
    newConstraint: any;
    shiftNames: any;
    isRange: boolean;
    searchWord: string;
    startDateFilter: Date;
    endDateFilter: Date;

    constructor(private ConstraintsService: ConstraintsService,
                private businessService: BusinessesService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.isRange = false;
        this.InitiateConstraints();
        this.InitiateShiftNames();
        this.InitiateConstraintsReasons()
    }

    InitiateConstraints() {
        this.ConstraintsService.getAllConstraints().then((data: any) => {
            this.sourceConstraints = data;
            this.constraints = this.sourceConstraints;
        });
    }

    InitiateShiftNames() {
        this.businessService.GetLoggedInBusiness().then((data: any) => {
            this.shiftNames = data.shifts;
            for(let shift of this.shiftNames) {
                delete shift.workersAmount;
            }
        });
    }

    InitiateConstraintsReasons() {
        this.ConstraintsService.getAllConstraintReasons().then((data: any) => {
            this.constraintsReasons = data;
        });
    }

    filterItem() {
        if (this.searchWord || this.startDateFilter || this.endDateFilter) {
            this.constraints = this.sourceConstraints.filter(item => {
                let bool = true;
                if (this.searchWord) {
                    bool = (this.searchWord && (item.user[0].userId.includes(this.searchWord)) ||
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

    onSubmit(AddConstraintForm: NgForm) {
        if (AddConstraintForm.valid) {
            let isShiftSelected = false;
            this.newConstraint = AddConstraintForm.value;
            if (this.newConstraint.startDate) {
                if (!this.newConstraint.endDate || !this.isRange) {
                    this.newConstraint.endDate = this.newConstraint.startDate;
                }
                if (new Date(this.newConstraint.endDate) < new Date(this.newConstraint.startDate)) {
                    Swal.fire({
                        type: 'error',
                        title: 'טווח תאריכים לא תקין',
                        text: 'נא לתקן ולנסות שוב'
                    })
                } else {
                    for (let shift of this.shiftNames) {
                        if (shift.isChecked) {
                            isShiftSelected = true;
                        }
                    }
                    if (!isShiftSelected) {
                        Swal.fire({
                            title: 'להמשיך?',
                            text: "לא נבחרו משמרות, לכן כל המשמרות יתקבלו כאילוץ",
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            cancelButtonText: 'חזרה',
                            confirmButtonText: 'כן, זה בסדר!'
                        }).then((result: any) => {
                            if (result.value) {
                                for (let shift of this.shiftNames) {
                                    shift['isChecked'] = true;
                                }
                                this.AddConstraint(this.newConstraint);
                                return;
                            }
                        })
                    } else {
                        this.AddConstraint(this.newConstraint);
                    }
                }
            }
        } else {
            Swal.fire({
                type: 'error',
                title: 'אחד או יותר מהשדות ריקים',
                text: 'נא למלא את כל השדות'
            })
        }
    }

    AddConstraint(newConstraint: any) {
        newConstraint['shifts'] = this.shiftNames;
        this.ConstraintsService.AddConstraint(newConstraint).then((result: any) => {
                if (result) {
                    Swal.fire({
                        type: 'success',
                        title: 'האילוץ נשמר בהצלחה',
                    });
                    this.InitiateConstraints();
                    this.InitiateShiftNames();
                } else {
                    Swal.fire({
                        type: 'error',
                        title: 'שגיאה בהוספת אילוץ',
                        text: 'אופס... משהו השתבש'
                    })

                }
            }
        );
    }
}