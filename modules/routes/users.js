const express = require('express');
const router = express.Router();
const usersBL = require('../BL/usersBL');
const constraintsBL = require('../BL/constraintsBL');
const businessesBL = require('../BL/businessesBL');
const middlewares = require('../middlewares');

router.get("/getLoggedInUser", (req, res) => {
    let user = req.user;

    Promise.all([
        businessesBL.GetBusinessById(user.businessId),
        constraintsBL.GetBusinessConstraintsWaitAmount(user.businessId)
    ]).then(results => {
        user.businessName = results[0].name;
        user.waitingConstraints = results[1];
        res.send(user);
    }).catch(err => {
        res.status(500).end();
    });
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