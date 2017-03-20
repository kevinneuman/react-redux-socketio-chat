var express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// generate userlist displayed on the right in browser
var userlist = [];
function updateUserlist(action, sender) {
    // add user to userlist
    if (action == 'join') {
        userlist.push({
            username: sender
        });
    }

    // remove user from userlist
    else if (action == 'leave') {
        userlist.map((user, index) => {
            if (user.username == sender) {
                userlist.splice(index, 1);
            }
        });
    }
}

// socket.io connection open
io.on('connection', function (socket) {
    // join
    socket.on('chat join', function (msg) {
        // add user to userlist
        updateUserlist('join', msg.sender);

        // send userlist
        io.emit('chat users', userlist);

        // send join message
        io.emit('chat join', msg);
    });

    // leave
    socket.on('chat leave', function (msg) {
        // remove user from userlist
        updateUserlist('leave', msg.sender);

        // send userlist
        io.emit('chat users', userlist);

        // send leave message
        io.emit('chat leave', msg);
    });

    // message
    socket.on('chat message', function (msg) {
        // send message
        io.emit('chat message', msg);
    });
});

http.listen(3001, function () {
    console.log('Socket.IO listening on port 3001');
});
