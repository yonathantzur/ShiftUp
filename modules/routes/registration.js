const express = require('express');
const router = express.Router();
const registarionBL = require('../BL/registarionBL');
const tokenHandler = require('../handlers/tokenHandler');

router.post("/register", (req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };
    registarionBL.register(userData).then((result) => {
        if (result) {
            tokenHandler.setTokenOnCookie(result, res);
            result = true;
        }

        res.send(result);
    }).catch((err) => {
        res.send(err);
    });

});

module.exports = router;