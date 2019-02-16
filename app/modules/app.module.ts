import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
import { CalendarBoardComponent } from '../components/calendarBoard/calendarBoard.component';
import { StatisticsComponent } from '../components/statistics/statistics.component';
import { WorkerCardComponent } from '../components/workerCard/workerCard.component';
import { NewWorkerComponent } from '../components/newWorker/newWorker.component';

// Services
import { EventService } from '../services/event/event.service'

// Routing
import { Routing } from '../routes/app.routing'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    Routing
  ],
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ConstraintsComponent,
    WorkersComponent,
    CalendarComponent,
    ShiftCardComponent,
    CalendarBoardComponent,
    StatisticsComponent,
    WorkerCardComponent,
    NewWorkerComponent,
  ],
  providers: [
    EventService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }