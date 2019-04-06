import { BasicService } from '../basic/basic.service';

export class WorkerService extends BasicService {
    prefix = "/api/worker";

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

}