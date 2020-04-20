// simple server for local browser testing

const express = require('express'),
    path = require('path'),
    http = require('http'),
    fetch = require('node-fetch'),
    app = express(),
    port = 4545;

// Allow us to access the body of a request
app.use(express.static(path.join(__dirname, '/')));

// basic get stuff
app.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/index.html`));
});

// demo session
app.get('/demo-session', (req, res) => {
    fetch('https://api.leogons.com/tm/session/14')
        .then(response => response.json())
        .then(json => {
            console.log(json);
            res.send(json);
        })
        .catch(err => console.error(err));
});

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Test is running on port: ${port}`);
});
