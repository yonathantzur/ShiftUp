const algo = require('../algo/algorithm');
const config = require('../../config');
const DAL = require('../DAL');

const businessesBL = require('../BL/businessesBL');

let self = module.exports = {
    GetShiftsSchedule(businessId, year, month) {
        return new Promise((resolve, reject) => {

            Promise.all([
                algo.GetShiftsSchedule(businessId, year, month),
                businessesBL.GetBusinessShiftsNames(businessId)
            ]).then(results => {
                let scheduleResult = results[0];
                let shiftsNames = results[1];

                let shiftsObjects = self.BuildShifts(businessId, year, month,
                    scheduleResult.workersIds, shiftsNames, scheduleResult.shifts);

                resolve(shiftsObjects);
            }).catch(reject);

        });
    },


    BuildShifts(businessId, year, month, workersIds, businessShiftsNames, shifts) {
        let numWorkers = shifts.length;
        let numDays = shifts[0].length;
        let numShifts = shifts[0].length;

        let shiftDate = new Date(year + "-" + month + "-" + 1);
        let result = [];

        for (let i = 0; i < numShifts; i++) {
            let shift = {
                "businessId": businessId,
                "date": self.FormatDateToString(shiftDate),
                "shiftsData": []
            }

            for (let j = 0; j < numShifts; j++) {
                shift.shiftsData.push({
                    "name": businessShiftsNames[j],
                    "workers": []
                });
            }

            result.push(shift);

            // Increase date by one day.
            shiftDate.setDate(shiftDate.getDate() + 1)
        }

        let x = 1;
    },

    FormatDateToString(date) {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        if (day < 10) {
            day = "0" + day;
        }

        if (month < 10) {
            month = "0" + month;
        }

        return (year + "-" + month + "-" + day);
    }
};