const DAL = require('../DAL');
const businessesBL = require('../BL/businessesBL');
const config = require('../../config');

const usersCollectionName = config.db.collections.users;
const shiftsCollectionName = config.db.collections.shifts;
const businessesCollectionName = config.db.collections.businesses;
const constraintsCollectionName = config.db.collections.constraints;

let self = module.exports = {
    GetShiftsSchedule(businessId, year, month) {
        return new Promise((resolve, reject) => {
            // TODO: Implement auto schedule

            businessesBL.GetWorkersForBusiness(businessId).then(workersIds => {

                self.GetWorkersConstraints(workersIds, year, month).then(constraints => {

                });

            }).catch(reject);

            resolve(true);
        });
    },

    GetWorkersConstraints(workersIds, year, month) {
        return new Promise((resolve, reject) => {
            let constraintsWorkersFilter = {
                $match: {
                    "userObjId": { $in: workersIds },
                    "statusId": "0"
                }
            }

            let projectObj = {
                $project: {
                    userObjId: "$userObjId",
                    startYear: { $year: "$startDate" },
                    startMonth: { $month: "$startDate" },
                    endYear: { $year: "$endDate" },
                    endMonth: { $month: "$endDate" }
                }
            }

            let constraintsTimeFilter = {
                $match: {
                    "startYear": parseInt(year),
                    "startMonth": parseInt(month)
                }
            }

            let aggregate = [constraintsWorkersFilter, projectObj, constraintsTimeFilter];

            DAL.Aggregate(constraintsCollectionName, aggregate).then(resolve).catch(reject);
        });
    }
};