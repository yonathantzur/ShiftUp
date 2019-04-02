const express = require('express');
const router = express.Router();
const loginBL = require('../BL/loginBL');
const jwt = require('jsonwebtoken');
const JWT = require('../libs/jwt');

router.post("/userLogin", (req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    };

    loginBL.UserLogin(userData).then((result) => {
        if (result) {
            setTokenOnCookie(result, res);
            result = true;
        }

        res.send(result);
    }).catch((err) => {
        res.sendStatus(500);
    });
});

router.get("/isUserLogin", (req, res) => {
    res.send(getUserFromToken(req) ? true : false);
});

router.get("/logout", (req, res) => {
    try {
        removeTokenFromCookie(res);
        res.send(true);
    }
    catch (e) {
        res.send(false);
    }
});

router.get("/isStatelessUser", (req, res) => {
    let user = getUserFromToken(req);

    // In case the user is not login to system.
    if (!user) {
        res.send(false);
    }
    else {
        loginBL.IsUserStateless(user.id).then(result => {
            res.send(result);
        }).catch(e => {
            res.sendStatus(500);
        })
    }
});

module.exports = router;

function setTokenOnCookie(token, response) {
    response.cookie("tk", token, {
        maxAge: 7776000000,
        httpOnly: true
    })
}

function removeTokenFromCookie(response) {
    response.clearCookie("tk");
}

function parseCookies(request) {
    let list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function (cookie) {
        let parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

function getUserFromToken(req) {
    try {
        return jwt.decode(parseCookies(req).tk).payload;
    }
    catch (e) {
        return null;
    }
}