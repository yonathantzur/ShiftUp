import { Component } from '@angular/core';

declare var $: any;

@Component({
    selector: 'home',
    templateUrl: './home.html',
    providers: [],
    styleUrls: ['./home.css']
})

export class HomeComponent {
    constructor() {
        $(function () {            
            $('#calendar').fullCalendar({                
                height: "parent"
            })
        });
    }
}