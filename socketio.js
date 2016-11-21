var express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// socket.io connection open
io.on('connection', function (socket) {

    var timestamp;

    // join
    socket.on('chat join', function (msg) {

        // add user to userlist
        chatUsers('join', msg.sender);
        io.emit('chat users', users);

        // generate timestamp
        generateTimestamp(function (callback) {
            timestamp = callback;
        });

        // send join message
        io.emit('chat join',
            {
                timestamp,
                sender: msg.sender,
                message: msg.message
            }
        );
    });

    // leave
    socket.on('chat leave', function (msg) {

        // remove user from userlist
        chatUsers('leave', msg.sender);
        io.emit('chat users', users);

        // generate timestamp
        generateTimestamp(function (callback) {
            timestamp = callback;
        });

        // send leave message
        io.emit('chat leave',
            {
                timestamp,
                sender: msg.sender,
                message: msg.message
            }
        );
    });

    // message
    socket.on('chat message', function (msg) {

        // generate timestamp
        generateTimestamp(function (callback) {
            timestamp = callback;
        });

        // send message
        io.emit('chat message',
            {
                timestamp,
                sender: msg.sender,
                message: msg.message
            }
        );
    });
});

// generate userlist
var users = [];
function chatUsers(action, user) {

    // add user to userlist
    if (action == 'join') {
        users.push({
            username: user
        });
    }

    // remove user from userlist
    else if (action == 'leave') {
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == user) {
                users.splice(i, 1);
            }
        }
    }
}

// generate timestamp
function generateTimestamp(callback) {

    var today = new Date();

    var h = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();

    if (h < 10) {
        h = '0' + h
    }

    if (min < 10) {
        min = '0' + min
    }

    if (sec < 10) {
        sec = '0' + sec
    }

    var dd = today.getDate();
    var mm = today.getMonth() + 1; // january is 0
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    // today = 18.11.2016 at 16.26.44
    today = dd + '.' + mm + '.' + yyyy + ' at ' + h + ':' + min + ':' + sec;

    return callback(today);
}

http.listen(3001, function () {
    console.log('Socket.IO listening on port 3001');
});
