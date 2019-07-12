const tokenHandler = require('./handlers/tokenHandler');

module.exports = (io) => {
    io.on('connection', (socket) => {

        socket.on('login', () => {
            // Decode user object from the token.
            let user = tokenHandler.decodeTokenFromSocket(socket);

            // Join user to socket room by its object id.
            user && socket.join(user.id);
        });

        socket.on('disconnect', () => {

        });

    });
}