import { Injectable } from '@angular/core';
import { BasicService } from '../basic/basic.service';

@Injectable({ providedIn: 'root' })
export class LoginService extends BasicService {
    prefix = "/api/login";

    UserLogin(user: any) {
        return super.post(this.prefix + "/userLogin", user)
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }

    logout() {
        return super.get(this.prefix + "/logout")
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }

    isUserLogin() {
        return super.get(this.prefix + "/isUserLogin")
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }

    // In case the user is not set as a worker or as a manager.
    IsStatelessUser() {
        return super.get(this.prefix + "/isStatelessUser")
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }

    // In case the user is wait for business work approve.
    IsWaitUser() {
        return super.get(this.prefix + "/isWaitUser")
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }
}