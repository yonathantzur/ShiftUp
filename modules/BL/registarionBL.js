const DAL = require('../DAL');
const config = require('../../config');
const Hash = require('../libs/hash');
const tokenHandler = require('../handlers/tokenHandler');

const usersCollectionName = config.db.collections.users;

module.exports = {
    register: (userData) => {
        return new Promise((resolve, reject) => {
            DAL.FindOne(usersCollectionName, { email: userData.email })
                .then((user) => {
                    if (!user) {
                        const hashed = Hash.hash(userData.password);
                        userData.password = hashed.hash;
                        userData.salt = hashed.salt;
                        DAL.Insert(usersCollectionName, userData).then((userId) => {
                            if (userId) {
                                userData.userId = userId;
                                const token = tokenHandler.getToken(userData);
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