console.log("Hello World ! This is stacy version 0.01")
var stacy_info = require('./brain/init.js')
var quic = require('./brain/quic.js')
// tell visitor about yourself and select one random alias from aliases
var greet = `Hello, I'm ${stacy_info.name} ! I am ${stacy_info.birth.age}old. You can also call me ${quic.randomFromList(stacy_info.aliases)}.`
console.log(greet)
// express hello world listen on port 3000
var express = require('express'); // require express
var app = express(); // create express app
app.get('/', function (req, res) { // listen for get request on /
    res.send(greet); // send response
}
);
app.listen(3000); // listen on port 3000