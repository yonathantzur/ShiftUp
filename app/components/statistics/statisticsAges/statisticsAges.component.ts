import { Component, Input } from '@angular/core';

declare var d3: any;

@Component({
    selector: 'statisticsAges',
    templateUrl: './statisticsAges.html',
    providers: [],
    styleUrls: ['./statisticsAges.css']
})

export class StatisticsAgesComponent {
    @Input() workers: Array<any>;
    averageAge: number;

    ngOnInit() {
        this.buildWorkersAgesChart(this.workers);
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
        this.averageAge = Math.round(sumAges / workers.length);
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
            .outerRadius(radius - 70)
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
}

const calcAge = (birthDate: Date) => {
    if (birthDate) {
        return new Date(Date.now() - new Date(birthDate).valueOf()).getFullYear() - 1970;
    } else {
        return 0;
    }
}