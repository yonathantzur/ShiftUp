import { Injectable } from '@angular/core';
import { BasicService } from '../basic/basic.service';

@Injectable({ providedIn: 'root' })
export class registrationService extends BasicService {
    prefix = "/api/registration";

    register(user: any) {
        return super.post(this.prefix + "/register", user)
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }
}