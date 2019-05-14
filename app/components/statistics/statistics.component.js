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
var businesses_service_1 = require("../../services/businesses/businesses.service");
var workers_service_1 = require("../../services/workers/workers.service");
var constraints_service_1 = require("../../services/constraints/constraints.service");
var shifts_service_1 = require("../../services/shifts/shifts.service");
var StatisticsComponent = /** @class */ (function () {
    function StatisticsComponent(businessesService, workersService, constraintsService, shiftService) {
        this.businessesService = businessesService;
        this.workersService = workersService;
        this.constraintsService = constraintsService;
        this.shiftService = shiftService;
        this.buildWorkersAgesChart = function (workers) {
            var groupAges = workers.map(function (worker) {
                var age = calcAge(worker.birthDate);
                return age - age % 10 + 10;
            }).reduce(function (groups, item) {
                var val = item;
                groups[val] = groups[val] || [];
                groups[val].push(item);
                return groups;
            }, {});
            var data = [];
            for (var a = 0; a <= 120; a += 10) {
                if (groupAges[a]) {
                    var endAgeRange = a + 10;
                    data.push({
                        "name": a + "-" + endAgeRange,
                        "value": groupAges[a].length
                    });
                }
            }
            var canvas = document.getElementById("workersAgesChart");
            var context = canvas.getContext("2d");
            var width = canvas.width;
            var height = canvas.height;
            var radius = Math.min(width, height) / 2;
            var colors = [
                "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
                "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
            ];
            var arc = d3.arc()
                .outerRadius(radius - 10)
                .innerRadius(50)
                .padAngle(0.03)
                .context(context);
            var labelArc = d3.arc()
                .outerRadius(radius - 40)
                .innerRadius(radius - 40)
                .context(context);
            var pie = d3.pie();
            var arcs = pie(data.map(function (d) { return d.value; }));
            context.translate(width / 2, height / 2);
            context.globalAlpha = 0.5;
            arcs.forEach(function (d, i) {
                context.beginPath();
                arc(d);
                context.fillStyle = colors[i];
                context.fill();
            });
            context.globalAlpha = 1;
            context.beginPath();
            arcs.forEach(arc);
            context.lineWidth = 1.5;
            context.stroke();
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillStyle = "#000";
            context.font = "normal bold 12px sans-serif";
            arcs.forEach(function (d) {
                var c = labelArc.centroid(d);
                context.fillText(data[d.index].name, c[0], c[1]);
            });
        };
        this.loadingRequets = 3;
    }
    StatisticsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.businessesService.GetLoggedInBusiness().then(function (business) {
            _this.business = business;
            _this.loadingRequets--;
        });
        this.businessesService.GetWorkersForBusiness().then(function (workers) {
            _this.manager = workers.filter(function (worker) { return worker.isManager; })[0];
            _this.workers = workers.filter(function (worker) { return !worker.isManager; });
            _this.buildWorkersAgesChart(_this.workers);
            _this.loadingRequets--;
        });
        this.constraintsService.getAllConstraints().then(function (constraints) {
            _this.constraints = constraints;
            _this.loadingRequets--;
        });
    };
    StatisticsComponent = __decorate([
        core_1.Component({
            selector: 'statistics',
            templateUrl: './statistics.html',
            providers: [businesses_service_1.BusinessesService, workers_service_1.WorkersService, constraints_service_1.ConstraintsService, shifts_service_1.ShiftService],
            styleUrls: ['./statistics.css']
        }),
        __metadata("design:paramtypes", [businesses_service_1.BusinessesService,
            workers_service_1.WorkersService,
            constraints_service_1.ConstraintsService,
            shifts_service_1.ShiftService])
    ], StatisticsComponent);
    return StatisticsComponent;
}());
exports.StatisticsComponent = StatisticsComponent;
var calcAge = function (birthDate) {
    if (birthDate) {
        return new Date(Date.now() - new Date(birthDate).valueOf()).getFullYear() - 1970;
    }
    else {
        return 0;
    }
};
//# sourceMappingURL=statistics.component.js.map