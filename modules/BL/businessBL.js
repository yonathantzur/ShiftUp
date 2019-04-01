const DAL = require('../DAL');
const config = require('../../config');

const collectionName = config.db.collections.businesses;

module.exports = {
    AddBusiness: (business) => {
        return new Promise((resolve, reject) => {
            business.managers = [];
            business.workers = [];

            DAL.Insert(collectionName, business).then(result => {
                resolve(true);
            }).catch(reject);
        });
    }

};