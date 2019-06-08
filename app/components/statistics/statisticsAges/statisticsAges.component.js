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
var StatisticsAgesComponent = /** @class */ (function () {
    function StatisticsAgesComponent() {
        var _this = this;
        this.buildWorkersAgesChart = function (workers) {
            var sumAges = 0;
            var groupAges = workers.map(function (worker) {
                var age = calcAge(worker.birthDate);
                sumAges += age;
                return age - age % 10 + 10;
            }).reduce(function (groups, item) {
                var val = item;
                groups[val] = groups[val] || [];
                groups[val].push(item);
                return groups;
            }, {});
            _this.averageAge = Math.round(sumAges / workers.length);
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
            var workersAgesCanvas = document.getElementById("workersAgesChart");
            var workersAgesContext = workersAgesCanvas.getContext("2d");
            var width = workersAgesCanvas.width;
            var height = workersAgesCanvas.height;
            var radius = Math.min(width, height) / 2;
            var colors = [
                "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
                "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
            ];
            var arc = d3.arc()
                .outerRadius(radius - 10)
                .innerRadius(100)
                .padAngle(0.03)
                .context(workersAgesContext);
            var labelArc = d3.arc()
                .outerRadius(radius - 70)
                .innerRadius(radius - 40)
                .context(workersAgesContext);
            var pie = d3.pie();
            var arcs = pie(data.map(function (d) { return d.value; }));
            workersAgesContext.translate(width / 2, height / 2);
            workersAgesContext.globalAlpha = 0.5;
            arcs.forEach(function (d, i) {
                workersAgesContext.beginPath();
                arc(d);
                workersAgesContext.fillStyle = colors[i];
                workersAgesContext.fill();
            });
            workersAgesContext.globalAlpha = 1;
            workersAgesContext.beginPath();
            arcs.forEach(arc);
            workersAgesContext.lineWidth = 1.5;
            workersAgesContext.stroke();
            workersAgesContext.textAlign = "center";
            workersAgesContext.textBaseline = "middle";
            workersAgesContext.fillStyle = "#000";
            workersAgesContext.font = "normal bold 12px sans-serif";
            arcs.forEach(function (d) {
                var c = labelArc.centroid(d);
                workersAgesContext.fillText(data[d.index].name, c[0], c[1]);
            });
        };
    }
    StatisticsAgesComponent.prototype.ngOnInit = function () {
        this.buildWorkersAgesChart(this.workers);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], StatisticsAgesComponent.prototype, "workers", void 0);
    StatisticsAgesComponent = __decorate([
        core_1.Component({
            selector: 'statisticsAges',
            templateUrl: './statisticsAges.html',
            providers: [],
            styleUrls: ['./statisticsAges.css']
        })
    ], StatisticsAgesComponent);
    return StatisticsAgesComponent;
}());
exports.StatisticsAgesComponent = StatisticsAgesComponent;
var calcAge = function (birthDate) {
    if (birthDate) {
        return new Date(Date.now() - new Date(birthDate).valueOf()).getFullYear() - 1970;
    }
    else {
        return 0;
    }
};
//# sourceMappingURL=statisticsAges.component.js.map