import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../../services/global/global.service';
import { LoginService } from '../../services/login/login.service';
import { UsersService } from '../../services/users/users.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private globalService: GlobalService,
        private loginService: LoginService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return Observable.create((observer: any) => {
            this.loginService.isUserLogin().then(result => {
                if (result) {
                    this.globalService.Initialize();
                    observer.next(true);
                } else {
                    this.router.navigateByUrl('/role');
                    observer.next(false);
                }
            });
        });
    }
}

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
    constructor(
        private router: Router,
        private loginService: LoginService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return Observable.create((observer: any) => {
            this.loginService.isUserLogin().then(result => {
                if (result) {
                    this.router.navigateByUrl('/');
                    observer.next(false);
                } else {
                    observer.next(true);
                }
            });
        });
    }
}

@Injectable({ providedIn: 'root' })
export class WorkerGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UsersService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return Observable.create((observer: any) => {
            this.userService.isLoginUserManager().then(isManager => {
                if (isManager) {
                    this.router.navigateByUrl('/');
                    observer.next(false);
                } else {
                    observer.next(true);
                }
            });
        });
    }
}

@Injectable({ providedIn: 'root' })
export class ManagerGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UsersService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return Observable.create((observer: any) => {
            this.userService.isLoginUserManager().then(isManager => {
                if (!isManager) {
                    this.router.navigateByUrl('/');
                    observer.next(false);
                } else {
                    observer.next(true);
                }
            });
        });
    }
}