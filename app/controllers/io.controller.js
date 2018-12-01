const socketio = require('socket.io');
var contentModel = require('./../models/content.model.js');

const IOController = {

    listen(server){

        const socketMap = new Map();
        const io = socketio(server);

        io.on('connection', (socket) => {
            socket.emit('connection');

            socket.on('data_comm', (socketid) => {
                socketMap.set(socketid, socket);
            });

            socket.on('slidEvent', (jsonObject) => {
              let allSocket = Object.keys(io.sockets.sockets);
              let commande = jsonObject.CMD;
              if(commande === "START" || "END" || "BEGIN" || "PREV" || "NEXT"){
                let presId = jsonObject.PRES_ID;
                var data;
                allSocket.forEach(function(id) {
                  contentModel.read(presId,  (err,data) => {
                      if(err) return (err);

                      io.to(id).emit('metadata',data);
                      console.log("METADATA:", data);
                  });
                });
              }

              // var clientss = io.sockets.clients();
              // var clients = io.socket.clients('room');
              // console.log(clients);
            });
        })
    }
}

module.exports = IOController;
