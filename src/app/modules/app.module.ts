import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from '../components/app/app.component';
import { ExcelComponent } from '../components/excel/excel.component';
import { MainComponent } from '../components/main/main.component';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ConstraintsComponent } from '../components/constraints/constraints.component';
import { ConstraintsForWorkerComponent } from '../components/constraintsForWorker/constraintsForWorker.component';
import { WorkersComponent } from '../components/workers/workers.component';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { ShiftCardComponent } from '../components/shiftCard/shiftCard.component';
import { WorkerCardComponent } from '../components/workerCard/workerCard.component';
import { ScheduleComponent } from '../components/schedule/schedule.component';
import { StatisticsComponent } from '../components/statistics/statistics.component';
import { RegistrationComponent } from '../components/registration/registration.component';
import { NewUserRoleComponent } from '../components/newUserRole/newUserRole.component';
import { NewBusinessComponent } from '../components/newUserRole/newBusiness/newBusiness.component';
import { WorkerComponent } from '../components/newUserRole/worker/worker.component';
import { WorkerWaitComponent } from '../components/newUserRole/workerWait/workerWait.component';
import { WorkersRequestsComponent } from '../components/workersRequests/workersRequests.component';
import { ShiftEditComponent } from "../components/shiftEdit/shiftEdit.component";
import { StatisticsAgesComponent } from '../components/statistics/statisticsAges/statisticsAges.component';
import { StatisticsSalariesComponent } from '../components/statistics/statisticsSalaries/statisticsSalaries.component';
import { StatisticsShiftsComponent } from '../components/statistics/statisicsShifts/statisticsShifts.component';
import { StatisticsConstraintsComponent } from '../components/statistics/statisticsConstraints/statisticsConstraints.component';

// Services
import { EventService } from '../services/event/event.service'
import { GlobalService } from '../services/global/global.service'

// Routing
import { Routing } from '../routes/app.routing'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        Routing,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        ExcelComponent,
        MainComponent,
        LoginComponent,
        HomeComponent,
        ConstraintsComponent,
        ConstraintsForWorkerComponent,
        NavbarComponent,
        WorkersComponent,
        CalendarComponent,
        ShiftCardComponent,
        ScheduleComponent,
        StatisticsComponent,
        WorkerCardComponent,
        RegistrationComponent,
        NewUserRoleComponent,
        NewBusinessComponent,
        WorkerComponent,
        WorkerWaitComponent,
        WorkersRequestsComponent,
        ShiftEditComponent,
        StatisticsAgesComponent,
        StatisticsSalariesComponent,
        StatisticsShiftsComponent,
        StatisticsConstraintsComponent
    ],
    providers: [
        GlobalService,
        EventService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}