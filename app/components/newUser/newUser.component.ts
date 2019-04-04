import { Component } from '@angular/core';

enum ROLE {
    NOT_SELECTED,
    NEW_BUSINESS,
    WORKER
}

@Component({
    selector: 'newUser',
    templateUrl: './newUser.html',
    providers: [],
    styleUrls: ['./newUser.css']
})

export class NewUserComponent {
    role = ROLE;
    userRole: ROLE = ROLE.NOT_SELECTED;

    constructor() { }

}