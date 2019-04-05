import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from '../components/main/main.component';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { ConstraintsComponent } from '../components/constraints/constraints.component'
import { WorkersComponent } from '../components/workers/workers.component';
import { CalendarBoardComponent } from '../components/calendarBoard/calendarBoard.component';
import { StatisticsComponent } from '../components/statistics/statistics.component';
import { RegistrationComponent } from '../components/registration/registration.component';
import { NewUserRoleComponent } from '../components/newUserRole/newUserRole.component';
import { NewBusinessComponent } from '../components/newUserRole/newBusiness/newBusiness.component';
import { WorkerComponent } from '../components/newUserRole/worker/worker.component';
import { AuthGuard } from '../guards/auth/auth.guard';
import { LoginGuard } from '../guards/login/login.guard';
import { StatelessUserGuard } from '../guards/statelessUser/statelessUser.guard';

const routes: Routes = [
    {
        path: '', component: MainComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: HomeComponent },
            { path: 'constraints', component: ConstraintsComponent },
            { path: 'workers', component: WorkersComponent },
            { path: 'calendarBoard', component: CalendarBoardComponent },
            { path: 'statistics', component: StatisticsComponent },
        ],
    },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'register', component: RegistrationComponent, canActivate: [LoginGuard] },
    {
        path: 'role', canActivate: [StatelessUserGuard],
        children: [
            { path: '', component: NewUserRoleComponent },
            { path: 'business', component: NewBusinessComponent },
            { path: 'worker', component: WorkerComponent }
        ]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class Routing {
}