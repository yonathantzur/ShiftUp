const DAL = require('../DAL');
const config = require('../../config');

const usersCollectionName = config.db.collections.users;

module.exports = {

    UserLogin() {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

};