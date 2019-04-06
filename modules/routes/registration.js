const express = require('express');
const router = express.Router();
const regBL = require('../BL/registarionBL');
const JWT = require('../libs/jwt');

router.post("/register", (req, res) => {
    regBL.register(req.body).then((result) => {
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
