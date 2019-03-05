import { Injectable } from '@angular/core';
import { BasicService } from '../basic/basic.service';

@Injectable({ providedIn: 'root' })
export class registrationService extends BasicService {
    prefix = "/registration";

    register(user: any) {
        return super.post(this.prefix + "/api/register", user)
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }
}