const DAL = require('../DAL');
const businessesBL = require('../BL/businessesBL');
const config = require('../../config');

const usersCollectionName = config.db.collections.users;
const shiftsCollectionName = config.db.collections.shifts;

let self = module.exports = {

    GetShiftsForBusiness(businessId, year, month, userId) {
        return new Promise((resolve, reject) => {

            if (month < 10) {
                month = "0" + month;
            }

            let findFilter = {
                "businessId": DAL.GetObjectId(businessId),
                "date": new RegExp(year + "-" + month + "-.*")
            };

            if (userId) {
                findFilter["shiftsData.workers"] = DAL.GetObjectId(userId);
            }

            DAL.Find(shiftsCollectionName, findFilter).then(resolve).catch(reject);
        });
    },

    RemoveShiftsForBusiness(businessId, year, month) {
        return new Promise((resolve, reject) => {

            if (month < 10) {
                month = "0" + month;
            }

            let findFilter = {
                "businessId": DAL.GetObjectId(businessId),
                "date": new RegExp(year + "-" + month + "-.*")
            };

            DAL.Delete(shiftsCollectionName, findFilter).then(resolve).catch(reject);
        });
    },

    GetShiftsWorkers(shiftsData) {
        return new Promise((resolve, reject) => {
            let ids = [];

            shiftsData.forEach(shift => {
                ids = ids.concat(shift.workers);
            });

            ids = ids.map(id => {
                return DAL.GetObjectId(id);
            })

            let findFilter = {
                _id: { $in: ids }
            }

            let fieldsFilter = { "firstName": 1, "lastName": 1 };

            DAL.FindSpecific(usersCollectionName, findFilter, fieldsFilter).then(workers => {
                shiftsData.forEach(shift => {
                    shift.workers = shift.workers.map(workerId => {
                        return getWorkerById(workerId, workers);
                    });
                });

                resolve(shiftsData);
            }).catch(reject);

        });
    },

    GetEventDetails(event, businessId) {
        return new Promise((resolve, reject) => {
            self.GetShiftsWorkers(event.shiftsData).then(shiftsData => {
                event.shiftsData = shiftsData;

                businessesBL.GetWorkersForBusiness(businessId).then(workers => {
                    workers = workers.map(worker => {
                        return {
                            "_id": worker._id,
                            "firstName": worker.firstName,
                            "lastName": worker.lastName
                        }
                    })

                    event.businessId = businessId;
                    event.businessWorkers = workers;

                    resolve(event);
                });
            }).catch(reject);
        });
    },

    UpdateEventShifts(shiftId, shiftsData) {
        return new Promise((resolve, reject) => {
            // Remove workers name from shifts workers.
            shiftsData = shiftsData.map(shift => {
                return {
                    "name": shift.name,
                    "workers": shift.workers.map(worker => {
                        return DAL.GetObjectId(worker._id);
                    })
                }
            });

            let shiftFilter = { "_id": DAL.GetObjectId(shiftId) };
            let updateShiftDataQuery = {
                $set: {
                    "shiftsData": shiftsData
                }
            }

            DAL.UpdateOne(shiftsCollectionName, shiftFilter, updateShiftDataQuery).then(() => {
                resolve(true);
            }).catch(reject);
        });
    }

};

function getWorkerById(workerId, workers) {
    for (let i = 0; i < workers.length; i++) {
        if (workers[i]._id.toString() == workerId) {
            return workers[i];
        }
    }

    return null;
}