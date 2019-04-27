import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { UsersService } from '../../services/users/users.service';

class page {
    route: string;
    displayText: string;
    icon: string;
    action?: Function
}

@Component({
    selector: 'navbar',
    templateUrl: './navbar.html',
    providers: [LoginService, UsersService],
    styleUrls: ['./navbar.css']
})

export class NavbarComponent {
    searchValue: string = "";
    pages: Array<page> = [
        { route: '/', displayText: "בית", icon: "fa fa-home" },
        { route: '/constraints', displayText: "אילוצים", icon: "fa fa-file-alt" },
        { route: '/workers', displayText: "עובדים", icon: "fa fa-user-friends" },
        { route: '/workers/requests', displayText: "בקשות ממתינות", icon: "fas fa-bell" },
        { route: '/calendarBoard', displayText: "שיבוץ", icon: "fa fa-calendar-alt" },
        { route: '/statistics', displayText: "סטטיסטיקה", icon: "fa fa-chart-line" },
        { route: '/login', displayText: "התנתקות", icon: "fas fa-sign-out-alt", action: this.logout.bind(this) }
    ];
    loggedInUser: any;

    constructor(
        private router: Router,
        private loginService: LoginService,
        private usersService: UsersService
    ) {
        this.pages.forEach((page: any) => {
            if (this.router.url == page.route) {
                page.isClicked = true;
            }
        })
    }

    ngOnInit() {
        if (this.loggedInUser == undefined) {
            this.usersService.GetLoggedInUser().then((user) => {
                this.loggedInUser = user;
            })
        }
    }

    logout() {
        return new Promise((resolve, reject) => {
            this.loginService.logout().then(resolve).catch(reject);
        });
    }

    pageClick(page: any) {
        this.pages.forEach((page: any) => {
            page.isClicked = false;
        })

        page.isClicked = true;

        if (page.action) {
            page.action().then(() => {
                this.routeTo(page.route);
            });
        }
        else {
            this.routeTo(page.route);
        }
    }

    routeTo(path: string) {
        this.router.navigateByUrl(path);
    }

    searchHandler = (event: any) => {
        console.log("handle search: " + this.searchValue);
    }
}