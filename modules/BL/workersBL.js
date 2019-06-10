const DAL = require('../DAL');
const config = require('../../config');

const contsrainstsBL = require('./constraintsBL');

const businessesCollectionName = config.db.collections.businesses;
const usersCollectionName = config.db.collections.users;

let self = module.exports = {
    GetBusinessByCode(businessCode) {
        return self.GetBusinessDetails({ "businessCode": parseInt(businessCode) });
    },

    SendWorkerRequest(worker, managerId, businessId) {
        return new Promise((resolve, reject) => {
            let managerFindObj = { "_id": DAL.GetObjectId(managerId) };
            let managerUpdateObj = { $push: { "requests": DAL.GetObjectId(worker.id) } }
            let workerFindObj = { "_id": DAL.GetObjectId(worker.id) };
            let workerUpdateObj = { $set: { "waitBusinessId": DAL.GetObjectId(businessId) } };

            let updateManager = DAL.UpdateOne(usersCollectionName, managerFindObj, managerUpdateObj);
            let updateWorker = DAL.UpdateOne(usersCollectionName, workerFindObj, workerUpdateObj);

            Promise.all([updateManager, updateWorker]).then(results => {
                resolve(results[1]);
            }).catch(reject);
        });
    },

    GetWaitBusinessDetails(businessId) {
        return self.GetBusinessDetails({ "_id": DAL.GetObjectId(businessId) });
    },

    AddWorkerToBusiness(businessId, userId, salary) {
        return new Promise((resolve, reject) => {
            DAL.UpdateOne(usersCollectionName, { userId: userId }, {
                $set: {
                    businessId: DAL.GetObjectId(businessId),
                    salary: salary
                },
                $unset: {
                    waitBusinessId: 1,
                }
            })
                .then(user => {
                    DAL.Update(usersCollectionName, {}, {
                        $pull: { requests: DAL.GetObjectId(user._id) }
                    }).then(() => {
                        DAL.UpdateOne(businessesCollectionName, { _id: DAL.GetObjectId(businessId) }, {
                            $addToSet: { workers: user._id }
                        }).then(business => resolve(business))
                            .catch(reject);
                    })
                        .catch(reject);
                })
                .catch(reject);
        })
    },

    RemoveWorkerFromBusiness(businessId, userId) {
        return new Promise((resolve, reject) => {

            DAL.UpdateOne(usersCollectionName, { userId: userId }, {
                $unset: {
                    businessId: 1,
                    salary: 1
                }
            }).then(user => {
                DAL.UpdateOne(businessesCollectionName,
                    { _id: DAL.GetObjectId(businessId) },
                    { $pull: { workers: DAL.GetObjectId(user._id) } })
                    .then(business => {
                        contsrainstsBL.DeleteConstraintsByUserId(user._id)
                            .then(data => resolve(data))
                            .catch(reject);
                    })
                    .catch(reject);
            })
                .catch(reject);
        })
    },

    RemoveAllWorkersFromBusiness(businessId) {
        return new Promise((resolve, reject) => {

            DAL.Update(usersCollectionName,
                {
                    $and: [
                        { businessId: DAL.GetObjectId(businessId) },
                        { isManager: false }
                    ]
                },
                {
                    $unset: {
                        businessId: 1,
                        salary: 1
                    }
                }
            ).then(() => {
                DAL.UpdateOne(businessesCollectionName,
                    { _id: DAL.GetObjectId(businessId) },
                    { $set: { workers: [] } })
                    .then(business => {
                        contsrainstsBL.DeleteConstraintsByBusinessId(businessId)
                            .then((data) => resolve(data))
                            .catch(reject);
                    })
                    .catch(reject);
            })
                .catch(reject);
        })
    },

    DenyWorkerRequest(manager_id, worker_id) {
        return new Promise((resolve, reject) => {
            const managerObjId = DAL.GetObjectId(manager_id);
            const workerObjId = DAL.GetObjectId(worker_id)

            DAL.UpdateOne(usersCollectionName, { _id: managerObjId },
                {
                    $pull: { requests: workerObjId }
                })
                .then(manager => {
                    DAL.UpdateOne(usersCollectionName, { _id: workerObjId },
                        {
                            $unset: {
                                waitBusinessId: 1
                            }
                        }
                    ).then(worker => resolve(worker))
                        .catch(reject)
                })
                .catch(reject);
        })
    },

    GetBusinessDetails(queryObj) {
        return new Promise((resolve, reject) => {
            let fieldsName = {
                "name": 1,
                "address": 1,
                "manager": 1
            }

            DAL.FindOneSpecific(businessesCollectionName, queryObj, fieldsName).then(business => {
                if (business) {
                    let managerId = DAL.GetObjectId(business.manager);
                    let managerQueryObj = { _id: managerId };
                    let managerQueryFields = { "firstName": 1, "lastName": 1 };
                    DAL.FindOneSpecific(usersCollectionName, managerQueryObj, managerQueryFields).then(manager => {
                        business.manager = manager;
                        resolve(business);
                    })
                }
                else {
                    resolve(false)
                }
            }).catch(reject);
        });
    },

    CancelBusinessRequest(userId) {
        return new Promise((resolve, reject) => {
            userObjId = DAL.GetObjectId(userId);
            userFilter = { "_id": userObjId };
            userUpdateQuery = { $unset: { "waitBusinessId": 1 } };
            managerRequestUpdateQuery = { $pull: { "requests": userObjId } };

            let userUpdate = DAL.UpdateOne(usersCollectionName, userFilter, userUpdateQuery);
            let managerUpdate = DAL.Update(usersCollectionName, {}, managerRequestUpdateQuery);

            Promise.all([userUpdate, managerUpdate]).then(results => {
                // Resolve the updated user object.
                resolve(results[0]);
            }).catch(reject);
        });
    }
};