const express = require('express');
const router = express.Router();
const loginBL = require('../BL/loginBL');
const config = require('../../config');
const JWT = require('../libs/jwt');

// var prefix = prefix = "/login";

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendStatus(200);
});

router.post("/userLogin", (req, res) => {
    console.log("im in userLogin");
    const userData = {
        email: req.body.email,
        password: req.body.password
    };
    loginBL.UserLogin(userData).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.error(err);
        res.sendStatus(500);
    });

});

router.post("/userLoginTester", JWT.middleware, (req, res) => {
    res.json(req.user);
});

router.get("/userLoginTester", JWT.middleware, (req, res) => {
    res.json(req.user);
});

module.exports = router;
