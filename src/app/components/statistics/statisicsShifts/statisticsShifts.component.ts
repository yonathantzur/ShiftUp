import { Component, Input } from '@angular/core';
import { ShiftService } from '../../../services/shifts/shifts.service';

declare let d3: any;
declare let $: any;

@Component({
    selector: 'statisticsShifts',
    templateUrl: './statisticsShifts.html',
    providers: [],
    styleUrls: ['./statisticsShifts.css']
})

export class StatisticsShiftsComponent {
    @Input() workers: Array<any>;
    @Input() business: any;
    shifts: Array<any>;
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
    colorsData: Array<any>;
    
    constructor(private shiftService: ShiftService) { }

    ngOnInit() {
        const currentDate: Date = new Date();
        this.lastYear = currentDate.getFullYear();
        this.selectedYear = this.lastYear;
        this.selectedMonth = currentDate.getMonth();
        for (let y = this.firstYear; y <= this.lastYear; y++) {
            this.years.push(y);
        }
        this.resetShiftsSVG();
        this.updateGraphByDate();

        setTimeout(() => {
            $("#shiftsYearSelector").val(this.selectedYear);
            $("#shiftsMonthSelector").val(this.months[this.selectedMonth]);
        }, 0);
    }

    monthChangeHandler = (strMonth: string) => {
        const month: number = this.months.indexOf(strMonth);
        if (month >= 1 && month <= 12 && month != this.selectedMonth) {
            this.selectedMonth = month;
            this.resetShiftsSVG();
            this.updateGraphByDate();
        }
    }

    yearChangeHandler = (strYear: string) => {
        const year = parseInt(strYear)
        if (year >= this.firstYear && year <= this.lastYear && year != this.selectedYear) {
            this.selectedYear = year;
            this.resetShiftsSVG();
            this.updateGraphByDate();
        }
    }

    resetShiftsSVG = () => {
        d3.select("#workersMonthShiftsChart").remove();
        d3.select(".svgShiftsContainer").append("svg")
            .attr("id", "workersMonthShiftsChart")
            .attr("width", "600")
            .attr("height", "600");
        }
    
    updateGraphByDate = () => {
        this.shiftService.GetShiftsForBusiness(this.selectedYear, this.selectedMonth + 1).then((shifts: any) => {
            this.buildShiftsChart(shifts, this.workers);
        });
    }

    buildShiftsChart = (shifts: Array<any>, workers: Array<any>) => {
        const data = workers.map((worker: any) => {
            let shiftsSums: Array<any> = [];
            this.business.shifts.forEach(() => {
                shiftsSums.push(0);
            });
            shiftsSums.push(worker.firstName + ' ' + worker.lastName);
            shifts.forEach((shift: any) => {
                shift.shiftsData.forEach((shiftData: any, index: number) => {
                    if (shiftData.workers.indexOf(worker._id) != -1) {
                        shiftsSums[index] = shiftsSums[index] + 1;
                    }
                })
            })
            return shiftsSums;
        }).sort((a: Array<any>, b: Array<any>) => {
            let sumA = 0;
            let sumB = 0;
            for (let i = 0; i < a.length - 1; i++) {
                sumA += a[i];
                sumB += b[i];
            }
            return sumB - sumA;
        });

        const n: number = this.business.shifts.length;
        const m = d3.range(data.length);
        const stackedData = d3.stack().keys(d3.range(n))(data);

        if (data && data.length) {
            const svg: any = d3.select("#workersMonthShiftsChart");
            const controlHeight = 50;
            const margin = { top: 20, right: 10, bottom: 20, left: 100 };
            const width = +svg.attr('width') - margin.left - margin.right;
            const height = +svg.attr('height') - controlHeight - margin.top - margin.bottom;
            const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
            let xMaxStacked: number = 0;

            for (let i = 0; i < n; i++) {
                xMaxStacked += data[0][i];
            }

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

            const colors = this.generateColors();
            const color = d3.scaleOrdinal()
                .domain(d3.range(n))
                .range(colors);

            const series = g.selectAll('.series')
                .data(stackedData)
                .enter().append('g')
                .attr('fill', (d: any, i: any) => color(i));

            series.selectAll('rect')
                .data((d: any) => d)
                .enter()
                .append('rect')
                    .attr('x', (d: any) => {
                        return x(d[0]);
                    })
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

    generateColors = () => {
        this.colorsData = [];
        const colors = [];
        this.business.shifts.forEach((shiftData: any) => {
            const randomColor = this.getRandomColor();
            colors.push(randomColor);
            this.colorsData.push({
                "shiftName": shiftData.name,
                "hex": randomColor
            });
        });

        return colors;
    }

    getRandomColor = () => {
        let letters = '3456789ABC';
        let color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 10)];
        }
        return color;
    }
}