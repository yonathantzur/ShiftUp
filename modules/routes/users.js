const express = require('express');
const router = express.Router();
const usersBL = require('../BL/usersBL');

router.get("/getAllUsers", (req, res) => {
    usersBL.GetAllUsers().then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).end();
    });
});

router.get("/getUserById", (req, res) => {
    usersBL.GetUserById(req.query.userObjId).then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).end();
    })
});

router.get("/GetUserByUserId", (req, res) => {
    usersBL.GetUserByUserId(req.query.userId).then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).end();
    })
});

router.get("/isUserAvailableForBusiness", (req, res) => {
    usersBL.IsUserAvailableForBusiness(req.query.userId, req.user.businessId).then(isAvailable => {
        res.send(isAvailable);
    }).catch(err => {
        res.status(500).end();
    });
});

router.get("/isLoginUserManager", (req, res) => {
    usersBL.isLoginUserManager(req).then(isManager => {
        res.send(isManager);
    }).catch(err => {
        res.status(500).end();
    })
});

module.exports = router;