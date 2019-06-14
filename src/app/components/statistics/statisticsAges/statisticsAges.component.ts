import { Component, Input } from '@angular/core';
import { WorkersService } from 'src/app/services/workers/workers.service';

declare const d3: any;

@Component({
    selector: 'statisticsAges',
    templateUrl: './statisticsAges.html',
    providers: [WorkersService],
    styleUrls: ['./statisticsAges.css']
})

export class StatisticsAgesComponent {
    averageAge: number;

    constructor(private workersService: WorkersService) { }

    ngOnInit() {
        this.workersService.GetWorkersAverageAge().then((averageAge: any) => {
            this.averageAge = Math.floor(averageAge);
        })
        this.workersService.GetWorkersGroupByAgesDecades().then((decadesGroups: any) => {
            this.buildWorkersAgesChart(decadesGroups.sort((a: any, b: any) => b.value - a.value));
        });
    }

    buildWorkersAgesChart = (decadesGroups: Array<any>) => {
        const workersAgesCanvas: any = document.getElementById("workersAgesChart");
        const workersAgesContext = workersAgesCanvas.getContext("2d");

        const width = workersAgesCanvas.width;
        const height = workersAgesCanvas.height;
        const radius = Math.min(width, height) / 2;

        const colors = [
            "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
            "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
        ];

        const arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(100)
            .padAngle(0.03)
            .context(workersAgesContext);

        const labelArc = d3.arc()
            .outerRadius(radius - 70)
            .innerRadius(radius - 40)
            .context(workersAgesContext);

        const pie = d3.pie();

        const arcs = pie(decadesGroups.map((d: any) => d.value));

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
        arcs.forEach((d: any) => {
            const c = labelArc.centroid(d);
            workersAgesContext.fillText(decadesGroups[d.index].name, c[0], c[1]);
        });
    }
}