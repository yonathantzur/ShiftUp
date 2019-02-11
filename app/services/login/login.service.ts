import { BasicService } from '../basic/basic.service';

export class LoginService extends BasicService {
    prefix = "/login";

    UserLogin(user: any) {

        return super.post(this.prefix + "/api/userLogin", user)
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }
}