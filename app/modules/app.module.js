"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
// Components
var app_component_1 = require("../components/app/app.component");
var login_component_1 = require("../components/login/login.component");
var home_component_1 = require("../components/home/home.component");
var navbar_component_1 = require("../components/navbar/navbar.component");
var constraints_component_1 = require("../components/constraints/constraints.component");
var workers_component_1 = require("../components/workers/workers.component");
var calendar_component_1 = require("../components/calendar/calendar.component");
var statistics_component_1 = require("../components/statistics/statistics.component");
// Routing
var app_routing_1 = require("../routes/app.routing");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                app_routing_1.Routing
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                home_component_1.HomeComponent,
                navbar_component_1.NavbarComponent,
                constraints_component_1.ConstraintsComponent,
                workers_component_1.WorkersComponent,
                calendar_component_1.CalendarComponent,
                statistics_component_1.StatisticsComponent
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map