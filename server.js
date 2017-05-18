var express = require('express');
const app = express();
var path = require('path');

// socket.io
require('./socketio');

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000);
