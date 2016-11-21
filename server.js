var express = require('express');
const app = express();
var path = require('path');

// socket.io
require('./socketio');

// always serve index.html file
app.use(express.static(path.join(__dirname)));
app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'))
})

// start server
app.listen(3000, function () {
    console.log('Chat app listening on port 3000');
});
