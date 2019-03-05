const express = require('express');
const router = express.Router();
const regBL = require('../BL/registarionBL');
const JWT = require('../libs/jwt');

router.post("/register", (req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password,
        firstName:req.body.firstName,
        lastName: req.body.lastName
    };
    regBL.register(userData).then((result) => {
        if (result) {
            setTokenOnCookie(result, res);
            result = true;
        }

        res.send(result);
    }).catch((err) => {
        res.send(err);
    });

});

router.post("/userLoginTester", JWT.middleware, (req, res) => {
    res.json(req.user);
});

router.get("/userLoginTester", JWT.middleware, (req, res) => {
    res.json(req.user);
});

module.exports = router;

function setTokenOnCookie(token, response) {
    response.cookie("tk", token, {
        maxAge:7776000000,
        httpOnly: true
    })
}
