const workersBL = require('../BL/workersBL');
const jwt = require('jsonwebtoken');

var prefix = "/workers";

module.exports = (app) => {

    app.post(prefix + "/addWorkerToBusiness", (req, res) => {
        const cookies = parseCookies(req);
        const decodedToken = jwt.decode(cookies.tk);
        const businessId = decodedToken.payload.businessId;
        if (businessId && businessId != "") {
            workersBL.AddWorkerToBusiness(businessId, req.body.userId, req.body.salary)
                .then(business => {
                    if (business) {
                        res.status(200).end();
                    } else {
                        res.status(500).end();
                    }
                }).catch(err => {
                    res.status(500).end();
                }
            );
        } else {
            res.status(500).end();
        }
    });

    app.post(prefix + "/removeWorkerFromBusiness", (req, res) => {
        const cookies = parseCookies(req);
        const decodedToken = jwt.decode(cookies.tk);
        const businessId = decodedToken.payload.businessId;
        if (businessId && businessId != "") {
            workersBL.RemoveWorkerFromBusiness(businessId, req.body.userId)
                .then(business => {
                    if (business) {
                        res.status(200).end();
                    } else {
                        res.status(500).end();
                    }
                }).catch(err => {
                    res.status(500).end();
                }
            );
        } else {
            res.status(500).end();
        }
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