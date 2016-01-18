/**
 * @brief [brief description]
 * @details [long description]
 *
 * @param  [description]
 * @return [description]
 */
module.exports = function(server, db) {
    "use strict";
    var LIMIT = 100;
    var SELECT = 'select screen_name, text, location, user_id from tweets join users on tweets.user_id = users.id limit ' + LIMIT + ';'
    var io = require('socket.io')(server);
    io.sockets.on('connection', function(socket) {
        socket.on('ready', function(message) {
            db.serialize(function(){
              db.each(SELECT, function(err, row){
                if(err) throw err;
                console.log(row);
              });
            });
            io.sockets.emit('data', {});
        });
    });
}