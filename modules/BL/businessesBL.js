const DAL = require('../DAL');
const config = require('../../config');
const usersBL = require('./usersBL');

const businessCollectionName = config.db.collections.businesses;
const usersCollectionName = config.db.collections.users;

module.exports = {

    GetBusinessById(businessId) {
        return new Promise((resolve, reject) => {
            DAL.FindOne(businessCollectionName, { _id: DAL.GetObjectId(businessId) })
                .then(business => resolve(business))
                .catch(reject);
        });
    },

    GetWorkersForBusiness(businessId) {
        return new Promise((resolve, reject) => {
            DAL.FindOne(businessCollectionName, { _id: DAL.GetObjectId(businessId) })
                .then(business => {
                    DAL.FindSpecific(usersCollectionName, { _id: { $in: business.workers } })
                        .then(workers => resolve(workers))
                        .catch(reject);
                })
                .catch(reject);
        });
    }

};