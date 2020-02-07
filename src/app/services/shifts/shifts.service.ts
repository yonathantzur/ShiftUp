import { BasicService } from '../basic/basic.service';
import { SHIFTS_FILTER } from '../../enums/enums';
import { Injectable } from "@angular/core";

@Injectable()
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

    GetEventDetails(event: any) {
        return super.post(this.prefix + '/getEventDetails', event)
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }

    UpdateEventShifts(shiftId: string, shiftsData: Array<any>) {
        let data = { shiftId, shiftsData };

        return super.post(this.prefix + '/updateEventShifts', data)
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }

    DeleteEvent(shiftId: string) {
        return super.delete(this.prefix + '/deleteEvent?eventId=' + shiftId)
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }

    GetMonthlyShiftsForExport(year: number, month: number, viewState: SHIFTS_FILTER) {
        return super.get(this.prefix +
            '/getMonthlyShiftsForExport?year=' + year + '&month=' + month + '&viewState=' + viewState)
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }

}