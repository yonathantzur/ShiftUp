import { BasicService } from '../basic/basic.service';
import { Injectable } from "@angular/core";

@Injectable()
export class WorkersService extends BasicService {
    prefix = "/api/workers";

    AddWorkerToBusiness(userId: string, salary: number) {
        return super.post(this.prefix + '/addWorkerToBusiness', { userId, salary })
            .toPromise()
            .then((result: any) => result)
            .catch((err: any) => null);
    }

    DenyWorkerRequest(worker_id: string) {
        return super.post(this.prefix + '/denyWorkerRequest', { worker_id })
            .toPromise()
            .then((result: any) => result)
            .catch((err: any) => null);
    }

    RemoveWorkerFromBusiness(userId: string) {
        return super.post(this.prefix + '/removeWorkerFromBusiness', { userId })
            .toPromise()
            .then((result: any) => result)
            .catch((err: any) => null);
    }

    RemoveAllWorkersFromBusiness() {
        return super.post(this.prefix + '/removeAllWorkersFromBusiness')
            .toPromise()
            .then((result: any) => result)
            .catch((err: any) => null)
    }

    GetBusinessByCode(businessCode: number) {
        return super.get(this.prefix + '/getBusinessByCode?businessCode=' + businessCode)
            .toPromise()
            .then((result: any) => result)
            .catch((err: any) => null);
    }

    SendWorkerRequest(businessId: string, managerId: string) {
        return super.post(this.prefix + '/sendWorkerRequest', { businessId, managerId })
            .toPromise()
            .then((result: any) => result)
            .catch((err: any) => null);
    }

    GetWaitBusinessDetails() {
        return super.get(this.prefix + '/getWaitBusinessDetails')
            .toPromise()
            .then((result: any) => result)
            .catch((err: any) => null);
    }

    CancelBusinessRequest() {
        return super.delete(this.prefix + '/cancelBusinessRequest')
            .toPromise()
            .then((result: any) => result)
            .catch((err: any) => null);
    }

    GetWorkersAverageAge() {
        return super.get(this.prefix + '/getWorkersAverageAge')
            .toPromise()
            .then((result: any) => result.averageAge)
            .catch((err: any) => null);
    }

    GetWorkersGroupByAgesDecades() {
        return super.get(this.prefix + '/getWorkersGroupByAgesDecades')
            .toPromise()
            .then((result: any) => result)
            .catch((err: any) => null);
    }
}