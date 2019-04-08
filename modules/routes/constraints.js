//constraints
const express = require('express');
const constraintsBL = require('../BL/constraintsBL');
const router = express.Router();

//var prefix = "/constraints";


router.get("/getAllConstraints", (req, res) => {
    constraintsBL.getAllConstraints().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).end();
    });
});

module.exports = router;
