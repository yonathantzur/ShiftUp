const algo = require('../algo/algorithm');
const config = require('../../config');
const DAL = require('../DAL');
const mailer = require('../mailer');
const businessesBL = require('../BL/businessesBL');
const shiftsBL = require('../BL/shiftsBL');

const shiftsCollectionName = config.db.collections.shifts;
const usersCollectionName = config.db.collections.users;

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

                shiftsBL.RemoveShiftsForBusiness(businessId, year, month).then(removeResult => {
                    DAL.InsertMany(shiftsCollectionName, shiftsObjects).then(insertResult => {
                        resolve(shiftsObjects);
                        self.AlertWorkersWithSchedule(shiftsObjects, scheduleResult.workersIds, month, year);
                    });
                });
            }).catch(reject);
        });
    },

    AlertWorkersWithSchedule(shiftsObjects, workersIds, month, year) {
        let workersFilter = { "_id": { $in: workersIds } };
        let workersFields = { "firstName": 1, "email": 1 };

        let workersObj = {};

        DAL.FindSpecific(usersCollectionName, workersFilter, workersFields).then(workers => {
            workers.forEach(worker => {
                worker.shifts = {};
                workersObj[worker._id.toString()] = worker;
            });

            shiftsObjects.forEach(shiftObj => {
                let shiftsData = shiftObj.shiftsData;

                shiftsData.forEach(shiftData => {
                    shiftData.workers.forEach(workerId => {
                        let workerShifts = workersObj[workerId.toString()]["shifts"];
                        workerShifts[shiftObj.date] = workerShifts[shiftObj.date] || [];

                        workerShifts[shiftObj.date].push(shiftData.name);
                    });
                });
            });
            Object.keys(workersObj).forEach(id => {
                let worker = workersObj[id];

                let workerEmail = worker.email;
                let workerName = worker.firstName;
                let workerShifts = worker.shifts;

                mailer.AlertWorkerWithSchedule(workerEmail, workerName, workerShifts, month, year);

            });
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