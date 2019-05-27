import { Component } from '@angular/core';

import { UsersService } from '../../services/users/users.service';
import { BusinessesService } from '../../services/businesses/businesses.service';
import { WorkersService } from '../../services/workers/workers.service';
import { ConstraintsService } from '../../services/constraints/constraints.service';
import { ShiftService } from '../../services/shifts/shifts.service';

declare var d3: any;
const CHARTS_SIZE: number = 400;

@Component({
    selector: 'statistics',
    templateUrl: './statistics.html',
    providers: [
        UsersService,
        BusinessesService,
        WorkersService,
        ConstraintsService,
        ShiftService
    ],
    styleUrls: ['./statistics.css']
})

export class StatisticsComponent {
    user: any;
    business: any;
    manager: any;
    workers: Array<any>;
    constraints: Array<any>;
    loadingRequets: number = 3;
    averageAges: number;

    constructor(
        private usersService: UsersService,
        private businessesService: BusinessesService,
        private workersService: WorkersService,
        private constraintsService: ConstraintsService,
        private shiftService: ShiftService) {

        this.loadingRequets = 3;
    }

    ngOnInit() {
        this.businessesService.GetLoggedInBusiness().then((business: any) => {
            this.business = business;

            this.loadingRequets--;
        });

        this.businessesService.GetWorkersForBusiness().then((workers: any) => {
            this.manager = workers.filter((worker: any) => worker.isManager)[0];
            this.workers = workers.filter((worker: any) => !worker.isManager);
        
            this.buildWorkersAgesChart(this.workers);
            this.buildSalaryChart(this.workers);

            this.loadingRequets--;
        });

        this.constraintsService.getAllConstraints().then((constraints: any) => {
            this.constraints = constraints;

            this.loadingRequets--;
        });
    }

    buildWorkersAgesChart = (workers: Array<any>) => {
        let sumAges = 0;
        var groupAges = workers.map((worker: any) => {
            const age = calcAge(worker.birthDate);
            sumAges += age;
            return age - age % 10 + 10;
        }).reduce(function(groups, item) {
            var val = item;
            groups[val] = groups[val] || [];
            groups[val].push(item);
            return groups;
        }, {});
        this.averageAges = workers.length ? parseInt((sumAges / workers.length).toString()) : 0;
        var data: Array<any> = [];
        for (let a = 0; a <= 120; a += 10) {
            if (groupAges[a]) {
                let endAgeRange = a + 10;
                data.push({
                    "name": a + "-" + endAgeRange,
                    "value": groupAges[a].length
                });
            }
        }

        var workersAgesCanvas: any = document.getElementById("workersAgesChart");
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

        var arcs = pie(data.map((d: any) => d.value));

        workersAgesContext.translate(width / 2, height / 2);

        workersAgesContext.globalAlpha = 0.5;
        arcs.forEach(function(d: any, i: any) {
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
        arcs.forEach(function(d: any) {
            var c = labelArc.centroid(d);
            workersAgesContext.fillText(data[d.index].name, c[0], c[1]);
        });
    }

    async buildSalaryChart(workers: Array<any>) {
        var data: any = {
            x: `שכר`,
            y: `עובדים`,
            length: workers.length
        };
        workers.forEach((worker: any, index: number) => {
            data[index] = worker.salary;
        })
        
        var height = CHARTS_SIZE;
        var width = CHARTS_SIZE;
        var margin = ({top: 20, right: 20, bottom: 30, left: 40});

        var x = d3.scaleLinear()
            .domain([0, 100]).nice()
            .range([margin.left, width - margin.right]);
        
        var bins = d3.histogram()
            .domain(x.domain())
            .thresholds(x.ticks(20))
            (data);

        var y = d3.scaleLinear()
            .domain([0, d3.max(bins, (d: any) => d.length)]).nice()
            .range([height - margin.bottom, margin.top]);

        const svg: any = d3.select("#workersSalariesChart");
        
        const bar = svg.append("g")
            .attr("fill", "steelblue")
            .selectAll("rect")
            .data(bins)
            .join("rect")
            .attr("x", (d: any) => x(d.x0) + 1)
            .attr("width", (d: any) => Math.max(0, x(d.x1) - x(d.x0) - 1))
            .attr("y", (d: any) => y(d.length))
            .attr("height", (d: any) => y(0) - y(d.length));
        
        var xAxis = (g: any) => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickSizeOuter(0))
            .call((g: any) => g.append("text")
            .attr("x", width - margin.right)
            .attr("y", -4)
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "end")
            .attr("font-size", "12px")
            .text(data.x));

        var yAxis = (g: any) => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .call((g: any) => g.select(".domain").remove())
            .call((g: any) => g.select(".tick:last-of-type text").clone()
            .attr("x", 4)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .attr("font-size", "12px")
            .text(data.y));

        svg.append("g")
            .call(xAxis);
        
        svg.append("g")
            .call(yAxis);
        
        return svg.node();
    }
}

const calcAge = (birthDate: Date) => {
    if (birthDate) {
        return new Date(Date.now() - new Date(birthDate).valueOf()).getFullYear() - 1970;
    } else {
        return 0;
    }
}