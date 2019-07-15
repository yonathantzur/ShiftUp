const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const config = require('./config');
const tokenHandler = require('./modules/handlers/tokenHandler');
const middlewares = require('./modules/middlewares');

// app define settings.
app.set('trust proxy', 1);
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}));
app.use(express.static('./'));
app.use(express.static('public'));

app.use('/api', (req, res, next) => {
    req.user = tokenHandler.getUserFromToken(req);
    next();
});

// Routes requires
app.use('/api/shifts/', require('./modules/routes/shifts'));
app.use('/api/users/', require('./modules/routes/users'));
app.use('/api/login/', require('./modules/routes/login'));
app.use('/api/registration/', require('./modules/routes/registration'));
app.use('/api/businesses/', require('./modules/routes/businesses'));
app.use('/api/workers/', require('./modules/routes/workers'));
app.use('/api/constraints/', require('./modules/routes/constraints'));
app.use('/api/schedule/', middlewares.CheckManager, require('./modules/routes/schedule'));

require('./modules/socket')(io);

// Allowed extensions list.
const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
];

// Redirect angular requests back to client side.
app.get('/*', (req, res) => {
    let filePath;

    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        filePath = path.resolve('dist/' + req.url);
    }
    else {
        filePath = path.resolve('dist/index.html');
    }

    res.sendFile(filePath);
});

http.listen(config.server.port, () => {
    console.log("Server is up!");
});