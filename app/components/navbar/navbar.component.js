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
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(router, loginService) {
        var _this = this;
        this.router = router;
        this.loginService = loginService;
        this.searchValue = "";
        this.pages = [
            { route: '/', displayText: "בית", icon: "fa fa-home", isClicked: false },
            { route: '/constraints', displayText: "אילוצים", icon: "fa fa-file-alt", isClicked: false },
            { route: '/workers', displayText: "עובדים", icon: "fa fa-user-friends", isClicked: false },
            { route: '/calendarBoard', displayText: "לוח שיבוץ", icon: "fa fa-calendar-alt", isClicked: false },
            { route: '/statistics', displayText: "סטטיסטיקה", icon: "fa fa-chart-line", isClicked: false },
            { route: '/logout', displayText: "התנתק", icon: "", isClicked: false }
        ];
        this.searchHandler = function (event) {
            console.log("handle search: " + _this.searchValue);
        };
        this.pages.forEach(function (page) {
            if (_this.router.url == page.route) {
                page.isClicked = true;
            }
        });
    }
    NavbarComponent.prototype.pageClick = function (page) {
        this.pages.forEach(function (page) {
            page.isClicked = false;
        });
        page.isClicked = true;
        this.routeTo(page.route);
    };
    NavbarComponent.prototype.routeTo = function (path) {
        this.router.navigateByUrl(path);
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'navbar',
            templateUrl: './navbar.html',
            providers: [login_service_1.LoginService],
            styleUrls: ['./navbar.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, login_service_1.LoginService])
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map