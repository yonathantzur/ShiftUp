const DAL = require('../DAL');
const config = require('../../config');

const constraintsCollectionName = config.db.collections.constraints;

module.exports = {
    getAllConstraints() {
        return new Promise((resolve, reject) => {
            DAL.Find(constraintsCollectionName)
                .then(data => resolve(data))
                .catch(reject);
        });
    },
};