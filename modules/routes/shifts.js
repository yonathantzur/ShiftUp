const shiftsBL = require('../BL/shiftsBL');

var prefix = "/shifts";

module.exports = (app) => {
    app.get(prefix + "/getShiftsForBusiness", (req, res) => {
        // TODO: get user business from token.
        shiftsBL.GetShiftsForBusiness("5c605e3f7daa9a69a9107284",
            req.query.year,
            req.query.month).then(shifts => {
                res.send(shifts);
            }).catch(err => {
                res.status(500).end();
            });
    });

    app.post(prefix + "/getShiftsWorkers", (req, res) => {        
        shiftsBL.GetShiftsWorkers(req.body.shiftsData).then(shiftsData => {
                res.send(shiftsData);
            }).catch(err => {
                res.status(500).end();
            });
    });
};