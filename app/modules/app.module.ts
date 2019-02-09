import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from '../components/app/app.component';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ConstraintsComponent } from '../components/constraints/constraints.component';
import { WorkersComponent } from '../components/workers/workers.component';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { StatisticsComponent } from '../components/statistics/statistics.component';

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
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ConstraintsComponent,
    WorkersComponent,
    CalendarComponent,
    StatisticsComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }