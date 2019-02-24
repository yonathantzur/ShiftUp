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
                            console.log("Insert user id:" + userId);
                            if (userId) {
                                const token = JWT.sign({
                                    i: userId,
                                    s: userData.salt,
                                });

                                resolve({
                                    token: token
                                });
                            }
                            else {
                                reject('error in registration ');
                            }
                        }).catch((err) => {
                            reject(err);
                        })
                    }
                    else {
                        reject('user is already exist');
                    }
                })
                .catch((err) => {
                    reject('error in registration');
                });
        });
    },
};