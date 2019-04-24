const DAL = require('../DAL');
const config = require('../../config');
const Hash = require('../libs/hash');
const tokenHandler = require('../handlers/tokenHandler');
const mailer = require('../mailer');

const usersCollectionName = config.db.collections.users;

module.exports = {
    register: (userData) => {
        return new Promise((resolve, reject) => {
            DAL.FindOne(usersCollectionName, { $or: [ {email: userData.email}, {userId: userData.userId} ]})
                .then((user) => {
                    if (!user) {
                        const hashed = Hash.hash(userData.password);
                        userData.password = hashed.hash;
                        userData.salt = hashed.salt;
                        userData.birthDate = new Date(userData.birthDate);
                        DAL.Insert(usersCollectionName, userData).then((userId) => {
                            if (userId) {
                                userData.userId = userId;
                                const token = tokenHandler.getToken(userData);
                                resolve(token);
                                mailer.RegisterMail(userData.email, userData.firstName);
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