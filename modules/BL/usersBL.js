const DAL = require('../DAL');
const config = require('../../config');

const usersCollectionName = config.db.collections.users;

module.exports = {

    IsUserAvailableForBusiness(userId, managerBusinessId) {
        return new Promise((resolve, reject) => {
            DAL.FindOne(usersCollectionName, { userId: userId })
                .then(user => resolve(user.waitBusinessId == managerBusinessId))
                .catch(e => resolve(false));
        });
    },

    GetUsersRequestedToBusiness(managerUserId) {
        return new Promise((resolve, reject) => {
            DAL.FindOne(usersCollectionName, { userId: managerUserId })
                .then(user => {
                    DAL.FindSpecific(usersCollectionName, { _id: { $in: user.requests } })
                        .then(usersRequests => resolve(usersRequests))
                        .catch(reject);
                }).catch(reject);
        });
    }

};