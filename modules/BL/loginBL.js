const DAL = require('../DAL');
const config = require('../../config');
const Hash = require('../libs/hash');
const tokenHandler = require('../handlers/tokenHandler');

const usersCollectionName = config.db.collections.users;

module.exports = {
    UserLogin: (userData) => {
        return new Promise((resolve, reject) => {
            DAL.FindOne(usersCollectionName, { email: userData.email })
                .then((user) => {
                    if (user && user.password === Hash.hash(userData.password, user.salt).hash) {
                        resolve(tokenHandler.getToken(user));
                    }
                    else {
                        resolve(false);
                    }
                }).catch(reject);
        });
    },

    IsUserStateless(userId) {
        return new Promise((resolve, reject) => {
            userObjId = DAL.GetObjectId(userId);
            userStateFilter = { "_id": userObjId, "businessId": { $ne: null } };
            DAL.Count(usersCollectionName, userStateFilter).then(amount => {
                resolve(amount == 0);
            }).catch(reject);
        });
    },

    GetUserById(id) {
        return new Promise((resolve, reject) => {
            DAL.FindOne(usersCollectionName, { _id: DAL.GetObjectId(id) }).then(resolve).catch(reject);
        });
    },

};