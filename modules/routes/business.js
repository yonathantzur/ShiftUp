const express = require('express');
const router = express.Router();
const businessBL = require('../BL/businessBL');
const tokenHandler = require('../handlers/tokenHandler');

router.post("/addBusiness", (req, res) => {
    let userId = req.user.id;
    businessBL.AddBusiness(userId, req.body).then((businessId) => {
        businessBL.AddBusinessToUser(userId, businessId).then(user => {
            tokenHandler.setTokenOnCookie(tokenHandler.getTokenObjectFromUser(user), res);
            res.send(true);
        });
    }).catch((err) => {
        res.sendStatus(500);
    });
});

module.exports = router;