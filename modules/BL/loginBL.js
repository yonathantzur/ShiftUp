const DAL = require('../DAL');
const config = require('../../config');
//const jwt = require('jsonwebtoken');
const Hash = require('../libs/hash');
const JWT = require('../libs/jwt');

const usersCollectionName = config.db.collections.users;

module.exports = {
    UserLogin: (userData) => {
        return new Promise((resolve, reject) => {
            DAL.FindOne(usersCollectionName, {email: userData.email})
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
    }

};

function getTokenObjectFromUser(user) {
    // TODO: get businessId from db according to user
    return {
        "id": user._id,
        "email": user.email,
        "userId": user.userId,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "businessId": "5c605e3f7daa9a69a9107284"
    }
}