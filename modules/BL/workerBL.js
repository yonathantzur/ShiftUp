const DAL = require('../DAL');
const config = require('../../config');

const businessesCollectionName = config.db.collections.businesses;
const usersCollectionName = config.db.collections.users;

module.exports = {
    GetBusinessByCode(businessCode) {
        return new Promise((resolve, reject) => {
            businessCode = parseInt(businessCode);
            let queryObj = { businessCode };
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

    SendWorkerRequest(worker, managerId, businessId) {
        return new Promise((resolve, reject) => {
            let managerFindObj = { "_id": DAL.GetObjectId(managerId) };
            let managerUpdateObj = { $push: { "requests": DAL.GetObjectId(worker.id) } }
            let wokrkerFindObj = { "_id": DAL.GetObjectId(worker.id) };
            let wokrkerUpdateObj = { $set: { "waitBusinessId": DAL.GetObjectId(businessId) } };

            let updateManager = DAL.UpdateOne(usersCollectionName, managerFindObj, managerUpdateObj);
            let updateWorker = DAL.UpdateOne(usersCollectionName, wokrkerFindObj, wokrkerUpdateObj);

            Promise.all([updateManager, updateWorker]).then(results => {
                resolve(true);
            }).catch(reject);
        });
    }
};