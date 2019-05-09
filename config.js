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
        connectionString: process.env.SHIFTUP_CONNECTION_STRING || 'mongodb://localhost:27017/shiftup',
        collections: {
            users: "Users",
            businesses: "Businesses",
            shifts: "Shifts",
            constraints: "Constraints",
            constraintsReasons: "ConstraintsReasons",
            statusType: "StatusType"
        }
    },
    mailer: {
        mail: "shiftup@group.com",
        apiKeyCode: process.env.SHIFTUP_MAIL_KEY_CODE
    }
};