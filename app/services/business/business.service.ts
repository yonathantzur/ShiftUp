import { BasicService } from '../basic/basic.service';
import { Business } from '../../components/newUser/newBusiness/newBusiness.component';

export class BusinessService extends BasicService {
    prefix = "/api/business";

    AddBusiness(business: Business) {
        return super.post(this.prefix + '/addBusiness', business)
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }

}