import { BasicService } from '../basic/basic.service';

export class WorkersService extends BasicService {
    prefix = "/workers";

    AddWorkerToBusiness(userId: string, salary: number) {
        const data = { userId, salary };
        
        return super.post(this.prefix + '/addWorkerToBusiness', data)
            .toPromise()
            .then((result: any) => result)
            .catch((err: any) => null);
    }

    RemoveWorkerFromBusiness(userId: string) {
        const data = { userId };

        return super.post(this.prefix + '/removeWorkerFromBusiness', data)
            .toPromise()
            .then((result: any) => result)
            .catch((err: any) => null);
    }

}