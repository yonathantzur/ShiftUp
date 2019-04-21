const express = require('express');
const router = express.Router();
const workersBL = require('../BL/workersBL');
const tokenHandler = require('../handlers/tokenHandler');

router.get("/getBusinessByCode", (req, res) => {
    workersBL.GetBusinessByCode(req.query.businessCode).then(result => {
        res.send(result);
    }).catch(err => {
        res.sendStatus(500);
    })
});

router.post("/sendWorkerRequest", (req, res) => {
    workersBL.SendWorkerRequest(req.user, req.body.managerId, req.body.businessId).then(workerObj => {
        let newToken = tokenHandler.getToken(workerObj);
        tokenHandler.setTokenOnCookie(newToken, res);
        res.send(true);
    }).catch(err => {
        res.sendStatus(500);
    })
});

router.get("/getWaitBusinessDetails", (req, res) => {
    workersBL.GetWaitBusinessDetails(req.user.waitBusinessId).then(business => {
        business.workerName = req.user.firstName + " " + req.user.lastName;
        res.send(business);
    }).catch(err => {
        res.sendStatus(500);
    });
});

router.post("/addWorkerToBusiness", (req, res) => {
    const businessId = req.user.businessId;

    if (businessId) {
        workersBL.AddWorkerToBusiness(businessId, req.body.userId, req.body.salary)
            .then(business => {
                res.end();
            }).catch(err => {
                res.status(500).end();
            }
        );
    } else {
        res.status(500).end();
    }
});

router.post("/removeWorkerFromBusiness", (req, res) => {
    const businessId = req.user.businessId;

    if (businessId) {
        workersBL.RemoveWorkerFromBusiness(businessId, req.body.userId)
            .then(business => {
                res.end();
            }).catch(err => {
                res.status(500).end();
            }
        );
    } else {
        res.status(500).end();
    }
});

module.exports = router;