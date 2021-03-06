﻿//index.js
(function(updater){

    var socketio = require('socket.io');

    updater.init = function(server){
        var io = socketio.listen(server);

        io.sockets.on("connection", function(socket){
            console.log("socket was connected");

            // socket.emit('showThis', 'this message from the server');
            socket.on('join category', function(category){
                socket.join(category);
            });

            socket.on("new note", function(data){
                socket.broadcast.to(data.category).emit('broadcast note', data.note);
            });
        });
    };
})(module.exports);