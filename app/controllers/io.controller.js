const socketio = require('socket.io');

const IOController = {

    listen(server){

        const socketMap = new Map();
        const io = socketio(server);

        io.on('connection', (socket) => {
            socket.emit('connection');
            socket.on('data_comm', (socketid) => {
                socketMap.set(socketid, socket);
            });
        });

    }

}

module.exports = IOController;