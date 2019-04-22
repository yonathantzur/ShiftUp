import { BasicService } from '../basic/basic.service';

export class ShiftService extends BasicService {
    prefix = "/api/shifts";

    GetShiftsForBusiness(year: number, month: number) {
        return super.get(this.prefix + '/getShiftsForBusiness?year=' + year + '&month=' + month)
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }

    GetMyShiftsForBusiness(year: number, month: number) {
        return super.get(this.prefix + '/getMyShiftsForBusiness?year=' + year + '&month=' + month)
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }

    GetShiftsWorkers(shiftsData: Array<any>) {
        let data = { shiftsData };

        return super.post(this.prefix + '/getShiftsWorkers', data)
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }

}