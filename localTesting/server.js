// simple server for local browser testing

const express = require('express'),
    path = require('path'),
    http = require('http'),
    app = express(),
    port = 4545;

// Allow us to access the body of a request
app.use(express.static(path.join(__dirname, '/')));

// basic get stuff
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

let server = http.createServer(app);

server.listen(port, function () {
    console.log("Test is running on port: " + port);
});