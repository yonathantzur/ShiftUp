const DAL = require('../DAL');
const config = require('../../config');
const Hash = require('../libs/hash');
const JWT = require('../libs/jwt');

const usersCollectionName = config.db.collections.users;
const businessesCollectionName = config.db.collections.businesses;

module.exports = {
    UserLogin: (userData) => {
        return new Promise((resolve, reject) => {
            DAL.FindOne(usersCollectionName, { email: userData.email })
                .then((user) => {
                    if (user && user.password === Hash.hash(userData.password, user.salt).hash) {
                        const token = JWT.sign(getTokenObjectFromUser(user), config.jwt.options);
                        resolve(token);
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
            userStateFilter = { $or: [{ "managers": userObjId }, { "workers": userObjId }] };
            DAL.Count(businessesCollectionName, userStateFilter).then(amount => {
                resolve(amount == 0);
            }).catch(reject);
        });
    }

};

function getTokenObjectFromUser(user) {
    return {
        "id": user._id,
        "email": user.email,
        "firstName": user.firstName,
        "lastName": user.lastName
    }
}