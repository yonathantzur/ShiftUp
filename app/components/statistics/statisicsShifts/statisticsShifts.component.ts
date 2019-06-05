import { Component, Input } from '@angular/core';
import { ShiftService } from '../../../services/shifts/shifts.service';

declare var d3: any;

@Component({
    selector: 'statisticsShifts',
    templateUrl: './statisticsShifts.html',
    providers: [],
    styleUrls: ['./statisticsShifts.css']
})

export class StatisticsShiftsComponent {
    @Input() workers: Array<any>;
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
            let sumShiftsOfWorker: number = 0;
            shifts.forEach((shift: any) => {
                shift.shiftsData.forEach((shiftData: any) => {
                    if (shiftData.workers.indexOf(worker._id) != -1) {
                        sumShiftsOfWorker++;
                    }
                });
            });

            return {
                "name": worker.firstName + ' ' + worker.lastName,
                "value": sumShiftsOfWorker
            };
        }).sort((a, b) => b.value - a.value);

        const margin = ({top: 30, right: 10, bottom: 0, left: 100})
        const width = 600;
        const height = 600;

        const x = d3.scaleLinear()
            .domain([0, data && data.length ? data[0].value : 0])
            .range([margin.left, width - margin.right]);

        const y = d3.scaleBand()
            .domain(data.map((d: any) => d.name))
            .range([margin.top, height - margin.bottom])
            .padding(0.1);

        const xAxis = (g: any) => g
            .attr("transform", `translate(0,${margin.top})`)
            .call(d3.axisTop(x).ticks(width / 80))
            .call((g: any) => g.select(".domain").remove())
            .selectAll("text").attr("font-size", "16px");

        const yAxis = (g: any) => g
            .call(d3.axisLeft(y).tickSizeOuter(0))
            .attr("transform", `translate(${margin.left},0)`)
            .selectAll("text").attr("font-size", "16px").style("text-anchor", "start");

        const format = x.tickFormat(10);
        
        const svg: any = d3.select("#workersMonthShiftsChart");

        svg.append("g")
            .attr("fill", "steelblue")
            .selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", x(0))
            .attr("y", (d: any) => y(d.name))
            .attr("width", (d: any) => x(d.value) - x(0))
            .attr("height", y.bandwidth());
  
        svg.append("g")
            .attr("fill", "#eee")
            .attr("text-anchor", "end")
            .style("font", "12px sans-serif")
            .selectAll("text")
            .data(data)
            .join("text")
            .attr("x", (d: any) => x(d.value) - 20)
            .attr("y", (d: any) => y(d.name) + y.bandwidth() / 2)
            .attr("dy", "0.35em")
            .text((d: any) => format(d.value));
  
        svg.append("g").call(xAxis);
        svg.append("g").call(yAxis);
    }
}