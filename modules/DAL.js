const config = require('../config');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

// Connection URL consts
const connectionString = config.db.connectionString;
const dbName = config.db.name;

// In case of failure.
const maxConnectionAttemptsNumber = 5;

// Connection variables
var retryCount = 0;
var db;

function GetDB(callback) {
    // In case there is no connected db.
    if (!db || !db.serverConfig || !db.serverConfig.isConnected()) {
        MongoClient.connect(connectionString,
            {
                useNewUrlParser: true
            },
            (err, client) => {
                if (err == null) {
                    db = client.db(dbName);
                    callback(null, db);
                }
                else {
                    // In case number of retries is smaller then maximum
                    if (retryCount < maxConnectionAttemptsNumber) {
                        retryCount++;
                        GetDB(callback);
                    }
                    else {
                        callback(err, db);
                    }
                }
            });
    }
    else {
        callback(null, db);
    }
}

// Initialize DB connection.
GetDB((err, db) => { });

module.exports = {
    // Convert string id to mongo object id.
    GetObjectId(id) {
        return new ObjectId(id);
    },

    // Getting documents from collection by filter.
    FindOne(collectionName, filter) {
        return new Promise((resolve, reject) => {
            GetDB((err, db) => {
                if (err == null) {
                    var collection = db.collection(collectionName);

                    collection.findOne(filter, (err, docs) => {
                        if (err == null) {
                            resolve(docs);
                        }
                        else {
                            reject(err);
                        }
                    });
                }
                else {
                    reject(err);
                }
            });
        });
    },

    // Getting documents from collection by filter.
    FindOneSpecific(collectionName, filter, projection) {
        return new Promise((resolve, reject) => {
            GetDB((err, db) => {
                if (err == null) {
                    var collection = db.collection(collectionName);

                    collection.findOne(filter, { projection }, (err, docs) => {
                        if (err == null) {
                            resolve(docs);
                        }
                        else {
                            reject(err);
                        }
                    });
                }
                else {
                    reject(err);
                }
            });
        });
    },

    // Getting documents from collection by filter.
    Find(collectionName, filter, sortObj) {
        return new Promise((resolve, reject) => {
            GetDB((err, db) => {
                if (err == null) {
                    var collection = db.collection(collectionName);

                    sortObj = sortObj ? sortObj : {};

                    collection.find(filter).sort(sortObj).toArray((err, docs) => {
                        if (err == null) {
                            resolve(docs);
                        }
                        else {
                            reject(err);
                        }
                    });
                }
                else {
                    reject(err);
                }
            });
        });
    },

    // Getting documents from collection by filter.
    FindSpecific(collectionName, filter, projection, sortObj) {
        return new Promise((resolve, reject) => {
            GetDB((err, db) => {
                if (err == null) {
                    var collection = db.collection(collectionName);

                    sortObj = sortObj ? sortObj : {};

                    collection.find(filter, { projection }).sort(sortObj).toArray((err, docs) => {
                        if (err == null) {
                            resolve(docs);
                        }
                        else {
                            reject(err);
                        }
                    });
                }
                else {
                    reject(err);
                }
            });
        });
    },

    // Getting documents from collection by filter.
    Aggregate(collectionName, aggregateArray) {
        return new Promise((resolve, reject) => {
            GetDB((err, db) => {
                if (err == null) {
                    var collection = db.collection(collectionName);

                    collection.aggregate(aggregateArray).toArray((err, docs) => {
                        if (err == null) {
                            resolve(docs);
                        }
                        else {
                            reject(err);
                        }
                    });
                }
                else {
                    reject(err);
                }
            });
        });
    },

    // Insert new document.
    Insert(collectionName, doc) {
        return new Promise((resolve, reject) => {
            GetDB((err, db) => {
                if (err == null) {
                    var collection = db.collection(collectionName);

                    collection.insertOne(doc, (err, result) => {
                        if (err == null) {
                            resolve(result.insertedId);
                        }
                        else {
                            reject(err);
                        }
                    });
                }
                else {
                    reject(err);
                }
            });
        });
    },

    // Update one document.
    UpdateOne(collectionName, findObj, updateObj, isInsertIfNotExists) {
        return new Promise((resolve, reject) => {
            GetDB((err, db) => {
                if (err == null) {
                    var collection = db.collection(collectionName);

                    var updateConfig = {
                        returnOriginal: false,
                        upsert: isInsertIfNotExists
                    }

                    collection.findOneAndUpdate(findObj, updateObj, updateConfig, (err, result) => {
                        if (err == null) {
                            if (result.value != null) {
                                resolve(result.value);
                            }
                            else {
                                resolve(false);
                            }
                        }
                        else {
                            reject(err);
                        }
                    });
                }
                else {
                    reject(err);
                }
            });
        });
    },

    // Update documents.
    Update(collectionName, findObj, updateObj) {
        return new Promise((resolve, reject) => {
            GetDB((err, db) => {
                if (err == null) {
                    var collection = db.collection(collectionName);

                    var updateConfig = {
                        "upsert": false
                    }

                    collection.updateMany(findObj, updateObj, updateConfig, (err, result) => {
                        if (err == null) {
                            var updatedDocumentsAmount = result.result.nModified;

                            // In case any document was updated.
                            if (updatedDocumentsAmount != 0) {
                                resolve(updatedDocumentsAmount);
                            }
                            else {
                                resolve(false);
                            }
                        }
                        else {
                            reject(err);
                        }
                    });
                }
                else {
                    reject(err);
                }
            });
        });
    },

    // Delete documents by filter.
    Delete(collectionName, filter) {
        return new Promise((resolve, reject) => {
            GetDB((err, db) => {
                if (err == null) {
                    var collection = db.collection(collectionName);

                    collection.deleteMany(filter, (err, result) => {
                        if (err == null) {
                            if (result.deletedCount != 0) {
                                resolve(result.deletedCount);
                            }
                            else {
                                resolve(false);
                            }
                        }
                        else {
                            reject(err);
                        }
                    });
                }
                else {
                    reject(err);
                }
            });
        });
    },

    // Delete documents by filter.
    DeleteOne(collectionName, filter) {
        return new Promise((resolve, reject) => {
            GetDB((err, db) => {
                if (err == null) {
                    var collection = db.collection(collectionName);

                    collection.deleteOne(filter, (err, result) => {
                        if (err == null) {
                            if (result.result.n != 0) {
                                resolve(true);
                            }
                            else {
                                resolve(false);
                            }
                        }
                        else {
                            reject(err);
                        }
                    });
                }
                else {
                    reject(err);
                }
            });
        });
    },

    // Save or update document.
    Save(collectionName, object) {
        return new Promise((resolve, reject) => {
            GetDB((err, db) => {
                if (err == null) {
                    var collection = db.collection(collectionName);

                    collection.save(object, (err, result) => {
                        if (err == null) {
                            resolve(result.n);
                        }
                        else {
                            reject(err);
                        }
                    });
                }
                else {
                    reject(err);
                }
            });
        });
    },

    // Getting documents amount by filter.
    Count(collectionName, filter) {
        return new Promise((resolve, reject) => {
            GetDB((err, db) => {
                if (err == null) {
                    var collection = db.collection(collectionName);
                    collection.find(filter).count().then(resolve).catch(reject);
                }
                else {
                    reject(err);
                }
            });
        });
    }

};