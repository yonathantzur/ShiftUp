import { Injectable } from '@angular/core';
import { BasicService } from '../basic/basic.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService extends BasicService {
    prefix = "/login";

    private _currentUserSubject = new BehaviorSubject<any>((localStorage.getItem('currUser')));
    public currentUser = this._currentUserSubject.asObservable();


    get currentUserValue(): any {
        return this._currentUserSubject.value;
    }
    set currentUserValue(user : any){
        this._currentUserSubject.next(user);
    }

    UserLogin(user: any) {
        return super.post(this.prefix + "/api/userLogin", user)
            .toPromise()
            .then((result: any) => {
                localStorage.setItem('currUser', user.email);
              //  localStorage.setItem('currToken', result);
                this.currentUserValue = user.email;
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currUser');
       // localStorage.removeItem('currToken');
        this._currentUserSubject.next(null);
    }
}