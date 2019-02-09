import { Component } from '@angular/core';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.html',
    providers: [],
    styleUrls: ['./navbar.css']
})

export class NavbarComponent {
    pages = [
        { route: '', displayText: "בית", icon: "fa fa-home" },
        { route: 'constraints', displayText: "אילוצים", icon: "fa fa-file-alt" },
        { route: 'workers', displayText: "עובדים", icon: "fa fa-user-friends" },
        { route: 'calendar', displayText: "לוח שיבוץ", icon: "fa fa-calendar-alt" },
        { route: 'statistics', displayText: "סטטיסטיקה", icon: "fa fa-chart-line" }
    ];

    searchValue = "";

    searchHandler = (event: any) => {
        console.log("handle search: " + this.searchValue);
    }
}