const DAL = require('../DAL');
const config = require('../../config');

const usersCollectionName = config.db.collections.users;
const businessCollectionName = config.db.collections.businesses;

module.exports = {

    GetAllUsers() {
        return new Promise((resolve, reject) => {
            DAL.Find(usersCollectionName)
                .then(users => resolve(users))
                .catch(reject);
        });
    },

    GetUserById(userObjId) {
        return new Promise((resolve, reject) => {
            DAL.FindOne(usersCollectionName, {_id: userObjId})
                .then(user => resolve(user))
                .catch(reject);
        });
    },

    GetUserByUserId(userId) {
        return new Promise((resolve, reject) => {
            DAL.FindOne(usersCollectionName, {userId: userId})
                .then(user => resolve(user))
                .catch(reject);
        });
    },

    IsUserAvailableForBusiness(userId, managerBusinessId) {
        return new Promise((resolve, reject) => {
            DAL.FindOne(usersCollectionName, {userId: userId})
                .then(user => resolve(user.waitBusinessId == managerBusinessId))
                .catch(e => resolve(false));
        });
    }

};