var express = require('express');
const app = express();
var path = require('path');

// serve public folder
app.use(express.static('public'));

// socket.io
require('./socketio');

// always serve index.html file
app.get('*', function (req, res) {
    res.sendFile(path.resolve('public', 'index.html'));
});

// start server
app.listen(3000, function () {
    console.log('Chat app listening on port 3000');
});
