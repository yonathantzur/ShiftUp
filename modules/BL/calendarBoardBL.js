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
            self.GetBusinessWorkersIds(businessId).then(workersIds => {

                self.GetWorkersConstraints(workersIds, year, month).then(constraints => {
                    // TODO: Implement auto schedule
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
                    startDate: "$startDate",
                    endDate: "$endDate",
                    startYear: { $year: "$startDate" },
                    startMonth: { $month: "$startDate" },
                    endYear: { $year: "$endDate" },
                    endMonth: { $month: "$endDate" }
                }
            }

            let projectRangeObj = {
                $project: {
                    userObjId: "$userObjId",
                    startDate: "$startDate",
                    endDate: "$endDate",
                    startYear: "$startYear",
                    startMonth: "$startMonth",
                    endYear: "$endYear",
                    endMonth: "$endMonth",
                    isStartYearInRange: {
                        $lte: ["$startYear", parseInt(year)],
                    },
                    isEndYearInRange: {
                        $gte: ["$endYear", parseInt(year)]
                    },
                    isStartMonthInRange: {
                        $lte: ["$startMonth", parseInt(month)]
                    },
                    isEndMonthInRange: {
                        $gte: ["$endMonth", parseInt(month)]
                    }
                }
            }

            let constraintsTimeFilter = {
                $match: {
                    "isStartYearInRange": true,
                    "isEndYearInRange": true,
                    "isStartMonthInRange": true,
                    "isEndMonthInRange": true
                }
            }

            let lastProject = {
                $project: {
                    userObjId: "$userObjId",
                    startDate: "$startDate",
                    endDate: "$endDate"
                }
            }

            let aggregate = [constraintsWorkersFilter, projectObj,
                projectRangeObj, constraintsTimeFilter, lastProject];

            DAL.Aggregate(constraintsCollectionName, aggregate).then(resolve).catch(reject);
        });
    },

    GetBusinessWorkersIds(businessId) {
        return new Promise((resolve, reject) => {
            let businessFilter = { "_id": DAL.GetObjectId(businessId) };
            let fields = {
                "_id": 0,
                "workers": 1
            }

            DAL.FindOneSpecific(businessesCollectionName, businessFilter, fields)
                .then(businessWorkers => {
                    resolve(businessWorkers.workers);
                }).catch(reject);
        });
    }
};