const tokenHandler = require('./handlers/tokenHandler');
const businessesBL = require('./BL/businessesBL');

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

        socket.on('UpdateConstraintClient', () => {
            // Decode user object from the token.
            let user = tokenHandler.decodeTokenFromSocket(socket);

            businessesBL.GetBusinessManagerId(user.businessId).then(managerId => {
                socket.to(managerId).emit("UpdateConstraintServer");
            });
        });

        socket.on('UpdateConstraintStatusClient', (userId) => {
            socket.to(userId).emit("UpdateConstraintStatusServer");
        });

    });
}