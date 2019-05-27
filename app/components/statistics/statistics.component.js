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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var users_service_1 = require("../../services/users/users.service");
var businesses_service_1 = require("../../services/businesses/businesses.service");
var workers_service_1 = require("../../services/workers/workers.service");
var constraints_service_1 = require("../../services/constraints/constraints.service");
var shifts_service_1 = require("../../services/shifts/shifts.service");
var CHARTS_SIZE = 400;
var StatisticsComponent = /** @class */ (function () {
    function StatisticsComponent(usersService, businessesService, workersService, constraintsService, shiftService) {
        var _this = this;
        this.usersService = usersService;
        this.businessesService = businessesService;
        this.workersService = workersService;
        this.constraintsService = constraintsService;
        this.shiftService = shiftService;
        this.loadingRequets = 3;
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
            _this.averageAges = workers.length ? parseInt((sumAges / workers.length).toString()) : 0;
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
                .outerRadius(radius - 40)
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
            _this.buildSalaryChart(_this.workers);
            _this.loadingRequets--;
        });
        this.constraintsService.getAllConstraints().then(function (constraints) {
            _this.constraints = constraints;
            _this.loadingRequets--;
        });
    };
    StatisticsComponent.prototype.buildSalaryChart = function (workers) {
        return __awaiter(this, void 0, void 0, function () {
            var data, height, width, margin, x, bins, y, svg, bar, xAxis, yAxis;
            return __generator(this, function (_a) {
                data = {
                    x: "\u05E9\u05DB\u05E8",
                    y: "\u05E2\u05D5\u05D1\u05D3\u05D9\u05DD",
                    length: workers.length
                };
                workers.forEach(function (worker, index) {
                    data[index] = worker.salary;
                });
                height = CHARTS_SIZE;
                width = CHARTS_SIZE;
                margin = ({ top: 20, right: 20, bottom: 30, left: 40 });
                x = d3.scaleLinear()
                    .domain([0, 100]).nice()
                    .range([margin.left, width - margin.right]);
                bins = d3.histogram()
                    .domain(x.domain())
                    .thresholds(x.ticks(20))(data);
                y = d3.scaleLinear()
                    .domain([0, d3.max(bins, function (d) { return d.length; })]).nice()
                    .range([height - margin.bottom, margin.top]);
                svg = d3.select("#workersSalariesChart");
                bar = svg.append("g")
                    .attr("fill", "steelblue")
                    .selectAll("rect")
                    .data(bins)
                    .join("rect")
                    .attr("x", function (d) { return x(d.x0) + 1; })
                    .attr("width", function (d) { return Math.max(0, x(d.x1) - x(d.x0) - 1); })
                    .attr("y", function (d) { return y(d.length); })
                    .attr("height", function (d) { return y(0) - y(d.length); });
                xAxis = function (g) { return g
                    .attr("transform", "translate(0," + (height - margin.bottom) + ")")
                    .call(d3.axisBottom(x).tickSizeOuter(0))
                    .call(function (g) { return g.append("text")
                    .attr("x", width - margin.right)
                    .attr("y", -4)
                    .attr("fill", "#000")
                    .attr("font-weight", "bold")
                    .attr("text-anchor", "end")
                    .attr("font-size", "12px")
                    .text(data.x); }); };
                yAxis = function (g) { return g
                    .attr("transform", "translate(" + margin.left + ",0)")
                    .call(d3.axisLeft(y))
                    .call(function (g) { return g.select(".domain").remove(); })
                    .call(function (g) { return g.select(".tick:last-of-type text").clone()
                    .attr("x", 4)
                    .attr("text-anchor", "start")
                    .attr("font-weight", "bold")
                    .attr("font-size", "12px")
                    .text(data.y); }); };
                svg.append("g")
                    .call(xAxis);
                svg.append("g")
                    .call(yAxis);
                return [2 /*return*/, svg.node()];
            });
        });
    };
    StatisticsComponent = __decorate([
        core_1.Component({
            selector: 'statistics',
            templateUrl: './statistics.html',
            providers: [
                users_service_1.UsersService,
                businesses_service_1.BusinessesService,
                workers_service_1.WorkersService,
                constraints_service_1.ConstraintsService,
                shifts_service_1.ShiftService
            ],
            styleUrls: ['./statistics.css']
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService,
            businesses_service_1.BusinessesService,
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