import { BasicService } from '../basic/basic.service';

export class UsersService extends BasicService {
    prefix = "/api/users";

    GetAllUsers() {
        return super.get(this.prefix + '/getAllUsers')
            .toPromise()
            .then((result: any) => result)
            .catch((err: any) =>  null);
    }

    GetUserById(userId: string) {
        return super.get(this.prefix + '/getUserByUserId?userId=' + userId)
            .toPromise()
            .then((result: any) => result)
            .catch((err: any) => null);
    }

    IsUserAvailableForBusiness(userId: string) {
        return super.get(this.prefix + '/isUserAvailableForBusiness?userId=' + userId)
            .toPromise()
            .then((result: any) => result)
            .catch((err: any) => null);
    }

}