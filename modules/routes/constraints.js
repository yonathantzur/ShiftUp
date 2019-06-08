const express = require('express');
const constraintsBL = require('../BL/constraintsBL');
const middlewares = require('../middlewares');
const router = express.Router();

router.get("/getAllConstraints", (req, res) => {
    constraintsBL.getAllConstraints(req.user, req.query.sortCol, req.query.sortDirection).then(data => {
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

router.post("/AddConstraint", (req, res) => {
    const newConstraint = req.body;
    newConstraint['userObjId'] = req.user.id;
    newConstraint['businessId'] = req.user.businessId;
    constraintsBL.AddConstraint(newConstraint).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).end();
    });
});

router.get("/ApproveConstraint", middlewares.CheckManager, (req, res) => {
    constraintsBL.ApproveConstraint(req.query.conObjId).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).end();
    });
});

router.get("/RefuseConstraint", middlewares.CheckManager, (req, res) => {
    constraintsBL.RefuseConstraint(req.query.conObjId).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).end();
    });
});

router.get("/getAllConstraintReasons", (req, res) => {
    constraintsBL.GetAllConstraintReasons().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).end();
    });
});

router.get("/getUserConstraints", (req, res) => {
    constraintsBL.GetUserConstraints(req.user.id, req.query.year, req.query.month).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).end();
    });
});

module.exports = router;
