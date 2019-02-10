const DAL = require('../DAL');
const config = require('../../config');

const usersCollectionName = config.db.collections.users;
const shiftsCollectionName = config.db.collections.shifts;
const businessesCollectionName = config.db.collections.businesses;

module.exports = {

    GetAllShiftsForBusiness(businessId, year, month) {
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
    }

};