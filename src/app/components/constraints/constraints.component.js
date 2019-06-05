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
var users_service_1 = require("../../services/users/users.service");
var router_1 = require("@angular/router");
var event_service_1 = require("../../services/event/event.service");
var ConstraintsComponent = /** @class */ (function () {
    function ConstraintsComponent(constraintsService, usersService, EventService, route, router) {
        this.constraintsService = constraintsService;
        this.usersService = usersService;
        this.EventService = EventService;
        this.route = route;
        this.router = router;
        this.sourceConstraints = [];
        this.constraints = [];
    }
    ConstraintsComponent.prototype.ngOnInit = function () {
        this.InitiateConstraints();
    };
    ConstraintsComponent.prototype.DeleteConstraint = function (conObjId) {
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
    ConstraintsComponent.prototype.ApproveConstraint = function (conObjId) {
        var _this = this;
        this.constraintsService.ApproveConstraint(conObjId).then(function (isApprove) {
            if (isApprove) {
                _this.InitiateConstraints();
            }
            else {
                Swal.fire({
                    type: 'error',
                    title: 'שגיאה באישור אילוץ',
                    text: 'אופס... משהו השתבש'
                });
            }
        });
    };
    ConstraintsComponent.prototype.RefuseConstraint = function (conObjId) {
        var _this = this;
        this.constraintsService.RefuseConstraint(conObjId).then(function (isCanceled) {
            if (isCanceled) {
                _this.InitiateConstraints();
            }
            else {
                Swal.fire({
                    type: 'error',
                    title: 'שגיאה בדחיית אילוץ',
                    text: 'אופס... משהו השתבש'
                });
            }
        });
    };
    ConstraintsComponent.prototype.InitiateConstraints = function () {
        var _this = this;
        this.constraintsService.getAllConstraints().then(function (data) {
            _this.sourceConstraints = data;
            _this.constraints = _this.sourceConstraints;
            // Calculate waiting constraints requests.
            var waitingConstraintsAmount = data.filter(function (constraint) {
                return (constraint.statusId == 0);
            }).length;
            _this.EventService.Emit("setConstraintRequestAmount", waitingConstraintsAmount);
        });
    };
    ConstraintsComponent.prototype.filterItem = function () {
        var _this = this;
        if (this.searchWord || this.startDateFilter || this.endDateFilter) {
            this.constraints = this.sourceConstraints.filter(function (item) {
                var bool = true;
                if (_this.searchWord) {
                    bool = (_this.searchWord && (item.user[0].userId.includes(_this.searchWord)) ||
                        ((item.user[0].firstName + " " + item.user[0].lastName).includes(_this.searchWord)) ||
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
    ConstraintsComponent = __decorate([
        core_1.Component({
            selector: 'constraints',
            templateUrl: './constraints.html',
            providers: [constraints_service_1.ConstraintsService, users_service_1.UsersService],
            styleUrls: ['./constraints.css']
        }),
        __metadata("design:paramtypes", [constraints_service_1.ConstraintsService,
            users_service_1.UsersService,
            event_service_1.EventService,
            router_1.ActivatedRoute,
            router_1.Router])
    ], ConstraintsComponent);
    return ConstraintsComponent;
}());
exports.ConstraintsComponent = ConstraintsComponent;
//# sourceMappingURL=constraints.component.js.map