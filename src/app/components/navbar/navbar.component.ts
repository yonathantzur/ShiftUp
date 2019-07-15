import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global/global.service';
import { EventService } from '../../services/event/event.service'
import { LoginService } from '../../services/login/login.service';
import { UsersService } from '../../services/users/users.service';

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

    constructor(private router: Router,
        private globalService: GlobalService,
        private eventService: EventService,
        private loginService: LoginService,
        private usersService: UsersService) {
        this.eventService.Register("removeBusinessRequest", (userObjId: string) => {
            this.loggedInUser.requests = this.loggedInUser.requests.filter((reqObjId: string) => {
                return (reqObjId != userObjId);
            });
        });

        this.eventService.Register("setConstraintRequestAmount", (amount: number) => {
            this.loggedInUser.waitingConstraints = amount;
        });
    }

    ngOnInit() {
        this.globalService.socket.emit('login');
        this.usersService.GetLoggedInUser().then((user: any) => {
            this.loggedInUser = user;

            this.pages.push({ route: '/', displayText: "בית", icon: "fa fa-home" });

            if (!this.loggedInUser.isManager) {
                this.pages.push({
                    route: '/constraintsForWorker',
                    displayText: "האילוצים שלי",
                    icon: "fa fa-file-alt"
                });
            }
            else {
                this.pages.push({ route: '/workers', displayText: "עובדים", icon: "fa fa-user-friends" });
                this.pages.push({ route: '/constraints', displayText: "אילוצים", icon: "fa fa-file-alt" });
                this.pages.push({ route: '/schedule', displayText: "שיבוץ", icon: "fa fa-calendar-alt" });
                this.pages.push({ route: '/statistics', displayText: "סטטיסטיקות", icon: "fa fa-chart-line" });
            }
            this.pages.push({
                route: '/login',
                displayText: "התנתקות",
                icon: "fas fa-sign-out-alt",
                action: this.logout.bind(this)
            });

            this.pages.forEach((page: any) => {
                if (this.router.url == page.route) {
                    page.isClicked = true;
                }
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

    notificationsWorkersRequestsClick = () => {
        this.resetPagesClick();

        const workersPage = this.pages.find(page => page.route == '/workers');
        workersPage.isClicked = true;
        this.routeTo(workersPage.route + '/requests');
    }

    notificationsConstraintsClick = () => {
        this.pageClick(this.pages.find(page => page.route == '/constraints'));
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