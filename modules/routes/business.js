const express = require('express');
const router = express.Router();
const businessBL = require('../BL/businessBL');
const tokenHandler = require('../handlers/tokenHandler');

router.post("/addBusiness", (req, res) => {
    let userId = req.user.id;
    businessBL.AddBusiness(userId, req.body).then((result) => {
        businessBL.AddBusinessToUser(userId, result.businessId).then(user => {            
            let token = tokenHandler.getToken(user);
            tokenHandler.setTokenOnCookie(token, res);
            res.send(result);
        });
    }).catch((err) => {
        res.sendStatus(500);
    });
});

module.exports = router;