const DAL = require('../DAL');
const businessesBL = require('../BL/businessesBL');
const config = require('../../config');

const usersCollectionName = config.db.collections.users;
const shiftsCollectionName = config.db.collections.shifts;

module.exports = {
    GetShiftsSchedule(businessId, year, month) {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }
};