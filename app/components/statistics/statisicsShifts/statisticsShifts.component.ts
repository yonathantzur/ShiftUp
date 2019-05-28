import { Component, Input } from '@angular/core';

declare var d3: any;

@Component({
    selector: 'statisticsShifts',
    templateUrl: './statisticsShifts.html',
    providers: [],
    styleUrls: ['./statisticsShifts.css']
})

export class StatisticsShiftsComponent {
    @Input() workers: Array<any>;
}