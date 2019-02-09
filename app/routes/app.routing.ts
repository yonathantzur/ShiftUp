import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { ConstraintsComponent } from '../components/constraints/constraints.component'
import { WorkersComponent } from '../components/workers/workers.component';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { StatisticsComponent } from '../components/statistics/statistics.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'constraints', component: ConstraintsComponent },
  { path: 'workers', component: WorkersComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class Routing { }