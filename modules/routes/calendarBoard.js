const express = require('express');
const router = express.Router();
const calendarBoardBL = require('../BL/calendarBoardBL');

router.get("/getShiftsSchedule", (req, res) => {
    calendarBoardBL.GetShiftsSchedule(req.businessId, req.query.year, req.query.month).then(shifts => {
        res.send(shifts);
    }).catch(err => {
        res.status(500).end();
    });
});

module.exports = router;