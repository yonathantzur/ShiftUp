import { BasicService } from '../basic/basic.service';

export class UsersService extends BasicService {
    prefix = "/api/users";

    GetAllUsers() {
        return super.get(this.prefix + '/getAllUsers')
            .toPromise()
            .then((result: any) => result)
            .catch((err: any) =>  null);
    }

    GetUserById(_id: string) {
        return super.get(this.prefix + '/getUserById?id=' + _id)
            .toPromise()
            .then((result: any) => result)
            .catch((err: any) => null);
    }

    GetUserByUserId(userId: string) {
        return super.get(this.prefix + '/getUserByUserId?userId=' + userId)
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

    GetUsersRequestedToBusiness() {
        return super.get(this.prefix + '/getUsersRequestedToBusiness')
            .toPromise()
            .then((result: any) => result)
            .catch((err: any) => null);
    }
}