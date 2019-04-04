const jwt = require('jsonwebtoken');
const JWT = require('../libs/jwt');
const config = require('../../config');

module.exports = {
    getUserFromToken(req) {
        try {
            return jwt.decode(parseCookies(req).tk).payload;
        }
        catch (e) {
            return null;
        }
    },

    getTokenObjectFromUser(user) {
        return {
            "id": user._id,
            "email": user.email,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "businessId": user.businessId
        }
    },

    getToken(user) {
        return JWT.sign(this.getTokenObjectFromUser(user), config.jwt.options);
    },

    setTokenOnCookie(token, response) {
        response.cookie("tk", token, {
            maxAge: 7776000000,
            httpOnly: true
        })
    },

    removeTokenFromCookie(response) {
        response.clearCookie("tk");
    }
}

function parseCookies(request) {
    let list = {}
    let rc = request.headers.cookie;

    rc && rc.split(';').forEach(function (cookie) {
        let parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}