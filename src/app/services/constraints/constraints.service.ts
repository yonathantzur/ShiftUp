import { Injectable } from '@angular/core';
import { BasicService } from '../basic/basic.service';


@Injectable({ providedIn: 'root' })
export class ConstraintsService extends BasicService {
    prefix = "/api/constraints";

    getAllConstraints(sortCol: string, sortDirection: number) {
        let data = { sortCol, sortDirection };

        return super.post(this.prefix + "/getAllConstraints", data)
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }

    DeleteConstraint(conObjId: string) {
        return super.get(this.prefix + "/DeleteConstraint?conObjId=" + conObjId)
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }

    AddConstraint(conData: any) {
        return super.post(this.prefix + "/AddConstraint", conData)
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }

    getAllConstraintReasons() {
        return super.get(this.prefix + "/getAllConstraintReasons")
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }

    ApproveConstraint(conObjId: string) {
        return super.get(this.prefix + "/ApproveConstraint?conObjId=" + conObjId)
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }

    RefuseConstraint(conObjId: string) {
        return super.get(this.prefix + "/RefuseConstraint?conObjId=" + conObjId)
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }

    GetUserConstraints(year: number, month: number) {
        return super.get(this.prefix + "/getUserConstraints?year=" + year + "&month=" + month)
            .toPromise()
            .then((result: any) => {
                return result;
            })
            .catch((e: any) => {
                return null;
            });
    }
}