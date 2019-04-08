const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const config = require('./config');
const tokenHandler = require('./modules/handlers/tokenHandler');

// app define settings.
app.set('trust proxy', 1);
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}));
app.use(express.static('./'));
app.use(express.static('public'));

http.listen(config.server.port, () => {
    console.log("Server is up!");
});

app.use('/api', (req, res, next) => {
    req.user = tokenHandler.getUserFromToken(req);
    next();
});

// Routes requires
app.use('/api/shifts/', require('./modules/routes/shifts'));
require('./modules/routes/users')(app);
require('./modules/routes/workers')(app);
require('./modules/routes/businesses')(app);
app.use('/api/login/', require('./modules/routes/login'));
app.use('/api/registration/', require('./modules/routes/registration'));
app.use('/api/business/', require('./modules/routes/business'));
app.use('/api/worker/', require('./modules/routes/worker'));

// Redirect angular requests back to client side.
app.get('**', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});