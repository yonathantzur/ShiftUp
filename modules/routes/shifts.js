const express = require('express');
const router = express.Router();
const shiftsBL = require('../BL/shiftsBL');
const middlewares = require('../middlewares');

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

router.post("/updateEventShifts", middlewares.CheckManager, (req, res) => {
    shiftsBL.UpdateEventShifts(req.body.shiftId, req.body.shiftsData).then(result => {
        res.send(result);
    }).catch(err => {
        res.status(500).end();
    });
});

router.delete("/deleteEvent", middlewares.CheckManager, (req, res) => {
    shiftsBL.DeleteEvent(req.query.eventId).then(result => {
        res.send(result ? true : false);
    }).catch(err => {
        res.status(500).end();
    });
});

router.get("/getMonthlyShiftsForExport", (req, res) => {
    shiftsBL.GetMonthlyShiftsForExport(req.user.businessId,
        req.query.year,
        req.query.month).then(excelData => {
            res.send(excelData);
        }).catch(err => {
            res.status(500).end();
        });
});

module.exports = router;