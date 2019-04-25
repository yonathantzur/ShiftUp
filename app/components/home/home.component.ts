import { Component } from '@angular/core';

import { EventService } from '../../services/event/event.service';

import { SHIFTS_FILTER } from '../../enums/enums'

@Component({
    selector: 'home',
    templateUrl: './home.html',
    providers: [],
    styleUrls: ['./home.css']
})

export class HomeComponent {

    shiftsFilter: any = SHIFTS_FILTER

    constructor(private eventService: EventService) { }

    Filter(value: SHIFTS_FILTER) {
        this.eventService.Emit('changeFilter', value);
    }
}