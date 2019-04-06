const DAL = require('../DAL');
const config = require('../../config');

const businessesCollectionName = config.db.collections.businesses;
const usersCollectionName = config.db.collections.users;

module.exports = {
    AddBusiness: (userId, business) => {
        return new Promise((resolve, reject) => {
            business.manager = DAL.GetObjectId(userId);
            business.workers = [];

            let fieldsObj = { "_id": 0, "businessCode": 1 };
            let sortObj = { "businessCode": -1 };

            // Get the max business code.
            DAL.FindSpecific(businessesCollectionName, {}, fieldsObj, sortObj, 1).then(result => {
                let businessCode;

                // In case there are no businesses on DB.
                if (result.length == 0) {
                    businessCode = 100;
                }
                else {
                    businessCode = result[0].businessCode + 1;
                }

                business.businessCode = businessCode;
                DAL.Insert(businessesCollectionName, business).then(businessId => {
                    resolve({ businessId, businessCode });
                });
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