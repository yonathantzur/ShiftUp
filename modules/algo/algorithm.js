let { PythonShell } = require('python-shell');

const DAL = require('../DAL');
const config = require('../../config');

const businessesCollectionName = config.db.collections.businesses;
const constraintsCollectionName = config.db.collections.constraints;

let self = module.exports = {
    // Run algorithm with array of arguments strings.
    Run(args) {
        return new Promise((resolve, reject) => {
            PythonShell.run(__dirname + '/algo.py',
                { args },
                (err, results) => {
                    err ? reject(err) : resolve(JSON.parse(results[0]));
                });
        });
    },

    GetShiftsSchedule(businessId, year, month) {
        // Parse the year and month of the schedule to integer.
        year = parseInt(year);
        month = parseInt(month);

        return new Promise((resolve, reject) => {
            // Get all workers ids of the business workers.
            self.GetBusinessWorkersIds(businessId).then(workersObjIds => {
                // Build data queries array.
                let dataQueries = [
                    self.GetWorkersConstraints(workersObjIds, year, month),
                    self.GetBusinessWorkersPerShift(businessId)
                ];

                // Run the queries.
                Promise.all(dataQueries).then(results => {
                    // Get business workers constraints for the data range,
                    // and convert constraints userObjId to string.
                    let constraints = results[0].map(constrain => {
                        constrain.userObjId = constrain.userObjId.toString();
                        return constrain;
                    });

                    // Get array of workers amount per shift (per day).
                    // For example: [4, 6] means that for the first shift,
                    // needed 4 workers and 6 workers for the second shift.
                    let workersPerShift = results[1];

                    // Get days amount for month.
                    let daysInMonth = self.DaysInMonth(year, month);

                    // Convert each workerId to string.
                    let workersIds = workersObjIds.map(objId => {
                        return objId.toString();
                    });

                    let shiftsRequests =
                        self.BuildShiftsRequestsObj(workersIds, daysInMonth, workersPerShift.length);

                    shiftsRequests =
                        self.AssignWorkersConstraints(workersIds, constraints, shiftsRequests, month);

                    self.Run([
                        JSON.stringify(shiftsRequests),
                        JSON.stringify(workersPerShift)
                    ]).then(shifts => {
                        resolve({
                            "workersIds": workersObjIds,
                            "shifts": shifts
                        });
                    });
                });

            }).catch(reject);
        });
    },

    // Get business workers constraints that begin from the asked year and month.
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
                    shifts: "$shifts",
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
                    shifts: "$shifts",
                    startYear: "$startYear",
                    startMonth: "$startMonth",
                    endYear: "$endYear",
                    endMonth: "$endMonth",
                    isStartYearInRange: {
                        $lte: ["$startYear", year],
                    },
                    isEndYearInRange: {
                        $gte: ["$endYear", year]
                    },
                    isStartMonthInRange: {
                        $lte: ["$startMonth", month]
                    },
                    isEndMonthInRange: {
                        $gte: ["$endMonth", month]
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
                    endDate: "$endDate",
                    shifts: "$shifts",
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
                    resolve(self.ShuffleArray(businessWorkers.workers));
                }).catch(reject);
        });
    },

    ShuffleArray(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    },

    GetBusinessWorkersPerShift(businessId) {
        return new Promise((resolve, reject) => {
            let businessFilter = { "_id": DAL.GetObjectId(businessId) };
            let fields = {
                "_id": 0,
                "shifts.workersAmount": 1
            }

            DAL.FindOneSpecific(businessesCollectionName, businessFilter, fields)
                .then(shiftsWorkersAmount => {
                    resolve(shiftsWorkersAmount.shifts.map(shift => {
                        return shift.workersAmount;
                    }));
                }).catch(reject);
        });
    },

    // Get days amount in month.
    DaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    },

    // Create the workers shift requests object.
    // This function returns object (3D matrix) with no workers constraints.
    BuildShiftsRequestsObj(workersIds, daysInMonth, dayShiftsAmount) {
        let shiftsRequests = [];
        let days;
        let shiftsReq;

        for (let i = 0; i < workersIds.length; i++) {
            days = [];
            for (let j = 0; j < daysInMonth; j++) {
                shiftsReq = [];

                for (let k = 0; k < dayShiftsAmount; k++) {
                    shiftsReq.push(1);
                }

                days.push(shiftsReq);
            }

            shiftsRequests.push(days);
        }

        return shiftsRequests;
    },

    // Create the workers shift requests object.
    // Each worker can request to be assigned to specific shifts.
    // For example -
    // 5 workers (first dimension) || for 7 days (second dimension) || 3 shifts per day (third dimension)
    //                   [[[1, 0, 1], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 1],
    //                    [0, 1, 0], [0, 0, 1]],
    //                   [[1, 0, 0], [0, 0, 0], [0, 1, 0], [0, 1, 0], [1, 0, 0],
    //                    [1, 0, 1], [0, 0, 1]],
    //                   [[0, 1, 0], [0, 1, 0], [0, 0, 0], [1, 0, 0], [0, 0, 0],
    //                    [0, 1, 0], [1, 0, 0]],
    //                   [[0, 0, 1], [0, 0, 1], [1, 0, 0], [0, 1, 0], [0, 0, 0],
    //                    [1, 0, 0], [0, 0, 0]],
    //                   [[0, 0, 1], [1, 0, 1], [0, 1, 0], [0, 1, 0], [1, 0, 0],
    //                    [0, 1, 0], [0, 0, 0]]]
    AssignWorkersConstraints(workersIds, constraints, shiftsRequests, scheduleMonth) {
        constraints.forEach(constrain => {
            let workerPosition = workersIds.indexOf(constrain.userObjId);
            let constrainStartDate = constrain.startDate;
            let constrainEndDate = constrain.endDate;

            // Running on all dates in the constraint range.
            for (let dateInRange = constrainStartDate;
                dateInRange <= constrainEndDate && (dateInRange.getMonth() + 1 == scheduleMonth);
                dateInRange.setDate(dateInRange.getDate() + 1)) {
                let constraintDay = dateInRange.getDate();

                constrain.shifts.forEach((shift, index) => {
                    if (shift.isChecked) {
                        shiftsRequests[workerPosition][constraintDay - 1][index] = 0;
                    }
                });
            }

        });

        return shiftsRequests;
    }
}