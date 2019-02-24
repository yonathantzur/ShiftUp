const express = require('express');
const router = express.Router();
const regBL = require('../BL/registarionBL');
const config = require('../../config');
const JWT = require('../libs/jwt');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendStatus(200);
});

router.post("/register", (req, res) => {
    console.log("im in register");
    const userData = {
        email: req.body.email,
        password: req.body.password,
        firstName:req.body.firstName,
        lastName: req.body.lastName
    };
    regBL.register(userData).then((result) => {
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
