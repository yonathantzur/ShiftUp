const express = require('express');
const router = express.Router();
const usersBL = require('../BL/usersBL');
const constraintsBL = require('../BL/constraintsBL');
const middlewares = require('../middlewares');

router.get("/getLoggedInUser", (req, res) => {
    let user = req.user;
    constraintsBL.GetBusinessConstraintsWaitAmount(user.businessId).then(waitingConstraints => {
        user.waitingConstraints = waitingConstraints;
        res.send(user);
    })
});

router.get("/getLoggedInUserId", (req, res) => {
    res.send({ "id": req.user.id });
});

router.get("/isUserAvailableForBusiness", (req, res) => {
    usersBL.IsUserAvailableForBusiness(req.query.userId, req.user.businessId).then(isAvailable => {
        res.send(isAvailable);
    }).catch(err => {
        res.status(500).end();
    });
});

router.get("/isLoginUserManager", (req, res) => {
    res.send(req.user.isManager == true);
});

router.get("/getUsersRequestedToBusiness", middlewares.CheckManager, (req, res) => {
    usersBL.GetUsersRequestedToBusiness(req.user.userId)
        .then(usersRequests => res.send(usersRequests))
        .catch(err => res.status(500).end())
});

module.exports = router;