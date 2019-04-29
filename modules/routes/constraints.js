const express = require('express');
const constraintsBL = require('../BL/constraintsBL');
const router = express.Router();


router.get("/getAllConstraints", (req, res) => {
    constraintsBL.getAllConstraints(req).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).end();
    });
});

router.get("/DeleteConstraint", (req, res) => {
    constraintsBL.DeleteConstraint(req.query.conObjId).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).end();
    });
});

router.get("/ApproveConstraint", (req, res) => {
    constraintsBL.ApproveConstraint(req.query.conObjId).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).end();
    });
});

router.get("/RefuseConstraint", (req, res) => {
    constraintsBL.RefuseConstraint(req.query.conObjId).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).end();
    });
});
module.exports = router;
