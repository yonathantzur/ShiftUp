const express = require('express');
const router = express.Router();
const registarionBL = require('../BL/registarionBL');
const tokenHandler = require('../handlers/tokenHandler');

router.post("/register", (req, res) => {
    regBL.register(req.body).then((result) => {
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