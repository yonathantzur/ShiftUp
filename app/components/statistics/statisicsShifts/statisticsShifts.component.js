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
var shifts_service_1 = require("../../../services/shifts/shifts.service");
var MONTHS = [
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
var StatisticsShiftsComponent = /** @class */ (function () {
    function StatisticsShiftsComponent(shiftService) {
        this.shiftService = shiftService;
        this.monthAndYear = "";
        this.buildShiftsChart = function (shifts, workers) {
            var data = workers.map(function (worker) {
                var sumShiftsOfWorker = 0;
                shifts.forEach(function (shift) {
                    shift.shiftsData.forEach(function (shiftData) {
                        if (shiftData.workers.indexOf(worker._id) != -1) {
                            sumShiftsOfWorker++;
                        }
                    });
                });
                return {
                    "name": worker.firstName + ' ' + worker.lastName,
                    "value": sumShiftsOfWorker
                };
            }).sort(function (a, b) { return b.value - a.value; });
            var margin = ({ top: 30, right: 0, bottom: 0, left: 100 });
            var width = 600;
            var height = 600;
            var x = d3.scaleLinear()
                .domain([0, data && data.length ? data[0].value : 0])
                .range([margin.left, width - margin.right]);
            var y = d3.scaleBand()
                .domain(data.map(function (d) { return d.name; }))
                .range([margin.top, height - margin.bottom])
                .padding(0.1);
            var xAxis = function (g) { return g
                .attr("transform", "translate(0," + margin.top + ")")
                .call(d3.axisTop(x).ticks(width / 80))
                .call(function (g) { return g.select(".domain").remove(); })
                .selectAll("text").attr("font-size", "16px"); };
            var yAxis = function (g) { return g.call(d3.axisLeft(y).tickSizeOuter(0))
                .attr("transform", "translate(" + margin.left + ",0)")
                .selectAll("text").attr("font-size", "16px").attr("transform", "translate(" + (20 - margin.left) + ",0)"); };
            var format = x.tickFormat(20);
            var svg = d3.select("#workersMonthShiftsChart");
            svg.append("g")
                .attr("fill", "steelblue")
                .selectAll("rect")
                .data(data)
                .join("rect")
                .attr("x", x(0))
                .attr("y", function (d) { return y(d.name); })
                .attr("width", function (d) { return x(d.value) - x(0); })
                .attr("height", y.bandwidth());
            svg.append("g")
                .attr("fill", "#eee")
                .attr("text-anchor", "end")
                .style("font", "12px sans-serif")
                .selectAll("text")
                .data(data)
                .join("text")
                .attr("x", function (d) { return x(d.value) - 20; })
                .attr("y", function (d) { return y(d.name) + y.bandwidth() / 2; })
                .attr("dy", "0.35em")
                .text(function (d) { return format(d.value); });
            svg.append("g").call(xAxis);
            svg.append("g").call(yAxis);
        };
    }
    StatisticsShiftsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentDate = new Date();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        this.monthAndYear = MONTHS[month - 1] + ' ' + year;
        this.shiftService.GetShiftsForBusiness(year, month).then(function (shifts) {
            _this.buildShiftsChart(shifts, _this.workers);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], StatisticsShiftsComponent.prototype, "workers", void 0);
    StatisticsShiftsComponent = __decorate([
        core_1.Component({
            selector: 'statisticsShifts',
            templateUrl: './statisticsShifts.html',
            providers: [],
            styleUrls: ['./statisticsShifts.css']
        }),
        __metadata("design:paramtypes", [shifts_service_1.ShiftService])
    ], StatisticsShiftsComponent);
    return StatisticsShiftsComponent;
}());
exports.StatisticsShiftsComponent = StatisticsShiftsComponent;
//# sourceMappingURL=statisticsShifts.component.js.map