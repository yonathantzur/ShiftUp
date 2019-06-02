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
var constraints_service_1 = require("../../../services/constraints/constraints.service");
var ConstraintStatusEnum = Object.freeze({ WAITING: 0, REFUSED: 1, CONFIRMED: 2 });
var StatisticsConstraintsComponent = /** @class */ (function () {
    function StatisticsConstraintsComponent(constraintsService) {
        var _this = this;
        this.constraintsService = constraintsService;
        this.months = [
            "ינואר",
            "פברואר",
            "מרץ",
            "אפריל",
            "מאי",
            "יוני",
            "יולי",
            "אוגוסט",
            "ספטמבר",
            "אוקטובר",
            "נובמבר",
            "דצמבר"
        ];
        this.firstYear = 2018;
        this.lastYear = 2018;
        this.years = [];
        this.monthChangeHandler = function (strMonth) {
            var month = _this.months.indexOf(strMonth);
            if (month >= 1 && month <= 12 && month != _this.selectedMonth) {
                _this.selectedMonth = month;
                _this.resetConstraintsSVG();
                _this.updateGraphByDate();
            }
        };
        this.yearChangeHandler = function (strYear) {
            var year = parseInt(strYear);
            if (year >= _this.firstYear && year <= _this.lastYear && year != _this.selectedYear) {
                _this.selectedYear = year;
                _this.resetConstraintsSVG();
                _this.updateGraphByDate();
            }
        };
        this.resetConstraintsSVG = function () {
            d3.select("#workersMonthConstraintsChart").remove();
            d3.select(".svgConstraintsContainer").append("svg")
                .attr("id", "workersMonthConstraintsChart")
                .attr("width", "600")
                .attr("height", "600");
        };
        this.updateGraphByDate = function () {
            // this.constraintsService.getAllConstraints(this.selectedYear, this.selectedMonth + 1).then((constraints: any) => {
            //     this.buildConstraintsChart(constraints, this.workers);
            // });
            _this.constraintsService.getAllConstraints().then(function (constraints) {
                _this.buildConstraintsChart(constraints, _this.workers);
            });
        };
        this.buildConstraintsChart = function (constraints, workers) {
            console.log(constraints);
            // "Name", "Total", "Confirmed", "Refused", "Waiting"
            var data = workers.map(function (worker) {
                var sumWaiting = 0;
                var sumRefused = 0;
                var sumConfirmed = 0;
                constraints.forEach(function (constraint) {
                    if (constraint.userObjId == worker._id) {
                        switch (constraint.statusId) {
                            case ConstraintStatusEnum.CONFIRMED: {
                                sumConfirmed++;
                                break;
                            }
                            case ConstraintStatusEnum.REFUSED: {
                                sumRefused++;
                                break;
                            }
                            case ConstraintStatusEnum.WAITING: {
                                sumWaiting++;
                                break;
                            }
                        }
                    }
                });
                // const val: Array<any> = [sumConfirmed, sumRefused, sumWaiting];
                // val. = worker.firstName + ' ' + worker.lastName;
                // return {
                //     "name": worker.firstName + ' ' + worker.lastName,
                //     "value": [sumConfirmed, sumRefused, sumWaiting]
                // }
                return [
                    sumConfirmed,
                    sumRefused,
                    sumWaiting,
                    worker.firstName + ' ' + worker.lastName
                ];
            }).sort(function (a, b) {
                var sumA = a[0] + a[1] + a[2];
                var sumB = b[0] + b[1] + b[2];
                return sumB - sumA;
            });
            // -----------------------------------------------------------------------------------
            var stackedData = d3.stack().keys([0, 1, 2])(data);
            if (data && data.length) {
                var xMaxStacked = 6;
                var n = xMaxStacked;
                // const m = d3.range(data.length);
                var m = data.map(function (d) { return d[3]; });
                var svg = d3.select('#workersMonthConstraintsChart');
                var controlHeight = 50;
                var margin = { top: 10, right: 10, bottom: 20, left: 100 };
                var width = +svg.attr('width') - margin.left - margin.right;
                var height = +svg.attr('height') - controlHeight - margin.top - margin.bottom;
                var g = svg.append('g').attr('transform', "translate(" + margin.left + "," + margin.top + ")");
                var x_1 = d3.scaleLinear()
                    .domain([0, xMaxStacked])
                    .range([0, width]);
                var y_1 = d3.scaleBand()
                    .domain(m)
                    .rangeRound([0, height])
                    .padding(0.08);
                var color_1 = d3.scaleOrdinal()
                    .domain(d3.range(n))
                    .range(["#55E", "#55B", "#558"]);
                var series = g.selectAll('.series')
                    .data(stackedData)
                    .enter().append('g')
                    .attr('fill', function (d, i) { return color_1(i); });
                var rect = series.selectAll('rect')
                    .data(function (d) { return d; })
                    .enter().append('rect')
                    .attr('x', 0)
                    .attr('y', function (d, i) { return y_1(i); })
                    .attr('width', 0)
                    .attr('height', y_1.bandwidth());
                rect.transition()
                    .delay(function (d, i) { return i * 10; })
                    .attr('x', function (d) { return x_1(d[0]); })
                    .attr('y', function (d, i) { return y_1(i); })
                    .attr('width', function (d) { return x_1(d[1]) - x_1(d[0]); });
                g.append('g')
                    .attr('width', 'axis axis--y')
                    .attr('transform', "translate(0,0)")
                    .call(d3.axisLeft(y_1)
                    .tickSize(0)
                    .tickPadding(6))
                    .selectAll("text").attr("font-size", "16px").style("text-anchor", "start");
                rect.transition()
                    .duration(500)
                    .delay(function (d, i) { return i * 10; })
                    .attr('x', function (d) { return x_1(d[0]); })
                    .attr('width', function (d) { return x_1(d[1]) - x_1(d[0]); })
                    .transition()
                    .attr('y', function (d, i) { return y_1(i); })
                    .attr('height', y_1.bandwidth());
            }
        };
    }
    StatisticsConstraintsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentDate = new Date();
        this.lastYear = currentDate.getFullYear();
        this.selectedYear = this.lastYear;
        this.selectedMonth = currentDate.getMonth();
        for (var y = this.firstYear; y <= this.lastYear; y++) {
            this.years.push(y);
        }
        this.resetConstraintsSVG();
        this.updateGraphByDate();
        setTimeout(function () {
            $("#yearSelector").val(_this.selectedYear);
            $("#monthSelector").val(_this.months[_this.selectedMonth]);
        }, 0);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], StatisticsConstraintsComponent.prototype, "workers", void 0);
    StatisticsConstraintsComponent = __decorate([
        core_1.Component({
            selector: 'statisticsConstraints',
            templateUrl: './statisticsConstraints.html',
            providers: [],
            styleUrls: ['./statisticsConstraints.css']
        }),
        __metadata("design:paramtypes", [constraints_service_1.ConstraintsService])
    ], StatisticsConstraintsComponent);
    return StatisticsConstraintsComponent;
}());
exports.StatisticsConstraintsComponent = StatisticsConstraintsComponent;
//# sourceMappingURL=statisticsConstraints.component.js.map