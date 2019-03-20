const express = require('express');
const router = express.Router();
const businessBL = require('../BL/businessBL');

router.post("/addBusiness", (req, res) => {
    businessBL.AddBusiness(req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.sendStatus(500);
    });
});

module.exports = router;