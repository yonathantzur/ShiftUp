import { BasicService } from '../basic/basic.service';

export class BusinessesService extends BasicService {
    prefix = "/businesses";

    GetLoggedInBusiness() {
        return super.get(this.prefix + '/getLoggedInBusiness')
            .toPromise()
            .then((result: any) => result)
            .catch((err: any) => null);
    }

    GetWorkersForBusiness() {
        return super.get(this.prefix + '/getWorkersForBusiness')
            .toPromise()
            .then((result: any) => result)
            .catch((err: any) => null);
    }

}