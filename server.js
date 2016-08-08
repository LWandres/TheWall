var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var server = app.listen(3000, function() {
    console.log("listening on port 3000");
});
app.use(express.static(path.join(__dirname, './client')));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

require("./config/mongoose.js");
io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
    // (Listener) On Connection
    console.log("Connected - Socket ID: ", socket.id);
    // (Listener) On Disconnect
    socket.on('disconnect', function() {
        console.log("Disconnected - Socket ID: ", socket.id);
    })
    socket.on('created_topic', function(data) {
        socket.broadcast.emit('topic_added', data);
    })
});

require("./config/routes.js")(app);
