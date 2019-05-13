const DAL = require('../DAL');
const config = require('../../config');

const businessesCollectionName = config.db.collections.businesses;
const usersCollectionName = config.db.collections.users;

let self = module.exports = {
    AddBusiness: (userId, business) => {
        return new Promise((resolve, reject) => {
            business.manager = DAL.GetObjectId(userId);
            business.workers = [];

            let fieldsObj = { "_id": 0, "businessCode": 1 };
            let sortObj = { "businessCode": -1 };

            // Get the max business code.
            DAL.FindSpecific(businessesCollectionName, {}, fieldsObj, sortObj, 1).then(result => {
                let businessCode;

                // In case there are no businesses on DB.
                if (result.length == 0) {
                    businessCode = 10;
                }
                else {
                    businessCode = result[0].businessCode + 1;
                }

                business.businessCode = businessCode;
                DAL.Insert(businessesCollectionName, business).then(businessId => {
                    resolve({ businessId, businessCode });
                });
            }).catch(reject);
        });
    },

    AddBusinessToUser(userId, businessId) {
        return new Promise((resolve, reject) => {
            let userFilter = { _id: DAL.GetObjectId(userId) }
            let setObj = { $set: { "businessId": DAL.GetObjectId(businessId) } };
            DAL.UpdateOne(usersCollectionName, userFilter, setObj).then(resolve).catch(reject);
        });
    },

    GetBusinessById(businessId) {
        return new Promise((resolve, reject) => {
            DAL.FindOne(businessesCollectionName, { _id: DAL.GetObjectId(businessId) })
                .then(resolve).catch(reject);
        });
    },

    GetWorkersForBusiness(businessId) {
        return new Promise((resolve, reject) => {
            let businessFilter = { $match: { "_id": DAL.GetObjectId(businessId) } };
            let joinWorkersQuery = {
                $lookup:
                {
                    from: usersCollectionName,
                    localField: 'workers',
                    foreignField: '_id',
                    as: 'workers'
                }
            }

            let joinManagerQuery = {
                $lookup:
                {
                    from: usersCollectionName,
                    localField: 'manager',
                    foreignField: '_id',
                    as: 'manager'
                }
            }

            let projectFilter = {
                $project: {
                    "workers": 1,
                    "manager": 1
                }
            }

            let aggregatePipline = [
                businessFilter,
                joinWorkersQuery,
                joinManagerQuery,
                projectFilter
            ]

            DAL.Aggregate(businessesCollectionName, aggregatePipline).then(result => {
                let business = result[0];
                let allWorkers = business.workers.concat(business.manager);

                allWorkers = allWorkers.map(worker => {
                    return {
                        "_id": worker._id,
                        "firstName": worker.firstName,
                        "lastName": worker.lastName,
                        "fullName": worker.firstName + " " + worker.lastName,
                        "birthDate": worker.birthDate,
                        "userId": worker.userId,
                        "salary": worker.salary,
                        "isManager": worker.isManager,
                        "requests": worker.requests
                    };
                });

                allWorkers = allWorkers.sort((a, b) => a.fullName > b.fullName ? 1 : -1);

                resolve(allWorkers);
            }).catch(reject)
        });
    },

    GetBusinessWorkersIds(businessId) {
        return new Promise((resolve, reject) => {
            let businessFilter = { "_id": DAL.GetObjectId(businessId) };
            let fields = {
                "_id": 0,
                "workers": 1
            }

            DAL.FindOneSpecific(businessesCollectionName, businessFilter, fields)
                .then(businessWorkers => {
                    resolve(self.ShuffleArray(businessWorkers.workers));
                }).catch(reject);
        });
    },

    ShuffleArray(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    },

    GetBusinessWorkersAmountPerShift(businessId) {
        return new Promise((resolve, reject) => {
            let businessFilter = { "_id": DAL.GetObjectId(businessId) };
            let fields = {
                "_id": 0,
                "shifts.workersAmount": 1
            }

            DAL.FindOneSpecific(businessesCollectionName, businessFilter, fields)
                .then(shiftsWorkersAmount => {
                    resolve(shiftsWorkersAmount.shifts.map(shift => {
                        return shift.workersAmount;
                    }));
                }).catch(reject);
        });
    },

    GetBusinessShiftsNames(businessId) {
        return new Promise((resolve, reject) => {
            let businessFilter = {
                "_id": DAL.GetObjectId(businessId)
            }

            let businessField = {
                "shifts": 1
            }

            DAL.FindOne(businessesCollectionName, businessFilter, businessField).then(business => {
                resolve(business.shifts.map(shift => {
                    return shift.name;
                }))
            }).catch(reject)
        });
    }

};