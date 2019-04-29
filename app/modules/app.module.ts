import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from '../components/app/app.component';
import { MainComponent } from '../components/main/main.component';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ConstraintsComponent } from '../components/constraints/constraints.component';
import { WorkersComponent } from '../components/workers/workers.component';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { ShiftCardComponent } from '../components/shiftCard/shiftCard.component';
import { WorkerCardComponent } from '../components/workerCard/workerCard.component';
import { CalendarBoardComponent } from '../components/calendarBoard/calendarBoard.component';
import { StatisticsComponent } from '../components/statistics/statistics.component';
import { NewWorkerComponent } from '../components/newWorker/newWorker.component';
import { RegistrationComponent } from "../components/registration/registration.component";
import { NewUserRoleComponent } from "../components/newUserRole/newUserRole.component";
import { NewBusinessComponent } from "../components/newUserRole/newBusiness/newBusiness.component";
import { WorkerComponent } from "../components/newUserRole/worker/worker.component";
import { WorkerWaitComponent } from "../components/newUserRole/workerWait/workerWait.component";
import { ShiftEditComponent } from "../components/shiftEdit/shiftEdit.component";

// Services
import { EventService } from '../services/event/event.service'

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
        MainComponent,
        LoginComponent,
        HomeComponent,
        ConstraintsComponent,
        NavbarComponent,
        WorkersComponent,
        CalendarComponent,
        ShiftCardComponent,
        CalendarBoardComponent,
        StatisticsComponent,
        WorkerCardComponent,
        NewWorkerComponent,
        RegistrationComponent,
        NewUserRoleComponent,
        NewBusinessComponent,
        WorkerComponent,
        WorkerWaitComponent,
        ShiftEditComponent
    ],
    providers: [
        EventService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}