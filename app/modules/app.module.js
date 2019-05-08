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
var main_component_1 = require("../components/main/main.component");
var login_component_1 = require("../components/login/login.component");
var home_component_1 = require("../components/home/home.component");
var navbar_component_1 = require("../components/navbar/navbar.component");
var constraints_component_1 = require("../components/constraints/constraints.component");
var constraintsForWorker_component_1 = require("../components/constraintsForWorker/constraintsForWorker.component");
var workers_component_1 = require("../components/workers/workers.component");
var calendar_component_1 = require("../components/calendar/calendar.component");
var shiftCard_component_1 = require("../components/shiftCard/shiftCard.component");
var workerCard_component_1 = require("../components/workerCard/workerCard.component");
var schedule_component_1 = require("../components/schedule/schedule.component");
var statistics_component_1 = require("../components/statistics/statistics.component");
var registration_component_1 = require("../components/registration/registration.component");
var newUserRole_component_1 = require("../components/newUserRole/newUserRole.component");
var newBusiness_component_1 = require("../components/newUserRole/newBusiness/newBusiness.component");
var worker_component_1 = require("../components/newUserRole/worker/worker.component");
var workerWait_component_1 = require("../components/newUserRole/workerWait/workerWait.component");
var workersRequests_component_1 = require("../components/workersRequests/workersRequests.component");
var shiftEdit_component_1 = require("../components/shiftEdit/shiftEdit.component");
// Services
var event_service_1 = require("../services/event/event.service");
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
                app_routing_1.Routing,
                forms_1.ReactiveFormsModule
            ],
            declarations: [
                app_component_1.AppComponent,
                main_component_1.MainComponent,
                login_component_1.LoginComponent,
                home_component_1.HomeComponent,
                constraints_component_1.ConstraintsComponent,
                constraintsForWorker_component_1.ConstraintsForWorkerComponent,
                navbar_component_1.NavbarComponent,
                workers_component_1.WorkersComponent,
                calendar_component_1.CalendarComponent,
                shiftCard_component_1.ShiftCardComponent,
                schedule_component_1.ScheduleComponent,
                statistics_component_1.StatisticsComponent,
                workerCard_component_1.WorkerCardComponent,
                registration_component_1.RegistrationComponent,
                newUserRole_component_1.NewUserRoleComponent,
                newBusiness_component_1.NewBusinessComponent,
                worker_component_1.WorkerComponent,
                workerWait_component_1.WorkerWaitComponent,
                workersRequests_component_1.WorkersRequestsComponent,
                shiftEdit_component_1.ShiftEditComponent
            ],
            providers: [
                event_service_1.EventService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map