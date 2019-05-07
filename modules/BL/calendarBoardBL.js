const algo = require('../algo/algorithm');
const config = require('../../config');

module.exports = {
    GetShiftsSchedule(businessId, year, month) {
        return new Promise((resolve, reject) => {
            algo.GetShiftsSchedule(businessId, year, month).then(shifts => {
                let x = shifts
            }).catch(reject);
        });
    }
};