import { BasicService } from '../basic/basic.service';
import { Injectable } from "@angular/core";

@Injectable()
export class ScheduleService extends BasicService {
    prefix = "/api/schedule";

    GetShiftsSchedule(year: number, month: number) {
        return super.get(this.prefix + '/getShiftsSchedule?year=' + year + '&month=' + month)
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }
}