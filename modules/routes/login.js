var express = require('express');
var router = express.Router();
const loginBL = require('../BL/loginBL');
const config = require('../../config');

// var prefix = prefix = "/login";

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendStatus(200);
});

router.post("/userLogin", (req, res) => {
    console.log("im in userLogin");
    const userData = {
        email: req.body.email,
        password: req.body.password
    };
    loginBL.UserLogin(userData).then(result => {
        res.send(result);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });

});


module.exports = router;
