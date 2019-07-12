module.exports = (io) => {
    io.on('connection', (socket) => {

        socket.on('login', () => {

        });

        socket.on('disconnect', () => {

        });

    });
}