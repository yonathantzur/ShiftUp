const express = require('express');
const router = express.Router();
const workerBL = require('../BL/workerBL');

router.get("/getBusinessByCode", (req, res) => {
    workerBL.GetBusinessByCode(req.query.businessCode).then(result => {
        res.send(result);
    }).catch(err => {
        res.sendStatus(500);
    })
});

router.post("/sendWorkerRequest", (req, res) => {
    workerBL.SendWorkerRequest(req.user, req.body.managerId, req.body.businessId).then(result => {
        res.send(result);
    }).catch(err => {
        res.sendStatus(500);
    })
});

module.exports = router;