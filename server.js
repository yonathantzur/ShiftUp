const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const config = require('./config');

// app define settings.
app.set('trust proxy', 1);
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}));
app.use(express.static('./'));
app.use(express.static('public'));

http.listen(config.server.port, () => {
    console.log("Server is up!");
});

// Routes requires
require('./modules/routes/shifts')(app);
app.use('/login/api/', require('./modules/routes/login'));
app.use('/registration/api/', require('./modules/routes/registration'));

// Redirect angular requests back to client side.
app.get('**', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});