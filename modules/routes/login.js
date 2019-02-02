const loginBL = require('../BL/loginBL');
const config = require('../../config');

var prefix = prefix = "/login";

module.exports = (app) => {
    app.post("userLogin", (req, res) => {
        
        loginBL.UserLogin().then(result => {
            res.send(result);
        }).catch(err => {
            res.status(500).end();
        });

    });
};