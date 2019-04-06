import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs'
import { LoginService } from '../../services/login/login.service';

@Injectable({ providedIn: 'root' })
export class StatelessUserGuard implements CanActivate {
    constructor(private router: Router,
        private loginService: LoginService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return Observable.create((observer: any) => {
            this.loginService.IsStatelessUser().then(result => {
                if (result) {
                    observer.next(true);
                }
                else {
                    this.router.navigateByUrl('/');
                    observer.next(false);
                }
            });
        });
    }
}

@Injectable({ providedIn: 'root' })
export class StateUserGuard implements CanActivate {
    constructor(
        private router: Router,
        private loginService: LoginService,
        private route: ActivatedRoute
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return Observable.create((observer: any) => {
            this.loginService.IsStatelessUser().then(result => {
                if (result) {
                    observer.next(false);
                    this.router.navigateByUrl('/role');
                }
                else {
                    observer.next(true);
                }
            });
        });
    }
}