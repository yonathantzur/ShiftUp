const DAL = require('../DAL');
const config = require('../../config');
const enums = require('../enums');

const usersCollectionName = config.db.collections.users;
const constraintsCollectionName = config.db.collections.constraints;
const constraintsReasonsCollectionName = config.db.collections.constraintsReasons;
const statusTypeCollectionName = config.db.collections.statusType;

let self = module.exports = {
    getAllConstraints(user) {
        let query;
        if (user.isManager) {
            query = [
                {
                    $lookup:
                    {
                        from: usersCollectionName,
                        localField: 'userObjId',
                        foreignField: '_id',
                        as: 'user',
                    }
                },
                { $match: { 'businessId': DAL.GetObjectId(user.businessId) } },
                {
                    $lookup: {
                        from: statusTypeCollectionName,
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
                        from: usersCollectionName,
                        localField: 'userObjId',
                        foreignField: '_id',
                        as: 'user',
                    }
                },
                { $match: { 'userObjId': DAL.GetObjectId(user.id) } },
                {
                    $lookup: {
                        from: statusTypeCollectionName,
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
            DAL.DeleteOne(constraintsCollectionName, { _id: DAL.GetObjectId(conObjId) })
                .then(data => resolve(data))
                .catch(reject);
        });
    },

    DeleteConstraintsByUserId(userObjId) {
        return new Promise((resolve, reject) => {
            DAL.Delete(constraintsCollectionName, { userObjId: DAL.GetObjectId(userObjId) })
                .then(data => resolve(data))
                .catch(reject);
        });
    },

    DeleteConstraintsByBusinessId(businessId) {
        return new Promise((resolve, reject) => {
            DAL.Delete(constraintsCollectionName, { businessId: DAL.GetObjectId(businessId) })
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

    GetAllConstraintReasons() {
        return new Promise((resolve, reject) => {
            DAL.Find(constraintsReasonsCollectionName)
                .then(users => resolve(users))
                .catch(reject);
        });
    },

    GetBusinessConstraintsWaitAmount(businessId) {
        return new Promise((resolve, reject) => {
            let filter = {
                "businessId": DAL.GetObjectId(businessId),
                "statusId": enums.ConstraintStatusEnum.WAITING
            }

            DAL.Count(constraintsCollectionName, filter).then(resolve).catch(reject);
        });
    },

    GetUserConstraints(userId, year, month) {
        year = parseInt(year);
        month = parseInt(month);

        return self.GetWorkersConstraints([DAL.GetObjectId(userId)], year, month);
    },

    // Get business workers constraints that begin from the asked year and month.
    GetWorkersConstraints(workersIds, year, month) {
        return new Promise((resolve, reject) => {
            let constraintsWorkersFilter = {
                $match: {
                    "userObjId": { $in: workersIds },
                    "statusId": enums.ConstraintStatusEnum.CONFIRMED
                }
            }

            let projectObj = {
                $project: {
                    userObjId: "$userObjId",
                    startDate: "$startDate",
                    endDate: "$endDate",
                    shifts: "$shifts",
                    startYear: { $year: "$startDate" },
                    startMonth: { $month: "$startDate" },
                    endYear: { $year: "$endDate" },
                    endMonth: { $month: "$endDate" }
                }
            }

            let projectRangeObj = {
                $project: {
                    userObjId: "$userObjId",
                    startDate: "$startDate",
                    endDate: "$endDate",
                    shifts: "$shifts",
                    startYear: "$startYear",
                    startMonth: "$startMonth",
                    endYear: "$endYear",
                    endMonth: "$endMonth",
                    isStartYearInRange: {
                        $lte: ["$startYear", year],
                    },
                    isEndYearInRange: {
                        $gte: ["$endYear", year]
                    },
                    isStartMonthInRange: {
                        $lte: ["$startMonth", month]
                    },
                    isEndMonthInRange: {
                        $gte: ["$endMonth", month]
                    }
                }
            }

            let constraintsTimeFilter = {
                $match: {
                    "isStartYearInRange": true,
                    "isEndYearInRange": true,
                    "isStartMonthInRange": true,
                    "isEndMonthInRange": true
                }
            }

            let lastProject = {
                $project: {
                    userObjId: "$userObjId",
                    startDate: "$startDate",
                    endDate: "$endDate",
                    shifts: "$shifts",
                }
            }

            let aggregate = [constraintsWorkersFilter, projectObj,
                projectRangeObj, constraintsTimeFilter, lastProject];

            DAL.Aggregate(constraintsCollectionName, aggregate).then(resolve).catch(reject);
        });
    },
};