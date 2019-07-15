const jwt = require('jsonwebtoken');
const JWT = require('../libs/jwt');
const config = require('../../config');

module.exports = {
    getUserFromToken(req) {
        return this.decodeToken(parseCookies(req).tk);
    },

    decodeToken(tk) {
        try {
            return jwt.decode(tk).payload;
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
            "birthDate": user.birthDate,
            "userId": user.userId,
            "businessId": user.businessId,
            "waitBusinessId": user.waitBusinessId,
            "isManager": user.isManager,
            "requests": user.requests
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
    },

    decodeTokenFromSocket(socket) {
        let token = this.getTokenFromSocket(socket);
        return this.decodeToken(token);
    },

    getTokenFromSocket(socket) {
        return getCookieByName("tk", socket.request.headers.cookie);
    },
};

function parseCookies(request) {
    let list = {};
    let rc = request.headers.cookie;

    rc && rc.split(';').forEach(function (cookie) {
        let parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

function getCookieByName(cname, cookie) {
    if (!cookie) {
        return '';
    }

    let name = cname + "=";
    let ca = cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return '';
}