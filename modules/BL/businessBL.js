const DAL = require('../DAL');
const config = require('../../config');

const businessesCollectionName = config.db.collections.businesses;
const usersCollectionName = config.db.collections.users;

module.exports = {
    AddBusiness: (userId, business) => {
        return new Promise((resolve, reject) => {
            business.managers = [DAL.GetObjectId(userId)];
            business.workers = [];

            DAL.Insert(businessesCollectionName, business).then(result => {
                resolve(result);
            }).catch(reject);
        });
    },

    AddBusinessToUser(userId, businessId) {
        return new Promise((resolve, reject) => {
            let userFilter = { _id: DAL.GetObjectId(userId) }
            let setObj = { $set: { "businessId": DAL.GetObjectId(businessId) } };
            DAL.UpdateOne(usersCollectionName, userFilter, setObj).then(resolve).catch(reject);
        });
    }

};