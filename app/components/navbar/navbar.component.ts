import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service'
import { UsersService } from '../../services/users/users.service'

class page {
    route: string;
    displayText: string;
    icon: string;
    action?: Function;
    isClicked?: boolean;
}

@Component({
    selector: 'navbar',
    templateUrl: './navbar.html',
    providers: [LoginService, UsersService],
    styleUrls: ['./navbar.css']
})

export class NavbarComponent implements OnInit {
    searchValue: string = "";
    pages: Array<page> = [];
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
        setTimeout(() => {
            $("#notificationsDropdown").click();
        }, 0);

        if (this.loggedInUser == undefined) {
            this.usersService.GetLoggedInUser().then((user: any) => {
                this.loggedInUser = user;
            })
        }
        this.usersService.isLoginUserManager().then(isManager => {
            this.pages.push({ route: '/', displayText: "בית", icon: "fa fa-home" });
            if (!isManager) {
                this.pages.push({
                    route: '/constraintsForWorker',
                    displayText: "אילוצים",
                    icon: "fa fa-file-alt"
                });
            } else {
                this.pages.push({ route: '/workers', displayText: "עובדים", icon: "fa fa-user-friends" });
                this.pages.push({
                    route: '/constraints',
                    displayText: "אילוצים",
                    icon: "fa fa-file-alt"
                });
                this.pages.push({ route: '/statistics', displayText: "סטטיסטיקה", icon: "fa fa-chart-line" });
                this.pages.push({ route: '/schedule', displayText: "שיבוץ", icon: "fa fa-calendar-alt" });
            }
            this.pages.push({
                route: '/login',
                displayText: "התנתקות",
                icon: "fas fa-sign-out-alt",
                action: this.logout.bind(this)
            });
        });
    }

    logout() {
        return new Promise((resolve, reject) => {
            this.loginService.logout().then(resolve).catch(reject);
        });
    }

    resetPagesClick = () => {
        this.pages.forEach((page: any) => {
            page.isClicked = false;
        })
    }

    notificationsClick() {
        this.resetPagesClick();

        const workersPage = this.pages.find(page => page.route == '/workers');
        workersPage.isClicked = true;
        this.routeTo(workersPage.route + '/requests')
    }

    pageClick(page: any) {
        this.resetPagesClick();

        page.isClicked = true;

        if (page.action) {
            page.action().then(() => {
                this.routeTo(page.route);
            });
        } else {
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