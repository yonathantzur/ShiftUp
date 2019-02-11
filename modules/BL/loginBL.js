const DAL = require('../DAL');
const config = require('../../config');

const usersCollectionName = config.db.collections.users;

module.exports = {

    UserLogin(userData) {
        return new Promise((resolve, reject) => {
            console.log(userData);
            DAL.FindOne(usersCollectionName, {email: userData.email})
                .then((user)=>{
                    if (user instanceof Object && user.password === userData.password){
                            resolve(user);
                    } else {
                        reject('user not match the password')
                    }
                })
                .catch((err)=>{
                    reject('user not found');
                });
        });
    }

};