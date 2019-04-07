const businessesBL = require('../BL/businessesBL');
const usersBL = require('../BL/usersBL');
const jwt = require('jsonwebtoken');

var prefix = "/businesses";

module.exports = (app) => {

    app.get(prefix + "/getLoggedInBusiness", (req, res) => {
        const cookies = parseCookies(req);
        try {
            const decodedToken = jwt.decode(cookies.tk);
            const businessId = decodedToken.payload.businessId;
            if (businessId && businessId != "") {
                businessesBL.GetBusinessById(businessId)
                    .then(business => {
                        if (business) {
                            res.send(business);
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
        } catch (err) {
            res.status(500).end();
        }
    });

    app.get(prefix + "/getWorkersForBusiness", (req, res) => {
        const cookies = parseCookies(req);
        const decodedToken = jwt.decode(cookies.tk);
        const businessId = decodedToken.payload.businessId;
        if (businessId && businessId != "") {
            businessesBL.GetWorkersForBusiness(businessId)
                .then(workers => {
                    if (workers) {
                        res.send(workers);
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