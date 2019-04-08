import {Injectable} from '@angular/core';
import {BasicService} from '../basic/basic.service';


@Injectable({providedIn: 'root'})
export class ConstraintsService extends BasicService {
    prefix = "/api/constraints";

    getAllConstraints() {
        return super.get(this.prefix + "/getAllConstraints")
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }
}