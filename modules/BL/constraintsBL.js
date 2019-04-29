const DAL = require('../DAL');
const usersBL = require('../BL/usersBL');
const config = require('../../config');
const token = require('../handlers/tokenHandler');

const constraintsCollectionName = config.db.collections.constraints;

module.exports = {
    getAllConstraints(req) {
        let userToken = (token.getUserFromToken(req));
        let query;
        if (userToken.isManager) {
            query = [
                {
                    $lookup:
                        {
                            from: 'Users',
                            localField: 'userId',
                            foreignField: 'userId',
                            as: 'user',
                        }
                },
                {$match: {'bussinessId': userToken.bussinessid}},
                {
                    $lookup: {
                        from: "StatusType",
                        localField: "statusId",
                        foreignField: "statusId",
                        as: "status"
                    }
                }];
        } else {
            query = [
                {
                    $lookup:
                        {
                            from: 'Users',
                            localField: 'userId',
                            foreignField: 'userId',
                            as: 'user',
                        }
                },
                {$match: {'userId': userToken.userId}},
                {
                    $lookup: {
                        from: "StatusType",
                        localField: "statusId",
                        foreignField: "statusId",
                        as: "status"
                    }
                }];
        }
        return new Promise((resolve, reject) => {
            DAL.Aggregate(constraintsCollectionName, query)
                .then(data => resolve(data))
                .catch(reject);
        });
    },

    DeleteConstraint(conObjId) {
        return new Promise((resolve, reject) => {
            DAL.DeleteOne(constraintsCollectionName, {_id: DAL.GetObjectId(conObjId)})
                .then(data => resolve(data))
                .catch(reject);
        });
    },

    ApproveConstraint(conObjId) {
        return new Promise((resolve, reject) => {
            DAL.UpdateOne(constraintsCollectionName, {
                _id: DAL.GetObjectId(conObjId)
            }, {
                $set: {
                    statusId: "0"
                }
            })
                .then(data => resolve(data))
                .catch(reject);
        });
    },

    RefuseConstraint(conObjId) {
        return new Promise((resolve, reject) => {
            DAL.UpdateOne(constraintsCollectionName, {
                _id: DAL.GetObjectId(conObjId)
            }, {
                $set: {
                    statusId: "1"
                }
            })
                .then(data => resolve(data))
                .catch(reject);
        });
    }
};