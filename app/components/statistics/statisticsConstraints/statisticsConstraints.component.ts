import { Component, Input } from '@angular/core';

declare var d3: any;

@Component({
    selector: 'statisticsConstraints',
    templateUrl: './statisticsConstraints.html',
    providers: [],
    styleUrls: ['./statisticsConstraints.css']
})

export class StatisticsConstraintsComponent {
    @Input() workers: Array<any>;
}