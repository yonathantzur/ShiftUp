const DAL = require('../DAL');
const config = require('../../config');
const Hash = require('../libs/hash');
const JWT = require('../libs/jwt');

const usersCollectionName = config.db.collections.users;

module.exports = {
    UserLogin: (userData) => {
        return new Promise((resolve, reject) => {
            DAL.FindOne(usersCollectionName, {email: userData.email})
                .then((user) => {
                    if (user instanceof Object && user.salt && user.password === Hash.hash(userData.password, user.salt).hash) {
                        try {
                            const token = JWT.sign({
                                i: user._id,
                                s: user.salt,
                            });
                            // resolve(user);
                            resolve(token);
                        } catch (e) {
                            console.error(e);
                            reject('token generate failed')
                        }
                    } else {
                        reject('user not match the password')
                    }
                })
                .catch((err) => {
                    reject('user not found');
                });
        });
    },

};