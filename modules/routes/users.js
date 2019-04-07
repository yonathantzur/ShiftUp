const usersBL = require('../BL/usersBL');
const jwt = require('jsonwebtoken');

var prefix = "/users";

module.exports = (app) => {
    app.get(prefix + "/getAllUsers", (req, res) => {
        usersBL.GetAllUsers().then(users => {
                res.send(users);
            }).catch(err => {
                res.status(500).end();
            });
    });

    app.get(prefix + "/getUserById", (req, res) => {
        usersBL.GetUserByUserId(req.query.userId).then(user => {
            res.send(user);
        }).catch(err => {
            res.status(500).end();
        })
    });

    app.get(prefix + "/isUserAvailableForBusiness", (req, res) => {
        usersBL.IsUserAvailableForBusiness(req.query.userId).then(isAvailable => {
            res.send(isAvailable);
        }).catch(err => {
            res.status(500).end();
        })
    });
    
};

function parseCookies(request){
    let list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        let parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}