import { Component } from '@angular/core';

import { EventService } from '../../services/event/event.service';
import { UsersService } from '../../services/users/users.service';

import { SHIFTS_FILTER } from '../../enums/enums';

@Component({
    selector: 'home',
    templateUrl: './home.html',
    providers: [UsersService],
    styleUrls: ['./home.css']
})

export class HomeComponent {
    isUserManager: boolean;
    userId: string;
    shiftsFilter: any = SHIFTS_FILTER

    constructor(private eventService: EventService,
        private usersService: UsersService) {

        Promise.all([this.usersService.isLoginUserManager(),
        this.usersService.GetLoggedInUserId()]).then(results => {
            this.isUserManager = results[0];
            this.userId = results[1].id;
        });
    }

    Filter(value: SHIFTS_FILTER) {
        this.eventService.Emit('changeFilter', value);
    }
}