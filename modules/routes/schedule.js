const express = require('express');
const router = express.Router();
const scheduleBL = require('../BL/scheduleBL');

router.get("/getShiftsSchedule", (req, res) => {
    scheduleBL.GetShiftsSchedule(req.user.businessId, req.query.year, req.query.month).then(shifts => {
        res.send(shifts);
    }).catch(err => {
        res.status(500).end();
    });
});

module.exports = router;