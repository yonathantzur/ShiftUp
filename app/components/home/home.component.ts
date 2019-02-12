import { Component } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.html',
    providers: [],
    styleUrls: ['./home.css']
})

export class HomeComponent {
    events: Array<any>;

    constructor() {
        // TODO: load events from DB
        this.events = [
            {
                title: 'שיבוץ',
                start: '2019-02-10'
            },
            {
                title: 'שיבוץ',
                start: '2019-02-11'
            },
            {
                title: 'שיבוץ',
                start: '2019-02-12'
            },
            {
                title: 'שיבוץ',
                start: '2019-02-13'
            },
            {
                title: 'שיבוץ',
                start: '2019-02-14'
            }
        ]
    }
}