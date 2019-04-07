const serverPort = process.env.PORT || 4000;

module.exports = {
    server: {
        port: serverPort,
    },
    jwt: {
        secret: "ZuhQmXFdwERIZMnOu4qiCJyYXKkVfqVk",
        options: {
            expiresIn: '90d',
        },
    },
    db: {
        name: "shiftup",
        connectionString: 'mongodb://localhost:27017/shiftup',
        collections: {
            users: "Users",
            businesses: "Businesses",
            shifts: "Shifts",
            constraints: "Constraints"
        }
    }
};