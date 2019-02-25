const serverPort = process.env.PORT || 4000;

module.exports = {
    server: {
        port: serverPort,
    },
    db: {
        name: "shiftup",
        connectionString: process.env.SHIFTUP_CONNECTION_STRING || 'mongodb://localhost:27017/shiftup',
        collections: {
            users: "Users",
            businesses: "Businesses",
            shifts: "Shifts",
            constraints: "Constraints",
            jobs: "Jobs"
        }
    }
};