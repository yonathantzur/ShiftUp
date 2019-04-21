const DAL = require('../DAL');
const config = require('../../config');

const usersCollectionName = config.db.collections.users;
const shiftsCollectionName = config.db.collections.shifts;

module.exports = {

    GetShiftsForBusiness(businessId, year, month) {
        return new Promise((resolve, reject) => {

            if (month < 10) {
                month = "0" + month;
            }

            let findFilter = {
                "businessId": DAL.GetObjectId(businessId),
                "date": new RegExp(year + "-" + month + "-.*")
            };

            DAL.Find(shiftsCollectionName, findFilter).then(resolve).catch(reject);
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