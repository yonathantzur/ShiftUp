const DAL = require('../DAL');
const config = require('../../config');

const businessesCollectionName = config.db.collections.businesses;
const usersCollectionName = config.db.collections.users;

module.exports = {

    AddWorkerToBusiness(businessId, userId, salary) {
        return new Promise((resolve, reject) => {

            DAL.UpdateOne(usersCollectionName, { userId: userId }, {
                $set: {
                    businessId: DAL.GetObjectId(businessId),
                    salary: salary
                }
            }).then(user => {
                DAL.UpdateOne(businessesCollectionName, { _id: DAL.GetObjectId(businessId) }, {
                    $push: { workers: user._id }
                }).then(business => resolve(business))
                .catch(reject);
            })
            .catch(reject);
        })
    },

    RemoveWorkerFromBusiness(businessId, userId) {
        return new Promise((resolve, reject) => {

            DAL.UpdateOne(usersCollectionName, { userId: userId }, {
                $unset: {
                    businessId: "",
                    salary: ""
                }
            }).then(user => {
                DAL.UpdateOne(businessesCollectionName, { _id: DAL.GetObjectId(businessId) }, {
                    $pull: { workers: DAL.GetObjectId(user._id) }
                }).then(business => resolve(business))
                .catch(reject);
            })
            .catch(reject);
        })
    }

};