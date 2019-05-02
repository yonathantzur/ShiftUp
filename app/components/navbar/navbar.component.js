"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var login_service_1 = require("../../services/login/login.service");
var users_service_1 = require("../../services/users/users.service");
var page = /** @class */ (function () {
    function page() {
    }
    return page;
}());
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(router, loginService, usersService) {
        var _this = this;
        this.router = router;
        this.loginService = loginService;
        this.usersService = usersService;
        this.searchValue = "";
        this.pages = [
            { route: '/', displayText: "בית", icon: "fa fa-home" },
            { route: '/constraints', displayText: "אילוצים", icon: "fa fa-file-alt" },
            { route: '/workers', displayText: "עובדים", icon: "fa fa-user-friends" },
            { route: '/calendarBoard', displayText: "שיבוץ", icon: "fa fa-calendar-alt" },
            { route: '/statistics', displayText: "סטטיסטיקה", icon: "fa fa-chart-line" },
            { route: '/login', displayText: "התנתקות", icon: "fas fa-sign-out-alt", action: this.logout.bind(this) }
        ];
        this.resetPagesClick = function () {
            _this.pages.forEach(function (page) {
                page.isClicked = false;
            });
        };
        this.searchHandler = function (event) {
            console.log("handle search: " + _this.searchValue);
        };
        this.pages.forEach(function (page) {
            if (_this.router.url == page.route) {
                page.isClicked = true;
            }
        });
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.loggedInUser == undefined) {
            this.usersService.GetLoggedInUser().then(function (user) {
                _this.loggedInUser = user;
            });
        }
    };
    NavbarComponent.prototype.logout = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loginService.logout().then(resolve).catch(reject);
        });
    };
    NavbarComponent.prototype.notificationsClick = function () {
        this.resetPagesClick();
        var workersPage = this.pages.find(function (page) { return page.route == '/workers'; });
        workersPage.isClicked = true;
        this.routeTo(workersPage.route + '/requests');
    };
    NavbarComponent.prototype.pageClick = function (page) {
        var _this = this;
        this.resetPagesClick();
        page.isClicked = true;
        if (page.action) {
            page.action().then(function () {
                _this.routeTo(page.route);
            });
        }
        else {
            this.routeTo(page.route);
        }
    };
    NavbarComponent.prototype.routeTo = function (path) {
        this.router.navigateByUrl(path);
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'navbar',
            templateUrl: './navbar.html',
            providers: [login_service_1.LoginService, users_service_1.UsersService],
            styleUrls: ['./navbar.css']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            login_service_1.LoginService,
            users_service_1.UsersService])
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map