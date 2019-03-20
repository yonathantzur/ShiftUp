import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service'

@Component({
    selector: 'navbar',
    templateUrl: './navbar.html',
    providers: [LoginService],
    styleUrls: ['./navbar.css']
})

export class NavbarComponent {
    searchValue: string = "";
    pages: Array<any> = [
        { route: '/', displayText: "בית", icon: "fa fa-home" },
        { route: '/constraints', displayText: "אילוצים", icon: "fa fa-file-alt" },
        { route: '/workers', displayText: "עובדים", icon: "fa fa-user-friends" },
        { route: '/calendarBoard', displayText: "שיבוץ", icon: "fa fa-calendar-alt" },
        { route: '/statistics', displayText: "סטטיסטיקה", icon: "fa fa-chart-line" },
        { route: '/login', displayText: "התנתקות", icon: "fas fa-sign-out-alt" }
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