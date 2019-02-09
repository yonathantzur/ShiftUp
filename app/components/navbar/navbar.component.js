"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent() {
        this.pages = [
            { route: 'statistics', displayText: "סטטיסטיקה", icon: "fa fa-chart-line" },
            { route: 'calendar', displayText: "לוח שיבוץ", icon: "fa fa-calendar-alt" },
            { route: 'workers', displayText: "עובדים", icon: "fa fa-user-friends" },
            { route: 'constraints', displayText: "אילוצים", icon: "fa fa-file-alt" },
            { route: '', displayText: "בית", icon: "fa fa-home" }
        ];
        this.searchHandler = function (event) {
            var navbarSearchElement = $('#navbarSearch')[0];
            console.log("handle search: " + navbarSearchElement.value);
        };
    }
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'navbar',
            templateUrl: './navbar.html',
            providers: [],
            styleUrls: ['./navbar.css']
        })
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map