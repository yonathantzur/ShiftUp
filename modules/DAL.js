const config = require('../config');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

// Connection parameters
const connectionString = config.db.connectionString;
const dbName = config.db.name;
let db;

function GetDB() {
    return new Promise((resolve, reject) => {
        // In case db connection exists and open.
        if (db && db.serverConfig && db.serverConfig.isConnected()) {
            resolve(db);
        }
        else {
            MongoClient.connect(connectionString, { useNewUrlParser: true }).then(client => {
                resolve(db = client.db(dbName));
            }).catch(err => {
                reject(err);
            });
        }
    });
}

// Initialize DB connection.
GetDB();

module.exports = {
    // Convert string id to mongoDB object id.
    GetObjectId(id) {
        return new ObjectId(id.toString());
    },

    // Getting documents from collection by filter.
    FindOne(collectionName, filter) {
        return new Promise((resolve, reject) => {
            GetDB().then(db => {
                let collection = db.collection(collectionName);
                collection.findOne(filter).then(resolve).catch(reject);
            }).catch(reject);
        });
    },

    // Getting documents from collection by filter.
    FindOneSpecific(collectionName, filter, projection) {
        return new Promise((resolve, reject) => {
            GetDB().then(db => {
                let collection = db.collection(collectionName);
                collection.findOne(filter, { projection }).then(resolve).catch(reject);
            }).catch(reject);
        });
    },

    // Getting documents from collection by filter.
    Find(collectionName, filter, sortObj, limit) {
        return new Promise((resolve, reject) => {
            GetDB().then(db => {
                let collection = db.collection(collectionName);
                sortObj = sortObj ? sortObj : {};
                let query = collection.find(filter).sort(sortObj);

                if (limit != null) {
                    query = query.limit(limit);
                }

                query.toArray().then(resolve).catch(reject);
            }).catch(reject);
        });
    },

    // Getting documents from collection by filter.
    FindSpecific(collectionName, filter, projection, sortObj, limit) {
        return new Promise((resolve, reject) => {
            GetDB().then(db => {
                let collection = db.collection(collectionName);
                sortObj = sortObj ? sortObj : {};
                let query = collection.find(filter, { projection }).sort(sortObj);

                if (limit != null) {
                    query = query.limit(limit);
                }

                query.toArray().then(resolve).catch(reject);
            }).catch(reject);
        });
    },

    // Getting documents from collection by filter.
    Aggregate(collectionName, aggregateArray) {
        return new Promise((resolve, reject) => {
            GetDB().then(db => {
                let collection = db.collection(collectionName);
                collection.aggregate(aggregateArray).toArray().then(resolve).catch(reject);
            }).catch(reject);
        });
    },

    // Insert document.
    Insert(collectionName, doc) {
        return new Promise((resolve, reject) => {
            GetDB().then(db => {
                let collection = db.collection(collectionName);
                collection.insertOne(doc).then(result => {
                    resolve(result.insertedId);
                }).catch(reject);
            }).catch(reject);
        });
    },

    // Insert many document.
    InsertMany(collectionName, documents) {
        return new Promise((resolve, reject) => {
            GetDB().then(db => {
                let collection = db.collection(collectionName);
                collection.insertMany(documents).then(result => {
                    resolve(result.insertedIds);
                }).catch(reject);
            }).catch(reject);
        });
    },

    // Update one document.
    UpdateOne(collectionName, findObj, updateObj, isInsertIfNotExists) {
        return new Promise((resolve, reject) => {
            GetDB().then(db => {
                let collection = db.collection(collectionName);
                let updateConfig = {
                    returnOriginal: false,
                    upsert: isInsertIfNotExists
                }

                collection.findOneAndUpdate(findObj, updateObj, updateConfig).then(updateResult => {
                    resolve(updateResult.value || false);
                }).catch(reject);
            }).catch(reject);
        });
    },

    // Update documents.
    Update(collectionName, findObj, updateObj) {
        return new Promise((resolve, reject) => {
            GetDB().then(db => {
                let collection = db.collection(collectionName);
                let updateConfig = {
                    upsert: false
                }

                collection.updateMany(findObj, updateObj, updateConfig).then(updateResult => {
                    let modifiedAmount = updateResult.result.nModified;
                    resolve(modifiedAmount > 0 ? modifiedAmount : false);
                }).catch(reject);
            }).catch(reject);
        });
    },

    // Delete documents by filter.
    Delete(collectionName, filter) {
        return new Promise((resolve, reject) => {
            GetDB().then(db => {
                let collection = db.collection(collectionName);
                collection.deleteMany(filter).then(deleteResult => {
                    let deletedAmount = deleteResult.deletedCount;
                    resolve(deletedAmount > 0 ? deletedAmount : false);
                }).catch(reject);
            }).catch(reject);
        });
    },

    // Delete documents by filter.
    DeleteOne(collectionName, filter) {
        return new Promise((resolve, reject) => {
            GetDB().then(db => {
                let collection = db.collection(collectionName);
                collection.deleteOne(filter).then(deleteResult => {
                    resolve(deleteResult.result.n != 0);
                }).catch(reject);
            }).catch(reject);
        });
    },

    // Save or update document.
    Save(collectionName, object) {
        return new Promise((resolve, reject) => {
            GetDB().then(db => {
                let collection = db.collection(collectionName);
                collection.save(object).then(result => {
                    resolve(result.n);
                }).catch(reject);
            }).catch(reject);
        });
    },

    // Getting documents amount by filter.
    Count(collectionName, filter) {
        return new Promise((resolve, reject) => {
            GetDB().then(db => {
                let collection = db.collection(collectionName);
                collection.find(filter).count().then(resolve).catch(reject);
            }).catch(reject);
        });
    }

};