import { Component, Input } from '@angular/core';

declare var d3: any;

@Component({
    selector: 'statisticsSalaries',
    templateUrl: './statisticsSalaries.html',
    providers: [],
    styleUrls: ['./statisticsSalaries.css']
})

export class StatisticsSalariesComponent {
    @Input() workers: Array<any>;
    averageSalary: number;

    ngOnInit() {
        this.buildSalaryChart(this.workers);
    }

    async buildSalaryChart(workers: Array<any>) {
        var data: any = {
            x: `שכר`,
            y: `עובדים`,
            length: workers.length
        };

        let sumSalaries = 0;
        workers.forEach((worker: any, index: number) => {
            data[index] = worker.salary;
            sumSalaries += worker.salary;
        });

        this.averageSalary = Math.round(sumSalaries / workers.length);

        var height = 400;
        var width = 600;
        var margin = ({ top: 20, right: 20, bottom: 30, left: 40 });

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

        svg.append("g")
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
                .attr("font-size", "12px")
            .call((g: any) => g.append("text")
                .attr("x", width - margin.right - 5)
                .attr("y", -4)
                .attr("fill", "currentcolor")
                .attr("text-anchor", "end")
                .attr("font-size", "14px")
                .style("font-weight", "bold")
                .text(data.x));

        var yAxis = (g: any) => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .call((g: any) => g.select(".domain").remove())
                .attr("x", 12)
                .attr("dy", -10)
                .attr("text-anchor", "start")
                .attr("font-size", "12px")
            .call((g: any) => g.select(".tick:last-of-type text").clone()
                .attr("x", 12)
                .attr("dy", -10)
                .attr("text-anchor", "start")
                .attr("font-size", "14px")
                .style("font-weight", "bold")
                .text(data.y));

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);

        return svg.node();
    }
}