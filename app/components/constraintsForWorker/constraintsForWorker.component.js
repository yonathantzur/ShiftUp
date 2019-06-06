"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var constraints_service_1 = require("../../services/constraints/constraints.service");
var businesses_service_1 = require("../../services/businesses/businesses.service");
var ConstraintsForWorkerComponent = /** @class */ (function () {
    function ConstraintsForWorkerComponent(constraintsService, businessService) {
        this.constraintsService = constraintsService;
        this.businessService = businessService;
        this.sourceConstraints = [];
        this.constraints = [];
        this.constraintsReasons = [];
    }
    ConstraintsForWorkerComponent.prototype.ngOnInit = function () {
        this.isRange = false;
        this.InitiateConstraints();
        this.InitiateShiftNames();
        this.InitiateConstraintsReasons();
    };
    ConstraintsForWorkerComponent.prototype.InitiateConstraints = function () {
        var _this = this;
        this.constraintsService.getAllConstraints('statusId', 1).then(function (data) {
            _this.sourceConstraints = data;
            _this.constraints = _this.sourceConstraints;
        });
    };
    ConstraintsForWorkerComponent.prototype.InitiateShiftNames = function () {
        var _this = this;
        this.businessService.GetLoggedInBusiness().then(function (data) {
            _this.shiftNames = data.shifts;
            for (var _i = 0, _a = _this.shiftNames; _i < _a.length; _i++) {
                var shift = _a[_i];
                delete shift.workersAmount;
            }
        });
    };
    ConstraintsForWorkerComponent.prototype.InitiateConstraintsReasons = function () {
        var _this = this;
        this.constraintsService.getAllConstraintReasons().then(function (data) {
            _this.constraintsReasons = data;
        });
    };
    ConstraintsForWorkerComponent.prototype.filterItem = function () {
        var _this = this;
        if (this.searchWord || this.startDateFilter || this.endDateFilter) {
            this.constraints = this.sourceConstraints.filter(function (item) {
                var bool = true;
                if (_this.searchWord) {
                    bool = (_this.searchWord && (item.user[0].userId.includes(_this.searchWord)) ||
                        (item.description.includes(_this.searchWord)) ||
                        (item.status[0].statusName.includes(_this.searchWord)));
                }
                if (bool && _this.startDateFilter) {
                    bool = new Date(item.startDate) >= new Date(_this.startDateFilter);
                }
                if (bool && _this.endDateFilter) {
                    bool = new Date(item.endDate) <= new Date(_this.endDateFilter);
                }
                return bool;
            });
        }
        else {
            this.constraints = this.sourceConstraints;
        }
    };
    ConstraintsForWorkerComponent.prototype.onSubmit = function (AddConstraintForm) {
        var _this = this;
        if (AddConstraintForm.valid) {
            var isShiftSelected = false;
            this.newConstraint = AddConstraintForm.value;
            if (this.newConstraint.startDate) {
                if ((new Date(this.newConstraint.startDate) < new Date(Date.now())) ||
                    (!/^\d{4}-\d{2}-\d{2}$/.test(this.newConstraint.startDate))) {
                    Swal.fire({
                        type: 'error',
                        title: 'תאריך ההתחלה שהוכנס אינו תקין',
                        text: 'נא לתקן ולנסות שנית'
                    });
                    return;
                }
                if (!this.newConstraint.endDate || !this.isRange) {
                    this.newConstraint.endDate = this.newConstraint.startDate;
                }
                if ((!/^\d{4}-\d{2}-\d{2}$/.test(this.newConstraint.endDate))) {
                    Swal.fire({
                        type: 'error',
                        title: 'תאריך סיום שהוכנס אינו תקין',
                        text: 'נא לתקן ולנסות שנית'
                    });
                    return;
                }
                if (new Date(this.newConstraint.endDate) < new Date(this.newConstraint.startDate)) {
                    Swal.fire({
                        type: 'error',
                        title: 'טווח התאריכים לא תקין',
                        text: 'נא לתקן ולנסות שוב'
                    });
                }
                else {
                    for (var _i = 0, _a = this.shiftNames; _i < _a.length; _i++) {
                        var shift = _a[_i];
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
                        }).then(function (result) {
                            if (result.value) {
                                for (var _i = 0, _a = _this.shiftNames; _i < _a.length; _i++) {
                                    var shift = _a[_i];
                                    shift['isChecked'] = true;
                                }
                                _this.AddConstraint(_this.newConstraint);
                                return;
                            }
                        });
                    }
                    else {
                        this.AddConstraint(this.newConstraint);
                    }
                }
            }
        }
        else {
            Swal.fire({
                type: 'error',
                title: 'ישנם שדות ריקים',
                text: 'נא למלא את כל השדות בצורה תקינה'
            });
        }
    };
    ConstraintsForWorkerComponent.prototype.AddConstraint = function (newConstraint) {
        var _this = this;
        newConstraint['shifts'] = this.shiftNames;
        this.constraintsService.AddConstraint(newConstraint).then(function (result) {
            if (result) {
                $('#AddConstraintModal').modal('hide');
                Swal.fire({
                    type: 'success',
                    title: 'האילוץ נשמר בהצלחה',
                });
                _this.InitiateConstraints();
                _this.InitiateShiftNames();
            }
            else {
                Swal.fire({
                    type: 'error',
                    title: 'שגיאה בהוספת אילוץ',
                    text: 'אופס... משהו השתבש'
                });
            }
        });
    };
    ConstraintsForWorkerComponent.prototype.DeleteConstraint = function (conObjId) {
        var _this = this;
        this.constraintsService.DeleteConstraint(conObjId).then(function (isDeleted) {
            if (isDeleted) {
                _this.InitiateConstraints();
            }
            else {
                Swal.fire({
                    type: 'error',
                    title: 'שגיאה במחיקה',
                    text: 'אופס... משהו השתבש'
                });
            }
        });
    };
    ConstraintsForWorkerComponent = __decorate([
        core_1.Component({
            selector: 'constraintsForWorker',
            templateUrl: './constraintsForWorker.html',
            providers: [constraints_service_1.ConstraintsService, businesses_service_1.BusinessesService],
            styleUrls: ['./constraintsForWorker.css']
        }),
        __metadata("design:paramtypes", [constraints_service_1.ConstraintsService,
            businesses_service_1.BusinessesService])
    ], ConstraintsForWorkerComponent);
    return ConstraintsForWorkerComponent;
}());
exports.ConstraintsForWorkerComponent = ConstraintsForWorkerComponent;
//# sourceMappingURL=constraintsForWorker.component.js.map