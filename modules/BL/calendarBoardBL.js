const algo = require('../algo/algorithm');
const config = require('../../config');

let self = module.exports = {
    GetShiftsSchedule(businessId, year, month) {
        return new Promise((resolve, reject) => {
            algo.GetShiftsSchedule(businessId, year, month).then(result => {
                let shiftsObjects =
                    self.BuildShifts(businessId, year, month, result.workersIds, result.shifts)
            }).catch(reject);
        });
    },

    BuildShifts(businessId, year, month, workersIds, shifts) {

    }
};