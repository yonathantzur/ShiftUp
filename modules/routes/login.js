const express = require('express');
const router = express.Router();
const loginBL = require('../BL/loginBL');
const tokenHandler = require('../handlers/tokenHandler');

router.post("/userLogin", (req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    };

    loginBL.UserLogin(userData).then((result) => {
        if (result) {
            tokenHandler.setTokenOnCookie(result, res);
            result = true;
        }

        res.send(result);
    }).catch((err) => {
        res.sendStatus(500);
    });
});

router.get("/isUserLogin", (req, res) => {
    res.send(tokenHandler.getUserFromToken(req) ? true : false);
});

router.get("/logout", (req, res) => {
    try {
        tokenHandler.removeTokenFromCookie(res);
        res.send(true);
    }
    catch (e) {
        res.send(false);
    }
});

router.get("/isStatelessUser", (req, res) => {
    let user = tokenHandler.getUserFromToken(req);

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