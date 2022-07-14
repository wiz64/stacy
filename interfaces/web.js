var stacy_info = require('../brain/init.js')
var quic = require('../brain/quic.js')
var greet = ` [GREET] Hello, I'm ${stacy_info.name} ! I am ${stacy_info.birth.age}old. You can also call me ${quic.randomFromList(stacy_info.aliases)}.`

var express = require('express'); // require express
var app = express(); // create express app
app.get('/', function (req, res) { // listen for get request on /
    res.send(greet); // send response
}
);
app.listen(3000); // listen on port 3000

// Enable graceful stop
process.once('SIGINT', () => app.close('SIGINT'))
process.once('SIGTERM', () => app.close('SIGTERM'))