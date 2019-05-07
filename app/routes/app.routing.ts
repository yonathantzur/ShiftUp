import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from '../components/main/main.component';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { ConstraintsComponent } from '../components/constraints/constraints.component'
import { ConstraintsForWorkerComponent } from '../components/constraintsForWorker/constraintsForWorker.component'
import { WorkersComponent } from '../components/workers/workers.component';
import { WorkersRequestsComponent } from '../components/workersRequests/workersRequests.component';
import { CalendarBoardComponent } from '../components/calendarBoard/calendarBoard.component';
import { StatisticsComponent } from '../components/statistics/statistics.component';
import { RegistrationComponent } from '../components/registration/registration.component';
import { NewUserRoleComponent } from '../components/newUserRole/newUserRole.component';
import { NewBusinessComponent } from '../components/newUserRole/newBusiness/newBusiness.component';
import { WorkerComponent } from '../components/newUserRole/worker/worker.component';
import { WorkerWaitComponent } from '../components/newUserRole/workerWait/workerWait.component';
import {AuthGuard,LoginGuard, WorkerGuard, ManagerGuard} from '../guards/auth/auth.guard';
import { StatelessUserGuard, WaitUserGuard, StateUserGuard } from '../guards/userRole/userRole.guard';

const routes: Routes = [
    {
        path: '', component: MainComponent, canActivate: [AuthGuard, StateUserGuard],
        children: [
            { path: '', component: HomeComponent },
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
    { path: 'workerWait', component: WorkerWaitComponent, canActivate: [WaitUserGuard] },
    {
        path: 'workerPages', component: MainComponent, canActivate: [WorkerGuard],
        children: [
            { path: 'constraintsForWorker', component: ConstraintsForWorkerComponent }
        ]
    },
    {
        path: 'managerPages', component: MainComponent, canActivate: [ManagerGuard],
        children: [
            { path: 'constraints', component: ConstraintsComponent },
            { path: 'statistics', component: StatisticsComponent },
            {
                path: 'workers',
                children: [
                    { path: '', component: WorkersComponent },
                    { path: 'requests', component: WorkersRequestsComponent }
                        ]
            },
            { path: 'calendarBoard', component: CalendarBoardComponent },
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