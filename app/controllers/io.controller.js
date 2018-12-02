const socketio = require('socket.io');
var contentModel = require('./../models/content.model.js');

const IOController = {

    listen(server){

        const socketMap = new Map();
        const io = socketio(server);

        io.on('connection', (socket) => {
          //Envoie evenement connection au client
            socket.emit('connection');

            //Ecoute sur evenement data_com du client
            socket.on('data_comm', (socketid) => {
                socketMap.set(socketid, socket);
            });

            //Sur ecoute de l'evenement slideEvent
            socket.on('slidEvent', (jsonObject) => {
              let allSocket = Object.keys(io.sockets.sockets);
              let commande = jsonObject.CMD;

              //Test sur la commande recu du client
              if(commande === "START" || "END" || "BEGIN" || "PREV" || "NEXT"){
                let presId = jsonObject.PRES_ID;
                var data;
                //Recupere toutes les scokets de la room par default et renvoie la metadata recuperer
                allSocket.forEach(function(id) {
                  contentModel.read(presId,  (err,data) => {
                      if(err) return (err);

                      io.to(id).emit('metadata',data);
                      console.log("METADATA:", data);
                  });
                });
              }
            });
        })
    }
}

module.exports = IOController;
