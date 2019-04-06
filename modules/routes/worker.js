const express = require('express');
const router = express.Router();
const workerBL = require('../BL/workerBL');
const tokenHandler = require('../handlers/tokenHandler');

router.get("/getBusinessByCode", (req, res) => {
    workerBL.GetBusinessByCode(req.query.businessCode).then(result => {
        res.send(result);
    }).catch(err => {
        res.sendStatus(500);
    })
});

router.post("/sendWorkerRequest", (req, res) => {
    workerBL.SendWorkerRequest(req.user, req.body.managerId, req.body.businessId).then(workerObj => {
        let newToken = tokenHandler.getToken(workerObj);
        tokenHandler.setTokenOnCookie(newToken, res);
        res.send(true);
    }).catch(err => {
        res.sendStatus(500);
    })
});

module.exports = router;