import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login/login.service'
import {UsersService} from '../../services/users/users.service'

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

export class NavbarComponent implements OnInit {
    searchValue: string = "";
    pages: Array<page> = [];

    constructor(private router: Router, private loginService: LoginService, private userService: UsersService) {
        //TODO: check if isManager:false -> add 'my constraint' to array, remove constraint

        this.pages.forEach((page: any) => {
            if (this.router.url == page.route) {
                page.isClicked = true;
            }
        })
    }

    ngOnInit() {
        this.userService.isLoginUserManager().then(isManager => {
            if (!isManager) {
                this.pages.push({route: '/', displayText: "בית", icon: "fa fa-home"});
                this.pages.push({route: '/workerPages/constraintsForWorker', displayText: "האילוצים שלי", icon: "fa fa-file-alt"});
                this.pages.push({route: '/calendarBoard', displayText: "שיבוץ", icon: "fa fa-calendar-alt"});
            }
            else {
                this.pages.push({route: '/', displayText: "בית", icon: "fa fa-home"});
                this.pages.push({route: '/workers', displayText: "עובדים", icon: "fa fa-user-friends"});
                this.pages.push({route: '/managerPages/constraints', displayText: "אילוצי עובדים", icon: "fa fa-file-alt"});
                this.pages.push({route: '/calendarBoard', displayText: "שיבוץ", icon: "fa fa-calendar-alt"});
                this.pages.push({route: '/statistics', displayText: "סטטיסטיקה", icon: "fa fa-chart-line"});
            }
            this.pages.push({route: '/login', displayText: "התנתקות", icon: "fas fa-sign-out-alt", action: this.logout.bind(this)});
        });
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