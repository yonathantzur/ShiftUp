const express = require('express');
const router = express.Router();
const businessesBL = require('../BL/businessesBL');
const tokenHandler = require('../handlers/tokenHandler');

router.post("/addBusiness", (req, res) => {
    let userId = req.user.id;
    businessesBL.AddBusiness(userId, req.body).then((result) => {
        businessesBL.AddBusinessToUser(userId, result.businessId).then(user => {
            let token = tokenHandler.getToken(user);
            tokenHandler.setTokenOnCookie(token, res);
            res.send(result);
        });
    }).catch((err) => {
        res.sendStatus(500);
    });
});

router.get("/getLoggedInBusiness", (req, res) => {
    const businessId = req.user.businessId;

    if (businessId) {
        businessesBL.GetBusinessById(businessId)
            .then(business => {
                res.send(business);
            }).catch(err => {
                res.status(500).end();
            }
        );
    } else {
        res.status(500).end();
    }
});

router.get("/getWorkersForBusiness", (req, res) => {
    const businessId = req.user.businessId;

    if (businessId) {
        businessesBL.GetWorkersForBusiness(businessId)
            .then(workers => {
                res.send(workers);
            }).catch(err => {
                res.status(500).end();
            }
        );
    } else {
        res.status(500).end();
    }
});

module.exports = router;