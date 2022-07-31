var stacy_info = require('../brain/init.js')
var quic = require('../brain/quic.js')
var processor = require('../brain/processor.js')
var greet = ` [GREET] Hello, I'm ${stacy_info.name} ! I am ${stacy_info.birth.age}old. You can also call me ${quic.randomFromList(stacy_info.aliases)}.`

var express = require('express'); // require express
var app = express(); // create express app
require('dotenv').config()
global.stc_prefix = process.env.COMMAND_PREFIX

async function processMessage(ctx,res) {
    // user object contains information about the user who sent the message, like username, firstname, id and profile picture url
    var res_array = []
    msgData = {
        platform: 'web',
        user : {
          id: `web`,
          username: ctx.body.first_name,
          first_name: ctx.body.first_name,
        },
        text: ctx.body.message,
        date: quic.CurrentTime_(),
        id : quic.CurrentTime_().replace("_",""),
        ctxObj: res,
        res_array: res_array
      }
        //console.log(user)
         await processor.process(msgData);
         res_array = msgData.res_array;
        console.log(" [WEB] Sending -> "+ res_array)
        var res_string = "";
        res_array.forEach(element => {
         if(element.startsWith('https://')) {
          res_string = res_string + `<img src='${element}'><br>`;
         } else {
          res_string = res_string + element + "<br>";
         }
            
        });
        res_array = [];
        if(!res_string) { res_string = " [error] nothing to send "; }
        res.send(res_string);

}
// use public folder to serve static files
app.use(express.static('web_public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/web-api', function (req, res) {
    // get message param from request
    var res_string = [];
    var message = req.body.message;
    processMessage(req, res);
    // send response
    
});

app.get('/', function (req, res) { // listen for get request on /
    res.send(greet); // send response
}
);
app.listen(3000); // listen on port 3000

// Enable graceful stop
process.once('SIGINT', () => app.close('SIGINT'))
process.once('SIGTERM', () => app.close('SIGTERM'))