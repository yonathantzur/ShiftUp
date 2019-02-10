import { BasicService } from '../basic/basic.service';

export class ShiftService extends BasicService {
    prefix = "/shifts";

    GetAllShiftsForBusiness(year: number, month: number) {
        return super.get(this.prefix + '/getAllShiftsForBusiness?year=' + year + '&month=' + month)
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }

}