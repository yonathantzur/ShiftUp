const shiftsBL = require('../BL/shiftsBL');

var prefix = "/shifts";

module.exports = (app) => {
    app.get(prefix + "/getAllShiftsForBusiness", (req, res) => {
        // TODO: get user business from token.
        shiftsBL.GetAllShiftsForBusiness("5c605e3f7daa9a69a9107284",
            req.query.year,
            req.query.month).then(shifts => {
                res.send(shifts);
            }).catch(err => {
                res.status(500).end();
            });
    });
};