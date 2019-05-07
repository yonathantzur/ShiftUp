const algo = require('../algo/algorithm');
const config = require('../../config');
const DAL = require('../DAL');
const businessesBL = require('../BL/businessesBL');

const shiftsCollectionName = config.db.collections.shifts;

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

                DAL.InsertMany(shiftsCollectionName, shiftsObjects).then(resolve).catch(reject);
            }).catch(reject);
        });
    },


    BuildShifts(businessId, year, month, workersIds, businessShiftsNames, shifts) {
        let numWorkers = shifts.length;
        let numDays = shifts[0].length;
        let numShifts = shifts[0][0].length;

        let shiftDate = new Date(year + "-" + month + "-" + 1);
        let shiftsObjects = [];

        for (let i = 0; i < numDays; i++) {
            let shift = {
                "businessId": DAL.GetObjectId(businessId),
                "date": self.FormatDateToString(shiftDate),
                "shiftsData": []
            }

            for (let j = 0; j < numShifts; j++) {
                let shiftData = {
                    "name": businessShiftsNames[j],
                    "workers": []
                }

                for (k = 0; k < numWorkers; k++) {
                    if (shifts[k][i][j] == 1) {
                        shiftData.workers.push(workersIds[k]);
                    }
                }

                shift.shiftsData.push(shiftData);
            }

            shiftsObjects.push(shift);

            // Increase date by one day.
            shiftDate.setDate(shiftDate.getDate() + 1)
        }

        return shiftsObjects;
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