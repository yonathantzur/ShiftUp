const DAL = require('../DAL');
const config = require('../../config');

const collectionName = config.db.collections.businesses;

module.exports = {
    AddBusiness: (business) => {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

};