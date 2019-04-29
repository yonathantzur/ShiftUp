import { BasicService } from '../basic/basic.service';

export class UsersService extends BasicService {
    prefix = "/api/users";

    GetAllUsers() {
        return super.get(this.prefix + '/getAllUsers')
            .toPromise()
            .then((result: any) => result)
            .catch((err: any) =>  null);
    }

    GetUserById(userObjId: string) {
        return super.get(this.prefix + '/getUserById?userObjId=' + userObjId)
            .toPromise()
            .then((result: any) => result)
            .catch((err: any) => null);
    }

    GetUserByUserId(userId: string) {
        return super.get(this.prefix + '/GetUserByUserId?userId=' + userId)
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