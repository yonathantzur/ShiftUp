import {BasicService} from '../basic/basic.service';
import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UsersService extends BasicService {
    prefix = "/api/users";

    GetAllUsers() {
        return super.get(this.prefix + '/getAllUsers')
            .toPromise()
            .then((result: any) => result)
            .catch((err: any) => null);
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


    GetLoggedInUser() {
        return super.get(this.prefix + '/getLoggedInUser')
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

    isLoginUserManager() {
        return super.get(this.prefix + '/isLoginUserManager')
            .toPromise()
            .then((result: any) => result)
            .catch((err: any) => null);
    }

    GetUsersRequestedToBusiness() {
        return super.get(this.prefix + '/getUsersRequestedToBusiness')
            .toPromise()
            .then((result: any) => result)
            .catch((err: any) => null);
    }
}