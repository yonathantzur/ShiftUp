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
    usersBL.GetUserById(req.query.id).then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).end();
    })
});

router.get("/getUserByUserId", (req, res) => {
    usersBL.GetUserByUserId(req.query.userId).then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).end();
    })
});

router.get("/getLoggedInUser", (req, res) => {
    usersBL.GetUserByUserId(req.user.userId).then(user => {
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
    })
});

router.get("/getUsersRequestedToBusiness", (req, res) => {
    usersBL.GetUsersRequestedToBusiness(req.user.userId)
        .then(usersRequests => res.send(usersRequests))
        .catch(err => res.status(500).end())
})

module.exports = router;