const DAL = require('../DAL');
const config = require('../../config');
const Hash = require('../libs/hash');
const JWT = require('../libs/jwt');

const usersCollectionName = config.db.collections.users;

module.exports = {
    register: (userData) => {
        return new Promise((resolve, reject) => {
            DAL.FindOne(usersCollectionName, {email: userData.email})
                .then((user) => {
                    if (!user) {
                        const hashed = Hash.hash(userData.password);
                        userData.password = hashed.hash;
                        userData.salt = hashed.salt;
                        DAL.Insert(usersCollectionName, userData).then((userId) => {
                            if (userId) {
                                //userData.userId = userId;
                                const token = JWT.sign(getTokenObjectFromUser(userData), config.jwt.options);
                                resolve(token);
                            }
                            else {
                                reject(null);
                            }
                        }).catch(reject);
                    }
                    else {
                        reject(false);
                    }
                }).catch(reject);
        });
    },
};

function getTokenObjectFromUser(user) {
    return {
        "id": user.userId,
        "email": user.email,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "Id": user.userId,
        "birthDate": user.birthDate
    }
}