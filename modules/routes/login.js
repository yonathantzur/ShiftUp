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
    let tokenObj = tokenHandler.getUserFromToken(req);
    if (tokenObj && tokenObj.businessId) {
        let userId = tokenObj.id;

        loginBL.GetUserById(userId).then(user => {
            let token = tokenHandler.getToken(user);
            tokenHandler.setTokenOnCookie(token, res);
            res.send(true);
        }).catch(err => {
            res.sendStatus(500);
        });
    }
    else {
        res.send(false);
    }
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
    if ((!user || !user.businessId) && !user.waitBusinessId) {
        res.send(true);
    }
    else {
        res.send(false);
    }
});

module.exports = router;