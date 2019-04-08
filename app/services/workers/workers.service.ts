import { BasicService } from '../basic/basic.service';

export class WorkersService extends BasicService {
    prefix = "/api/workers";

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

    GetBusinessByCode(businessCode: number) {
        return super.get(this.prefix + '/getBusinessByCode?businessCode=' + businessCode)
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }

    SendWorkerRequest(businessId: string, managerId: string) {
        return super.post(this.prefix + '/sendWorkerRequest', { businessId, managerId })
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }

    GetWaitBusinessDetails() {
        return super.get(this.prefix + '/getWaitBusinessDetails')
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }

}