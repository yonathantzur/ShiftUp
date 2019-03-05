const jsonwebtoken = require('jsonwebtoken');
// const Hash = require('./hash'); // for encrypted token
const DAL = require('../DAL');
const config = require('../../config');
const usersCollectionName = config.db.collections.users;

const options = config.jwt.options;

const JWT_KEY = config.jwt.secret;

const decode = (token) => {
    // const jwtToken = Hash.decrypt(Buffer.from(token, 'base64').toString('utf-8')); // for encrypted token
    const jwtToken = token;
    return jsonwebtoken.decode(jwtToken, options);
};

const userLoginToken = (id) => {
    return new Promise((resolve, reject) => {
        DAL.FindOne(usersCollectionName, {_id: id})
            .then((user) => {
                resolve(user);
            })
            .catch((err) => {
                reject('user not found');
            });
    });
};

const AUTH_TYPE = 'Bearer';

class JWT {
    static sign(payload, opt = {}) {
        if (!(opt instanceof Object)) {
            opt = {};
        }
        // Merge the const var options obj with received opt obj
        opt = Object.assign({}, options, opt);

        // logic variable
        let jwtData = {
            payload: payload,
        };

        // Create new token
        return jsonwebtoken.sign(jwtData, JWT_KEY, opt)
        // return Buffer.from(Hash.encrypt(jsonwebtoken.sign(jwtData, JWT_KEY, opt)), 'utf-8').toString('base64'); // encrypted
    }

    /**
     * This function verifies the token, if succeed - returns the payload.
     * else - throw exception.
     * @param {String} token
     * @returns {Object}
     * @throws Exception
     */
    static validate(token) {
        // const jwtToken = Hash.decrypt(Buffer.from(token, 'base64').toString('utf-8')); // encrypted token
        const jwtToken = token;

        let jwtObj = jsonwebtoken.verify(jwtToken, JWT_KEY, options);
        if (jwtObj.payload instanceof Object && typeof jwtObj.payload.i === "string" && typeof jwtObj.payload.s === "string") {
            return jwtObj.payload;
        }
        throw new Error('JWT payload missing');
    };

    static getToken(req) {
        let token = null;
        try {
            if (typeof req.headers.authorization === "string") {
                token = req.headers.authorization;
                if (token.indexOf(AUTH_TYPE) === 0) {
                    token = token.substr(AUTH_TYPE.length).trim();
                } else {
                    token = null;
                }
            }
            if (!token && typeof req.query.authorization === "string") {
                token = req.query.authorization;
            }

        } catch (e) {
            token = null;
        }
        return token;
    }

    static middleware(req, res, next) {
        // middleware losing the this assigned
        let token = null;
        try {
            token = JWT.getToken(req);
            if (!token || typeof token !== "string") {
                res.sendStatus(401);
            } else {
                let payload = JWT.validate(token);

                userLoginToken(DAL.GetObjectId(payload.i))
                    .then((user) => {
                        if (user.salt === payload.s) {
                            req.user = Object.assign({}, user, {password: undefined, salt: undefined});
                            next();
                        } else {
                            res.sendStatus(401);
                        }
                    })
                    .catch(() => {
                        res.sendStatus(401);
                    });
            }
        } catch (e) {
            if (e.name === 'TokenExpiredError' && typeof token === "string") {
                // refresh token
                res.sendStatus(401);
            } else {
                res.sendStatus(401);
            }
        }
    }
}

module.exports = JWT;