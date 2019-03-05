import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from '../../services/login/login.service'

@Component({
    selector: 'navbar',
    templateUrl: './navbar.html',
    providers: [LoginService],
    styleUrls: ['./navbar.css']
})

export class NavbarComponent {
    searchValue: string = "";
    pages: Array<any> = [
        { route: '/', displayText: "בית", icon: "fa fa-home", isClicked: false },
        { route: '/constraints', displayText: "אילוצים", icon: "fa fa-file-alt", isClicked: false },
        { route: '/workers', displayText: "עובדים", icon: "fa fa-user-friends", isClicked: false },
        { route: '/calendarBoard', displayText: "לוח שיבוץ", icon: "fa fa-calendar-alt", isClicked: false },
        { route: '/statistics', displayText: "סטטיסטיקה", icon: "fa fa-chart-line", isClicked: false },
        { route: '/logout', displayText: "התנתק", icon: "", isClicked: false }
    ];

    constructor(private router: Router, private loginService: LoginService) {
        this.pages.forEach((page: any) => {
            if (this.router.url == page.route) {
                page.isClicked = true;
            }
        })
    }

    pageClick(page: any) {
        this.pages.forEach((page: any) => {
            page.isClicked = false;
        })

        page.isClicked = true;
        this.routeTo(page.route);
    }

    routeTo(path: string) {
        this.router.navigateByUrl(path);
    }

    searchHandler = (event: any) => {
        console.log("handle search: " + this.searchValue);
    }
}