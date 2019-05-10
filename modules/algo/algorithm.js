let { PythonShell } = require('python-shell');

const constraintsBL = require('../BL/constraintsBL');
const businessesBL = require('../BL/businessesBL');

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
            businessesBL.GetBusinessWorkersIds(businessId).then(workersObjIds => {
                // Build data queries array.
                let dataQueries = [
                    constraintsBL.GetWorkersConstraints(workersObjIds, year, month),
                    businessesBL.GetBusinessWorkersAmountPerShift(businessId)
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
                    let daysInMonthAmount = self.DaysInMonthAmount(year, month);

                    // Convert each workerId to string.
                    let workersIds = workersObjIds.map(objId => {
                        return objId.toString();
                    });

                    let shiftsRequests =
                        self.BuildShiftsRequestsObj(workersIds, daysInMonthAmount, workersPerShift.length);

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
                    }).catch(reject);
                });

            }).catch(reject);
        });
    },

    // Get days amount in month.
    DaysInMonthAmount(year, month) {
        return new Date(year, month, 0).getDate();
    },

    // Create the workers shift requests object.
    // This function returns object (3D matrix) with no workers constraints.
    BuildShiftsRequestsObj(workersIds, daysInMonthAmount, dayShiftsAmount) {
        let shiftsRequests = [];
        let days;
        let shiftsReq;

        for (let i = 0; i < workersIds.length; i++) {
            days = [];
            for (let j = 0; j < daysInMonthAmount; j++) {
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