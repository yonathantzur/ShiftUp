import { Component, Input } from '@angular/core';
import { ConstraintsService } from '../../../services/constraints/constraints.service';

declare let d3: any;
declare let $: any;
const ConstraintStatusEnum = Object.freeze({ WAITING: 0, REFUSED: 1, CONFIRMED: 2 });


@Component({
    selector: 'statisticsConstraints',
    templateUrl: './statisticsConstraints.html',
    providers: [],
    styleUrls: ['./statisticsConstraints.css']
})

export class StatisticsConstraintsComponent {
    @Input() workers: Array<any>;
    allConstraints: Array<any>;
    filteredConstraints: Array<any>
    months: Array<string> = [
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
    firstYear: number = 2018;
    lastYear: number = 2018;
    years: Array<number> = [];
    selectedMonth: number;
    selectedYear: number;

    constructor(private constraintsService: ConstraintsService) { }

    ngOnInit() {
        const currentDate: Date = new Date();
        this.lastYear = currentDate.getFullYear();
        this.selectedYear = this.lastYear;
        this.selectedMonth = currentDate.getMonth();
        for (let y = this.firstYear; y <= this.lastYear; y++) {
            this.years.push(y);
        }
        this.resetConstraintsSVG();

        this.constraintsService.getAllConstraints(null, null).then(constraints => {
            this.allConstraints = constraints;
            this.updateGraphByDate();
        })

        setTimeout(() => {
            $("#constraintsYearSelector").val(this.selectedYear);
            $("#constraintsMonthSelector").val(this.months[this.selectedMonth]);
        }, 0);
    }

    monthChangeHandler = (strMonth: string) => {
        const month: number = this.months.indexOf(strMonth);
        if (month >= 1 && month <= 12 && month != this.selectedMonth) {
            this.selectedMonth = month;
            this.resetConstraintsSVG();
            this.updateGraphByDate();
        }
    }

    yearChangeHandler = (strYear: string) => {
        const year = parseInt(strYear)
        if (year >= this.firstYear && year <= this.lastYear && year != this.selectedYear) {
            this.selectedYear = year;
            this.resetConstraintsSVG();
            this.updateGraphByDate();
        }
    }

    resetConstraintsSVG = () => {
        d3.select("#workersMonthConstraintsChart").remove();
        d3.select(".svgConstraintsContainer").append("svg")
            .attr("id", "workersMonthConstraintsChart")
            .attr("width", "600")
            .attr("height", "600");
    }

    updateGraphByDate = () => {
        this.filteredConstraints = this.allConstraints.filter((constraint: any) => {
            const month: number = this.selectedMonth + 1;
            const startOfMonthDate = new Date(this.selectedYear + "/" + month);
            let endOfMonthMonth = month + 1;
            let endOfMonthYear = this.selectedYear;
            if (endOfMonthMonth == 13) {
                endOfMonthMonth = 1;
                endOfMonthYear++;
            }
            const endOfMonthDate = new Date(new Date(endOfMonthYear + "/" + endOfMonthMonth).valueOf() - 1);
            const constraintStartDate = new Date(constraint.startDate);
            const constraintEndDate = new Date(constraint.endDate);
            return (constraintStartDate >= startOfMonthDate && constraintStartDate <= endOfMonthDate) ||
                (constraintEndDate >= startOfMonthDate && constraintEndDate <= endOfMonthDate);
        });
        this.buildConstraintsChart(this.filteredConstraints, this.workers);
    }

    buildConstraintsChart = (constraints: Array<any>, workers: Array<any>) => {
        const data = workers.map((worker: any) => {
            let sumWaiting: number = 0;
            let sumRefused: number = 0;
            let sumConfirmed: number = 0;
            constraints.forEach((constraint: any) => {
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

            return [
                sumConfirmed,
                sumRefused,
                sumWaiting,
                worker.firstName + ' ' + worker.lastName
            ];
        }).sort((a: Array<any>, b: Array<any>) => {
            const sumA = a[0] + a[1] + a[2];
            const sumB = b[0] + b[1] + b[2];
            return sumB - sumA;
        });

        const stackedData = d3.stack().keys([0, 1, 2])(data);

        if (data && data.length) {
            const n: number = 3;
            const m = d3.range(data.length);

            let xMaxStacked: number = 0;
            for (let i = 0; i < n; i++) {
                xMaxStacked += parseInt(data[0][i].toString());
            }

            const svg = d3.select('#workersMonthConstraintsChart');
            const controlHeight = 50;
            const margin = { top: 20, right: 10, bottom: 20, left: 100 };
            const width = +svg.attr('width') - margin.left - margin.right;
            const height = +svg.attr('height') - controlHeight - margin.top - margin.bottom;
            const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

            const x = d3.scaleLinear()
                .domain([0, xMaxStacked])
                .range([0, width]);

            const yNames = d3.scaleBand()
                .domain(data.map((d: any) => d[n]))
                .rangeRound([0, height])
                .padding(0.08);

            const yLocations = d3.scaleBand()
                .domain(m)
                .rangeRound([0, height])
                .padding(0.08);

            const color = d3.scaleOrdinal()
                .domain(d3.range(n))
                .range(["#2ca02c", "#d62728", "#1f77b4"]);

            const series = g.selectAll('.series')
                .data(stackedData)
                .enter().append('g')
                .attr('fill', (d: any, i: any) => color(i));

            series.selectAll('rect')
                .data((d: any) => d)
                .enter()
                .append('rect')
                    .attr('x', (d: any) => x(d[0]))
                    .attr('y', (d: any, i: any) => yLocations(i))
                    .attr('height', yLocations.bandwidth())
                    .attr('width', (d: any) => x(d[1]) - x(d[0]));

            g.append('g')
                .attr('width', 'axis axis--y')
                .call(d3.axisLeft(yNames).tickSizeOuter(0).tickPadding(6))
                .selectAll("text")
                    .attr("font-size", "16px").style("text-anchor", "start");

            g.append('g')
                .call((g: any) => g
                    .call(d3.axisTop(x).ticks(xMaxStacked))
                    .selectAll("text").attr("font-size", "14px"));
        }
    }
}