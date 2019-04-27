const express = require('express');
const router = express.Router();
const shiftsBL = require('../BL/shiftsBL');

router.get("/getShiftsForBusiness", (req, res) => {
    shiftsBL.GetShiftsForBusiness(req.user.businessId,
        req.query.year,
        req.query.month).then(shifts => {
            res.send(shifts);
        }).catch(err => {
            res.status(500).end();
        });
});

router.get("/getMyShiftsForBusiness", (req, res) => {
    shiftsBL.GetShiftsForBusiness(req.user.businessId,
        req.query.year,
        req.query.month,
        req.user.id).then(shifts => {
            res.send(shifts);
        }).catch(err => {
            res.status(500).end();
        });
});

router.post("/getShiftsWorkers", (req, res) => {
    shiftsBL.GetShiftsWorkers(req.body.shiftsData).then(shiftsData => {
        res.send(shiftsData);
    }).catch(err => {
        res.status(500).end();
    });
});

router.post("/getEventDetails", (req, res) => {
    shiftsBL.GetEventDetails(req.body, req.user.businessId).then(event => {
        res.send(event);
    }).catch(err => {
        res.status(500).end();
    });
});

module.exports = router;