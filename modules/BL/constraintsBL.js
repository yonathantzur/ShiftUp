const DAL = require('../DAL');
const config = require('../../config');
const enums = require('../enums');

const constraintsCollectionName = config.db.collections.constraints;
const ConstraintsReasonsCollectionName = config.db.collections.constraintsReasons;

module.exports = {
    getAllConstraints(user) {
        let query;
        if (user.isManager) {
            query = [
                {
                    $lookup:
                        {
                            from: 'Users',
                            localField: 'userObjId',
                            foreignField: '_id',
                            as: 'user',
                        }
                },
                {$match: {'businessId': DAL.GetObjectId(user.businessId)}},
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
                            localField: 'userObjId',
                            foreignField: '_id',
                            as: 'user',
                        }
                },
                {$match: {'userObjId': DAL.GetObjectId(user.id)}},
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

    AddConstraint(conData) {
        let newConstraintDoc = {
            "userObjId": DAL.GetObjectId(conData.userObjId),
            "businessId": DAL.GetObjectId(conData.businessId),
            "startDate": new Date(conData.startDate),
            "endDate": new Date(conData.endDate),
            "description": conData.description,
            "shifts": conData.shifts,
            "statusId": enums.ConstraintStatusEnum.WAITING
        };
        return new Promise((resolve, reject) => {
            DAL.Insert(constraintsCollectionName, newConstraintDoc)
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
                    statusId: enums.ConstraintStatusEnum.CONFIRMED
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
                    statusId: enums.ConstraintStatusEnum.REFUSED
                }
            })
                .then(data => resolve(data))
                .catch(reject);
        });
    },

    getAllConstraintReasons() {
        return new Promise((resolve, reject) => {
            DAL.Find(ConstraintsReasonsCollectionName)
                .then(users => resolve(users))
                .catch(reject);
        });
    }
};